#!/bin/bash

# Base directory for gallery images
GALLERY_DIR="static/assets/maszyny/galeria"
WEBP_DIR="${GALLERY_DIR}/webp"
GALLERY_DATA_OLD_TS="src/lib/data/galleryData.ts"
RENAME_PLAN_JSON="rename_plan.json" # Output JSON file

# --- Function to slugify a string ---
slugify() {
  echo "$1" | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9]+/-/g' | tr '[:upper:]' '[:lower:]' | sed -E 's/^-+|-+$//g'
}

# --- Generate rename commands and prepare for galleryData.ts update ---
declare -a rename_data_json # Array to hold JSON objects for each rename

# Ensure the WEBP_DIR exists before finding files
if [ ! -d "$WEBP_DIR" ]; then
  echo "Error: WebP directory '$WEBP_DIR' not found." >&2
  exit 1
fi

while IFS= read -r -d $'\0' old_filepath_abs; do
  old_filename_ext=$(basename "$old_filepath_abs")
  base_name="${old_filename_ext%.*}" # remove .webp extension

  new_base_name=""
  
  # Remove the common '_RealPhoto-v3_x2_...' suffix and resolution
  clean_base_name=$(echo "$base_name" | sed -E 's/(_RealPhoto-v3_x2_[0-9x]+)?$//')
  
  # Handle specific patterns for categories and numbering
  # Regex for "5osi (N)"
  if [[ "$clean_base_name" =~ ^5osi\ \(([0-9]+)\)$ ]]; then
    new_base_name="frezarka-5osiowa-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "Certus 1080 _ 5 axis_N"
  elif [[ "$clean_base_name" =~ ^Certus\ 1080\ _\ 5\ axis_([0-9]+)$ ]]; then
    new_base_name="frezarka-certus-1080-5-osi-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "Certus_1014 (N)"
  elif [[ "$clean_base_name" =~ ^Certus_1014\ \(([0-9]+)\)$ ]]; then
    new_base_name="frezarka-certus-1014-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "Certus_XXXX (N)" where XXXX is a number
  elif [[ "$clean_base_name" =~ ^Certus_([0-9]{4})\ \(([0-9]+)\)$ ]]; then
    new_base_name="frezarka-certus-${BASH_REMATCH[1]}-$(printf "%02d" "${BASH_REMATCH[2]}")"
  # Regex for "Certus 1212_N"
  elif [[ "$clean_base_name" =~ ^Certus\ 1212_([0-9]+)$ ]]; then
    new_base_name="frezarka-certus-1212-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "Certus_69_N"
  elif [[ "$clean_base_name" =~ ^Certus_69_([0-9]+)$ ]]; then
    new_base_name="frezarka-certus-69-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "Grawerki_CNC (N)"
  elif [[ "$clean_base_name" =~ ^Grawerki_CNC\ \(([0-9]+)\)$ ]]; then
    new_base_name="grawerka-cnc-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "HMM-GT (N)"
  elif [[ "$clean_base_name" =~ ^HMM-GT\ \(([0-9]+)\)$ ]]; then
    new_base_name="frezarka-hmm-gt-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "HMM-GT (N)_MoreDetail"
  elif [[ "$clean_base_name" =~ ^HMM-GT\ \(([0-9]+)\)_MoreDetail$ ]]; then
    new_base_name="frezarka-hmm-gt-$(printf "%02d" "${BASH_REMATCH[1]}")-szczegoly"
  # Regex for "HMM-ST_1080 (N)"
  elif [[ "$clean_base_name" =~ ^HMM-ST_1080\ \(([0-9]+)\)$ ]]; then
    new_base_name="frezarka-hmm-st-1080-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "HPP-CT (N)"
  elif [[ "$clean_base_name" =~ ^HPP-CT\ \(([0-9]+)\)$ ]]; then
    new_base_name="ploter-hpp-ct-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "HPP-OT (N)"
  elif [[ "$clean_base_name" =~ ^HPP-OT\ \(([0-9]+)\)$ ]]; then
    new_base_name="ploter-hpp-ot-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Regex for "HPP-OT_2 (N)"
  elif [[ "$clean_base_name" =~ ^HPP-OT_2\ \(([0-9]+)\)$ ]]; then
    new_base_name="ploter-hpp-ot-2-$(printf "%02d" "${BASH_REMATCH[1]}")"
  # Specific name "Plotery HLP-FT"
  elif [[ "$clean_base_name" == "Plotery HLP-FT" ]]; then
    new_base_name="ploter-hlp-ft"
  # Regex for "Spec (N)"
  elif [[ "$clean_base_name" =~ ^Spec\ \(([0-9]+)\)$ ]]; then
    new_base_name="maszyna-specjalna-$(printf "%02d" "${BASH_REMATCH[1]}")"
  else
    # Fallback: slugify the clean name if no specific pattern matched
    new_base_name=$(slugify "$clean_base_name")
  fi

  if [ -z "$new_base_name" ]; then
    echo "Error: Could not determine new base name for '$old_filename_ext'." >&2
    exit 1
  fi

  new_filename="${new_base_name}.webp"
  old_relative_webp_path="/assets/maszyny/galeria/webp/${old_filename_ext}"
  new_relative_webp_path="/assets/maszyny/galeria/webp/${new_filename}"

  # Fallback PNG path: same base name, but .png extension and not in /webp/ subdir
  # This assumes PNGs are in the parent /galeria/ directory, not /galeria/webp/
  old_relative_png_path="/assets/maszyny/galeria/${old_filename_ext%.webp}.png"
  new_relative_png_path="/assets/maszyny/galeria/${new_filename%.webp}.png"

  # Escape special characters for JSON output
  escaped_old_filepath_abs=$(echo "$old_filepath_abs" | sed 's/"/\\"/g')
  escaped_new_filepath_abs="${WEBP_DIR}/${new_filename}"
  escaped_new_filepath_abs=$(echo "$escaped_new_filepath_abs" | sed 's/"/\\"/g')

  escaped_old_relative_webp_path=$(echo "$old_relative_webp_path" | sed 's/"/\\"/g')
  escaped_new_relative_webp_path=$(echo "$new_relative_webp_path" | sed 's/"/\\"/g')
  escaped_old_relative_png_path=$(echo "$old_relative_png_path" | sed 's/"/\\"/g')
  escaped_new_relative_png_path=$(echo "$new_relative_png_path" | sed 's/"/\\"/g')

  # Escape '/' and other special sed regex characters in paths for the sed command
  sed_old_webp_pattern=$(echo "$escaped_old_relative_webp_path" | sed 's/[.[\]()*+?^$|&]/\\&/g')
  sed_new_webp_pattern=$(echo "$escaped_new_relative_webp_path" | sed 's/[.[\]()*+?^$|&]/\\&/g')
  sed_old_png_pattern=$(echo "$escaped_old_relative_png_path" | sed 's/[.[\]()*+?^$|&]/\\&/g')
  sed_new_png_pattern=$(echo "$escaped_new_relative_png_path" | sed 's/[.[\]()*+?^$|&]/\\&/g')

  rename_data_json+=( 
    "{
      \"oldPathAbs\": \"${escaped_old_filepath_abs}\",
      \"newPathAbs\": \"${escaped_new_filepath_abs}\",
      \"oldRelativeWebpPath\": \"${escaped_old_relative_webp_path}\",
      \"newRelativeWebpPath\": \"${escaped_new_relative_webp_path}\",
      \"oldRelativePngPath\": \"${escaped_old_relative_png_path}\",
      \"newRelativePngPath\": \"${escaped_new_relative_png_path}\",
      \"sedWebpCommand\": \"s|${sed_old_webp_pattern}|${sed_new_webp_pattern}|g\",
      \"sedPngCommand\": \"s|${sed_old_png_pattern}|${sed_new_png_pattern}|g\"
    }"
  )

done < <(find "$WEBP_DIR" -maxdepth 1 -type f -name "*.webp" -print0)

# Join JSON array elements with commas and wrap in a JSON array
printf -v json_output "[%s]" "$(IFS=,; echo "${rename_data_json[*]}")"

# Output JSON to a file
echo "$json_output" > "$RENAME_PLAN_JSON"

echo "Generated rename plan in '$RENAME_PLAN_JSON'."
echo "Please review '$RENAME_PLAN_JSON' and execute the commands accordingly."
echo "--- IMPORTANT: I will read '$RENAME_PLAN_JSON' and execute the 'mv' and 'sed' commands. ---"