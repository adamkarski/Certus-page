// Service data for modal content
const serviceData = {
  warranty: {
    title: "Serwis Gwarancyjny",
    description: "Kompleksowa opieka serwisowa dla wszystkich maszyn CNC w okresie 12 miesięcy od daty dostawy",
    details: [
      { label: "Okres gwarancji", value: "12 miesięcy od dostawy" },
      { label: "Koszt serwisu", value: "BEZPŁATNE", highlight: true },
      { label: "Koszt dojazdu", value: "Bezpłatne do 200 km" },
      { label: "Czas reakcji", value: "Do 5 dni roboczych" }
    ],
    includes: [
      "Wady materiałowe",
      "Błędy produkcyjne", 
      "Awarie z normalnego użytkowania",
      "Oryginalne części zamienne",
      "Raport z wykonanych prac"
    ],
    excludes: [
      "Błędy użytkownika",
      "Zaniedbania konserwacyjne",
      "Eksploatacja niezgodna z przeznaczeniem",
      "Uszkodzenia mechaniczne"
    ]
  },
  
  "post-warranty": {
    title: "Serwis Pogwarancyjny",
    description: "Profesjonalne usługi serwisowe po okresie gwarancji z pełnym wsparciem technicznym",
    details: [
      { label: "Stawka godzinowa", value: "240 zł netto/h", highlight: true },
      { label: "Minimalne rozliczenie", value: "1 godzina" },
      { label: "Czas reakcji", value: "Do 7 dni roboczych" },
      { label: "Koszt dojazdu", value: "2,50 zł netto/km" }
    ],
    includes: [
      "Diagnostyka awarii",
      "Naprawa podzespołów",
      "Wymiana części zamiennych",
      "Testowanie po naprawie",
      "Szczegółowy raport serwisowy",
      "Instrukcja eksploatacji"
    ],
    note: "Koszt dojazdu liczony w obie strony. Części zamienne dodatkowo według cennika."
  },
  
  inspections: {
    title: "Przeglądy Okresowe",
    description: "Regularne przeglądy zapewniające optymalną pracę maszyn i przedłużające ich żywotność",
    details: [
      { label: "Częstotliwość", value: "Co 6 miesięcy lub 1000 roboczogodzin" },
      { label: "Maszyny 3-osiowe standard", value: "1000 zł netto", highlight: true },
      { label: "Maszyny 3-osiowe rozszerzony", value: "1600 zł netto", highlight: true },
      { label: "Maszyny 5-osiowe standard", value: "1400 zł netto", highlight: true },
      { label: "Maszyny 5-osiowe rozszerzony", value: "2200 zł netto", highlight: true }
    ],
    includes: [
      "Diagnostyka wszystkich podzespołów",
      "Kontrola dokładności osi",
      "Sprawdzenie systemów chłodzenia",
      "Kontrola układów smarowania",
      "Kalibracja narzędzi",
      "Raport z rekomendacjami",
      "Plan konserwacji"
    ],
    note: "Przegląd rozszerzony obejmuje dodatkowo wymianę płynów eksploatacyjnych i drobnych części zużywalnych."
  },
  
  additional: {
    title: "Usługi Dodatkowe",
    description: "Dodatkowe usługi wspierające eksploatację maszyn i rozwój zespołu",
    services: [
      {
        name: "Serwis priorytetowy",
        price: "400 zł netto",
        description: "Reakcja do 48 godzin",
        details: "Priorytetowe traktowanie zgłoszenia serwisowego"
      },
      {
        name: "Diagnostyka zdalna",
        price: "100 zł netto",
        description: "Każde rozpoczęte 30 minut",
        details: "Zdalna pomoc techniczna przez internet"
      },
      {
        name: "Szkolenie operatora",
        price: "1200 zł netto/dzień",
        description: "Na miejscu u klienta",
        details: "Kompleksowe szkolenie z obsługi maszyny"
      },
      {
        name: "Instalacja maszyny",
        price: "1500-2500 zł netto",
        description: "Według umowy",
        details: "Profesjonalna instalacja i uruchomienie"
      }
    ]
  }
};

