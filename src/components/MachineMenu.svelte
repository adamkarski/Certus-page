<script lang="ts">
  import MenuDownload from "$lib/../assets/menu/menu_download.svelte";
  import MenuEmail from "$lib/../assets/menu/menu_email.svelte";

  export let downloadText = "Do pobrania";
  export let downloadHref = "#";
  export let contactText = "Kontakt";
  export let contactHref = "#";
</script>

<div class="right_menu">
  <nav>
    <ul>
      <li>
        <MenuDownload text={downloadText} href={downloadHref} />
      </li>
      <li><MenuEmail text={contactText} href={contactHref} /></li>
    </ul>
  </nav>
</div>

<style lang="scss">
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: none;
        }
        li img {
          width: 1.7em;
          margin-right: 20px;
        }
      }
    }
  }
</style>