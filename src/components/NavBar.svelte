<script lang="ts">
	import Navb from './navb.svelte';
 
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
  <img class="rectangle-81" src="/assets/menu_back.png" />
  <div class="isolation_mode">
    <img class="" src="/assets/ikony/telefon.svg" />
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

  :global(.lottie-player .animation svg > g > g:nth-child(5)) {
    // g > g:nth-child(3) > g > g:nth-child(6)
    opacity: 0;
  }

  .ramka {
    width: 1380px;
    height: 90px;
    left: 0px;
    top: 0px;
    position: absolute;
    opacity: 0.13;
    background: #bebebe;
    border-radius: 70px;
  
    

  }

  .vector {
    width: 31px;
    height: 36.27px;
    left: 0px;
    top: 0.73px;
    position: absolute;
    background: white;
    box-shadow: 0px 4px 4.300000190734863px rgba(0, 0, 0, 0.25);
  }

  .vector_01 {
    width: 16.65px;
    height: 26.13px;
    left: 5.24px;
    top: 0px;
    position: absolute;
    background: #bcd000;
  }

  .f95142656_span {
    color: #eeeeee;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 700;
    line-height: 24px;
    word-wrap: break-word;
  }

  .text-795-142-656 {
    left: 1190px;
    top: 35px;
    position: absolute;
    width: 200px
  }

  .rectangle-16 {
    width: 535.87px;
    height: 60px;
    left: 634px;
    top: 15px;
    position: absolute;
    background: #fefeff;
    border-radius: 40px;
  }

  .onas_span {
    color: #615d5d;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 19.2px;
    word-wrap: break-word;
  }

  .o-nas {
    width: 47.7px;
    left: 1018.65px;
    top: 37px;
    position: absolute;
  }

  .rectangle-53 {
    width: 136px;
    height: 51px;
    left: 640.09px;
    top: 20px;
    position: absolute;
    border-radius: 24px;
  }

  .maszyny_span {
    color: #615d5d;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 19.2px;
    word-wrap: break-word;
  }

  .maszyny {
    width: 70.03px;
    left: 672.57px;
    top: 37px;
    position: absolute;
  }

  .brane_span {
    color: #615d5d;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 19.2px;
    word-wrap: break-word;
  }

  .brane {
    width: 55.82px;
    left: 797.4px;
    top: 37px;
    position: absolute;
  }

  .serwis_span {
    color: #615d5d;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 19.2px;
    word-wrap: break-word;
  }

  .serwis {
    width: 55.82px;
    left: 908.02px;
    top: 37px;
    position: absolute;
  }

  .vector_02 {
    width: 19.28px;
    height: 19px;
    left: 2.03px;
    top: 2px;
    position: absolute;
    outline: 2px #615d5d solid;
    outline-offset: -1px;
  }

  .vector_03 {
    width: 2.03px;
    height: 2px;
    left: 20.3px;
    top: 20px;
    position: absolute;
    outline: 2px #615d5d solid;
    outline-offset: -1px;
  }

  .vector_04 {
    width: 24.36px;
    height: 24px;
    left: 0px;
    top: 0px;
    position: absolute;
    opacity: 0;
  }

  .isolation_mode {
    width: 31px;
    height: 37px;
    left: 1351px;
    top: 64px;
    position: absolute;
    transform: rotate(180deg);
    transform-origin: top left;
    overflow: hidden;
  }

  .vuesaxlinearsearch-normal {
    width: 24.36px;
    height: 24px;
    left: 1121.15px;
    top: 33px;
    position: absolute;
  }

  .logo-certus {
    width: 300px;
    height: 61px;
    left: 14px;
    top: 15px;
    position: absolute;
    overflow: hidden;
  }

  .rectangle-81 {
    width: 355px;
    height: 60px;
    left: 1009px;
    top: 15px;
    position: absolute;
    background: linear-gradient(
      0deg,
      rgba(82.01, 81.12, 81.12, 0.66) 0%,
      rgba(82.01, 81.12, 81.12, 0.66) 100%
    );
    border-radius: 41px;
  }

  .navbar {
    width: 1380px;
    height: 90px;
    position: relative;
    transition: background-color 0.3s ease-in-out;

    a:focus {
      outline: none;
      outline-offset: 0px;
    }
  }

  .navbar.scrolled {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>
