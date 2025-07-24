<script lang="ts">
  import { typoFix } from '$lib/utils/typography';
</script>

<section class="reklamacje_page gradientHero">
  <div class="first-container-back"></div>
  <div class="pattern-overlay no-sel s"><div class="pattern two"></div></div>
</section>

<section id="reklamacje" class="reklamacje">
  <div class="reklamacje-container container">
    <div class="section-header">
      <h1 class="no-sel">Reklamacje</h1>
      <hr />
    </div>
    <p>{@html typoFix("Reklamacje i zwroty w firmie Certus.")}</p>
  </div>
</section>

<style lang="scss">
  .reklamacje-container {
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

  .reklamacje_page {
    min-width: 100vw;
    margin: 0 auto;

    min-height: 20vh;

 
  }

  .first-container-back {
    background-image: url(/assets/first-block-polyline.svg);
    position: absolute;
    top: 209px;
    width: 100%;
    height: 44px;
    background-repeat: no-repeat;
    background-position-x: -1500px;
    background-size: cover;
  }
  .reklamacje {
    width: 100%;
    padding: 100px 0;
    background: #f7f7f7;
  }

  .section-header {
    margin-bottom: 80px;
  }

  @media (max-width: 768px) {
    .reklamacje {
      padding: 80px 0;
    }
  }
</style>
