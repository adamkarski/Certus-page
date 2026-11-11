#!/usr/bin/env python3
"""Harmonize transparent CNC renders without changing geometry or alpha.

The script works only in the RGB channels. Alpha is copied from source and is
never used as a compositing target, so semi-transparent anti-aliased edges
remain unchanged. For production work, pass a grayscale glass mask exported
from the CAD render; ``--auto-glass`` is a useful fallback for unmasked PNGs.

Example:
    python scripts/harmonize_cnc_render.py input.png output.png \
        --glass-mask doors-mask.png
"""

from __future__ import annotations

import argparse
import colorsys
import math
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops, ImageEnhance, ImageFilter


# Exact reference colors measured directly from HMP-G1 master render:
# Dark Anthracite Body (RAL 7016): R=36.6, G=42.8, B=47.8 (cool slate-blue metal tone)
# Certus Lime Green: R=180.2, G=208.8, B=82.7 (Hue: ~73.0°, Sat: ~64.0%, Val: ~84.0%)
TARGET_GREEN_HUE = 73.0 / 360.0 # 0.2028


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def clamp_byte(value: float) -> int:
    return max(0, min(255, round(value)))


def smoothstep(edge0: float, edge1: float, value: float) -> float:
    t = clamp((value - edge0) / (edge1 - edge0))
    return t * t * (3.0 - 2.0 * t)


def color_grade(image: Image.Image, strength: float = 1.0) -> Image.Image:
    """Harmonize both the dark body metal and green accents to HMP-G1 master render."""
    pixels = image.load()
    w, h = image.size
    
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[x, y]
            rf, gf, bf = r / 255.0, g / 255.0, b / 255.0
            h_hsv, s_hsv, v_hsv = colorsys.rgb_to_hsv(rf, gf, bf)
            
            # 1. GREEN ACCENTS (door frames, logos, stripes, gantry covers)
            # Original Certus greens are between 45° and 100° (0.125 to 0.28) with saturation > 0.20
            is_green = (0.125 <= h_hsv <= 0.285) and (s_hsv > 0.20) and (v_hsv > 0.15)
            
            if is_green:
                # Shift hue precisely to HMP-G1 Certus Lime Green (73.0°)
                new_h = TARGET_GREEN_HUE
                # Normalize saturation to HMP-G1 satin range (0.55 - 0.68)
                new_s = clamp(s_hsv * 0.95, 0.52, 0.68)
                # Boost brightness cleanly so it matches the clean studio lighting of HMP-G1
                new_v = clamp(v_hsv * 1.10, 0.20, 0.90)
                
                # Blend with original based on strength
                gr_r, gr_g, gr_b = colorsys.hsv_to_rgb(new_h, new_s, new_v)
                nr = round(r * (1.0 - strength) + gr_r * 255.0 * strength)
                ng = round(g * (1.0 - strength) + gr_g * 255.0 * strength)
                nb = round(b * (1.0 - strength) + gr_b * 255.0 * strength)
                pixels[x, y] = (clamp_byte(nr), clamp_byte(ng), clamp_byte(nb))
                continue
            
            # 2. DARK BODY / ANTHRACITE SHEET METAL (RAL 7016)
            # Low saturation darks and midtones
            diff = max(r, g, b) - min(r, g, b)
            lum = (r + g + b) / 3.0
            
            if lum < 115 and diff < 34:
                # In old renders: R ~ 40, G ~ 38, B ~ 37 (warm/muddy dark brown-gray)
                # In HMP-G1: R ~ 36, G ~ 43, B ~ 48 (RAL 7016 slate-blue anthracite)
                # Calculate depth weight: stronger in deep blacks, gentle in midtones
                depth = clamp((115.0 - lum) / 115.0) * strength
                
                nr = r * (1.0 - 0.08 * depth) - depth * 1.5
                ng = g * (1.0 + 0.06 * depth) + depth * 3.5
                nb = b * (1.0 + 0.16 * depth) + depth * 8.5
                pixels[x, y] = (clamp_byte(nr), clamp_byte(ng), clamp_byte(nb))
            elif lum < 180 and diff < 28:
                # Midtone gray metal (chamfers, beveled edges)
                depth = clamp((180.0 - lum) / 180.0) * strength * 0.6
                nr = r * (1.0 - 0.04 * depth)
                ng = g * (1.0 + 0.03 * depth) + depth * 1.5
                nb = b * (1.0 + 0.10 * depth) + depth * 4.0
                pixels[x, y] = (clamp_byte(nr), clamp_byte(ng), clamp_byte(nb))
                
    return image


