<script>
    export let src;
    export let alt = ""; // tekst alternatywny dla obrazka
    export let size = 300;     // średnica w px
    export let border = 10;    // grubość ramki
    export let opacity = 0.3;  // przezroczystość ramki
  </script>
  
  <style>
    .circle-frame {
      position: relative;
      border-radius: 50%;
      overflow: hidden;
    }
  
    .circle-frame::before {
      content: "";
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
    }
  
    .circle-frame img {
      position: absolute;
      object-fit: cover;
      border-radius: 50%;
    }
  </style>
  
  <div
    class="circle-frame"
    style="
      width:{size}px;
      height:{size}px;
    "
  >
    <!-- ramka -->
    <div
      style="
        position:absolute;
        inset:0;
        background-image:url('{src}');
        background-size:cover;
        background-position:center;
        opacity:{opacity};
      "
    ></div>
  
    <!-- środek -->
    <img
      src="{src}"
      alt="{alt}"
      style="
        inset:{border}px;
        width:calc(100% - {border * 2}px);
        height:calc(100% - {border * 2}px);
      "
    />
  </div>