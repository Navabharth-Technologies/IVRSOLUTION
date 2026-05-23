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
          
          // Bounce
          if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;
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
     3. HERO INTERACTIVE MOUSE-FOLLOW GLOW (SPRING HOOK REPLACEMENT)
     ═══════════════════════════════════════════════════════════ */
  const hero = document.getElementById('home');
  const mouseGlow = document.querySelector('.hero-mouse-glow');
  
  if (hero && mouseGlow) {
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    });

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
     4. PILLAR CARD LOCAL MOUSE-TRACKING LIGHTS
     ═══════════════════════════════════════════════════════════ */
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach((card) => {
    const tracker = card.querySelector('.mouse-light-tracker');
    const glow = card.querySelector('.mouse-light-glow');
    
    if (tracker && glow) {
      // Read accent color from style
      const accentColor = tracker.getAttribute('data-accent-color') || '#6C4CF1';
      
      tracker.addEventListener('mousemove', (e) => {
        const rect = tracker.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        glow.style.background = `radial-gradient(circle 80px at ${x}% ${y}%, ${accentColor}18 0%, transparent 70%)`;
      });
      
      tracker.addEventListener('mouseleave', () => {
        glow.style.background = 'none';
      });
    }
  });

});