def auto_glass_mask(image: Image.Image) -> Image.Image:
    """Build soft glass confidence mask from neutral, cool grey pixels."""
    rgb = image.convert("RGB")
    source = rgb.load()
    mask = Image.new("L", rgb.size, 0)
    target = mask.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = source[x, y]
            value = max(r, g, b) / 255.0
            saturation = (max(r, g, b) - min(r, g, b)) / max(max(r, g, b), 1)
            cool = smoothstep(-0.04, 0.04, (b - r) / 255.0)
            neutral = 1.0 - smoothstep(0.08, 0.24, saturation)
            midtone = smoothstep(0.12, 0.28, value) * (1.0 - smoothstep(0.82, 0.98, value))
            target[x, y] = round(255 * cool * neutral * midtone)
    # Remove pixel-scale CAD lines; softbox must be broad and continuous.
    return mask.filter(ImageFilter.GaussianBlur(max(2, min(rgb.size) // 180)))


def mask_from_boxes(size: tuple[int, int], boxes: Iterable[str]) -> Image.Image:
    mask = Image.new("L", size, 0)
    for raw_box in boxes:
        try:
            x, y, width, height = (int(part) for part in raw_box.split(","))
        except ValueError as error:
            raise argparse.ArgumentTypeError(
                f"Niepoprawny --glass-box {raw_box!r}; użyj x,y,szerokość,wysokość"
            ) from error
        mask.paste(255, (x, y, x + width, y + height))
    return mask.filter(ImageFilter.GaussianBlur(max(2, min(size) // 160)))


def softbox_overlay(size: tuple[int, int], x: float, y: float, width: float, height: float) -> Image.Image:
    """Create a large, feathered rectangular reflection, not a stripe."""
    result = Image.new("RGBA", size, (0, 0, 0, 0))
    pixels = result.load()
    for py in range(size[1]):
        ny = py / max(1, size[1] - 1)
        for px in range(size[0]):
            nx = px / max(1, size[0] - 1)
            dx = abs(nx - x) / max(width, 1e-6)
            dy = abs(ny - y) / max(height, 1e-6)
            distance = math.sqrt(dx * dx + dy * dy)
            glow = (1.0 - smoothstep(0.55, 1.0, distance)) ** 1.7
            # Neutral daylight softbox: slight warm center, no blue cast.
            pixels[px, py] = (239, 235, 222, round(150 * glow))
    return result


def apply_softbox(image: Image.Image, glass: Image.Image, opacity: float) -> Image.Image:
    # Two overlapping broad sources create a studio reflection with no hard
    # borders and no repeated scan-line pattern.
    left = softbox_overlay(image.size, 0.40, 0.30, 0.20, 0.72)
    right = softbox_overlay(image.size, 0.68, 0.24, 0.16, 0.68)
    reflection = ImageChops.lighter(left, right)
    alpha = reflection.getchannel("A").point(lambda value: round(value * opacity))
    alpha = ImageChops.multiply(alpha, glass)
    reflection.putalpha(alpha)
    return Image.alpha_composite(image.convert("RGBA"), reflection).convert("RGB")


def process(input_path: Path, output_path: Path, glass_mask_path: Path | None,
            boxes: list[str], use_auto_glass: bool, grade_strength: float,
            softbox_opacity: float) -> None:
    source = Image.open(input_path).convert("RGBA")
    original_alpha = source.getchannel("A").copy()
    rgb = color_grade(source.convert("RGB"), grade_strength)

    # Check if this machine has an enclosure / glass or if softbox should be applied
    fname = input_path.name.lower()
    has_glass_enclosure = ("hmm" in fname or "c69" in fname or "g1" in fname or "grawerka" in fname)

    if (glass_mask_path or boxes or use_auto_glass) and has_glass_enclosure and softbox_opacity > 0:
        if glass_mask_path:
            glass = Image.open(glass_mask_path).convert("L").resize(source.size, Image.Resampling.LANCZOS)
        elif boxes:
            glass = mask_from_boxes(source.size, boxes)
        elif use_auto_glass:
            glass = auto_glass_mask(source)
        else:
            glass = None
        if glass:
            rgb = apply_softbox(rgb, glass, softbox_opacity)

    result = rgb.convert("RGBA")
    result.putalpha(original_alpha)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_path.suffix.lower() == ".webp":
        result.save(output_path, "WEBP", quality=95)
    else:
        result.save(output_path, "PNG", optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, nargs="?", help="Input file or folder")
    parser.add_argument("output", type=Path, nargs="?", help="Output file or folder")
    parser.add_argument("--batch", action="store_true", help="Process all images in input folder")
    parser.add_argument("--glass-mask", type=Path, help="biała szyba, czarne pozostałe obszary")
    parser.add_argument("--glass-box", action="append", default=[], metavar="X,Y,W,H")
    parser.add_argument("--auto-glass", action="store_true", default=True, help="heurystyka dla renderu bez maski")
    parser.add_argument("--grade-strength", type=float, default=1.0)
    parser.add_argument("--softbox-opacity", type=float, default=0.35)
    args = parser.parse_args()

    if args.batch:
        in_dir = args.input
        out_dir = args.output or in_dir / "poprawione_hmp_style"
        for p in sorted(in_dir.iterdir()):
            if p.name.startswith(".") or p.name.startswith("poprawione") or p.is_dir():
                continue
            if p.suffix.lower() in (".png", ".webp") and "hmp-g1" not in p.name:
                out_p = out_dir / p.name
                print(f"Processing {p.name}...")
                process(p, out_p, None, [], True, args.grade_strength, args.softbox_opacity)
        print("Done batch processing!")
        return

    if not args.input or not args.output:
        parser.error("Podaj input i output lub użyj --batch")

    process(args.input, args.output, args.glass_mask, args.glass_box, args.auto_glass,
            args.grade_strength, args.softbox_opacity)


if __name__ == "__main__":
    main()
