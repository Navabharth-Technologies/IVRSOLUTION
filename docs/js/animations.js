document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════════
     1. HERO FULL-SECTION CANVAS PARTICLES
     ═══════════════════════════════════════════════════════════ */
  const bgCanvas = document.getElementById('hero-particles-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    if (ctx) {
      let animId;
      
      const resize = () => {
        bgCanvas.width = bgCanvas.offsetWidth;
        bgCanvas.height = bgCanvas.offsetHeight;
      };
      resize();
      window.addEventListener('resize', resize);
      
      const pts = Array.from({ length: 42 }, () => ({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.45 + 0.1,
      }));

      const tick = () => {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        // Draw lines
        pts.forEach((p, i) => {
          pts.slice(i + 1).forEach(q => {
            const d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(108,76,241,${0.06 * (1 - d / 130)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(108,76,241,${p.a})`;
          ctx.fill();
          
          // Move
          p.x += p.vx;
          p.y += p.vy;
          
          // Responsive bounce boundaries logic
          if (p.x < 0) {
            p.x = 0;
            p.vx = Math.abs(p.vx);
          } else if (p.x > bgCanvas.width) {
            p.x = bgCanvas.width;
            p.vx = -Math.abs(p.vx);
          }
          if (p.y < 0) {
            p.y = 0;
            p.vy = Math.abs(p.vy);
          } else if (p.y > bgCanvas.height) {
            p.y = bgCanvas.height;
            p.vy = -Math.abs(p.vy);
          }
        });
        
        animId = requestAnimationFrame(tick);
      };
      
      tick();
    }
  }

  /* ═══════════════════════════════════════════════════════════
     2. GLOBE ORBIT DUST SWIRL CANVAS
     ═══════════════════════════════════════════════════════════ */
  const globeCanvas = document.getElementById('globe-dust-canvas');
  if (globeCanvas) {
    const ctx = globeCanvas.getContext('2d');
    if (ctx) {
      let animId;
      globeCanvas.width = globeCanvas.height = 620;
      const cx = 310, cy = 310, baseR = 230;
      
      const pts = Array.from({ length: 28 }, (_, i) => ({
        angle: (i / 28) * Math.PI * 2,
        r: baseR + (Math.random() - 0.5) * 80,
        speed: 0.0006 + Math.random() * 0.0008,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '108,76,241' : '53,201,255',
      }));

      const tick = () => {
        ctx.clearRect(0, 0, 620, 620);
        
        pts.forEach(p => {
          p.angle += p.speed;
          const x = cx + Math.cos(p.angle) * p.r * 1.05;
          const y = cy + Math.sin(p.angle) * p.r * 0.45;
          
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
          ctx.fill();
        });
        
        animId = requestAnimationFrame(tick);
      };
      
      tick();
    }
  }

  /* ═══════════════════════════════════════════════════════════
     3. HERO INTERACTIVE MOUSE/TOUCH-FOLLOW GLOW (SPRING HOOK REPLACEMENT)
     ═══════════════════════════════════════════════════════════ */
  const hero = document.getElementById('home');
  const mouseGlow = document.querySelector('.hero-mouse-glow');
  
  if (hero && mouseGlow) {
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const updateGlowTarget = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((clientX - rect.left) / rect.width) * 100;
      targetY = ((clientY - rect.top) / rect.height) * 100;
    };

    hero.addEventListener('mousemove', (e) => {
      updateGlowTarget(e.clientX, e.clientY);
    });

    hero.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        updateGlowTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    const interpolateGlow = () => {
      // Damping coefficient maps to React springs
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      
      mouseGlow.style.left = `${currentX}%`;
      mouseGlow.style.top = `${currentY}%`;
      
      requestAnimationFrame(interpolateGlow);
    };
    
    interpolateGlow();
  }

  /* ═══════════════════════════════════════════════════════════
     4. PILLAR CARD LOCAL MOUSE/TOUCH-TRACKING LIGHTS
     ═══════════════════════════════════════════════════════════ */
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach((card) => {
    const tracker = card.querySelector('.mouse-light-tracker');
    const glow = card.querySelector('.mouse-light-glow');
    
    if (tracker && glow) {
      // Read accent color from style
      const accentColor = tracker.getAttribute('data-accent-color') || '#6C4CF1';
      
      const updateCardGlow = (clientX, clientY) => {
        const rect = tracker.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        glow.style.background = `radial-gradient(circle 80px at ${x}% ${y}%, ${accentColor}18 0%, transparent 70%)`;
      };

      tracker.addEventListener('mousemove', (e) => {
        updateCardGlow(e.clientX, e.clientY);
      });

      tracker.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          updateCardGlow(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
      
      tracker.addEventListener('mouseleave', () => {
        glow.style.background = 'none';
      });

      tracker.addEventListener('touchend', () => {
        glow.style.background = 'none';
      });
    }
  });

  /* ═══════════════════════════════════════════════════════════
     5. SCROLL-REVEAL OBSERVATIONAL ANIMATIONS (INTERSECTION OBSERVER)
     ═══════════════════════════════════════════════════════════ */
  // Dynamically assign reveal class to cards and layout groups for motion reveal
  const animTargets = [
    '.pillar-card',
    '.industry-card',
    '.faq-item',
    '.contact-info-single-card'
  ];
  animTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal-fade-up');
    });
  });

  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
  }

});
