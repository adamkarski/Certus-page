<script lang="ts">
</script>

<section class="Reklamacje_page gradientHero">
  <!--  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div> -->
</section>
<section id="Reklamacje" class="Reklamacje">
  <div class="Reklamacje-container container">
    <div class="section-header">
      <h1 class="no-sel">Reklamacje</h1>
      <hr />
    </div>
  </div>

  <span class="triangle"></span>
</section>

<style lang="scss">
  .Reklamacje-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .Reklamacje {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }



  @media (max-width: 800px) {
     .triangle {
      &::after {
        clip-path: polygon(0 0, 40% 0, 60% 101%, 0% 100%) !important;
      }
    }
  }

  @media (max-width: 500px) {
     .triangle {
      &::after {
        clip-path: polygon(0 0, 20% 0, 40% 101%, 0% 100%) !important;
      }
    }
  }



  @media (max-width: 768px) {
    .Reklamacje {
      padding: 80px 0;
    }
  }
  #Reklamacje {
    overflow: hidden;
    background-color: #ffffff;
    min-height: 50vh;
    &::before {
      content: "";
      position: absolute;
      top: 220px;
      left: 0px;
      width: 100%;
      height: 50px;
      background-image: url(/assets/images/pattern-image1-2.png);
    }
  }
  .triangle {
    position: absolute;
    width: 400px;
    height: 100px;
    top: 160px;
    left: 0;
    z-index: 1; // Ensure it's above other content if needed

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 55px;
      background: #ffffff;
      clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
    }
  }

  .Reklamacje-container {
    overflow: hidden;
    width: 100%;
    padding: 0 9rem;
  }

  .pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    z-index: 2;
    pointer-events: none;
    opacity: 0.3;

    .pattern.two {
      transform: scale(1.2) skew(-15deg, 0deg);
      background-image: url(/assets/images/pattern-image1-2.png);
      position: absolute;
      width: 100%;
      height: 63px;
      z-index: 11;
      left: 0;
      bottom: -10px;
      pointer-events: auto;
    }
  }

  .Reklamacje_page {
    min-width: 100vw;
    margin: 0 auto;
    height: 260px;
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
  .Reklamacje {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
    color: var(--color-text-secondary);
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    .Reklamacje {
      padding: 80px 0;
    }
  }
</style>
