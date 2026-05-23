import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Zap } from 'lucide-react';

/* ─── Pillar Data ──────────────────────────────────────────────── */
const pillars = [
  {
    icon: Target,
    title: 'Mission',
    text: 'Delivering reliable, automated, and customer-focused communication solutions that improve engagement and operational efficiency.',
    color: '#35C9FF',
    colorRgb: '53,201,255',
    tag: 'Customer-Driven',
    gradient: 'linear-gradient(135deg, rgba(53,201,255,0.12) 0%, rgba(140,200,255,0.08) 100%)',
    accentGradient: 'linear-gradient(90deg, #35C9FF, #6C4CF1, #B48CFF)',
    floatDelay: 0,
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'Building intelligent communication ecosystems for modern enterprises through scalable and AI-driven IVR technologies.',
    color: '#6C4CF1',
    colorRgb: '108,76,241',
    tag: 'Future-Focused',
    gradient: 'linear-gradient(135deg, rgba(108,76,241,0.15) 0%, rgba(180,140,255,0.08) 100%)',
    accentGradient: 'linear-gradient(90deg, #6C4CF1, #B48CFF, #35C9FF)',
    floatDelay: 0.4,
  },
  {
    icon: Zap,
    title: 'Innovation',
    text: 'Combining cloud telephony, AI automation, analytics, and enterprise communication into one unified platform.',
    color: '#EC4899',
    colorRgb: '236,72,153',
    tag: 'AI-Powered',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(255,180,220,0.08) 100%)',
    accentGradient: 'linear-gradient(90deg, #EC4899, #35C9FF, #6C4CF1)',
    floatDelay: 0.8,
  },
];

const OrbitRing = ({ color, size, duration, isHovered }: { color: string; size: number; duration: number; isHovered?: boolean }) => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
    transition={isHovered ? { 
      duration: duration * 0.4, 
      repeat: Infinity, 
      ease: 'linear'
    } : {
      duration: 0.5,
      ease: 'easeOut'
    }}
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1px solid ${color}${isHovered ? '50' : '1a'}`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      transition: 'border 0.4s ease',
    }}
  >
    {/* Orbit dot */}
    <div style={{
      position: 'absolute',
      top: '-3px',
      left: '50%',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${isHovered ? '12px' : '6px'} ${color}`,
      transform: 'translateX(-50%)',
      transition: 'box-shadow 0.4s ease',
    }} />
  </motion.div>
);



/* ─── Pulse Dot ────────────────────────────────────────────────── */
const PulseDot = ({ color }: { color: string }) => (
  <div style={{ position: 'relative', width: '10px', height: '10px', display: 'inline-flex', marginRight: '6px', verticalAlign: 'middle' }}>
    <motion.div
      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
    />
    <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: color }} />
  </div>
);

