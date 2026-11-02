<script lang="ts">
  import '$lib/table.scss';
  export let type: 'OT' | 'CT' = 'OT';
</script>

<table class="maszyny-dane-tabela plotery">
    <thead>
      <tr>
        <th>Parametr</th>
        <th>Dostępne opcje</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><img src="/assets/ikony/table/wymiary.svg" alt="Wymiary" /><div class="text">Wymiary obszaru roboczego (mm)</div></td>
        <td class="highlight-options">
          <ul class="options-list">
            <li>1400x1000</li>
            <li>1400x1200</li>
            <li>1400x1600</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/wysokosc.svg" alt="Wysokość" /><div class="text">Wysokość nad stołem roboczym (mm)</div></td>
        <td class="highlight-options">
          <ul class="options-list">
            <li>270</li>
            <li>300</li>
            <li>350</li>
            <li>400</li>
            <li>500</li>
            <li>600</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/rodzajewzeciona.svg" alt="Wrzeciona" /><div class="text">Rodzaje wrzeciona</div></td>
        <td class="specs-text">
          <ul class="options-list">
            <li>24k obrotów (2,2kW-16kW)</li>
            <li>40k obrotów (5kW)</li>
            <li>50k obrotów (3kW)</li>
            <li>Wolnoobrotowe z wysokim momentem (serwonapęd 5/7,5kW)</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/oswietlenie.svg" alt="Oświetlenie" /><div class="text">Oświetlenie obszaru roboczego</div></td>
        <td class="standard-feature"><span class="check-mark">✓</span>W standardzie</td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/atc.svg" alt="ATC" /><div class="text">Automatyczny magazyn narzędzi ATC</div></td>
        <td class="specs-text">
          <ul class="options-list">
            <li>Bez wymiany</li>
            <li>Magazyn liniowy</li>
            <li>Magazyn obrotowy</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/pulpit.svg" alt="Pulpit" /><div class="text">Niezależny pulpit operatorski</div></td>
        <td class="standard-feature"><span class="check-mark">✓</span>Tak</td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/opcje.svg" alt="Opcje" /><div class="text">Opcje dodatkowe</div></td>
        <td class="specs-text">
          <ul class="options-list">
            <li>Chłodzenie (ciągłe cieczą)</li>
            <li>Chłodzenie (mgła olejowa)</li>
            <li>Pomiar wysokości narzędzia</li>
            <li>Sonda 3D z makrami</li>
            <li>Centralne smarowanie</li>
            <li>Kamera wizyjna</li>
            <li>4. oś obrotowa</li>
            <li>5. oś obrotowa</li>
            <li>Chiller do wrzeciona chłodzonego wodą</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><img src="/assets/ikony/table/stoelroboczy.svg" alt="Stół" /><div class="text">Typ stołu roboczego</div></td>
        <td class="specs-text">
          <ul class="options-list">
            <li>T-rowkowy panelowy (standard)</li>
            <li>Podciśnieniowy (opcja)</li>
          </ul>
        </td>
      </tr>
      {#if type === 'CT'}
        <tr>
          <td><img src="/assets/ikony/table/opcje.svg" alt="Pionowa płyta" /><div class="text">Pionowa płyta T-rowkowa</div></td>
          <td class="specs-text">Opcja</td>
        </tr>
        <tr>
          <td><img src="/assets/ikony/table/opcje.svg" alt="Zabudowa" /><div class="text">Zabudowa</div></td>
          <td class="specs-text">Pełna – czujnik drzwi, osłony boczne, zbiornik na wióry</td>
        </tr>
      {/if}
    </tbody>
  </table>