// Modal functionality
function openModal(serviceType) {
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  const service = serviceData[serviceType];
  if (!service) return;
  
  modalTitle.textContent = service.title;
  
  let modalContent = `<p>${service.description}</p>`;
  
  // Add details section
  if (service.details) {
    modalContent += `
      <div class="detail-section">
        <h4>Szczegóły usługi</h4>
        <ul class="detail-list">
    `;
    
    service.details.forEach(detail => {
      const valueClass = detail.highlight ? 'price-highlight' : '';
      modalContent += `
        <li>
          <span>${detail.label}</span>
          <span class="${valueClass}">${detail.value}</span>
        </li>
      `;
    });
    
    modalContent += '</ul></div>';
  }
  
  // Add services section for additional services
  if (service.services) {
    modalContent += `
      <div class="detail-section">
        <h4>Dostępne usługi</h4>
    `;
    
    service.services.forEach(item => {
      modalContent += `
        <div style="margin-bottom: 16px; padding: 16px; background: var(--color-secondary); border-radius: var(--radius-base);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong>${item.name}</strong>
            <span class="price-highlight">${item.price}</span>
          </div>
          <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: 4px;">
            ${item.description}
          </div>
          <div style="font-size: var(--font-size-sm);">
            ${item.details}
          </div>
        </div>
      `;
    });
    
    modalContent += '</div>';
  }
  
  // Add includes section
  if (service.includes) {
    modalContent += `
      <div class="detail-section">
        <h4>W cenie usługi</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
    `;
    
    service.includes.forEach(item => {
      modalContent += `
        <li style="padding: 4px 0; color: var(--color-text);">
          <i class="fas fa-check" style="color: var(--color-success); margin-right: 8px;"></i>
          ${item}
        </li>
      `;
    });
    
    modalContent += '</ul></div>';
  }
  
  // Add excludes section
  if (service.excludes) {
    modalContent += `
      <div class="detail-section">
        <h4>Nie obejmuje gwarancja</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
    `;
    
    service.excludes.forEach(item => {
      modalContent += `
        <li style="padding: 4px 0; color: var(--color-text);">
          <i class="fas fa-times" style="color: var(--color-error); margin-right: 8px;"></i>
          ${item}
        </li>
      `;
    });
    
    modalContent += '</ul></div>';
  }
  
  // Add note if present
  if (service.note) {
    modalContent += `
      <div class="detail-section">
        <div style="padding: 12px; background: var(--color-bg-2); border-radius: var(--radius-base); border-left: 4px solid var(--color-warning);">
          <strong style="color: var(--color-warning);">Uwaga:</strong> ${service.note}
        </div>
      </div>
    `;
  }
  
  modalBody.innerHTML = modalContent;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('serviceModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Phone call function
function makePhoneCall() {
  window.open('tel:+48606324406', '_self');
}

// Form submission handling
function handleFormSubmission(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Basic validation
  const requiredFields = ['company', 'name', 'phone', 'serviceType', 'description'];
  const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
  
  if (missingFields.length > 0) {
    alert('Proszę wypełnić wszystkie wymagane pola.');
    return;
  }
  
  // Phone validation
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
  if (!phoneRegex.test(data.phone)) {
    alert('Proszę podać prawidłowy numer telefonu.');
    return;
  }
  
  // Simulate form submission
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    alert('Dziękujemy za zgłoszenie! Skontaktujemy się z Państwem w ciągu 24 godzin.');
    form.reset();
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Service card animation on scroll
function animateOnScroll() {
  const cards = document.querySelectorAll('.service-card, .benefit-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => observer.observe(card));
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Service card click handlers - fixed to properly map service types
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const serviceBtn = card.querySelector('.service-btn');
    const serviceType = card.getAttribute('data-service');
    
    console.log('Setting up card for service:', serviceType); // Debug log
    
    // Card click handler
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking the button directly
      if (!e.target.classList.contains('service-btn') && !e.target.closest('.service-btn')) {
        e.preventDefault();
        e.stopPropagation();
        openModal(serviceType);
      }
    });
    
    // Button click handler
    if (serviceBtn) {
      serviceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(serviceType);
      });
    }
  });
  
  // Hero button handlers - fixed navigation
  const heroCallButton = document.querySelector('.hero-actions .btn--primary');
  const heroServicesButton = document.querySelector('.hero-actions .btn--outline');
  
  if (heroCallButton) {
    heroCallButton.addEventListener('click', (e) => {
      e.preventDefault();
      makePhoneCall();
    });
  }
  
  if (heroServicesButton) {
    heroServicesButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('services');
    });
  }
  
  // Header call button
  const headerCallButton = document.querySelector('.nav-contact .phone');
  if (headerCallButton) {
    headerCallButton.addEventListener('click', (e) => {
      e.preventDefault();
      makePhoneCall();
    });
    headerCallButton.style.cursor = 'pointer';
  }
  
  // Form submission
  const form = document.getElementById('serviceForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmission);
  }
  
  // Fix dropdown functionality
  const serviceTypeSelect = document.querySelector('select[name="serviceType"]');
  if (serviceTypeSelect) {
    // Ensure dropdown is properly styled and functional
    serviceTypeSelect.style.cursor = 'pointer';
    
    serviceTypeSelect.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    serviceTypeSelect.addEventListener('focus', (e) => {
      e.target.style.borderColor = 'var(--color-primary)';
    });
    
    serviceTypeSelect.addEventListener('blur', (e) => {
      e.target.style.borderColor = 'var(--color-border)';
    });
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Initialize scroll animations
  animateOnScroll();
  
  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  
  if (header) {
    header.style.transition = 'transform 0.3s ease-in-out';
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
});

// Contact section animation
function highlightContactInfo() {
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transform = 'scale(1.05)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 200);
    }, index * 100);
  });
}

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Utility function for phone number formatting
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.startsWith('48')) {
    value = '+' + value;
  } else if (value.startsWith('0')) {
    value = '+48 ' + value.substring(1);
  } else if (!value.startsWith('+')) {
    value = '+48 ' + value;
  }
  
  input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
  const phoneInputs = document.querySelectorAll('input[name="phone"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhoneNumber(input));
    input.addEventListener('blur', () => formatPhoneNumber(input));
  });
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
});

// Remove any blue circle artifacts and clean up focus styles
document.addEventListener('DOMContentLoaded', function() {
  // Remove any stray focus rings or artifacts
  document.addEventListener('click', (e) => {
    // Clear any persistent focus states
    setTimeout(() => {
      document.querySelectorAll(':focus').forEach(el => {
        if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT') {
          el.blur();
        }
      });
    }, 100);
  });
});

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Remove any unwanted focus artifacts */
  button:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Ensure dropdowns work properly */
  select {
    position: relative;
    z-index: 1;
  }
`;
document.head.appendChild(style);