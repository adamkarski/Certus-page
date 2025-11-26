<script lang="ts">
  import CtaButton from "./CtaButton.svelte";
  import OfertaGrid from "./OfertaGrid.svelte";
  import Section_Maszyny_Image01 from "./sections/Section_Maszyny_Image01.svelte";
  import Section_Maszyny_Video from "./sections/Section_Maszyny_Video.svelte";
  import Section_Maszyny_Image02 from "./sections/Section_Maszyny_Image02.svelte";
  import { typoFixAction } from "$lib/utils/typography";

  import Maszyny_table_frezarki from "./tables/Maszyny_table_frezarki.svelte";
  import Maszyny_table_plotery from "./tables/Maszyny_table_plotery.svelte";
  import Maszyny_table_zabudowa from "./tables/Maszyny_table_zabudowa.svelte";
  import Maszyny_table_grawerki from "./tables/Maszyny_table_grawerki.svelte";
  import Maszyny_table_frezarki5osiowe from "./tables/Maszyny_table_frezarki5osiowe.svelte";
  import Maszyny_table_ploteryLinearne from "./tables/Maszyny_table_ploteryLinearne.svelte";
  import Maszyny_table_specjalistyczne from "./tables/Maszyny_table_specjalistyczne.svelte";
  import MachineMenu from "./MachineMenu.svelte";

  // import css styles
  import "$lib/table.scss";

  const maszyny = [];
</script>

<section class="maszyny_page gradientHero_old">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="maszyny" class="maszyny">
  <div class="maszyny-container container">
    <div class="section-header">
      <h1 class="no-sel">Kategorie maszyn</h1>

      <hr />
    </div>
  </div>
  <OfertaGrid variant="maszyny" />
</section>

<!-- Frezarki CNC HMM-ST -->
<section id="frezarki" class="maszyny-dane">
  
  
  
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="Frezarka CNC HMM-ST" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Frezarka CNC HMM-ST z ruchomym stołem</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        Zaprojektowana z myślą o szybkim i precyzyjnym frezowaniu materiałów takich jak stal, aluminium, drewno, tworzywa sztuczne i inne.
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png" alt="Frezarka CNC HMM-ST">
    </div>
  </div>
  

 
  <div class="maszyny-dane-text-image" use:typoFixAction>
    <div class="left">
    
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Produkcję form wtryskowych i tłoczników</li>
        <li use:typoFixAction>
          Obróbkę modeli odlewniczych i termoformowanych
        </li>
        <li use:typoFixAction>
          Wykonywanie stempli, matryc oraz wykrojników ze stali i aluminium
        </li>
        <li use:typoFixAction>
          Precyzyjne grawerowanie i wiele innych procesów przemysłowych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i ergonomia:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Panel sterujący w formie wolnostojącej konsoli pozwala na elastyczne
          rozmieszczenie stanowiska pracy, zwiększając komfort obsługi i
          bezpieczeństwo operatora
        </li>
        <li use:typoFixAction>
          Konsola zawiera m.in.: przyciski sterujące (Start, Stop, Pauza,
          Reset), komputer przemysłowy, monitor, klawiaturę i mysz
        </li>
        <li use:typoFixAction>
          Interfejs użytkownika oraz oprogramowanie dostępne są w języku polskim
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i bezpieczeństwo pracy:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Zamknięta, w pełni zabudowana konstrukcja maszyny umożliwia efektywne
          chłodzenie narzędzi oraz obrabianego materiału
        </li>
        <li use:typoFixAction>
          Wbudowany układ chłodzenia składa się ze zbiornika, odstojnika oraz
          pompy, co zapewnia stabilną pracę i ochronę komponentów
        </li>
        <li use:typoFixAction>
          Elementy prowadzące, takie jak prowadnice liniowe oraz śruby kulowe,
          są zabezpieczone trwałymi osłonami stalowymi, chroniąc je przed
          zanieczyszczeniami i wydłużając ich żywotność
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Wyposażenie i napęd:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Maszyny standardowo wyposażone są w automatyczny system wymiany
          narzędzi z magazynem
        </li>
        <li use:typoFixAction>
          Napęd realizowany jest przez Serwonapędy Hybrydowe lub Serwa AC (w
          zależności od konfiguracji), zapewniając wysoką precyzję i jakość
          obróbki
        </li>
        <li use:typoFixAction>
          Komunikacja z maszyną odbywa się poprzez złącze LAN, co ułatwia
          integrację z siecią zakładową
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Cechy charakterystyczne serii HMM-ST:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Wysoka sztywność konstrukcji</li>
        <li use:typoFixAction>
          Dokładność i powtarzalność pracy w swojej klasie
        </li>
        <li use:typoFixAction>Nowoczesne rozwiązania technologiczne</li>
        <li use:typoFixAction>
          Intuicyjna obsługa i wsparcie w języku polskim
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_1.png"
        alt="Schemat techniczny frezarki Certus 1080 PRO - widok 1"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_1080_PRO_2.png"
        alt="Schemat techniczny frezarki Certus 1080 PRO - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
     <!--  <Section_Maszyny_Image01
        sectionId="frezarki-image-01"
        imgSrc="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png"
        title="Frezarki CNC HMM-ST"
        subtitle="Precyzyjne obróbki skrawaniem"
      /> -->

      <Section_Maszyny_Image02
        sectionId="frezarki-gallery"
        imgSrc="/assets/maszyny/renders/Certus_1080_PRO_Layers/Certus_1080_PRO_Layer1.png"
        title="Galeria realizacji"
        subtitle="Zobacz nasze frezarki w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => console.log("Galeria frezarek")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Frezarki-CNC-HMM-ST.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Frezarki CNC HMM-GT -->
