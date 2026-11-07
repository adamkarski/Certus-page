<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import {
    visibilityStore,
    setSectionVisible,
  } from "../../lib/visibilityStore";
  import { typoFixAction } from "$lib/utils/typography";

  const sectionId = "image-section-02";
  let sectionEl: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(sectionId);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });

  $: visible = $visibilityStore[sectionId] === true;
</script>

<section id="image-section-02" class="banner-section" bind:this={sectionEl}>
  <div class="banner-container no-sel">
    <picture class="banner-picture">
      <source
        srcset="/assets/images/baner2_wnetrze_hmm-st.webp"
        type="image/webp"
      />
      <img
        src="/assets/images/baner2_wnetrze_hmm-st.jpg"
        alt="Obróbka detali i dobór maszyny CNC CERTUS"
        class="masked-image"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <!-- Subtelny gradient wzmacniający czytelność tekstu po lewej stronie -->
    <div class="banner-scrim" aria-hidden="true"></div>

    <!-- Ozdobne desenie w ściętych narożnikach -->
    <div class="pattern-overlay" aria-hidden="true">
      <div class="pattern one"></div>
      <div class="pattern two"></div>
    </div>

    <!-- Treść banera -->
    <div class="banner-content-container">
      {#if visible}
        <div class="banner-content" in:fade={{ duration: 700, delay: 200 }}>
          <div class="banner-flex-row">
            <!-- Lewa strona: Nagłówek i opis -->
            <div class="banner-heading-group">
              <svg
                viewBox="0 0 28 43"
                class="banner-chevron"
                aria-hidden="true"
              >
                <path fill="#9ACD32" d="M28,21.4L6.9,0,.11,6.88l21.1,21.4,6.78-6.88Z" />
                <path fill="#9ACD32" d="M14.34,21.31L.33,35.51l6.78,6.88,14.01-14.21-6.78-6.88Z" />
              </svg>
              <div class="banner-text-block">
                <h2 class="banner-title" use:typoFixAction>
                  Masz detal do obróbki? Zadzwoń.
                </h2>
                <p class="banner-subtitle" use:typoFixAction>
                  Dobierzemy maszynę i konfigurację do Twojej produkcji –
                  bezpłatnie, bez zobowiązań.
                </p>
              </div>
            </div>

            <!-- Prawa strona: Kontakt telefoniczny -->
            <div class="banner-actions">
              <a
                href="tel:+48606324406"
                class="banner-phone-cta"
                title="Zadzwoń do Certus: 606 324 406"
              >
                <span class="phone-icon-circle" aria-hidden="true">
                  <img
                    src="/assets/ikony/telefon.svg"
                    alt=""
                    class="phone-svg"
                  />
                </span>
                <span class="phone-number">606 324 406</span>
              </a>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .banner-section {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #ffffff;
  }

  .banner-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #101418;
  }

  .banner-picture {
    display: block;
    width: 100%;
  }

  .masked-image {
    width: 100%;
    height: clamp(260px, 28vw, 440px);
    display: block;
    object-fit: cover;
    object-position: center 42%;
    clip-path: polygon(
      0% 0%,
      94.5% 0%,
      100% 13.9%,
      100% 100%,
      33.7% 100%,
      29.9% 95.3%,
      1.6% 95.3%,
      0% 91.3%,
      0% 0%
    );
  }

  .banner-scrim {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(
      90deg,
      rgba(30, 31, 33, 0.85) 0%,
      rgba(30, 31, 33, 0) 55%
    );
    clip-path: polygon(
      0% 0%,
      94.5% 0%,
      100% 13.9%,
      100% 100%,
      33.7% 100%,
      29.9% 95.3%,
      1.6% 95.3%,
      0% 91.3%,
      0% 0%
    );
  }

  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    opacity: 0.85;

    .pattern.one {
      background-image: url(/assets/images/pattern-image1.png);
      background-repeat: no-repeat;
      background-position: right top;
      position: absolute;
      width: 140px;
      height: 64px;
      right: 0;
      top: 0;
    }

    .pattern.two {
      background-image: url(/assets/images/pattern-image1-2.png);
      background-repeat: no-repeat;
      background-position: left bottom;
      position: absolute;
      width: 100%;
      height: 63px;
      left: 0;
      bottom: 0;
    }
  }

  .banner-content-container {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(24px, 6vw, 80px);
    box-sizing: border-box;
    pointer-events: none;
  }

  .banner-content {
    pointer-events: auto;
    width: 100%;
  }

  .banner-flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    width: 100%;
  }

  .banner-heading-group {
    display: flex;
    align-items: flex-start;
    gap: clamp(14px, 1.8vw, 22px);
    max-width: 660px;
  }

  .banner-chevron {
    width: clamp(22px, 2.2vw, 30px);
    height: clamp(34px, 3.4vw, 46px);
    flex-shrink: 0;
    display: block;
    margin-top: 4px;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5));
  }

  .banner-text-block {
    display: flex;
    flex-direction: column;
    gap: clamp(6px, 1vw, 10px);
  }

  .banner-title {
    margin: 0;
    color: #ffffff !important;
    font-family: var(--font-primary, "Poppins", sans-serif);
    font-size: clamp(1.4rem, 2.5vw, 2.35rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  .banner-subtitle {
    margin: 0;
    color: rgba(255, 255, 255, 0.92);
    font-family: var(--font-primary, "Poppins", sans-serif);
    font-size: clamp(0.92rem, 1.15vw, 1.12rem);
    font-weight: 300;
    line-height: 1.55;
    max-width: 530px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }

  .banner-actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .banner-phone-cta {
    display: inline-flex;
    align-items: center;
    gap: clamp(12px, 1.4vw, 16px);
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.25s ease;

    &:hover {
      transform: translateY(-2px);

      .phone-icon-circle {
        background-color: var(--color-primary-light, #c5d418);
        box-shadow: 0 0 18px rgba(197, 212, 24, 0.6);
      }

      .phone-number {
        color: #ffffff;
        text-shadow: 0 2px 12px rgba(255, 255, 255, 0.5);
      }
    }

    .phone-icon-circle {
      width: clamp(38px, 3.8vw, 48px);
      height: clamp(38px, 3.8vw, 48px);
      border-radius: 50%;
      background-color: var(--color-primary, #95a500);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
      transition:
        background-color 0.25s ease,
        box-shadow 0.25s ease;
      flex-shrink: 0;

      .phone-svg {
        width: clamp(18px, 1.8vw, 22px);
        height: clamp(18px, 1.8vw, 22px);
        display: block;
      }
    }

    .phone-number {
      font-family: var(--font-primary, "Poppins", sans-serif);
      font-weight: 800;
      font-size: clamp(1.25rem, 2vw, 1.85rem);
      color: #ffffff;
      letter-spacing: 0.02em;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
      white-space: nowrap;
      transition:
        color 0.25s ease,
        text-shadow 0.25s ease;
    }
  }

  @media (max-width: 900px) {
    .banner-flex-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .masked-image,
    .banner-scrim {
      height: clamp(300px, 58vw, 390px);
      object-position: 70% center;
    }

    .banner-scrim {
      background: linear-gradient(
        90deg,
        rgba(30, 31, 33, 0.92) 0%,
        rgba(30, 31, 33, 0.78) 65%,
        rgba(30, 31, 33, 0.4) 100%
      );
    }

    .banner-content-container {
      padding: 0 20px;
    }

    .banner-heading-group {
      gap: 12px;
    }

    .banner-chevron {
      width: 20px;
      height: 32px;
      margin-top: 2px;
    }

    .banner-title {
      font-size: clamp(1.2rem, 4.8vw, 1.6rem);
    }

    .banner-subtitle {
      font-size: 0.88rem;
      line-height: 1.45;
    }

    .banner-phone-cta {
      gap: 10px;

      .phone-icon-circle {
        width: 36px;
        height: 36px;

        .phone-svg {
          width: 17px;
          height: 17px;
        }
      }

      .phone-number {
        font-size: 1.25rem;
      }
    }
  }
</style>
