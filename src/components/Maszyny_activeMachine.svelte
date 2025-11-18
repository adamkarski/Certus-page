<script lang="ts">
  import CtaButton from "../components/CtaButton.svelte";
  import {
    activeCategoryStore,
    activeMachineStore,
    expandedViewStore,
  } from "../lib/visibilityStore";
  import { typoFixAction } from "$lib/utils/typography";
  import { browser } from "$app/environment";
  import { fade, fly } from "svelte/transition";


  import MachineMenu from "./MachineMenu.svelte";

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
          <h1>Seria Frezarek CNC<br />CERTUS HMM-ST</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png"
              alt="Frezarki CNC"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png"
              alt="Frezarki CNC"
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div class="right" class:expanded={$expandedViewStore}>
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Nowa linia frezarek CERTUS HMM-ST</b><br /><br />została
              zaprojektowana z myślą o szybkim i precyzyjnym frezowaniu
              materiałów takich jak stal, aluminium, drewno, tworzywa sztuczne i
              inne.
            </h1>
            <br /><br />

            <h3><b>Zastosowanie maszyn obejmuje m.in.:<b/></h3>

            <ul class="">
              <li use:typoFixAction>Produkcję form wtryskowych i tłoczników</li>
              <li use:typoFixAction>
                Obróbkę modeli odlewniczych i termoformowanych
              </li>
              <li use:typoFixAction>
                Wykonywanie stempli, matryc oraz wykrojników ze stali i
                aluminium
              </li>
              <li use:typoFixAction>
                Precyzyjne grawerowanie i wiele innych procesów przemysłowych
              </li>
            </ul>
            <hr />

            <h3><b>Konstrukcja i ergonomia</b></h3>

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

            <h3><b>Chłodzenie i bezpieczeństwo pracy</b></h3>

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
            <h3><b>Wyposażenie i napęd</b></h3>

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
            <h3><b>Cechy charakterystyczne serii HMM</b></h3>

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

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Frezarki-CNC-HMM-ST.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_frezarki />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_1.png"
                  alt="Schemat techniczny frezarki Certus CNC HMM-ST 1080 PRO - widok 1 - "
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_2.png"
                  alt="Schemat techniczny frezarki Certus CNC HMM-ST 1080 PRO - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "frezarki" && $activeMachineStore === "m_frezarka1"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 0 }}
          out:fade={{ duration: 300, delay: 0 }}
        >
          <h1>Seria Frezarek CNC<br />CERTUS HMM-GT</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.png"
              alt="Frezarki CNC"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.png"
              alt="Frezarki CNC"
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div class="right" class:expanded={$expandedViewStore}>
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>FREZARKA CNC Z PRZEJEZDNĄ BRAMĄ</b><br /><br />Do dużych formatów i ciężkich detali — detal stoi, pracuje brama.
              HMM‑GT zaprojektowano do szybkiej i precyzyjnej obróbki arkuszy oraz
              elementów o dużej masie i gabarytach. Doskonale sprawdza się w aluminium
              i jego stopach, kompozytach, tworzywach, drewnie oraz — w odpowiedniej
              konfiguracji wrzeciona — w wybranych stalach.
            </h1>
            <br /><br />

            <h3><b>Zastosowanie maszyn obejmuje m.in.:</b></h3>

            <ul class="">
              <li use:typoFixAction>Modele i formy (odlewnicze, termoformujące, laminaty)</li>
              <li use:typoFixAction>
                Panele, płyty i profile długie (meblarstwo, signage, automotive)
              </li>
              <li use:typoFixAction>
                Matryce, wykrojniki, przyrządy, prototypy i serie krótkie
              </li>
              
            </ul>
            <hr />

            <h3><b>Konstrukcja i ergonomia</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Stół stały — łatwy załadunek z palety, wózka lub żurawia; brak 
  bezwładności detalu = lepsza jakość krawędzi i dokładność wymiarowa.
              </li>
              <li use:typoFixAction>
                Brama przejezdna o wysokiej sztywności; napędy tandemowe osi Y
  umożliwiają duże pola robocze bez zwiększania masy ruchomego stołu.
              </li>
              <li use:typoFixAction>
                Segmentowe stoły: T‑slot / podciśnienie / hybryda; opcja przelotu
  dla elementów ponadwymiarowych.
              </li>
              <li use:typoFixAction>
                Konsola sterownicza wolnostojąca; interfejs i wsparcie w języku polskim.
              </li>
            </ul>

            <hr />

            <h3><b>Chłodzenie i bezpieczeństwo pracy</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Zabudowa z odciągiem wiórów/pyłów; czysta i bezpieczna strefa pracy.
              </li>
              <li use:typoFixAction>
                Zintegrowane chłodzenie (zbiornik, odstojnik, pompa) dla stabilności
  procesu i ochrony komponentów.
              </li>
              <li use:typoFixAction>
                Osłony prowadnic i śrub kulowych — dłuższa żywotność i powtarzalność.
              </li>
            </ul>

            <hr />
            <h3><b>Wyposażenie i napęd</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Automatyczna wymiana narzędzi z magazynem w standardzie.
              </li>
              <li use:typoFixAction>
                Serwonapędy hybrydowe lub AC (wg konfiguracji); przekładnie zębate
  na dużych osiach; precyzja i dynamika w całym polu roboczym.
              </li>
              <li use:typoFixAction>
                Komunikacja LAN — łatwa integracja z siecią zakładową i systemami CAM.
              </li>
            </ul>
            <hr />
            <h3><b>Cechy charakterystyczne serii HMM-GT</b></h3>

            <ul class="">
              <li use:typoFixAction>Optymalna do dużych formatów i ciężkich detali</li>
              <li use:typoFixAction>
                Wysoka sztywność portalu i powtarzalna jakość obróbki
              </li>
              <li use:typoFixAction>Szybki załadunek/rozładunek, krótsze czasy przezbrojeń</li>
              <li use:typoFixAction>
                Nowoczesna automatyka, intuicyjna obsługa, serwis PL
              </li>
            </ul>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Frezarki-CNC-HMM-GT.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_frezarki />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1410_1.png"
                  alt="Schemat techniczny frezarki Certus CNC HMM-GT 1410 - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1410_2.png"
                  alt="Schemat techniczny frezarki Certus CNC HMM-GT 1410 - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "ploteryPrzemyslowe" && $activeMachineStore === "m-ploter"}
      <div class="active_flex">
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
              src="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.png"
              alt="Ploter Przemysłowy Certus 0815 ATC w zabudowie"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.png"
              alt="Ploter Przemysłowy Certus 0815 ATC w zabudowie"
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
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
              <br/>
              zaprojektowane z myślą o pracy w środowisku przemysłowym, gdzie
              kluczowe znaczenie mają bezpieczeństwo, czystość procesu oraz
              stabilność parametrów pracy.
            </h1>

            <p use:typoFixAction>
              Podobnie jak modele otwarte, pozwalają na frezowanie, wiercenie,
              cięcie, gwintowanie czy bigowanie, jednak dzięki pełnej zabudowie
              oferują dodatkowe korzyści operacyjne i eksploatacyjne.
            </p>

            <br/> <br/>
            <h3 use:typoFixAction><b>Przewagi konstrukcyjne</b></h3>

            <ul class="">
              <li use:typoFixAction>
              W porównaniu do wersji otwartej, zabudowa chroni operatora przed
              odpryskami, pyłem i mgłą olejową, znacząco poprawiając
              bezpieczeństwo oraz komfort pracy.
              </li>
              

              <li use:typoFixAction>W pełni zamknięta przestrzeń
                robocza ułatwia również utrzymanie czystości w miejscu pracy oraz
                ogranicza emisję hałasu i zanieczyszczeń do otoczenia.</li>
                <li use:typoFixAction> Zamknięta konstrukcja pozwala na skuteczniejsze chłodzenie narzędzi i materiału obrabianego – możliwa jest praca z układami chłodzenia
              mgłą olejową lub cieczą w obiegu zamkniętym. </li>
              <li use:typoFixAction>
              W wielu przypadkach zabudowa umożliwia też efektywniejsze odciąganie wiórów i pyłu, co
              przekłada się na lepszą jakość obróbki i dłuższą żywotność komponentów.</li>
           

           <br/>

            <h3 use:typoFixAction><b>Stabilność i precyzja</b></h3>

            <p use:typoFixAction>
              Obudowane maszyny są projektowane z myślą o jeszcze większej
              sztywności konstrukcyjnej. Zwiększona masa i zamknięty układ
              wspomagają tłumienie drgań, co przekłada się na wyższą precyzję
              pracy, zwłaszcza przy obróbce metali i materiałów
              trudnoskrawalnych.
            </p>

            <br/>
            <h3 use:typoFixAction><b>Zastosowania i elastyczność</b></h3>

            <p use:typoFixAction>
              Zabudowane plotery CNC znajdują zastosowanie w aplikacjach
              wymagających powtarzalności i kontroli środowiska obróbki – m.in.
              w przemyśle motoryzacyjnym, lotniczym, formierskim i technice
              medycznej. Mogą pracować z szeroką gamą materiałów, od tworzyw
              sztucznych i kompozytów, po aluminium i stal, z możliwością
              rozbudowy o osie obrotowe oraz automatyczne systemy wymiany
              narzędzi.
            </p>

            <br/>
            <h3 use:typoFixAction><b>Opcje mocowania materiału</b></h3>

            <p use:typoFixAction>
              Podobnie jak modele otwarte, urządzenia mogą być wyposażone w stół
              podciśnieniowy, T-rowkowy lub hybrydowy, co pozwala na szybkie i
              elastyczne mocowanie elementów o różnych kształtach i rozmiarach.
            </p>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Plotery-przemyslowe-CNC-HPP-CT.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_plotery />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_1.png"
                  alt="Schemat techniczny ploter Certus CNC HPP-CT 0815 ATC w zabudowie - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_2.png"
                  alt="Schemat techniczny ploter Certus CNC HPP-CT 0815 ATC w zabudowie - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "ploteryPrzemyslowe" && $activeMachineStore === "m-ploter1"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 200 }}
          out:fade={{ duration: 300, delay: 100 }}
        >
          <h1>Plotery przemysłowe CNC bez zabudowy</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/Certus_0816_Layers/Certus_0816_Layer1.png"
              alt="Ploter Przemysłowy Certus 0816 bez zabudowy"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_0816_Layers/Certus_0816_Layer1.png"
              alt="Ploter Przemysłowy Certus 0816 bez zabudowy"
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div
          class="right"
          class:expanded={$expandedViewStore}
          in:fly={{ x: 200, duration: 500, delay: 0 }}
          out:fly={{ x: 400, duration: 500, delay: 400 }}
        >
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Wielkoformatowe centra obróbcze CNC</b><br /><br />stanowią
              wysokowydajne platformy przeznaczone do skrawania w co najmniej
              trzech osiach, z możliwością rozbudowy o dodatkowe osie sterowane.
              Dzięki temu łączą funkcje frezowania, wiercenia, gwintowania,
              toczenia, cięcia, bigowania, a nawet dozowania materiałów.
            </h1>
            <br /><br />

            <h3><b>Konstrukcja i precyzja</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Bazują na sprawdzonych rozwiązaniach ploterów przemysłowych,
                oferując m.in. konstrukcję bramową z obustronnym napędem
                serwonapędami oraz elektroniczną kompensację odchyłek bramy, co
                przekłada się na wyjątkową dokładność i stabilność pracy
              </li>
              <li use:typoFixAction>
                Wzmocniona, zwarta konstrukcja zapewnia znacznie wyższą
                sztywność niż klasyczne plotery, umożliwiając obróbkę
                trudniejszych materiałów z zachowaniem wysokiej precyzji
              </li>
            </ul>

            <hr />

            <h3><b>Zakres zastosowań</b></h3>

            <ul class="">
              <li use:typoFixAction>
                W zależności od konfiguracji i wyposażenia, urządzenia te mogą
                obrabiać szeroką gamę materiałów – od tworzyw sztucznych i
                kompozytów, przez metale nieżelazne (aluminium, mosiądz), aż po
                blachy stalowe
              </li>
              <li use:typoFixAction>
                Do cięższych zastosowań przewidziano możliwość zastosowania
                wrzecion o mocy do 16 kW, z automatycznym systemem wymiany
                narzędzi – liniowym lub obrotowym
              </li>
            </ul>

            <hr />

            <h3><b>Opcje mocowania materiału</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Standardowo centra wyposażone są w stół próżniowy rastrowy z
                pompą próżniową o dużej wydajności, co umożliwia szybkie i pewne
                mocowanie materiałów w arkuszach oraz elementów o nieregularnym
                kształcie (przy użyciu bloków próżniowych)
              </li>
              <li use:typoFixAction>
                Alternatywnie dostępny jest stół T-rowkowy, pozwalający na
                tradycyjne mocowanie detali – bezpośrednio do stołu, przy użyciu
                imadeł lub dedykowanych uchwytów
              </li>
            </ul>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Plotery-przemyslowe-CNC-HPP-OT.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_zabudowa />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_0816_1.png"
                  alt="Schemat techniczny ploter Certus CNC HPP-OT 0816 bez zabudowy - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_0816_2.png"
                  alt="Schemat techniczny ploter Certus CNC HPP-OT 0816 bez zabudowy - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "frezarki5osiowe" && $activeMachineStore === "m_frezarka5osi"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 200 }}
          out:fade={{ duration: 300, delay: 100 }}
        >
          <h1>Frezarki Pięcioosiowe CNC</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.png"
              alt="Frezarka Pięcioosiowe CNC Certus"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.png"
              alt="Frezarka Pięcioosiowe CNC Certus"
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div
          class="right"
          class:expanded={$expandedViewStore}
          in:fly={{ x: 200, duration: 500, delay: 0 }}
          out:fly={{ x: 400, duration: 500, delay: 400 }}
        >
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Pięcioosiowe centra frezarskie CNC</b><br /><br />to
              zaawansowane urządzenia przeznaczone do precyzyjnej obróbki detali
              o złożonej geometrii. Znajdują zastosowanie przede wszystkim w
              produkcji wielkogabarytowych form odlewniczych, matryc do
              termoformowania, modeli kompozytowych oraz elementów wymagających
              wielostronnej obróbki w jednym mocowaniu.
            </h1>
            <br /><br />

            <h3><b>Zaawansowane sterowanie</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Maszyny wyposażone są w nowoczesny system sterowania
                umożliwiający jednoczesną interpolację wszystkich osi roboczych
                z projekcją prędkości na czoło narzędzia
              </li>
              <li use:typoFixAction>
                Pozwala to na płynną i szybką obróbkę nawet najbardziej
                złożonych powierzchni 3D
              </li>
              <li use:typoFixAction>
                Rozwiązanie to szczególnie sprawdza się w wykańczaniu elementów
                po laminowaniu lub termoformowaniu, gdzie niezbędna jest wysoka
                dokładność i powtarzalność ruchu
              </li>
            </ul>

            <hr />

            <h3><b>Automatyzacja i precyzja</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Frezarki pięcioosiowe umożliwiają wykonywanie obróbek
                korekcyjnych i wykańczających bez konieczności stosowania
                specjalistycznego oprogramowania CAM
              </li>
              <li use:typoFixAction>
                Dzięki współpracy z głowicą pomiarową 3D i makrami pomiarowymi,
                maszyna może automatycznie skanować i obrabiać powierzchnie na
                podstawie danych rzeczywistych
              </li>
            </ul>

            <hr />

            <h3><b>Konstrukcja i wydajność</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Głowice obrotowo-uchylne stosowane w tego typu urządzeniach
                projektowane są z wykorzystaniem bezluzowych przekładni
                harmonicznych, co zapewnia dużą sztywność przy zachowaniu
                wysokiej dynamiki ruchów. Dzięki takiej konstrukcji urządzenia
                osiągają bardzo wysoką wydajność i jakość obróbki w swojej
                klasie
              </li>
              <li use:typoFixAction>
                Urządzenia zaprojektowane są z myślą o intensywnej,
                wielozmianowej pracy w warunkach produkcyjnych, gdzie kluczowa
                jest precyzja, szybkość oraz niezawodność
              </li>
            </ul>

            <hr />

            <h3><b>Opcje rozbudowy</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Pięcioosiowe frezarki CNC mogą być rozbudowane o dodatkowe opcje
                takie jak chłodzenie narzędzi mgłą olejową
              </li>
              <li use:typoFixAction>
                Automatyczne systemy wymiany narzędzi, sondy pomiarowe, kamery
                wizyjne
              </li>
              <li use:typoFixAction>
                Stoły hybrydowe umożliwiające elastyczne mocowanie materiału –
                zarówno podciśnieniowe, jak i mechaniczne
              </li>
            </ul>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Frezarki-5osiowe.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_frezarki5osiowe />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_5_Osi_1.png"
                  alt="Schemat techniczny Frezarka pięcioosiowa Certus - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_5_Osi_2.png"
                  alt="Schemat techniczny Frezarka pięcioosiowa Certus - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "grawerki" && $activeMachineStore === "m_grawerka"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 200 }}
          out:fade={{ duration: 300, delay: 100 }}
        >
          <h1>Grawerki CNC</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.png"
              alt="Grawerka CNC Certus"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.png"
              
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div
          class="right"
          class:expanded={$expandedViewStore}
          in:fly={{ x: 200, duration: 500, delay: 0 }}
          out:fly={{ x: 400, duration: 500, delay: 400 }}
        >
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Grawerki CNC</b><br /><br />to kompaktowe, precyzyjne
              urządzenia dedykowane do obróbki materiałów wymagających bardzo
              dużej dokładności przy niewielkich wymiarach obszaru roboczego.
              Znajdą zastosowanie m.in. w produkcji form wtryskowych, stempli,
              narzędzi precyzyjnych, tabliczek znamionowych, paneli frontowych,
              biżuterii oraz w mikroobróbce komponentów technicznych.
            </h1>
            <br /><br />

            <h3><b>Precyzja i wydajność</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Maszyny wyposażone są w wysokobrotowe wrzeciona (do 60 000
                obr./min) o mocach od 0,8 do 2,1 kW, co umożliwia obróbkę
                materiałów takich jak stal, aluminium, mosiądz, tworzywa
                sztuczne czy laminaty techniczne z wyjątkową dokładnością i
                czystością krawędzi
              </li>
              <li use:typoFixAction>
                Zależnie od potrzeb, możliwy jest dobór wrzeciona pod kątem mocy
                i prędkości, dopasowany do konkretnej aplikacji
              </li>
            </ul>

            <hr />

            <h3><b>Konstrukcja i sterowanie</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Grawerkę wyposażono w niezależny pulpit operatorski, co ułatwia
                ergonomiczne rozmieszczenie stanowiska pracy
              </li>
              <li use:typoFixAction>
                Kompaktowa konstrukcja oraz wysokość robocza 200 mm czyni ją
                idealnym wyborem zarówno do warsztatów narzędziowych, jak i
                precyzyjnej produkcji seryjnej
              </li>
              <li use:typoFixAction>
                Urządzenie może być skonfigurowane z magazynem narzędzi w wersji
                rewolwerowej, umożliwiającym szybką zmianę narzędzi podczas
                złożonych procesów obróbczych, lub w wersji podstawowej – bez
                wymiany narzędzi
              </li>
            </ul>

            <hr />

            <h3><b>Opcje i rozbudowa</b></h3>

            <ul class="">
              <li use:typoFixAction>Pomiar wysokości narzędzia</li>
              <li use:typoFixAction>
                Sonda 3D współpracująca z makrami pomiarowymi
              </li>
              <li use:typoFixAction>Centralny układ smarowania</li>
              <li use:typoFixAction>Kamera wizyjna do monitorowania procesu</li>
              <li use:typoFixAction>
                Dodatkowa 4. i 5. oś obrotowa montowana na stole roboczym
              </li>
            </ul>

            <hr />

            <h3><b>Chłodzenie i mocowanie</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Do efektywnego chłodzenia podczas obróbki przewidziano system
                mgły olejowej lub chłodzenia cieczą w obiegu zamkniętym
              </li>
              <li use:typoFixAction>
                W zależności od potrzeb możliwe jest zastosowanie stołu
                T-rowkowego, podciśnieniowego, próżniowego lub hybrydowego – co
                daje dużą elastyczność w mocowaniu detali, zarówno w produkcji
                jednostkowej, jak i seryjnej
              </li>
            </ul>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Grawerki-CNC.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_grawerki />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_Grawerka_frezarka_nabiurkowa_1.png"
                  alt="Schemat techniczny Certus Grawerka Frezarka Nabiurkowa - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_Grawerka_frezarka_nabiurkowa_2.png"
                  alt="Schemat techniczny Certus Grawerka Frezarka Nabiurkowa - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "ploteryLinearne" && $activeMachineStore === "m_ploterLinear"}
      <div class="active_flex">
        <div
          class="left gradientHero"
          class:short={$expandedViewStore}
          in:fade={{ duration: 300, delay: 200 }}
          out:fade={{ duration: 300, delay: 100 }}
        >
          <h1>Plotery frezująco-tnące linearne CNC</h1>

          <div class="left_image no-sel">
            <img
              style="filter: blur(120px);"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1530_Layers/Certus_1530_Layer1.png"
              alt="Ploter Linearny CNC Certus 1530"
            />
            <img
              class="back_image"
              draggable="false"
              src="/assets/maszyny/renders/Certus_1530_Layers/Certus_1530_Layer1.png"
              alt=""
            />
          </div>
          <CtaButton on:click={closeFW} text="Zamknij szczegóły" hero={true} />
        </div>

        <div
          class="right"
          class:expanded={$expandedViewStore}
          in:fly={{ x: 200, duration: 500, delay: 0 }}
          out:fly={{ x: 400, duration: 500, delay: 400 }}
        >
          <div class="right_content">
            <h1 use:typoFixAction>
              <b>Plotery frezująco-tnące linearne CNC</b
              ><br /><br />to precyzyjne i wydajne urządzenia zaprojektowane do
              cięcia, bigowania, znakowania i opisywania szerokiej gamy
              materiałów płaskich. Idealnie sprawdzają się w przemyśle
              opakowaniowym, reklamowym, tekstylnym, kompozytowym i wielu innych
              branżach, gdzie wymagana jest wysoka jakość krawędzi oraz
              powtarzalność obróbki.
            </h1>
            <br /><br />

            <h3><b>Wszechstronność i funkcjonalność</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Maszyny mogą być wyposażone w różne głowice robocze – frezującą,
                bigującą, znakującą i piszącą – co pozwala na kompleksową
                obróbkę w jednym cyklu
              </li>
              <li use:typoFixAction>
                Opcjonalny pneumatyczny nóż oscylacyjny umożliwia cięcie
                miękkich i elastycznych materiałów, takich jak pianki, gumy,
                tkaniny techniczne czy karton
              </li>
            </ul>

            <hr />

            <h3><b>Format i konstrukcja</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Plotery dostępne są w różnych wariantach wymiarów obszaru
                roboczego – od kompaktowych (700×1600 mm) po wielkoformatowe (do
                2000×4000 mm), co pozwala dopasować urządzenie do specyfiki
                produkcji i dostępnej przestrzeni
              </li>
              <li use:typoFixAction>
                Standardowa wysokość robocza 270 mm pozwala na obróbkę
                materiałów o znacznej grubości
              </li>
              <li use:typoFixAction>
                Konstrukcja opiera się na stabilnym stole próżniowym,
                zapewniającym pewne i szybkie mocowanie obrabianego materiału
                bez konieczności stosowania zacisków mechanicznych
              </li>
            </ul>

            <hr />

            <h3><b>Automatyzacja i wygoda</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Plotery liniowe mogą być opcjonalnie wyposażone w taśmowy lub
                bezkońcowy stół transportowy, co znacząco zwiększa wydajność
                przy obróbce długich serii materiałów z roli lub arkuszy
              </li>
              <li use:typoFixAction>
                Tego typu rozwiązania pozwalają na zautomatyzowaną pracę ciągłą,
                minimalizując przestoje i zwiększając efektywność operacyjną
              </li>
            </ul>

            <hr />

            <h3><b>Obsługa i ergonomia</b></h3>

            <ul class="">
              <li use:typoFixAction>
                Sterowanie odbywa się z poziomu niezależnego pulpitu
                operatorskiego, co zapewnia wygodę i bezpieczeństwo obsługi, a
                także ułatwia organizację przestrzeni roboczej
              </li>
              <li use:typoFixAction>
                Intuicyjne oprogramowanie umożliwia szybkie przezbrojenie
                maszyny i optymalizację ścieżek cięcia
              </li>
            </ul>

            <MachineMenu
              downloadText="Do pobrania"
              downloadHref="/do_pobrania/Plotery-linearne-CNC.pdf"
              contactText="Kontakt"
              contactHref="#"
            />

            <Maszyny_table_ploteryLinearne />
          </div>

          {#if $expandedViewStore}
            <div class="right_params">
              <div
                class="right_params_content"
                in:fade={{ duration: 300, delay: 200 }}
              >
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1530_1.png"
                  alt="Schemat techniczny ploter linearny Certus 1530 - widok 1"
                />
                <img
                  src="/assets/maszyny/SCHEMATY/Certus_1530_2.png"
                  alt="Schemat techniczny ploter linearny Certus 1530 - widok 2"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if $activeCategoryStore === "specjalistyczne" && $activeMachineStore === "m_special"}
      <div class="active_flex"></div>
    {/if}
  </div>
{/if}