<section id="frezarki-gt" class="maszyny-dane">
 
 
 
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/frezarki.svg" alt="Frezarki CNC HMM-GT" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Frezarka CNC HMM-GT z ruchomą bramą</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        Do dużych formatów i ciężkich detali — detal stoi, pracuje brama. HMM‑GT
        zaprojektowano do szybkiej i precyzyjnej obróbki arkuszy oraz elementów
        o dużej masie i gabarytach. Doskonale sprawdza się w aluminium i jego
        stopach, kompozytach, tworzywach, drewnie oraz — w odpowiedniej
        konfiguracji wrzeciona — w wybranych stalach.
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.png" alt="Frezarki CNC HMM-G">
    </div>
  </div>





  <div class="maszyny-dane-text-image">
    <div class="left">
    

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zastosowanie maszyn obejmuje m.in.:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Modele i formy (odlewnicze, termoformujące, laminaty)
        </li>
        <li use:typoFixAction>
          Panele, płyty i profile długie (meblarstwo, signage, automotive)
        </li>
        <li use:typoFixAction>
          Matryce, wykrojniki, przyrządy, prototypy i serie krótkie
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i ergonomia:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Stół stały — łatwy załadunek z palety, wózka lub żurawia; brak
          bezwładności detalu = lepsza jakość krawędzi i dokładność wymiarowa.
        </li>
        <li use:typoFixAction>
          Brama przejezdna o wysokiej sztywności; napędy tandemowe osi Y
          umożliwiają duże pola robocze bez zwiększania masy ruchomego stołu.
        </li>
        <li use:typoFixAction>
          Segmentowe stoły: T‑slot / podciśnienie / hybryda; opcja przelotu dla
          elementów ponadwymiarowych.
        </li>
        <li use:typoFixAction>
          Konsola sterownicza wolnostojąca; interfejs i wsparcie w języku
          polskim.
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i bezpieczeństwo pracy:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
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

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Wyposażenie i napęd:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Automatyczna wymiana narzędzi z magazynem w standardzie.
        </li>
        <li use:typoFixAction>
          Serwonapędy hybrydowe lub AC (wg konfiguracji); przekładnie zębate na
          dużych osiach; precyzja i dynamika w całym polu roboczym.
        </li>
        <li use:typoFixAction>
          Komunikacja LAN — łatwa integracja z siecią zakładową i systemami CAM.
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="frezarki-gt-image-01"
        imgSrc="/assets/maszyny/renders/Certus_1410_Layers/Certus_1410_Layer1.png"
        title="Frezarki CNC HMM-GT"
        subtitle="Do dużych formatów"
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Frezarki-CNC-HMM-GT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Przemysłowe plotery CNC -->
<section id="ploteryPrzemyslowe" class="maszyny-dane">


   
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/ploteryPrzemyslowe.svg" alt="Przemysłowe plotery CNC ploter przemysłowy bez zabudowy – HPP-OT" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Wielkoformatowy ploter przemysłowy bez zabudowy – HPP-OT</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
         to wielkoformatowe centrum obróbcze CNC stanowiące wysokowydajną
          platformę przeznaczoną do skrawania w co najmniej trzech osiach, z możliwością
          rozbudowy o dodatkowe osie sterowane. Dzięki temu łączą funkcje frezowania,
          wiercenia, gwintowania, toczenia, cięcia, bigowania, a nawet dozowania materiałów.
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_0816_Layers/Certus_0816_Layer1.png" alt="Przemysłowe plotery CNC ploter przemysłowy bez zabudowy – HPP-OT">
    </div>
  </div>







 
  <div class="maszyny-dane-text-image">
   
      <div class="left">
  

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i precyzja:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Bazują na sprawdzonych rozwiązaniach ploterów przemysłowych, oferując
          m.in. konstrukcję bramową z obustronnym napędem serwonapędami oraz
          elektroniczną kompensację odchyłek bramy, co przekłada się na
          wyjątkową dokładność i stabilność pracy
        </li>
        <li use:typoFixAction>
          Wzmocniona, zwarta konstrukcja zapewnia znacznie wyższą sztywność niż
          klasyczne plotery, umożliwiając obróbkę trudniejszych materiałów z
          zachowaniem wysokiej precyzji
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zakres zastosowań:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          W zależności od konfiguracji i wyposażenia, urządzenia te mogą
          obrabiać szeroką gamę materiałów – od tworzyw sztucznych i kompozytów,
          przez metale nieżelazne (aluminium, mosiądz), aż po blachy stalowe
        </li>
        <li use:typoFixAction>
          Do cięższych zastosowań przewidziano możliwość zastosowania wrzecion o
          mocy do 16 kW, z automatycznym systemem wymiany narzędzi – liniowym
          lub obrotowym
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje mocowania materiału:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Standardowo centra wyposażone są w stół próżniowy rastrowy z pompą
          próżniową o dużej wydajności, co umożliwia szybkie i pewne mocowanie
          materiałów w arkuszach oraz elementów o nieregularnym kształcie (przy
          użyciu bloków próżniowych)
        </li>
        <li use:typoFixAction>
          Alternatywnie dostępny jest stół T-rowkowy, pozwalający na tradycyjne
          mocowanie detali – bezpośrednio do stołu, przy użyciu imadeł lub
          dedykowanych uchwytów
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0816_1.png"
        alt="Schemat techniczny frezarki Certus 0816 - widok 1"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0816_2.png"
        alt="Schemat techniczny frezarki Certus 0816 - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_plotery />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Video
        sectionId="plotery-video"
        videoSrc="/assets/video/video-hd.webm"
        title="Plotery w akcji"
        subtitle="Zobacz jak działają nasze plotery"
      />

      <Section_Maszyny_Image01
        sectionId="plotery-image"
        imgSrc="/assets/maszyny/SCHEMATY/Certus_0816_1.png"
        title="Przemysłowe plotery CNC"
        subtitle="Wydajność i precyzja"
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Plotery-przemyslowe-CNC-HPP-OT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Przemysłowe plotery CNC w zabudowie -->
<section id="ploteryPrzemysloweZabudowa" class="maszyny-dane">
 
 
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/ploteryPrzemysloweWzabudowie.svg" alt="Zaawansowany wieloosiowy ploter przemysłowy w zabudowie CERTUS HPP-CT" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Zaawansowany wieloosiowy ploter przemysłowy w zabudowie CERTUS HPP-CT</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        To zaawansowane wieloosiowe centrum obróbcze, zaprojektowane z myślą o pracy w środowisku przemysłowym, gdzie kluczowe znaczenie mają
        bezpieczeństwo, czystość procesu oraz stabilność parametrów pracy.
        Podobnie jak modele otwarte, pozwalają na frezowanie, wiercenie, cięcie,
        gwintowanie czy bigowanie, jednak dzięki pełnej zabudowie oferują
        dodatkowe korzyści operacyjne i eksploatacyjne.
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.png" alt="Zaawansowany wieloosiowy ploter przemysłowy w zabudowie CERTUS HPP-CT">
    </div>
  </div>






  <div class="maszyny-dane-text-image">
    <div class="left">
     
   
      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Przewagi konstrukcyjne:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          W porównaniu do wersji otwartej, zabudowa chroni operatora przed
          odpryskami, pyłem i mgłą olejową, znacząco poprawiając bezpieczeństwo
          oraz komfort pracy
        </li>
        <li use:typoFixAction>
          W pełni zamknięta przestrzeń robocza ułatwia również utrzymanie
          czystości w miejscu pracy oraz ogranicza emisję hałasu i
          zanieczyszczeń do otoczenia
        </li>
        <li use:typoFixAction>
          Zamknięta konstrukcja pozwala na skuteczniejsze chłodzenie narzędzi i
          materiału obrabianego – możliwa jest praca z układami chłodzenia mgłą
          olejową lub cieczą w obiegu zamkniętym
        </li>
        <li use:typoFixAction>
          W wielu przypadkach zabudowa umożliwia też efektywniejsze odciąganie
          wiórów i pyłu, co przekłada się na lepszą jakość obróbki i dłuższą
          żywotność komponentów
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Stabilność i precyzja:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Obudowane maszyny są projektowane z myślą o jeszcze większej
          sztywności konstrukcyjnej
        </li>
        <li use:typoFixAction>
          Zwiększona masa i zamknięty układ wspomagają tłumienie drgań, co
          przekłada się na wyższą precyzję pracy, zwłaszcza przy obróbce metali
          i materiałów trudnoskrawalnych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Zastosowania i elastyczność:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Zabudowane plotery CNC znajdują zastosowanie w aplikacjach
          wymagających powtarzalności i kontroli środowiska obróbki – m.in. w
          przemyśle motoryzacyjnym, lotniczym, formierskim i technice medycznej
        </li>
        <li use:typoFixAction>
          Mogą pracować z szeroką gamą materiałów, od tworzyw sztucznych i
          kompozytów, po aluminium i stal, z możliwością rozbudowy o osie
          obrotowe oraz automatyczne systemy wymiany narzędzi
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje mocowania materiału:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Podobnie jak modele otwarte, urządzenia mogą być wyposażone w stół
          podciśnieniowy, T-rowkowy lub hybrydowy, co pozwala na szybkie i
          elastyczne mocowanie elementów o różnych kształtach i rozmiarach
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_1.png"
        alt="Schemat techniczny frezarki Certus 0815 - widok 5"
      />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_0815_ATC_2.png"
        alt="Schemat techniczny frezarki Certus 0815 - widok 3"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_zabudowa />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image02
        sectionId="zabudowa-gallery"
        imgSrc="/assets/maszyny/renders/Certus_0815_ATC_Layers/Certus_0815_ATC_Layer1.png"
        title="Plotery w zabudowie"
        subtitle="Kompaktowe rozwiązania"
        ctaText="Zobacz galerie"
        ctaAction={() => console.log("Galeria zabudowa")}
      />

      <Section_Maszyny_Image01
        sectionId="zabudowa-specs"
        imgSrc="/assets/certus-pomoc-wdrozenia.png"
        title="Dokumentacja techniczna"
        subtitle="Pobierz specyfikację"
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Plotery-przemyslowe-CNC-HPP-CT.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Grawerki CNC -->
<section id="grawerki" class="maszyny-dane">
  
  

   
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/grawerki.svg" alt="Grawerki CNC Certus" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Grawerki CNC</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        To kompaktowe, precyzyjne urządzenia
        dedykowane do obróbki materiałów wymagających bardzo dużej dokładności przy
        niewielkich wymiarach obszaru roboczego. Znajdą zastosowanie m.in. w produkcji
        form wtryskowych, stempli, narzędzi precyzyjnych, tabliczek znamionowych,
        paneli frontowych, biżuterii oraz w mikroobróbce komponentów technicznych.
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.png" alt="Grawerki CNC Certus">
    </div>
  </div>






 
  <div class="maszyny-dane-text-image">
    <div class="left">
      <p use:typoFixAction>
        <strong>Grawerki CNC</strong><br /><br /> 
      </p>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Precyzja i wydajność:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Maszyny wyposażone są w wysokobrotowe wrzeciona (do 60 000 obr./min) o
          mocach od 0,8 do 2,1 kW, co umożliwia obróbkę materiałów takich jak
          stal, aluminium, mosiądz, tworzywa sztuczne czy laminaty techniczne z
          wyjątkową dokładnością i czystością krawędzi
        </li>
        <li use:typoFixAction>
          Zależnie od potrzeb, możliwy jest dobór wrzeciona pod kątem mocy i
          prędkości, dopasowany do konkretnej aplikacji
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Konstrukcja i sterowanie:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Grawerkę wyposażono w niezależny pulpit operatorski, co ułatwia
          ergonomiczne rozmieszczenie stanowiska pracy
        </li>
        <li use:typoFixAction>
          Kompaktowa konstrukcja oraz wysokość robocza 200 mm czyni ją idealnym
          wyborem zarówno do warsztatów narzędziowych, jak i precyzyjnej
          produkcji seryjnej
        </li>
        <li use:typoFixAction>
          Urządzenie może być skonfigurowane z magazynem narzędzi w wersji
          rewolwerowej, umożliwiającym szybką zmianę narzędzi podczas złożonych
          procesów obróbczych, lub w wersji podstawowej – bez wymiany narzędzi
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Opcje i rozbudowa:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>Pomiar wysokości narzędzia</li>
        <li use:typoFixAction>Sonda 3D współpracująca z makrami pomiarowymi</li>
        <li use:typoFixAction>Centralny układ smarowania</li>
        <li use:typoFixAction>Kamera wizyjna do monitorowania procesu</li>
        <li use:typoFixAction>
          Dodatkowa 4. i 5. oś obrotowa montowana na stole roboczym
        </li>
      </ul>

      <div class="maszyny-dane-podtytul" use:typoFixAction>
        Chłodzenie i mocowanie:
      </div>
      <ul class="maszyny-dane-lista-small" use:typoFixAction>
        <li use:typoFixAction>
          Do efektywnego chłodzenia podczas obróbki przewidziano system mgły
          olejowej lub chłodzenia cieczą w obiegu zamkniętym
        </li>
        <li use:typoFixAction>
          W zależności od potrzeb możliwe jest zastosowanie stołu T-rowkowego,
          podciśnieniowego, próżniowego lub hybrydowego – co daje dużą
          elastyczność w mocowaniu detali, zarówno w produkcji jednostkowej, jak
          i seryjnej
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
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

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_grawerki />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="grawerki-image"
        imgSrc="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.png"
        title="Grawerki CNC"
        subtitle="Precyzyjne grawerowanie"
      />

      <Section_Maszyny_Image02
        sectionId="grawerki-gallery"
        imgSrc="/assets/maszyny/renders/Certus_Grawerka_Layers/Certus_Grawerka_Layer1.png"
        title="Galeria grawerek"
        subtitle="Zobacz nasze realizacje"
        ctaText="Przejdź do galerii"
        ctaAction={() => console.log("Galeria grawerek")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Grawerki-CNC.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Frezarki pięcioosiowe -->
<section id="frezarki5osiowe" class="maszyny-dane">




    
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/frezarki5osiowe.svg" alt="Frezarki CNC pięcioosiowe" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Pięcioosiowe centra frezarskie CNC</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        To zaawansowane
        urządzenia przeznaczone do precyzyjnej obróbki detali o złożonej geometrii.
        Znajdują zastosowanie przede wszystkim w produkcji wielkogabarytowych form
        odlewniczych, matryc do termoformowania, modeli kompozytowych oraz elementów
        wymagających wielostronnej obróbki w jednym mocowaniu.  
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.png" alt="Frezarki CNC pięcioosiowe">
    </div>
  </div>


  <div class="maszyny-dane-text-image">
    <div class="left">
      <p use:typoFixAction>
        <strong></strong><br /><br /> 
      </p>

      <div class="maszyny-dane-podtytul">Zaawansowane sterowanie:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Maszyny wyposażone są w nowoczesny system sterowania umożliwiający
          jednoczesną interpolację wszystkich osi roboczych z projekcją
          prędkości na czoło narzędzia
        </li>
        <li use:typoFixAction>
          Pozwala to na płynną i szybką obróbkę nawet najbardziej złożonych
          powierzchni 3D
        </li>
        <li use:typoFixAction>
          Rozwiązanie to szczególnie sprawdza się w wykańczaniu elementów po
          laminowaniu lub termoformowaniu, gdzie niezbędna jest wysoka
          dokładność i powtarzalność ruchu
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Automatyzacja i precyzja:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Frezarki pięcioosiowe umożliwiają wykonywanie obróbek korekcyjnych i
          wykańczających bez konieczności stosowania specjalistycznego
          oprogramowania CAM
        </li>
        <li use:typoFixAction>
          Dzięki współpracy z głowicą pomiarową 3D i makrami pomiarowymi,
          maszyna może automatycznie skanować i obrabiać powierzchnie na
          podstawie danych rzeczywistych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Konstrukcja i wydajność:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Głowice obrotowo-uchylne stosowane w tego typu urządzeniach
          projektowane są z wykorzystaniem bezluzowych przekładni harmonicznych,
          co zapewnia dużą sztywność przy zachowaniu wysokiej dynamiki ruchów.
          Dzięki takiej konstrukcji urządzenia osiągają bardzo wysoką wydajność
          i jakość obróbki w swojej klasie
        </li>
        <li use:typoFixAction>
          Urządzenia zaprojektowane są z myślą o intensywnej, wielozmianowej
          pracy w warunkach produkcyjnych, gdzie kluczowa jest precyzja,
          szybkość oraz niezawodność
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Opcje rozbudowy:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Pięcioosiowe frezarki CNC mogą być rozbudowane o dodatkowe opcje takie
          jak chłodzenie narzędzi mgłą olejową
        </li>
        <li use:typoFixAction>
          Automatyczne systemy wymiany narzędzi, sondy pomiarowe, kamery wizyjne
        </li>
        <li use:typoFixAction>
          Stoły hybrydowe umożliwiające elastyczne mocowanie materiału – zarówno
          podciśnieniowe, jak i mechaniczne
        </li>
      </ul>
    </div>
    <div class="right">
      <br />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_5_Osi_1.png"
        alt="Schemat techniczny - widok 1"
      />
      <img
        src="/assets/maszyny/SCHEMATY/Certus_5_Osi_2.png"
        alt="Schemat techniczny - widok 2"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_frezarki5osiowe />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="frezarki5osiowe-image"
        imgSrc="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.png"
        title="Frezarki pięcioosiowe"
        subtitle="Zaawansowana obróbka"
      />

      <Section_Maszyny_Image02
        sectionId="frezarki5osiowe-gallery"
        imgSrc="/assets/maszyny/renders/5_osiowa_Layers/5_osiowa_Layer1.png"
        title="Galeria frezarek 5-osiowych"
        subtitle="Zobacz możliwości"
        ctaText="Przejdź do galerii"
        ctaAction={() => console.log("Galeria frezarek 5-osiowych")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Frezarki-5osiowe.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<!-- Plotery tnące linearne CNC -->
<section id="ploteryLinearne" class="maszyny-dane">
 
 


    
  <div class="cnc-table">
    <div class="cnc-left">
      <div class="cnc-row">
        <img src="/assets/ikony/maszyny/ploteryLinearne.svg" alt="Plotery CNC HLP-FT Certus" class="cnc-icon">
        <strong class="cnc-title" use:typoFixAction>Plotery CNC HLP-FT</strong>
      </div>
      <div class="cnc-row" use:typoFixAction>
        To precyzyjne
        i wydajne urządzenia zaprojektowane do cięcia, bigowania, znakowania i opisywania
        szerokiej gamy materiałów płaskich. Idealnie sprawdzają się w przemyśle opakowaniowym,
        reklamowym, tekstylnym, kompozytowym i wielu innych branżach, gdzie wymagana
        jest wysoka jakość krawędzi oraz powtarzalność obróbki. 
      </div>
    </div>
    <div class="cnc-right">
      <img src="/assets/maszyny/renders/Certus_1530_Layers/Certus_1530_Layer1.png" alt="Plotery CNC HLP-FT Certus">
    </div>
  </div>






  <div class="maszyny-dane-text-image">
    <div class="left">
      <p use:typoFixAction>
        <strong>Plotery CNC HLP-FT</strong><br /><br /> 
      </p>

      <div class="maszyny-dane-podtytul">Wszechstronność i funkcjonalność:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Maszyny mogą być wyposażone w różne głowice robocze – frezującą,
          bigującą, znakującą i piszącą – co pozwala na kompleksową obróbkę w
          jednym cyklu
        </li>
        <li use:typoFixAction>
          Opcjonalny pneumatyczny nóż oscylacyjny umożliwia cięcie miękkich i
          elastycznych materiałów, takich jak pianki, gumy, tkaniny techniczne
          czy karton
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Format i konstrukcja:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Plotery dostępne są w różnych wariantach wymiarów obszaru roboczego –
          od kompaktowych (700×1600 mm) po wielkoformatowe (do 2000×4000 mm), co
          pozwala dopasować urządzenie do specyfiki produkcji i dostępnej
          przestrzeni
        </li>
        <li use:typoFixAction>
          Standardowa wysokość robocza 270 mm pozwala na obróbkę materiałów o
          znacznej grubości
        </li>
        <li use:typoFixAction>
          Konstrukcja opiera się na stabilnym stole próżniowym, zapewniającym
          pewne i szybkie mocowanie obrabianego materiału bez konieczności
          stosowania zacisków mechanicznych
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Automatyzacja i wygoda:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Plotery liniowe mogą być opcjonalnie wyposażone w taśmowy lub
          bezkońcowy stół transportowy, co znacząco zwiększa wydajność przy
          obróbce długich serii materiałów z roli lub arkuszy
        </li>
        <li use:typoFixAction>
          Tego typu rozwiązania pozwalają na zautomatyzowaną pracę ciągłą,
          minimalizując przestoje i zwiększając efektywność operacyjną
        </li>
      </ul>

      <div class="maszyny-dane-podtytul">Obsługa i ergonomia:</div>
      <ul class="maszyny-dane-lista-small">
        <li use:typoFixAction>
          Sterowanie odbywa się z poziomu niezależnego pulpitu operatorskiego,
          co zapewnia wygodę i bezpieczeństwo obsługi, a także ułatwia
          organizację przestrzeni roboczej
        </li>
        <li use:typoFixAction>
          Intuicyjne oprogramowanie umożliwia szybkie przezbrojenie maszyny i
          optymalizację ścieżek cięcia
        </li>
      </ul>
    </div>
    <div class="right">
      <br />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_1530_1.png"
        alt="Schemat techniczny frezarki Certus 1530 - widok 1"
      />

      <img
        src="/assets/maszyny/SCHEMATY/Certus_1530_2.png"
        alt="Schemat techniczny frezarki Certus 1530 - widok 4"
      />
    </div>
  </div>

  <div class="maszyny-dane-content">
    <div class="maszyny-dane-table-column">
      <div class="maszyny-dane-tabela-wrap">
        <Maszyny_table_ploteryLinearne />
      </div>
    </div>

    <div class="maszyny-dane-gallery-column">
      <Section_Maszyny_Image01
        sectionId="ploteryLinearne-image"
        imgSrc="/assets/maszyny/SCHEMATY/Certus_1530_2.png"
        title="Plotery CNC HLP-FT"
        subtitle="Precyzyjne cięcie"
      />

      <Section_Maszyny_Image02
        sectionId="ploteryLinearne-gallery"
        imgSrc="/assets/maszyny/renders/Certus_1530_Layers/Certus_1530_Layer1.png"
        title="Galeria ploterów linearnych"
        subtitle="Zobacz w akcji"
        ctaText="Przejdź do galerii"
        ctaAction={() => console.log("Galeria ploterów linearnych")}
      />
    </div>
  </div>
  <MachineMenu
    downloadText="Do pobrania"
    downloadHref="/do_pobrania/Plotery-linearne-CNC.pdf"
    contactText="Kontakt"
    contactHref="/kontakt"
  />
</section>

<style lang="scss">
  
  
  .cnc-table {
      display: grid;
      grid-template-columns: 2fr 1fr;
      width: 100%;
      background: #fff;
    }
    .cnc-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 220px;
    }
    .cnc-row {
      color: rgb(102, 102, 102);
    display: flex;
    align-items: flex-end;
    padding: 0.5em 0;
    align-content: flex-end;

    }
    .cnc-row + .cnc-row {
      border-top: 1px solid #ccc;
    }
    .cnc-icon {
      width: 96px;
      height: 96px;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .cnc-left .cnc-title{
      max-width: 80%; 
    }
    .cnc-right {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 200px;
      padding: 0em;
    }
    .cnc-right img {
      max-width: 100%;
      height: auto;
    }
    @media (max-width: 600px) {

      .cnc-table {
        grid-template-columns: 1fr !important;
        grid-template-rows: auto auto;
      }
      .cnc-right img{
        padding: 0.3rem;
      }
    }
    @media (max-width: 900px) {

      .maszyny-dane{

        padding: 1rem 1rem 0.5rem 1rem;


      }
      .cnc-table {
        grid-template-columns: 3fr 1fr;
      }
      .cnc-left {
        padding: 1em 0.5em;
      }
   
    }
    @media (max-width: 600px) {
      .cnc-table {
        grid-template-columns: 1fr 1fr;
      }
      .cnc-left, .cnc-right {
        padding: 0.5em;
      }

    }


  .first-container-back {
    display: none;
  }
  .pattern-overlay .pattern.two {
    display: none;
  }
  .maszyny-dane-hr {
    width: 70%;
  }
  .topline {
    height: 5em;
    position: absolute;
    width: 100%;
    left: 0px;
    /*  margin-top: -100px; */
    .topImage {
      margin-top: -10px;
      float: right;
      width: 37rem;
      padding-right: 8rem;
    }
  }

  @media (max-width: 927px) {
    .logomini {
      min-width: 62px !important;
      width: 30px;
    }
    .topline .topImage {
      width: 16rem !important;
      padding-right: 1em !important;
      margin-top: 67px;
    }
  }

  @media (max-width: 900px) {
    .maszyny-dane-header h2{
      width: 50% !important;
      top: -20px;
    }
    .title_ {
      width: 70% !important;
    }
    .topImage{
      margin-top: -300px;
    }
  }
  @media (min-width: 928px) and (max-width: 1199px) {
    .topline .topImage {
      width: 24rem !important;
      padding-right: 1em !important;
      margin-top: 0px;
    }
  }
  @media (min-width: 900px) {
    .topline .topImage {
      width: 20rem !important;
      padding-right: 1em !important;
      margin-top: 0px;
    }
  }

  @media (min-width: 1200px) {
    .topline .topImage {
      width: 30rem !important;
      padding-right: 1em !important;
      margin-top: -100px;
    }
  }
  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 218px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
  }

  .maszyny-dane-text-image p {
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
  .maszyny_page {
    // min-width: 100vw;
    margin: 0 auto;
    // height: 0px;
    min-height: 170px;
  }

  .section-header h1 {
    color: var(--color-text-secondary) !important;
    font-weight: 600 !important;
  }
</style>
