<script lang="ts">

 
  import { onMount } from "svelte";
  import { preloaderVisible } from '$lib/preloaderStore';
  let LottiePlayer;

  let scrolled = false;
  let showLottie = false;

  onMount(async () => {
    // Dynamiczny import LottiePlayer
    const module = await import("@lottiefiles/svelte-lottie-player");
    LottiePlayer = module.LottiePlayer;

    // Obsługa scrolla
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Nasłuchuj na zmianę preloadera
    const unsubscribe = preloaderVisible.subscribe((visible) => {
      if (!visible) {
        showLottie = false;
        setTimeout(() => {
          showLottie = true; // wymuś ponowne renderowanie animacji
        }, 0);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  });
</script>





<Navb/>



<div class="navbar no-sel" class:scrolled={scrolled}>
  <!-- 
    <div class="logo">
        <span class="logo-text">FINANCER</span>
      </div> -->






  <div class="ramka">
  <!--  <img class="rectangle-80" src="" /> -->
  <img class="rectangle-81" src="/assets/menu_back.png" alt="Tło menu nawigacyjnego" />
  <div class="isolation_mode">
    <img class="" src="/assets/ikony/telefon.svg" alt="Ikona telefonu" />
  </div>
  <div class="text-795-142-656">
    <span class="f95142656_span">795 142 656</span>
  </div>
  <div class="rectangle-16"></div>
  <a class="o-nas" href="/onas"><span class="onas_span">O nas</span></a>
  <div class="rectangle-53"></div>
  <a class="maszyny" href="/maszyny"
    ><span class="maszyny_span">Maszyny</span></a
  >
  <div class="brane"><span class="brane_span">Branże</span></div>
  <div class="serwis"><span class="serwis_span">Serwis</span></div>
  <div class="vuesaxlinearsearch-normal">
      <img src="/assets/search.svg" alt="Wyszukaj na stronie certus.pl" />
  </div>
  <div class="logo-certus">
    <a href="/">
     
      {#if showLottie && LottiePlayer}
        <svelte:component this={LottiePlayer}
          src="https://cdn.lottielab.com/l/7A9mq1tJRKvSyz.json?" + Math.random()
          autoplay={true}
          loop={false}
          controls={false}
        />
      {/if}
    </a>
  </div>
</div>
</div>
<style lang="scss">


.navbar {



}

  

  

  
</style>