/* ─── Mouse-Track Light ────────────────────────────────────────── */
const MouseLight = ({ color }: { color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'auto', zIndex: 1 }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%, ${color}18 0%, transparent 70%)`,
        transition: 'background 0.1s ease',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

/* ─── Pillar Card ──────────────────────────────────────────────── */
const PillarCard = ({ pillar, index }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={hovered ? {
        y: -8,
        scale: 1.015,
        rotateY: index === 0 ? 3 : index === 2 ? -3 : 0,
      } : {
        y: 0,
        scale: 1,
        rotateY: 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        opacity: { delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      }}
      onMouseEnter={() => { setHovered(true); }}
      onMouseLeave={() => { setHovered(false); }}
      style={{
        position: 'relative',
        borderRadius: '1.8rem',
        padding: '2rem 1.8rem',
        background: hovered
          ? 'rgba(255, 255, 255, 0.98)'
          : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? pillar.color + '40' : 'rgba(255,255,255,0.7)'}`,
        boxShadow: hovered
          ? `0 24px 60px rgba(${pillar.colorRgb}, 0.18), 0 0 0 1px ${pillar.color}20, inset 0 1px 0 rgba(255,255,255,0.9)`
          : '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)',
        cursor: 'default',
        overflow: 'hidden',
        transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Mouse light tracker */}
      {hovered && <MouseLight color={pillar.color} />}

      {/* Gradient background layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: pillar.gradient,
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Shimmer Border */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        background: hovered
          ? `linear-gradient(135deg, ${pillar.color}ff 0%, rgba(255,255,255,0.3) 50%, ${pillar.color}ff 100%)`
          : 'rgba(0, 0, 0, 0.05)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: hovered ? 1 : 0.4,
        backgroundSize: '200% 200%',
        animation: hovered ? 'shimmerBorder 4s linear infinite' : 'none',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'all 0.4s ease',
      }} />

      {/* Animated border sweep */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `linear-gradient(90deg, transparent 0%, ${pillar.color}15 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: 'borderSweep 2s linear infinite',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Icon area with orbit rings */}
        <div style={{ position: 'relative', width: '60px', height: '60px', marginBottom: '1.4rem' }}>
          {/* Orbit rings */}
          <OrbitRing color={pillar.color} size={80} duration={8} isHovered={hovered} />
          <OrbitRing color={pillar.color} size={100} duration={12} isHovered={hovered} />

          {/* Icon box */}
          <motion.div
            animate={{ 
              scale: hovered ? 1.12 : 1,
              y: hovered ? [0, -3, 1, 0] : 0 
            }}
            transition={hovered ? { 
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.3 }
            } : { duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${pillar.color}25, ${pillar.color}08)`,
              border: `1px solid ${pillar.color}35`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: pillar.color,
              boxShadow: hovered ? `0 8px 24px ${pillar.color}30` : 'none',
              transition: 'all 0.4s ease',
            }}
          >
            <pillar.icon size={24} />
          </motion.div>
        </div>

        {/* Tag */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <PulseDot color={pillar.color} />
          <span style={{
            padding: '0.15rem 0.6rem',
            borderRadius: '50px',
            background: `${pillar.color}15`,
            color: pillar.color,
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
          }}>
            {pillar.tag}
          </span>
        </div>

        {/* Title */}
        <h4 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#1E1E2F',
          marginBottom: '0.6rem',
          letterSpacing: '-0.3px',
        }}>
          {pillar.title}
        </h4>

        {/* Description */}
        <p style={{ color: '#6E7191', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 0 }}>
          {pillar.text}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Floating Particle ────────────────────────────────────────── */
const Particle = ({ x, y, color, size, delay }: any) => (
  <motion.div
    animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
    transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      filter: 'blur(1px)',
      pointerEvents: 'none',
    }}
  />
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ─── Main About Component ─────────────────────────────────────── */
const About = () => {

  const particles = [
    { x: 5, y: 20, color: 'rgba(108,76,241,0.4)', size: 4, delay: 0 },
    { x: 15, y: 60, color: 'rgba(53,201,255,0.4)', size: 3, delay: 1 },
    { x: 25, y: 80, color: 'rgba(168,85,247,0.4)', size: 5, delay: 2 },
    { x: 80, y: 15, color: 'rgba(108,76,241,0.3)', size: 3, delay: 0.5 },
    { x: 90, y: 55, color: 'rgba(53,201,255,0.4)', size: 4, delay: 1.5 },
    { x: 70, y: 75, color: 'rgba(168,85,247,0.3)', size: 6, delay: 2.5 },
  ];

  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <style>{`
        @keyframes borderSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-48%, -52%) scale(1.08); }
        }
        @keyframes blobDrift2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-53%, -47%) scale(1.06); }
        }
        @keyframes shimmerBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(108,76,241,0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', animation: 'blobDrift 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(53,201,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', animation: 'blobDrift2 13s ease-in-out infinite' }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* Top Side: Company Intro & Text Area */}
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <motion.span
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: '50px', background: 'rgba(108,76,241,0.1)', color: '#6C4CF1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.5rem' }}
            >
              About Company
            </motion.span>

            <motion.h2
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-1.2px', lineHeight: 1.15, marginBottom: '1.5rem', color: '#1E1E2F' }}
            >
              Transforming Enterprise Communication with{' '}
              <span style={{ background: 'linear-gradient(135deg, #6C4CF1, #35C9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Intelligent Solutions
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: '1.1rem', color: '#6E7191', lineHeight: 1.8, marginBottom: '0rem' }}
            >
              Navabharath Technologies delivers intelligent IVR and cloud communication solutions designed to simplify customer interactions, automate enterprise workflows, and enhance operational efficiency. Our mission is to help businesses build smarter, faster, and more connected customer experiences.
            </motion.p>
          </div>

          {/* Bottom Side: Cinematic Pillar Cards in horizontal grid row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem', 
            perspective: '1200px',
            width: '100%'
          }}>
            {pillars.map((pillar, i) => (
              <PillarCard
                key={i}
                pillar={pillar}
                index={i}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
