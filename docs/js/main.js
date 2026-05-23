document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════════
     HEADER & SCROLLSPY LOGIC
     ═══════════════════════════════════════════════════════════ */
  const header = document.querySelector('.nbt-header');
  const navPills = document.querySelectorAll('.nbt-nav-pill');
  const sections = document.querySelectorAll('section');
  const indicator = document.querySelector('.nav-indicator-bar');
  
  // Update header scroll background
  const handleHeaderScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Position indicator bar under active nav link (Framer Motion replacement)
  const positionIndicator = (activePill) => {
    if (!activePill || !indicator) return;
    const parentRect = activePill.parentElement.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();
    
    indicator.style.left = `${pillRect.left - parentRect.left}px`;
    indicator.style.width = `${pillRect.width}px`;
  };

  // Scrollspy logic
  const handleScrollspy = () => {
    const threshold = window.innerHeight * 0.3; // 30% of viewport
    let activeSectionId = 'home';
    
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= threshold) {
        activeSectionId = sec.id;
      }
    });

    // Handle mapping FAQ/Contact naming differences
    let targetLinkName = activeSectionId;
    if (targetLinkName === 'faq') targetLinkName = "faq's";
    
    navPills.forEach(pill => {
      const pillName = pill.textContent.trim().toLowerCase();
      if (pillName === targetLinkName.toLowerCase() || 
          (targetLinkName === 'home' && pillName === 'home') ||
          (targetLinkName === "faq's" && pillName === "faq's")) {
        navPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        positionIndicator(pill);
      }
    });
  };

  window.addEventListener('scroll', handleScrollspy, { passive: true });
  window.addEventListener('resize', () => {
    handleScrollspy();
    const activePill = document.querySelector('.nbt-nav-pill.active');
    if (activePill) positionIndicator(activePill);
  });
  
  // Initial position trigger
  setTimeout(() => {
    handleScrollspy();
  }, 100);

  // Click navigation override
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      navPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      positionIndicator(pill);
    });
  });

  /* ═══════════════════════════════════════════════════════════
     MOBILE MENU TOGGLE
     ═══════════════════════════════════════════════════════════ */
  const mobileToggle = document.querySelector('.nbt-mobile-toggle');
  const mobileMenu = document.querySelector('.nbt-mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      
      // Update toggle icon between Menu and X
      if (mobileMenu.classList.contains('open')) {
        mobileToggle.innerHTML = '<i data-lucide="x" style="width: 28px; height: 28px;"></i>';
      } else {
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width: 28px; height: 28px;"></i>';
      }
      lucide.createIcons();
    });

    // Close menu when clicking outside or clicking a link
    document.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width: 28px; height: 28px;"></i>';
        lucide.createIcons();
      }
    });

    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width: 28px; height: 28px;"></i>';
        lucide.createIcons();
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     DRAGGABLE & AUTO FEATURE SLIDER CAROUSEL
     ═══════════════════════════════════════════════════════════ */
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.feature-card');
  
  if (track && cards.length > 0) {
    let activeIndex = 0;
    let isPaused = false;
    let windowWidth = window.innerWidth;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let dragOffset = 0;
    let autoScrollTimer = null;

    const getLayoutConfig = () => {
      const isMobile = window.innerWidth < 768;
      return {
        cardWidth: isMobile ? 310 : 380,
        gap: isMobile ? 16 : 28
      };
    };

    // Calculate position mathematically to center the card
    const calculateTrackX = (idx) => {
      const config = getLayoutConfig();
      const centerOffset = (window.innerWidth / 2) - (config.cardWidth / 2);
      return centerOffset - (idx * (config.cardWidth + config.gap));
    };

    const updateSlider = (withTransition = true) => {
      // Bounds checks
      if (activeIndex < 0) activeIndex = 0;
      if (activeIndex >= cards.length) activeIndex = cards.length - 1;

      // Update card states classes
      cards.forEach((card, idx) => {
        if (idx === activeIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Position track
      const baseTrackX = calculateTrackX(activeIndex);
      if (withTransition) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = `translateX(${baseTrackX + dragOffset}px)`;
    };

    // Handle Drag start
    const handleDragStart = (clientX) => {
      isDragging = true;
      startX = clientX;
      dragOffset = 0;
      track.style.transition = 'none';
      isPaused = true;
    };

    // Handle Drag move
    const handleDragMove = (clientX) => {
      if (!isDragging) return;
      currentX = clientX;
      dragOffset = currentX - startX;
      
      // Update slider layout live without transition
      updateSlider(false);
    };

    // Handle Drag end
    const handleDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      isPaused = false;
      
      const swipeThreshold = 50;
      if (dragOffset < -swipeThreshold) {
        // Next
        activeIndex = (activeIndex + 1) % cards.length;
      } else if (dragOffset > swipeThreshold) {
        // Prev
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      }
      
      dragOffset = 0;
      updateSlider(true);
    };

    // Mouse events
    track.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) handleDragMove(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      handleDragEnd();
    });

    // Touch events
    track.addEventListener('touchstart', (e) => {
      handleDragStart(e.touches[0].clientX);
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      if (isDragging) handleDragMove(e.touches[0].clientX);
    }, { passive: true });
    track.addEventListener('touchend', () => {
      handleDragEnd();
    });

    // Pause/Resume on hover
    const viewport = document.querySelector('.carousel-viewport');
    viewport.addEventListener('mouseenter', () => {
      isPaused = true;
      track.classList.add('hovered-elsewhere');
    });
    viewport.addEventListener('mouseleave', () => {
      isPaused = false;
      track.classList.remove('hovered-elsewhere');
    });

    // Set Hovered states per card
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.style.opacity = '0.45');
        card.style.opacity = '1';
      });
      card.addEventListener('mouseleave', () => {
        cards.forEach((c, idx) => {
          c.style.opacity = idx === activeIndex ? '1' : '0.6';
        });
      });
      card.addEventListener('click', () => {
        const indexStr = card.id.replace('feature-step-', '');
        activeIndex = parseInt(indexStr);
        updateSlider(true);
      });
    });

    // Auto timelines scroll loop
    const startAutoScroll = () => {
      autoScrollTimer = setInterval(() => {
        if (!isPaused && !isDragging) {
          activeIndex = (activeIndex + 1) % cards.length;
          updateSlider(true);
        }
      }, 4500);
    };
    startAutoScroll();

    // Trigger initial positioning
    window.addEventListener('resize', () => {
      windowWidth = window.innerWidth;
      updateSlider(false);
    });
    updateSlider(false);
  }

  /* ═══════════════════════════════════════════════════════════
     FAQ ACCORDION
     ═══════════════════════════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-header');
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close other items
      faqItems.forEach(i => i.classList.remove('open'));
      
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });



  /* ═══════════════════════════════════════════════════════════
     RIPPLE CLICK & GLOW ON FLOATING CARDS
     ═══════════════════════════════════════════════════════════ */
  const floatCards = document.querySelectorAll('.floating-card');
  floatCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add ripple span
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x - 10}px`;
      ripple.style.top = `${y - 10}px`;
      
      // Grab card hover/accent color
      const customColor = card.style.borderColor || 'rgba(108,76,241,0.2)';
      const cleanColor = customColor.replace('rgba', 'rgb').replace(',0.2', '').replace('0.6', '');
      ripple.style.background = cleanColor.includes('rgb') ? cleanColor.replace('rgb', 'rgba').replace(')', ', 0.35)') : 'rgba(108,76,241,0.3)';

      // Trigger animation
      ripple.style.animation = 'ripple-effect 0.75s ease-out forwards';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 750);

      // Trigger breathing pulse
      card.classList.add('clicked');
      card.style.animation = 'clickPulse 1.4s ease-out';
      setTimeout(() => {
        card.classList.remove('clicked');
        card.style.animation = '';
      }, 1400);
    });
  });

});
