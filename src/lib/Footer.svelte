<script lang="ts">
  const footerLinks = {
    produkty: [
      { label: "Frezarki CNC", href: "#" },
      { label: "Centra Obróbkowe", href: "#" },
      { label: "Systemy CAM", href: "#" },
      { label: "Oprogramowanie", href: "#" }
    ],
    uslugi: [
      { label: "Serwis", href: "#" },
      { label: "Szkolenia", href: "#" },
      { label: "Konsultacje", href: "#" },
      { label: "Wsparcie techniczne", href: "#" }
    ],
    firma: [
      { label: "O nas", href: "#" },
      { label: "Kariera", href: "#" },
      { label: "Aktualności", href: "#" },
      { label: "Kontakt", href: "#" }
    ]
  };
  
  const socialLinks = [
    { 
      name: "LinkedIn", 
      href: "#", 
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" 
    },
    { 
      name: "Facebook", 
      href: "#", 
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
    },
    { 
      name: "YouTube", 
      href: "#", 
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
    }
  ];
</script>

<footer class="bg-primary-900 text-white">
  <div class="container-custom">
    <!-- Main Footer -->
    <div class="py-20 border-b border-primary-800">
      <div class="grid lg:grid-cols-4 gap-12">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-8-5zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold">certus</div>
              <div class="text-base text-primary-300">Precision Technology</div>
            </div>
          </div>
          
          <p class="text-primary-100 mb-8 leading-relaxed text-lg">
            Lider w dziedzinie precyzyjnych rozwiązań CNC. Innowacyjne technologie dla przemysłu wysokich technologii.
          </p>
          
          <div class="flex space-x-4">
            {#each socialLinks as social}
              <a 
                href={social.href} 
                class="w-12 h-12 bg-primary-800 hover:bg-white hover:text-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label={social.name}
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon}/>
                </svg>
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Products Links -->
        <div>
          <h3 class="text-xl font-bold mb-8">Produkty</h3>
          <ul class="space-y-4">
            {#each footerLinks.produkty as link}
              <li>
                <a href={link.href} class="text-primary-200 hover:text-white transition-colors duration-200 text-lg">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Services Links -->
        <div>
          <h3 class="text-xl font-bold mb-8">Usługi</h3>
          <ul class="space-y-4">
            {#each footerLinks.uslugi as link}
              <li>
                <a href={link.href} class="text-primary-200 hover:text-white transition-colors duration-200 text-lg">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Company Links -->
        <div>
          <h3 class="text-xl font-bold mb-8">Firma</h3>
          <ul class="space-y-4">
            {#each footerLinks.firma as link}
              <li>
                <a href={link.href} class="text-primary-200 hover:text-white transition-colors duration-200 text-lg">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Bottom Footer -->
    <div class="py-10">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-primary-300 text-base">
          © 2024 certus. Wszystkie prawa zastrzeżone.
        </p>
        
        <div class="flex space-x-8 text-base">
          <a href="#" class="text-primary-300 hover:text-white transition-colors duration-200">
            Polityka prywatności
          </a>
          <a href="#" class="text-primary-300 hover:text-white transition-colors duration-200">
            Regulamin
          </a>
          <a href="#" class="text-primary-300 hover:text-white transition-colors duration-200">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>