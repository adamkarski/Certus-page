<script lang="ts">
  import Section_Header from '../../components/sections/Section_Header.svelte'
  import Section_Footer from '../../components/sections/Section_Footer.svelte'
  import Dokumentacja from '../../components/Dokumentacja.svelte';
  import Section_Image01 from '../../components/sections/Section_Image01.svelte';
  import Section_Referencje from '../../components/sections/Section_Referencje.svelte';
  import MachineTitleSvg from '$lib/components/MachineTitleSvg.svelte';
  import { typoFixAction } from '$lib/utils/typography';

  import maszynyData from '$lib/data/maszyny.json';

  interface MachineLink {
    title: string;
    modelCode: string;
    subtitle: string;
    description: string;
    url: string;
    image: string;
  }

  const machineDetailsMap: Record<string, { model: string; subtitle: string }> = {
    m_frezarka: {
      model: "CNC HMM-ST",
      subtitle: "Frezarka z ruchomym stołem"
    },
    m_frezarka1: {
      model: "CNC HMM-GT",
      subtitle: "Frezarka z ruchomą bramą"
    },
    "m-ploter": {
      model: "CNC HPP-OT",
      subtitle: "Wielkoformatowy ploter bez zabudowy"
    },
    "m-ploter1": {
      model: "CNC HPP-CT",
      subtitle: "Wieloosiowy ploter w zabudowie"
    },
    m_frezarka5osi: {
      model: "CNC 5-OSIOWE",
      subtitle: "Pięcioosiowe centra frezarskie"
    },
    m_grawerka: {
      model: "CNC GRAWER",
      subtitle: "Precyzyjne grawerki CNC"
    },
    m_ploterLinear: {
      model: "CNC HLP-FT",
      subtitle: "Plotery ze stołem hybrydowym"
    }
  };

  const allMachineLinks: MachineLink[] = [];

  maszynyData.forEach(category => {
    if (category.seo && Array.isArray(category.seo)) {
      category.seo.forEach(machine => {
        let targetUrl = `/maszyny/#${category.id}`;
        if (category.url) {
          targetUrl = category.url.endsWith('/') ? category.url : `${category.url}/`;
        }
        const details = machineDetailsMap[machine.id] || {
          model: "CERTUS CNC",
          subtitle: machine.name
        };
        allMachineLinks.push({
          title: machine.name,
          modelCode: details.model,
          subtitle: details.subtitle,
          description: machine.short_description || "",
          url: targetUrl,
          image: machine.image
        });
      });
    }
  });
</script>

<div class="app">
  <Section_Header />
  <main>
    <Dokumentacja />

    <section class="machine-seo-links-section">
      <div class="container">
        <h2 class="seo-section-title" use:typoFixAction>Certus Maszyny CNC</h2>
        <p class="seo-section-desc" use:typoFixAction>
          Zapraszamy do zapoznania się ze szczegółowymi informacjami o każdej z naszych maszyn.
          Tutaj uzyskasz pełne specyfikacje, opisy i dane techniczne każdej z naszych maszyn.
        </p>

        <div class="machine-cards-list">
          {#each allMachineLinks as link}
            <a href="{link.url}" class="machine-seo-card">
              <div class="card-left">
                <div class="card-model-wrap">
                  <span class="card-model-badge">
                    <MachineTitleSvg text={link.modelCode} height="1.15em" shadow={false} />
                  </span>
                </div>
                <h3 class="card-title" use:typoFixAction>{link.subtitle}</h3>
                {#if link.description}
                  <p class="card-desc" use:typoFixAction>{link.description}</p>
                {/if}
              </div>
              <div class="card-right">
                <img
                  src="{link.image}"
                  alt="{link.title}"
                  class="card-image"
                  loading="lazy"
                />
              </div>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <Section_Image01 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  .machine-seo-links-section {
    color: #3e4042;
    padding: 20px 9rem 50px 9rem;

    .container {
      max-width: 900px;
      margin: 0 auto;
    }
  }

  .seo-section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #1a1c1e;
    letter-spacing: -0.01em;
    margin: 0 0 12px 0;
    line-height: 1.25;
  }

  .seo-section-desc {
    font-size: 1.05rem;
    color: #555b63;
    line-height: 1.6;
    max-width: 760px;
    margin: 0 0 32px 0;
  }

  .machine-cards-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .machine-seo-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #ffffff;
    border: 1.5px solid #e5e8ed;
    border-radius: 14px;
    padding: 18px 24px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #96a500;
      box-shadow: 0 6px 20px rgba(150, 165, 0, 0.18);
      transform: translateY(-2px);

      .card-model-badge {
        background: #96a500;
        :global(.machine-svg-title) {
          color: #111213;
        }
      }

      .card-right .card-image {
        transform: scale(1.05);
      }
    }
  }

  .card-left {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .card-model-wrap {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }

  .card-model-badge {
    display: inline-flex;
    align-items: center;
    background: #eef2f6;
    color: #1a1c1e;
    padding: 5px 12px;
    border-radius: 6px;
    line-height: 1;
    transition: all 0.2s ease;

    :global(.machine-svg-title) {
      color: #1a1c1e;
      transition: color 0.2s ease;
    }
  }

  .card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #1a1c1e;
    line-height: 1.35;
    margin: 0;
  }

  .card-desc {
    font-size: 13px;
    color: #636b75;
    line-height: 1.5;
    margin: 6px 0 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-right {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;

    .card-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0;
      background: transparent;
      transition: transform 0.25s ease;
    }
  }

  @media (max-width: 1024px) {
    .machine-seo-links-section {
      padding: 20px 2rem 40px 2rem;
    }
  }

  // Responsive adjustments for mobile
  @media (max-width: 768px) {
    .machine-seo-links-section {
      padding: 0 1.25rem 40px 1.25rem;
      margin-top: 48px; // Lower the section cleanly on mobile
    }

    .seo-section-title {
      font-size: 1.65rem;
      margin-bottom: 10px;
    }

    .seo-section-desc {
      font-size: 0.95rem;
      margin-bottom: 24px;
      line-height: 1.55;
    }
  }

  @media (max-width: 600px) {
    .machine-seo-links-section {
      margin-top: 56px; // Lower down even more on phone viewports
      padding: 0 1rem 36px 1rem;
    }

    .seo-section-title {
      font-size: 1.5rem;
    }

    .seo-section-desc {
      font-size: 0.9rem;
    }

    .machine-seo-card {
      padding: 14px 14px;
      gap: 12px;
      border-radius: 12px;
    }

    .card-model-badge {
      font-size: 12px;
      padding: 2px 7px;
    }

    .card-title {
      font-size: 15px;
    }

    .card-desc {
      font-size: 12px;
      -webkit-line-clamp: 2;
    }

    .card-right {
      width: 75px;
      height: 75px;
    }
  }

  :global(.gradientHero_old) {
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
  }
</style>