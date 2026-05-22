import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimation,
  AnimatePresence,
} from 'framer-motion';
import {
  PhoneCall, BarChart3, Layers, Network, Zap,
  Volume2, Users, Cloud, Phone,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   RIPPLE HOOK
═══════════════════════════════════════════════════════════ */
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 750);
  }, []);
  return { ripples, addRipple };
}

/* ═══════════════════════════════════════════════════════════
   FULL-SECTION PARTICLE CANVAS
═══════════════════════════════════════════════════════════ */
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 42 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.45 + 0.1,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        pts.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(108,76,241,${0.06 * (1 - d / 130)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,76,241,${p.a})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.55 }} />;
};

/* ═══════════════════════════════════════════════════════════
   GLOBE ORBIT PARTICLE CANVAS — swirling dust around globe
═══════════════════════════════════════════════════════════ */
const GlobeParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    canvas.width = canvas.height = 620;
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
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} width={620} height={620} style={{ position: 'absolute', width: '620px', height: '620px', pointerEvents: 'none', zIndex: 3 }} />;
};

/* ═══════════════════════════════════════════════════════════
   SVG NETWORKING LINES — animated paths around globe
═══════════════════════════════════════════════════════════ */
const NetworkingLines: React.FC<{ active: boolean; clicked: boolean }> = ({ active, clicked }) => {
  const baseOpacity = active ? 0.7 : 0.35;
  const clickOpacity = clicked ? 1 : baseOpacity;

  // Arc paths defined as SVG cubic bezier curves, all relative to a 620×620 viewBox
  const arcs = [
    { d: 'M 90,180 C 180,80 440,80 530,200',    color: '#6C4CF1', dur: 3.2, delay: 0    },
    { d: 'M 100,380 C 180,480 440,480 520,360',  color: '#35C9FF', dur: 4.0, delay: 0.6 },
    { d: 'M 60,280 C 120,160 500,160 560,280',   color: '#6C4CF1', dur: 5.0, delay: 1.2 },
    { d: 'M 80,320 C 140,440 480,440 540,320',   color: '#35C9FF', dur: 3.6, delay: 0.3 },
    { d: 'M 200,80 C 240,30 380,30 420,80',      color: '#7C3AED', dur: 4.4, delay: 0.9 },
    { d: 'M 200,540 C 240,590 380,590 420,540',  color: '#7C3AED', dur: 4.8, delay: 1.5 },
    { d: 'M 130,140 C 220,60 400,60 490,140',    color: '#35C9FF', dur: 3.8, delay: 0.5 },
    { d: 'M 130,480 C 220,560 400,560 490,480',  color: '#6C4CF1', dur: 4.2, delay: 1.1 },
  ];

  const dashLen = 18;
  const gapLen  = 120;

  return (
    <svg
      viewBox="0 0 620 620"
      width="620" height="620"
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 4, opacity: clickOpacity, transition: 'opacity 0.5s ease' }}
    >
      <defs>
        {arcs.map((_, i) => (
          <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
      </defs>
      {arcs.map((a, i) => (
        <g key={i}>
          {/* Static dim path */}
          <path d={a.d} fill="none" stroke={a.color} strokeWidth="0.6" strokeOpacity={active ? 0.25 : 0.12} />
          {/* Animated moving dash */}
          <path
            d={a.d} fill="none" stroke={a.color}
            strokeWidth={clicked ? 2.2 : 1.4}
            strokeOpacity={clicked ? 0.95 : 0.7}
            strokeDasharray={`${dashLen} ${gapLen}`}
            filter={`url(#glow${i})`}
            style={{
              animationName: `dash${i}`,
              animationDuration: `${a.dur}s`,
              animationDelay: `${a.delay}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          />
          {/* Animated dot at head of dash */}
          <circle r={clicked ? 3 : 2} fill={a.color} fillOpacity={0.9} filter={`url(#glow${i})`}
            style={{
              animationName: `dot${i}`,
              animationDuration: `${a.dur}s`,
              animationDelay: `${a.delay}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              offsetPath: `path("${a.d}")`,
              offsetDistance: '0%',
            } as any}
          />
        </g>
      ))}
      <style>{`
        ${arcs.map((_, i) => `
          @keyframes dash${i} { to { stroke-dashoffset: ${-(dashLen + gapLen)}px; } }
          @keyframes dot${i}  { from { offset-distance: 0%; } to { offset-distance: 100%; } }
          path:nth-child(${i * 3 + 3}) { stroke-dashoffset: ${i * 18}px; }
        `).join('')}
      `}</style>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   GLOBE VISUAL — interactive globe with all enhancements
═══════════════════════════════════════════════════════════ */
const GlobeVisual: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  // Slow continuous full rotation — 60 s per revolution, linear like a real globe
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 60, repeat: Infinity, ease: 'linear' },
    });
  }, [controls]);

  const glowScale = hovered ? 1.22 : 1;
  const glowOpacity = hovered ? 1 : 0.6;

  return (
    <div
      style={{ position: 'absolute', width: '620px', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Globe orbit particles */}
      <GlobeParticles />

      {/* Networking SVG arcs */}
      <NetworkingLines active={hovered} clicked={false} />

      {/* Neon ambient glow — breathes + intensifies on hover */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(53,201,255,0.14) 0%, rgba(108,76,241,0.10) 50%, transparent 80%)',
          filter: `blur(${hovered ? 30 : 40}px)`,
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          transition: 'filter 0.5s, opacity 0.5s, transform 0.5s',
          zIndex: 0, pointerEvents: 'none',
        }}
      />

      {/* Secondary deeper glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,76,241,0.08) 0%, rgba(53,201,255,0.04) 60%, transparent 80%)',
          filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
        }}
      />

      {/* Globe image */}
      <motion.div
        animate={controls}
        whileHover={{ scale: 1.045 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          position: 'absolute', width: '600px', height: '600px',
          backgroundImage: `url('${import.meta.env.BASE_URL}hero_globe_bg.png')`,
          backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          borderRadius: '50%', zIndex: 2,
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 78%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 78%)',
          filter: hovered ? 'brightness(1.08) saturate(1.1)' : 'brightness(1) saturate(1)',
          transition: 'filter 0.5s ease',
        }}
      />

      {/* Inner orbit ring — animates on hover */}
      <motion.div
        animate={{
          scale: hovered ? [1, 1.04, 1] : [1, 1.06, 1],
          opacity: hovered ? [0.5, 0.8, 0.5] : [0.25, 0.5, 0.25],
          rotate: hovered ? [0, 360] : 0,
        }}
        transition={{
          scale:   { duration: 3,  repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 3,  repeat: Infinity, ease: 'easeInOut' },
          rotate:  { duration: 18, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          position: 'absolute', width: '520px', height: '520px', borderRadius: '50%',
          border: `1px solid rgba(108,76,241,${hovered ? 0.45 : 0.2})`,
          transition: 'border-color 0.5s',
          zIndex: 5, pointerEvents: 'none',
        }}
      />

      {/* Outer orbit ring */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -360],
        }}
        transition={{
          scale:   { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          opacity: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          rotate:  { duration: 22, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          position: 'absolute', width: '590px', height: '590px', borderRadius: '50%',
          border: `1px solid rgba(53,201,255,${hovered ? 0.35 : 0.15})`,
          transition: 'border-color 0.5s',
          zIndex: 5, pointerEvents: 'none',
        }}
      />

      {/* Rotating light streak */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: '650px', height: '650px', borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 82%, rgba(53,201,255,0.08) 90%, rgba(108,76,241,0.06) 93%, transparent 97%)',
          zIndex: 6, pointerEvents: 'none',
        }}
      />

      {/* Counter-rotating streak */}
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: '610px', height: '610px', borderRadius: '50%',
          background: 'conic-gradient(from 120deg, transparent 88%, rgba(108,76,241,0.05) 93%, transparent 97%)',
          zIndex: 6, pointerEvents: 'none',
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   FLOATING FEATURE CARD — orbital float + glassmorphism hover
═══════════════════════════════════════════════════════════ */
const FloatingCard = ({ icon: Icon, color, bg, title, subtitle, style, delay = 0 }: any) => {
  const [hovered, setHovered]   = useState(false);
  const [clicked, setClicked]   = useState(false);
  const { ripples, addRipple }  = useRipple();

  // Independent float amplitude and timing
  const amplitude  = 7 + (delay % 3) * 2;
  const floatDur   = 4.2 + delay * 0.4;
  const orbitDrift = delay % 2 === 0 ? [0, 3, -3, 0] : [0, -3, 3, 0];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    addRipple(e);
    setClicked(true);
    setTimeout(() => setClicked(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 24 }}
      animate={{
        opacity: 1, scale: 1,
        y: [0, -amplitude, 0],
        x: orbitDrift,
      }}
      transition={{
        opacity: { delay: 0.55 + delay * 0.14, duration: 0.5, ease: 'easeOut' },
        scale:   { delay: 0.55 + delay * 0.14, duration: 0.5, type: 'spring', stiffness: 180 },
        y: { duration: floatDur,       repeat: Infinity, ease: 'easeInOut', delay: delay * 0.25 },
        x: { duration: floatDur * 1.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.2  },
      }}
      whileHover={{ scale: 1.09, zIndex: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      style={{
        position: 'absolute',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: hovered ? 'rgba(255,255,255,0.98)' : clicked ? `rgba(255,255,255,0.95)` : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(22px)',
        border: hovered
          ? `1px solid ${color}66`
          : clicked
            ? `1px solid ${color}88`
            : '1px solid rgba(255,255,255,0.7)',
        borderRadius: '1.25rem',
        padding: '0.75rem 1.25rem',
        boxShadow: hovered
          ? `0 22px 55px ${color}28, 0 0 0 1.5px ${color}22, 0 6px 20px rgba(0,0,0,0.07)`
          : clicked
            ? `0 0 0 3px ${color}33, 0 12px 40px ${color}22, 0 4px 15px rgba(0,0,0,0.05)`
            : '0 8px 30px rgba(108,76,241,0.06), 0 2px 10px rgba(0,0,0,0.03)',
        zIndex: hovered ? 20 : 10,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.3s, border 0.3s, box-shadow 0.35s',
        width: 'max-content',
        ...style,
      }}
    >
      {/* Gradient shimmer overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '1.25rem',
              background: `linear-gradient(135deg, ${color}18 0%, transparent 55%, ${color}0a 100%)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Pulsing glow ring on click */}
      {clicked && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '1.25rem',
            border: `2px solid ${color}`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Ripple elements */}
      {ripples.map(rp => (
        <motion.span key={rp.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 7, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: rp.x - 10, top: rp.y - 10,
            width: 20, height: 20, borderRadius: '50%',
            background: `${color}44`, pointerEvents: 'none',
          }}
        />
      ))}

      {/* Icon box */}
      <motion.div
        animate={
          hovered  ? { rotate: [0, -10, 10, 0], scale: 1.18 } :
          clicked  ? { scale: [1, 1.3, 1] } :
                     { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.45 }}
        style={{
          width: '36px', height: '36px', borderRadius: '0.75rem',
          background: bg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color, flexShrink: 0,
          boxShadow: hovered ? `0 6px 20px ${color}55` : clicked ? `0 4px 14px ${color}44` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <Icon size={18} />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontWeight: 700, fontSize: '0.86rem', color: '#121A46' }}>{title}</span>
        <span style={{ fontWeight: 500, fontSize: '0.72rem', color: '#6E7191' }}>{subtitle}</span>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   GLOWING FLOATING ICON
═══════════════════════════════════════════════════════════ */
const GlowingIcon = ({ icon: Icon, color, bg, glowColor, style, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
    transition={{
      opacity: { delay: 0.8 + delay * 0.2, duration: 0.4 },
      scale:   { delay: 0.8 + delay * 0.2, duration: 0.4, type: 'spring', stiffness: 200 },
      y:       { duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 },
      rotate:  { duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 },
    }}
    whileHover={{ scale: 1.22, rotate: 18 }}
    style={{
      position: 'absolute', width: '46px', height: '46px',
      borderRadius: '14px', background: bg,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, boxShadow: `0 8px 32px rgba(31,38,135,0.05), 0 0 25px ${glowColor}`,
      zIndex: 5, cursor: 'default', ...style,
    }}
  >
    <Icon size={20} />
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const heroRef  = useRef<HTMLElement>(null);
  const glowX    = useMotionValue(50);
  const glowY    = useMotionValue(50);
  const smoothGX = useSpring(glowX, { stiffness: 55, damping: 18 });
  const smoothGY = useSpring(glowY, { stiffness: 55, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const itemVariants = {
    hidden:   { opacity: 0, y: 28 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <section
      id="home" ref={heroRef} onMouseMove={handleMouseMove}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '80px',
        overflow: 'hidden',
        background: `url('${import.meta.env.BASE_URL}hero_cyber_env_bg.png') center center / cover no-repeat, linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)`,
      }}
    >
      {/* Full-section particle canvas */}
      <ParticleCanvas />

      {/* Mouse-follow ambient glow */}
      <motion.div
        style={{
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,76,241,0.10) 0%, rgba(53,201,255,0.05) 50%, transparent 70%)',
          filter: 'blur(65px)', pointerEvents: 'none', zIndex: 0,
          x: smoothGX, y: smoothGY,
          translateX: '-50%', translateY: '-50%',
          left: 0, top: 0,
        }}
        animate={{ left: `${smoothGX.get()}%`, top: `${smoothGY.get()}%` }}
      />

      {/* Static deep glow top-right */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', right: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(108,76,241,0.12) 0%, rgba(53,201,255,0.05) 50%, transparent 100%)',
          filter: 'blur(55px)', zIndex: 0, pointerEvents: 'none',
        }}
      />

      {/* Split layout */}
      <div style={{
        maxWidth: '1420px', margin: '0 auto', padding: '0 2.5rem', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 20, gap: '4rem',
      }}>

        {/* ── LEFT COLUMN ── */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ flex: '1.1', maxWidth: '650px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          {/* Badge */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(108,76,241,0.15)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', borderRadius: '100px', background: 'rgba(108,76,241,0.06)', border: '1px solid rgba(108,76,241,0.15)', marginBottom: '1.5rem', cursor: 'default', transition: 'box-shadow 0.3s' }}>
            <Volume2 size={15} color="#6C4CF1" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6C4CF1', letterSpacing: '0.02em' }}>Next-Generation AI IVR Platform</span>
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6C4CF1', marginLeft: '2px', display: 'inline-block' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants}
            style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.2rem)', lineHeight: 1.15, fontWeight: 800, color: '#121A46', marginBottom: '1.5rem', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart IVR</span><br />
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Solutions</span>{' '}
            <span style={{ color: '#1E1E2F' }}>for</span><br />
            <span style={{ color: '#1E1E2F' }}>Modern</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enterprise</span><br />
            <span style={{ color: '#1E1E2F' }}>Communication</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={itemVariants}
            style={{ fontSize: '1.05rem', color: '#6E7191', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '580px', fontWeight: 400 }}>
            Navabharath Technologies IVR Solutions delivers intelligent cloud-based communication systems designed to automate call handling, enhance customer engagement, optimize routing, and streamline enterprise communication workflows with reliability, scalability, and real-time analytics.
          </motion.p>

        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <div className="right-visuals" style={{ flex: '1', position: 'relative', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Interactive Globe */}
          <GlobeVisual />

          {/* Glowing floating icons */}
          <GlowingIcon icon={Phone}   color="#FF7B72" bg="rgba(255,123,114,0.1)" glowColor="rgba(255,123,114,0.35)" style={{ left: '0px',    top: '15%'    }} delay={0} />
          <GlowingIcon icon={Volume2} color="#35C9FF" bg="rgba(53,201,255,0.1)"  glowColor="rgba(53,201,255,0.35)"  style={{ left: '-15px', bottom: '25%' }} delay={1} />
          <GlowingIcon icon={Users}   color="#FF7B72" bg="rgba(255,123,114,0.1)" glowColor="rgba(255,123,114,0.35)" style={{ right: '0px',  top: '30%'    }} delay={2} />
          <GlowingIcon icon={Cloud}   color="#35C9FF" bg="rgba(53,201,255,0.1)"  glowColor="rgba(53,201,255,0.35)"  style={{ right: '10px', bottom: '15%' }} delay={3} />

          {/* Five floating feature cards */}
          <FloatingCard icon={Network}   color="#6C4CF1" bg="rgba(108,76,241,0.08)"  title="AI Call Routing"      subtitle="Intelligent Logic" style={{ right: '12%', top: '8%'      }} delay={0.5} />
          <FloatingCard icon={BarChart3} color="#FF7B72" bg="rgba(255,123,114,0.08)" title="Smart Analytics"     subtitle="Real-time Data"    style={{ left: '3%',  top: '28%'     }} delay={1.5} />
          <FloatingCard icon={Layers}    color="#00C2A0" bg="rgba(0,194,160,0.08)"   title="Multi-Level IVR"     subtitle="Dynamic Flows"     style={{ right: '1%', top: '48%'     }} delay={2.5} />
          <FloatingCard icon={Zap}       color="#35C9FF" bg="rgba(53,201,255,0.08)"  title="24/7 IVR Automation" subtitle="Always Online"      style={{ left: '10%', bottom: '14%'  }} delay={3.5} />
          <FloatingCard icon={PhoneCall} color="#5F3CF8" bg="rgba(95,60,248,0.08)"   title="Cloud Telephony"     subtitle="Global Reach"       style={{ right: '14%', bottom: '8%' }} delay={4.5} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1100px) {
          #home > div:last-child { flex-direction: column !important; gap: 3.5rem !important; }
          #home h1 { text-align: center !important; font-size: 2.8rem !important; }
          #home p  { text-align: center !important; margin-left: auto !important; margin-right: auto !important; }
          #home .buttons-container { justify-content: center !important; width: 100% !important; }
          #home .stats-container   { justify-content: center !important; gap: 2rem !important; }
          #home .right-visuals     { height: 500px !important; width: 100% !important; max-width: 500px !important; margin: 0 auto !important; }
          #home .right-visuals > div:first-child { width: 440px !important; height: 440px !important; }
        }
      `}} />
    </section>
  );
};

export default Hero;
