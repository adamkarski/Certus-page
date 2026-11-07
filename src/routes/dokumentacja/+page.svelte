<script lang="ts">
  import Section_Header from '../../components/sections/Section_Header.svelte'
  import Section_Footer from '../../components/sections/Section_Footer.svelte'
  import Dokumentacja from '../../components/Dokumentacja.svelte';
  import Section_Image01 from '../../components/sections/Section_Image01.svelte';
  import Section_Referencje from '../../components/sections/Section_Referencje.svelte';

  import maszynyData from '$lib/data/maszyny.json';
  import "$lib/table.scss"; // Import table-specific styles

  interface MachineLink {
    title: string;
    url: string;
    image: string;
  }

  const allMachineLinks: MachineLink[] = [];

  maszynyData.forEach(category => {
    if (category.seo && Array.isArray(category.seo)) {
      category.seo.forEach(machine => {
        let targetUrl = `/maszyny/#${category.id}`;
        if (category.url) {
          targetUrl = category.url.endsWith('/') ? category.url : `${category.url}/`;
        }
        allMachineLinks.push({
          title: machine.name,
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
        <h2>Certus Maszyny CNC</h2>
        <p>
          Zapraszamy do zapoznania się ze szczegółowymi informacjami o każdej z naszych maszyn.
          Tutaj uzyskasz pełne specyfikacje, opisy i dane techniczne każdej z naszych maszyn. 
        </p>
        <!-- Changed class to match existing table wrapper for consistent styling -->
        <div class="maszyny-dane-tabela-wrap">
          <!-- Changed class to match existing table for consistent styling -->
          <table class="maszyny-dane-tabela">
            <thead>
              <tr>
                
              </tr>
            </thead>
            <tbody>
              {#each allMachineLinks as link}
                <tr>
                  <td data-label="Maszyna">
                    <a href="{link.url}" class="machine-link-item">
                      <img src="{link.image}" alt="{link.title}" class="machine-thumbnail"/>
                      <span>{link.title}</span>
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <Section_Image01 />
    <Section_Referencje />
  </main>
  <Section_Footer />
</div>

<style lang="scss">
  // Specific styles for the machine links table, overriding or supplementing as needed
  // Most table styling will now come from $lib/table.scss
  .maszyny-dane-tabela-wrap {
    margin-top: 30px;
    margin-bottom: 50px;
    overflow-x: auto; /* Allows table to be scrollable on small screens, if needed */
  }

  .machine-seo-links-section {
    color: #3e4042;
    padding: 0 9rem;
  }

  .machine-link-item {
    display: flex;
    align-items: center;
    text-decoration: none; // Remove underline from the whole link
    color: inherit; // Inherit color from parent td
    font-weight: 600; // Match the font weight from previous styling
    transition: color 0.2s ease-in-out;
  }

  .machine-link-item:hover {
    color: var(--color-primary); // Highlight on hover
  }

  .machine-thumbnail {
    width: 60px; // Small image size
    height: 60px;
    object-fit: contain; // Ensure image fits without cropping
    margin-right: 15px; // Space between image and text
    border-radius: 8px; // Slightly rounded corners
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // Subtle shadow
    transition: transform 0.2s ease-in-out;
  }

  .machine-link-item:hover .machine-thumbnail {
    transform: scale(1.05); // Slightly enlarge image on hover
  }

  // Responsive adjustments for mobile, now handling a single column
  @media (max-width: 768px) {
    .machine-seo-links-section {
      padding: 0 1rem; // Adjust padding for smaller screens
    }
  }

  @media (max-width: 480px) {
    .maszyny-dane-tabela {
      td {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      thead {
        display: none;
      }

      tr {
        margin-bottom: 15px;
        display: block;
        border: 1px solid #e0e0e0;
      }

      td { // Apply directly to td since it's the only one
        background-color: #f5f5f5; // Background for the single cell on mobile
        font-weight: 600;
        padding: 10px; // Adjust padding for mobile
      }

      td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 10px;
      }
      td:nth-of-type(1)::before { content: "Maszyna:"; } // Only one data-label needed
    }

    .machine-link-item {
      flex-direction: column; // Stack image and text vertically on small screens
      text-align: center;
    }

    .machine-thumbnail {
      margin-right: 0;
      margin-bottom: 10px; // Space between image and text when stacked
    }
  }

  :global(.gradientHero_old) {
    background: linear-gradient(180deg, #545454 0%, #3e4042 100%);
  }

  tbody tr td:first-child {
    width: 90% !important;
    min-width: 20px !important;
  }
</style>