<style lang="scss">
  /* --- DEBUGGING BORDERS --- */
  /*  .activeMachine { border: 2px solid red !important; display: block !important; }
  .active_flex { border: 2px solid blue !important; display: flex !important; }
  .activeMachine .left { border: 2px solid green !important; display: flex !important; }
  .activeMachine .right { border: 2px solid orange !important; display: flex !important; } */
  /* --- END DEBUGGING BORDERS --- */
  /* Mobile layout for $activeMachineStore */
  .activeMachine {
    flex-direction: column;
    padding: 1rem;
    background: white;
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
      font-size: 16px !important;
      margin-top: 2rem !important;
    }

    p {
      width: 100% !important;
      padding-left: 1rem !important;
      font-size: 16px !important;
    }

    ul {
      padding-left: 1rem !important;
      li{
        text-align: left;
      }
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
        margin-bottom: 16px;
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
    display: flex;
    flex-direction: column;
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
    max-width: 85vw;
    min-width: 25vw;
  }

  .activeMachine .back_image {
    position: absolute;
  }

  .activeMachine .left h1 {
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
        margin-top: 2rem !important;
      }

      p {
        width: 100% !important;
        padding-left: 1rem !important;
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
      position: absolute !important;
      height: auto !important;
      width: 100vw;
    }
    .active_flex {
      display: flex !important;
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
      width: 100% !important;
      height: auto !important;
      /* overflow: hidden !important; */ /* -- REMOVED TO FIX SCROLLING -- */
      max-height: unset !important;
    }
  }

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
      font-size: 16px !important;
    }
  }

  @media (max-width: 480px) {
    .activeMachine {
      padding: 0.5rem;
      width: 100vw;
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
        margin-top: 1rem !important;
        padding-left: 1rem !important;
      }

      p {
        padding-left: 0.5rem !important;
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
