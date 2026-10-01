/**
 * فن الحدائق | Garden Art
 * Vanilla JavaScript for modern interactivity
 * Jeddah, Saudi Arabia
 */

document.addEventListener('DOMContentLoaded', () => {
  // Exact single WhatsApp configuration
  const WHATSAPP_RAW_NUMBER = '+966539638956';
  const WHATSAPP_CLEAN_NUMBER = '966539638956';
  const WHATSAPP_DEFAULT_MESSAGE = 'السلام عليكم، أرغب في الاستفسار عن خدمات فن الحدائق والحصول على عرض سعر.';
  const CONTACT_EMAIL = 'yssssddd@gmail.com';

  // Helper to generate the exact WhatsApp URL
  function generateWhatsAppUrl(customMessage) {
    const text = customMessage || WHATSAPP_DEFAULT_MESSAGE;
    return `https://wa.me/${WHATSAPP_CLEAN_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  // Bind all elements with [data-whatsapp-btn] or .whatsapp-dynamic-link
  const whatsappTriggers = document.querySelectorAll('[data-whatsapp-btn], .whatsapp-dynamic-link');
  whatsappTriggers.forEach(btn => {
    btn.setAttribute('href', generateWhatsAppUrl());
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // 1. Sticky Navbar on Scroll
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Mobile Menu (Hamburger)
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    if (hamburger && mobileMenu && mobileOverlay) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (hamburger && mobileMenu && mobileOverlay) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu && mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Smooth Scrolling for Internal Anchor Links with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Highlight Active Navigation Item on Scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 80;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 5. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 6. Gallery Lightbox
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(imgSrc, title, category) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const titleElem = item.querySelector('.gallery-title');
      const catElem = item.querySelector('.gallery-category');

      const imgSrc = img ? img.currentSrc || img.src : '';
      const title = titleElem ? titleElem.textContent.trim() : 'عمل من فن الحدائق';
      const cat = catElem ? catElem.textContent.trim() : 'لاندسكيب';

      openLightbox(imgSrc, title, cat);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });
});
