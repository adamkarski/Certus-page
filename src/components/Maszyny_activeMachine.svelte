<script lang="ts">
  import CtaButtonHero from "../components/cta-button-hero.svelte";
  import {
    activeCategoryStore,
    activeMachineStore,
    expandedViewStore,
  } from "../lib/visibilityStore";
  import { typoFixAction } from "$lib/utils/typography";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";

  import IconDoc from "$lib/../components/IconDoc.svelte";
  import DaneTechniczne from "$lib/../assets/menu/dane_techniczne.svelte";
  import MenuEmail from "$lib/../assets/menu/menu_email.svelte";
  import MenuDownload from "$lib/../assets/menu/menu_download.svelte";

  //tables dla maszyn
  import Maszyny_table_frezarki from "$lib/../components/tables/Maszyny_table_frezarki.svelte";
  import Maszyny_table_plotery from "$lib/../components/tables/Maszyny_table_plotery.svelte";
  import Maszyny_table_grawerki from "$lib/../components/tables/Maszyny_table_grawerki.svelte";
  import Maszyny_table_frezarki5osiowe from "$lib/../components/tables/Maszyny_table_frezarki5osiowe.svelte";
  import Maszyny_table_ploteryLinearne from "$lib/../components/tables/Maszyny_table_ploteryLinearne.svelte";
  import Maszyny_table_zabudowa from "$lib/../components/tables/Maszyny_table_zabudowa.svelte";

  // Dodanie funkcji closeFW
  const closeFW = () => {
    activeCategoryStore.set(null);
    activeMachineStore.set(null);
    expandedViewStore.set(false);

    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.delete("machine");
      window.history.pushState({}, "", url);
      document.body.classList.remove("no-scroll-hero");
      document.body.classList.remove("active_machine_view");
    }
  };

  let windowWidth;
  $: isMobile = windowWidth <= 900;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if $activeMachineStore}
  <div
    class="activeMachine no-sel"
    in:fade={{ duration: 300, delay: 0 }}
    out:fade={{ duration: 300, delay: 0 }}
  >
    {#if $activeCategoryStore === "frezarki" && $activeMachineStore === "m_frezarka"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 0 }}
          out:fade={{ duration: 300, delay: 0 }}
        >
          <h1>Seria Frezarek CNC<br />CERTUS HMM</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/certus_7111_temp.png"
              alt="Frezarki CNC"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/certus_7111_temp.png"
              alt="Frezarki CNC"
            />
          </div>
          <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
        </div>

        <div
          class="right"
          class:expanded={$expandedViewStore}
          in:fly={{ x: 200, duration: 500, delay: 0 }}
          out:fly={{ x: 400, duration: 500, delay: 400 }}
        >
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Nowa linia frezarek CERTUS HMM </b><br /><br />została
              zaprojektowana z myślą o szybkim i precyzyjnym frezowaniu
              materiałów takich jak stal, aluminium, drewno, tworzywa sztuczne i
              inne.
            </h1>
            <br /><br />

            <h3>Zastosowanie maszyn obejmuje m.in.:</h3>

            <ul class="">
              <li use:typoFixAction>produkcję form wtryskowych i tłoczników</li>
              <li use:typoFixAction>
                obróbkę modeli odlewniczych i termoformowanych
              </li>
              <li use:typoFixAction>
                wykonywanie stempli, matryc oraz wykrojników ze stali i
                aluminium
              </li>
              <li use:typoFixAction>
                precyzyjne grawerowanie i wiele innych procesów przemysłowych
              </li>
            </ul>
            <hr />

            <h3>Konstrukcja i ergonomia</h3>

            <ul class="">
              <li use:typoFixAction>
                Panel sterujący w formie wolnostojącej konsoli pozwala na
                elastyczne rozmieszczenie stanowiska pracy, zwiększając komfort
                obsługi i bezpieczeństwo operatora
              </li>
              <li use:typoFixAction>
                Konsola zawiera m.in.: przyciski sterujące (Start, Stop, Pauza,
                Reset), komputer przemysłowy, monitor, klawiaturę i mysz
              </li>
              <li use:typoFixAction>
                Interfejs użytkownika oraz oprogramowanie dostępne są w języku
                polskim
              </li>
            </ul>

            <hr />

            <h3>Chłodzenie i bezpieczeństwo pracy</h3>

            <ul class="">
              <li use:typoFixAction>
                Zamknięta, w pełni zabudowana konstrukcja maszyny umożliwia
                efektywne chłodzenie narzędzi oraz obrabianego materiału
              </li>
              <li use:typoFixAction>
                Wbudowany układ chłodzenia składa się ze zbiornika, odstojnika
                oraz pompy, co zapewnia stabilną pracę i ochronę komponentów
              </li>
              <li use:typoFixAction>
                Elementy prowadzące, takie jak prowadnice liniowe oraz śruby
                kulowe, są zabezpieczone trwałymi osłonami stalowymi, chroniąc
                je przed zanieczyszczeniami i wydłużając ich żywotność
              </li>
            </ul>

            <hr />
            <h3>Wyposażenie i napęd</h3>

            <ul class="">
              <li use:typoFixAction>
                Maszyny standardowo wyposażone są w automatyczny system wymiany
                narzędzi z magazynem
              </li>
              <li use:typoFixAction>
                Napęd realizowany jest przez Serwonapędy Hybrydowe lub Serwa AC
                (w zależności od konfiguracji), zapewniając wysoką precyzję i
                jakość obróbki
              </li>
              <li use:typoFixAction>
                Komunikacja z maszyną odbywa się poprzez złącze LAN, co ułatwia
                integrację z siecią zakładową
              </li>
            </ul>
            <hr />
            <h3>Cechy charakterystyczne serii HMM</h3>

            <ul class="">
              <li use:typoFixAction>Wysoka sztywność konstrukcji</li>
              <li use:typoFixAction>
                Dokładność i powtarzalność pracy w swojej klasie
              </li>
              <li use:typoFixAction>Nowoczesne rozwiązania technologiczne</li>
              <li use:typoFixAction>
                Intuicyjna obsługa i wsparcie w języku polskim
              </li>
            </ul>

            <div class="right_menu">
              <nav>
                <ul>
                  <!-- <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li> -->
                  <li>
                    <MenuDownload
                      text="Do pobrania"
                      href="do_pobrania/Frezarki CNC HMM.pdf"
                    />
                  </li>
                  <li><MenuEmail text="Kontakt" href="#" /></li>
                </ul>
              </nav>
            </div>

            <Maszyny_table_frezarki />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/certus_7111_temp_schemat01.png"
                  alt="Schemat techniczny frezarki Certus 7111 - widok 1"
                />
                <img
                  src="/assets/maszyny/certus_7111_temp_schemat02.png"
                  alt="Schemat techniczny frezarki Certus 7111 - widok 2"
                />

                <!--  <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 1200 x 1200 x 350 mm</li>
                <li>Silniki: Serwo AC</li>
                <li>Chłodzenie: Automatyczne</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul> -->
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "ploteryPrzemyslowe" && $activeMachineStore === "m-ploter"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Plotery przemysłowe CNC w zabudowie</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/88930d1c.png"
            alt="Ploter Przemysłowy"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/88930d1c.png"
            alt="Ploter Przemysłowy"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1 use:typoFixAction>
            <b>Zaawansowane wieloosiowe centra obróbcze</b>

            zaprojektowane z myślą o pracy w środowisku przemysłowym, gdzie
            kluczowe znaczenie mają bezpieczeństwo, czystość procesu oraz
            stabilność parametrów pracy.
          </h1>

          <p use:typoFixAction>
            Podobnie jak modele otwarte, pozwalają na frezowanie, wiercenie,
            cięcie, gwintowanie czy bigowanie, jednak dzięki pełnej zabudowie
            oferują dodatkowe korzyści operacyjne i eksploatacyjne.
          </p>

          <hr />
          <h3  use:typoFixAction>Przewagi konstrukcyjne</h3>

          <p use:typoFixAction>W porównaniu do wersji otwartej, zabudowa chroni operatora przed odpryskami,
            pyłem i mgłą olejową, znacząco poprawiając bezpieczeństwo oraz komfort pracy.
            W pełni zamknięta przestrzeń robocza ułatwia również utrzymanie czystości w
            miejscu pracy oraz ogranicza emisję hałasu i zanieczyszczeń do otoczenia.
            Zamknięta konstrukcja pozwala na skuteczniejsze chłodzenie narzędzi i materiału
            obrabianego – możliwa jest praca z układami chłodzenia mgłą olejową lub cieczą
            w obiegu zamkniętym. W wielu przypadkach zabudowa umożliwia też
            efektywniejsze odciąganie wiórów i pyłu, co przekłada się na lepszą jakość obróbki
            i dłuższą żywotność komponentów.</p>




            <hr />
            <h3  use:typoFixAction>Stabilność i precyzja</h3>
  
            <p use:typoFixAction>Obudowane maszyny są projektowane z myślą o jeszcze większej sztywności
              konstrukcyjnej. Zwiększona masa i zamknięty układ wspomagają tłumienie drgań,
              co przekłada się na wyższą precyzję pracy, zwłaszcza przy obróbce metali i
              materiałów trudnoskrawalnych.</p>
  


            <hr />
            <h3  use:typoFixAction>Zastosowania i elastyczność</h3>
  
            <p use:typoFixAction>Zabudowane plotery CNC znajdują zastosowanie w aplikacjach wymagających
              powtarzalności i kontroli środowiska obróbki – m.in. w przemyśle
              motoryzacyjnym, lotniczym, formierskim i technice medycznej. Mogą pracować z
              szeroką gamą materiałów, od tworzyw sztucznych i kompozytów, po aluminium i
              stal, z możliwością rozbudowy o osie obrotowe oraz automatyczne systemy
              wymiany narzędzi.</p>
  


            <hr />
            <h3  use:typoFixAction>Opcje mocowania materiału</h3>
  
            <p use:typoFixAction>Podobnie jak modele otwarte, urządzenia mogą być wyposażone w stół
              podciśnieniowy, T-rowkowy lub hybrydowy, co pozwala na szybkie i elastyczne
              mocowanie elementów o różnych kształtach i rozmiarach.</p>
  






            <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <MenuDownload
                    text="Do pobrania"
                    href="/do_pobrania/Plotery przemysłowe CNC w zabudowie.pdf"
                  />
                </li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div>

          <Maszyny_table_plotery />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny plotera przemysłowego m_ploter - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny plotera przemysłowego m_ploter - widok 2"
              />
              <!-- 
              <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: XXXX x YYYY x ZZZZ mm</li>
                <li>Silniki: Serwo AC</li>
                <li>Chłodzenie: Automatyczne</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul> -->
            </div>
          </div>
        {/if}
      </div>
    {:else if $activeCategoryStore === "ploteryPrzemyslowe" && $activeMachineStore === "m-ploter1"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Ploter Przemysłowy m_ploter1</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/80f5ea646ec.png"
            alt="Ploter Przemysłowy"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/80f5ea646ec.png"
            alt="Ploter Przemysłowy"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1 use:typoFixAction>
            <!-- Content for m_ploter1 (Plotery Przemysłowe) -->
            Szczegóły dla plotera przemysłowego m_ploter1.
          </h1>
          <p use:typoFixAction>
            To jest przykładowy opis dla plotera przemysłowego m_ploter1. Możesz
            tutaj dodać więcej informacji o jego funkcjach i zastosowaniach.
          </p>

          <!--   <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div> -->

          <Maszyny_table_zabudowa />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny plotera przemysłowego m_ploter1 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny plotera przemysłowego m_ploter1 - widok 2"
              />

              <!--  <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: XXXX x YYYY x ZZZZ mm</li>
                <li>Silniki: Serwo AC</li>
                <li>Chłodzenie: Automatyczne</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul> -->
            </div>
          </div>
        {/if}
      </div>
    {:else if $activeCategoryStore === "frezarki5osiowe" && $activeMachineStore === "m_frezarka5osi"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Frezarka 5osi</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Grawerki CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Grawerki CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1 use:typoFixAction>
            <!-- Content for Grawerka Certus 6040 (Grawerki) -->
            Precyzyjne frezarki5osiowe w różnych materiałach.
          </h1>
          <p use:typoFixAction>
            Idealna do tworzenia detali, tabliczek znamionowych, biżuterii i
            innych precyzyjnych zastosowań.
            <br />
            Wyposażona w wysokiej jakości wrzeciono i precyzyjne prowadnice.
            <br />
            Łatwa w obsłudze, z intuicyjnym oprogramowaniem.
          </p>

          <!--  <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div> -->

          <Maszyny_table_frezarki5osiowe />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny grawerki Certus 6040 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny grawerki Certus 6040 - widok 2"
              />

              <!--  <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 600 x 400 x 150 mm</li>
                <li>Silniki: Krokowe</li>
                <li>Chłodzenie: Powietrzne</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Zintegrowany</li>
              </ul> -->
            </div>
          </div>
        {/if}
      </div>
    {:else if $activeCategoryStore === "grawerki" && $activeMachineStore === "m_grawerka"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Grawerka Certus 3030</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Grawerki CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Grawerki CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1 use:typoFixAction>
            <!-- Content for Grawerka Certus 3030 (Grawerki) -->
            Kompaktowa grawerka do małych i średnich projektów.
          </h1>
          <p use:typoFixAction>
            Idealna do personalizacji przedmiotów, tworzenia prototypów i prac
            hobbystycznych.
            <br />
            Wysoka precyzja i łatwość obsługi.
            <br />
            Solidna konstrukcja zapewniająca stabilność.
          </p>

          <!--  <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div> -->

          <Maszyny_table_grawerki />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny grawerki Certus 3030 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny grawerki Certus 3030 - widok 2"
              />
            </div>
          </div>
        {/if}
      </div>
    {:else if $activeCategoryStore === "ploteryLinearne" && $activeMachineStore === "m_ploterLinear"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Ploter Linearny Certus 200</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Tokarki CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Tokarki CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <!--   <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div> -->

          <h1 use:typoFixAction>
            Wielkoformatowa platforma bramowa, która łączy funkcje frezarki,
            tokarki, wiertarki i urządzenia tnącego w jednej maszynie
          </h1>
          <p>Zalety:</p>

          <ul class="" use:typoFixAction>
            <li>
              Sztywna konstrukcja bramowa z obustronnym serwonapędem i
              kompensacją kąta bramy
            </li>

            <li>
              Modułowa konfiguracja 3 – 5 osi pozwala dobrać głowice do zadań
              mieszanych
            </li>

            <li>
              Stół rastrowy próżniowy z pompą Becker 250 m³/h dla pewnego
              mocowania arkuszy
            </li>

            <li>Wrzeciona do 20 kW z liniowym lub rewolwerowym ATC</li>
          </ul>

          <Maszyny_table_ploteryLinearne />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny tokarki Certus 200 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny tokarki Certus 200 - widok 2"
              />

              <!--  <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 2000 x 1000 x 1500 mm</li>
                <li>Silniki: Serwo AC</li>
                <li>Chłodzenie: Cieczą</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul> -->
            </div>
          </div>
        {/if}
      </div>
    {:else if $activeCategoryStore === "specjalistyczne" && $activeMachineStore === "m_special"}
      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Ploter specjalistyczne Certus Laser 1</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Plotery CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Plotery CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1>
            <!-- Content for Ploter Certus Laser 1 (Plotery) -->
            Precyzyjny ploter specjalistyczny do cięcia i grawerowania.
          </h1>
          <p>
            Idealny do obróbki drewna, akrylu, skóry i innych materiałów.
            <br />
            Wysoka prędkość i dokładność cięcia.
            <br />
            Łatwa integracja z oprogramowaniem CAD/CAM.
          </p>

          <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div>
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny plotera Certus Laser 1 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny plotera Certus Laser 1 - widok 2"
              />

              <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 1500 x 900 x 800 mm</li>
                <li>Moc lasera: 100W</li>
                <li>Obszar roboczy: 1300 x 900 mm</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Zintegrowany</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Ploter Certus Tnący 1</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Plotery CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Plotery CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1>
            <!-- Content for Ploter Certus Tnący 1 (Plotery) -->
            Wysokowydajny ploter tnący do folii i innych materiałów.
          </h1>
          <p>
            Idealny do produkcji reklam, naklejek i odzieży.
            <br />
            Szybkie i precyzyjne cięcie.
            <br />
            Łatwa obsługa i konserwacja.
          </p>

          <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div>
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny plotera Certus Tnący 1 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny plotera Certus Tnący 1 - widok 2"
              />

              <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 1200 x 600 x 500 mm</li>
                <li>Szerokość cięcia: 1100 mm</li>
                <li>Prędkość cięcia: 800 mm/s</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Zintegrowany</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>

      <div
        class="left gradientHero"
        class:short={$expandedViewStore}
        in:fade={{ duration: 300, delay: 200 }}
        out:fade={{ duration: 300, delay: 100 }}
      >
        <h1>Frezarka 5-osiowa Certus 1</h1>

        <div class="left_image no-sel">
          <img
            style="filter: blur(120px);"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki 5-osiowe CNC"
          />
          <img
            class="back_image"
            draggable="false"
            src="/assets/maszyny/certus_7111_temp.png"
            alt="Frezarki 5-osiowe CNC"
          />
        </div>
        <CtaButtonHero on:click={closeFW} text="Zamknij szczegóły" />
      </div>

      <div
        class="right"
        class:expanded={$expandedViewStore}
        in:fly={{ x: 200, duration: 500, delay: 0 }}
        out:fly={{ x: 400, duration: 500, delay: 400 }}
      >
        <div class="right_content">
          <h1>
            <!-- Content for Frezarka 5-osiowa Certus 1 (Frezarki 5-osiowe) -->
            Zaawansowana frezarka 5-osiowa do skomplikowanych kształtów.
          </h1>
          <p>
            Idealna do produkcji form, prototypów i elementów lotniczych.
            <br />
            Wysoka precyzja i elastyczność obróbki.
            <br />
            Zintegrowane oprogramowanie CAM.
          </p>

          <div class="right_menu">
            <nav>
              <ul>
                <li>
                  <DaneTechniczne
                    text="Dane techniczne"
                    on:click={expandRightInfo}
                  />
                </li>
                <li><MenuDownload text="Do pobrania" href="#" /></li>
                <li><MenuEmail text="Kontakt" href="#" /></li>
              </ul>
            </nav>
          </div>
        </div>

        {#if $expandedViewStore}
          <div class="right_params">
            <div
              class="right_params_content"
              in:fade={{ duration: 300, delay: 200 }}
            >
              <img
                src="/assets/maszyny/certus_7111_temp_schemat01.png"
                alt="Schemat techniczny frezarki 5-osiowej Certus 1 - widok 1"
              />
              <img
                src="/assets/maszyny/certus_7111_temp_schemat02.png"
                alt="Schemat techniczny frezarki 5-osiowej Certus 1 - widok 2"
              />

              <h2>Parametry techniczne</h2>
              <ul>
                <li>Wymiary: 2500 x 1500 x 1800 mm</li>
                <li>Liczba osi: 5</li>
                <li>Wrzeciono: 24000 RPM</li>
                <li>Oprogramowanie: Polskojęzyczne</li>
                <li>Panel sterujący: Wolnostojący</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  /* Mobile layout for $activeMachineStore */
  .activeMachine {
    flex-direction: column;
    padding: 1rem;
  }

  .activeMachine .left {
    width: 100% !important;
    height: 50%;
    order: 1;
  }

  .activeMachine .left.short {
    width: 100% !important;
    height: 40%;
  }

  .activeMachine .right {
    width: 100% !important;
    height: auto;
    flex-direction: column;
    order: 2;
    padding: 10px;
    overflow-y: auto;
    max-height: 50vh;
  }

  .activeMachine .right.expanded {
    width: 100% !important;
    max-height: 60vh;
  }

  /* Mobile layout for right_content and right_params */
  :global(.activeMachine .right_content) {
    max-width: 100% !important;
    order: 1;

    h1 {
      font-size: large !important;
      margin-top: 2rem !important;
    }

    p {
      width: 100% !important;
      padding-left: 1rem !important;
      font-size: 0.9rem;
    }

    ul {
      padding-left: 1rem !important;
    }
    h3 {
      padding-left: 1rem !important;
    }
  }

  .right_params {
    order: 2;
    margin-top: 1rem;
    max-height: none !important;
  }

  .activeMachine .right_params_content {
    padding-top: 1rem !important;
    padding-left: 1rem !important;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  :global(.activeMachine .right_content) {
    color: #595959;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 35vw;
    h1 {
      text-align: left;
      margin-top: 4rem;
      border-left: solid 0.4em #96a500;
      margin-left: -21.6px;
      padding-left: 1.5em;
      color: var(--color-text-primary);
      font-size: x-large;
    }

    p {
      padding-top: 2em;
      text-align: justify;
      padding-left: 1.5em;
      width: 35vw;
    }

    ul {
      list-style: none;
      text-align: left;

      margin-top: 1em;
      padding-left: 1.5em;
      li {
        border-left: solid 0.2em #96a500;
        padding-left: 12px;
        margin-bottom: 5px;
      }
    }

    .right_menu {
      width: 100%;
      margin-top: 4em;

      nav {
        width: 100%;

        ul {
          list-style-type: none;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-around;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          margin-top: 2rem;
          padding-top: 3rem;
          padding-bottom: 3rem;

          li {
            display: flex;
            border: none;
          }
          li img {
            width: 1.7em;
            margin-right: 20px;
          }
        }
      }
    }
  }
  :global(.activeMachine .maszyny-dane-tabela) {
    margin-top: 4em;
    padding-bottom: 24em;
    font-size: 0.95rem;
  }
  
  .right_params_content img:hover {
    cursor:
      url("data:image/svg+xml;base64,CjxzdmcgaWQ9IkxheWVyXzEiIGRhdGEtbmFtZT0iTGF5ZXIgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQwLjA0IDE0MC4wNCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogbm9uZTsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjOTZhNTAwOwogICAgICAgIHN0cm9rZTogIzk2YTUwMDsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTMgewogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDZweDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBmaWxsOiAjYzVkNDE4OwogICAgICAgIHN0cm9rZTogI2M1ZDQxODsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iMTQwLjA0IiBoZWlnaHQ9IjE0MC4wNCIvPgogIDxnPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjEuMDIsMjAuODZjLTIyLjkyLDAtNDEuNTEsMTguNTgtNDEuNTEsNDEuNTFzMTguNTgsNDEuNTEsNDEuNTEsNDEuNTEsNDEuNTEtMTguNTgsNDEuNTEtNDEuNTEtMTguNTgtNDEuNTEtNDEuNTEtNDEuNTEFaTTYxLjAyLDk4LjU1Yy0xOS45OCwwLTM2LjE4LTE2LjItMzYuMTgtMzYuMThTNDEuMDMsMjYuMTksNjEuMDIsMjYuMTlzMzYuMTgsMTYuMiwzNi4xOCwzNi4xOC0xNi4yLDM2LjE4LTM2LjE4LDM2LjE4WiIvPgogICAgPHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9Ijk4LjM4IDk2LjkxIDk0LjY2IDEwMC42MyAxMTMuMzkgMTE5LjE4IDEyMC41MyAxMTguODUgOTguMzggOTYuOTEiLz4KICA8L2c+Cjwvc3ZnPg==")
        32 32,
      pointer;

    /* 👇 PNG fallback */
    cursor:
      -webkit-image-set(
          url("data:image/png;base64,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")
            2x
        )
        12 12,
      pointer;
  }

  .activeMachine {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    color: white;
    padding: 2rem;
    text-align: center;

    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  }

  .activeMachine .left {
    position: relative;
    z-index: 10000010;
    width: 60%;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: width 0.3s ease-in-out;
  }

  .activeMachine .left.short {
    width: 40%;
  }

  .activeMachine .right {
    background-color: white;
    margin: 0px 0px 0px 0px;
    padding: 0px 20px 0px 20px;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    transition: width 0.3s ease-in-out;
    position: relative;
    z-index: 10000020;
  }

  .activeMachine .right.expanded {
    width: 60%;
  }

  /* tExt right side of the active machine */
  .activeMachine .right_params_content {
    color: #595959;
    padding-top: 4rem;
    text-align: left;
    padding-left: 2rem;
    ul {
      list-style-type: none;
      padding-left: 0;
      margin-top: 2rem;
    }
    img {
      max-width: 25rem;
    }
    h2 {
      margin-top: 4rem;
      padding-left: 2rem;
      font-size: x-large;
    }
    p {
      padding-left: 2rem;
    }

    li {
      padding-left: 2rem;
    }
  }

  .activeMachine .left_image {
    width: 100%;
    display: flex;
    align-content: center;
    height: 100%;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .activeMachine .left_image img {
    max-width: 35vw;
    min-width: 25vw;
  }

  .activeMachine .back_image {
    position: absolute;
  }

  .activeMachine .left h1 {
    font-size: 3em;
    color: white;
    width: 100%;
    text-align: left;
    padding-left: 2em;
    padding-top: 2em;
  }

  @media (max-width: 768px) {
    /* Mobile layout for $activeMachineStore */
    .activeMachine {
      flex-direction: column;
      padding: 1rem;
    }

    .activeMachine .left {
      width: 100% !important;
      height: 50%;
      order: 1;
    }

    .activeMachine .left.short {
      width: 100% !important;
      height: 40%;
    }

    .activeMachine .right {
      width: 100% !important;
      height: auto;
      flex-direction: column;
      order: 2;
      padding: 10px;
      overflow-y: auto;
      max-height: 50vh;
    }

    .activeMachine .right.expanded {
      width: 100% !important;
      max-height: 60vh;
    }

    /* Mobile layout for right_content and right_params */
    :global(.activeMachine .right_content) {
      max-width: 100% !important;
      order: 1;

      h1 {
        font-size: large !important;
        margin-top: 2rem !important;
      }

      p {
        width: 100% !important;
        padding-left: 1rem !important;
        font-size: 0.9rem;
      }

      ul {
        padding-left: 1rem !important;
      }
    }

    .right_params {
      order: 2;
      margin-top: 1rem;
      max-height: none !important;
    }

    .activeMachine .right_params_content {
      padding-top: 1rem !important;
      padding-left: 1rem !important;

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  /* --- KONIEC BLOKADY SCROLLA --- */

  /* --- SCROLL TYLKO W OBRĘBIE PARAMS --- */
  .right_params {
    max-height: 100vh;
  }
  /* --- KONIEC SCROLLA PARAMS --- */

  @media (min-width: 768px) and (max-width: 1950px) {
    body.active_machine_view .activeMachine .right_content {
      max-width: 100% !important;
    }
  }

  @media (max-width: 800px) {
    :global(body.r800) {
      all: unset !important;
      /*   overflow: unset !important; */
      position: relative !important;
      overflow: auto !important;
      overflow-x: hidden !important;
    }
    :global(body.active_machine_view.r800 .app) {
      overflow: unset !important;
    }
    :global(body.active_machine_view section.hero) {
      width: 10px;
      display: none !important;
    }
    :global(body.active_machine_view section#oferta) {
      margin-top: 10px !important;
    }

    .activeMachine {
      position: relative;
      height: auto !important;
    }
    .active_flex {
      display: block !important;
      position: relative !important;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }
    .activeMachine .left {
      width: 100% !important;
      position: relative;
      height: auto !important;
    }
    .activeMachine .right {
      position: relative;
      width: 100% 661px !important;
      height: auto !important;
      overflow: hidden !important;
      max-height: unset !important;
    }

    #oferta {
    }
  }

  /* Additional mobile styles for smaller */
  // @media (min-width: 800px) {
  //   :global(.activeMachine) {
  //     border: 6px solid #96a500 !important;
  //   }
  //   .active_flex {
  //     display: flex;
  //     flex-direction: row;
  //     height: 100%;
  //   }

  //   .activeMachine .left {
  //     width: 50% !important;
  //     height: 100% !important;
  //   }
  //   .activeMachine .right {
  //     height: 100% !important;

  //     min-height: 100vh !important;
  //   }
  //   .right_params {
  //     min-width: 40%;
  //   }
  // }
  @media (max-width: 1200px) {
    body.no-scroll-hero .activeMachine .right .right_params {
      overflow: initial;
    }

    .activeMachine {
      margin: 0px 0px 0px 0px !important;
      padding: 0px !important;
    }
    .activeMachine .right_content p {
      width: 100% !important;
    }
  }

  @media (max-width: 480px) {
    .activeMachine {
      padding: 0.5rem;
    }

    .activeMachine .left {
      height: 45%;
    }

    .activeMachine .right {
      max-height: 55vh;
      padding: 5px;
    }

    .activeMachine .right.expanded {
      max-height: 65vh;
    }

    :global(.activeMachine .right_content) {
      h1 {
        font-size: medium !important;
        margin-top: 1rem !important;
        padding-left: 1rem !important;
      }

      p {
        padding-left: 0.5rem !important;
        font-size: 0.85rem;
        padding-top: 1rem !important;
      }

      ul {
        padding-left: 0.5rem !important;
      }
    }

    .activeMachine .right_params_content {
      padding-top: 0.5rem !important;
      padding-left: 0.5rem !important;
    }
  }
</style>
