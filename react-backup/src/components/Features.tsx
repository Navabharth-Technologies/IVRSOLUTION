import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Cloud, BarChart3, Shuffle, ShieldCheck, Layers, Clock, Link2
} from 'lucide-react';

/* ─── Feature Steps Data ────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    icon: Cpu,
    title: 'AI-Powered IVR',
    tagline: 'Intelligent Voice Automation',
    desc: 'Natural language processing and machine learning deliver human-like call experiences that self-improve with every interaction.',
    extra: '98.4% NLP accuracy with multi-language parsing and dynamic sentiment adaptation.',
    color: '#4F46E5',
    color2: '#818CF8',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
    stat: '98.4% NLP accuracy',
  },
  {
    num: '02',
    icon: Cloud,
    title: 'Cloud Infrastructure',
    tagline: 'Elastic, Always-On Platform',
    desc: 'Enterprise-grade cloud telephony with auto-scaling architecture ensures zero downtime under peak traffic loads.',
    extra: 'Multi-region failover and geo-redundant clusters ensure an SLA-backed 99.99% uptime guarantee.',
    color: '#0EA5E9',
    color2: '#38BDF8',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
    stat: '99.99% uptime SLA',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Real-Time Analytics',
    tagline: 'Insights at the Speed of Calls',
    desc: 'Live dashboards and actionable intelligence on call flows, agent performance, and customer journey patterns.',
    extra: 'Sub-200ms data latency across 120+ tracked KPIs with automatic anomaly detection.',
    color: '#8B5CF6',
    color2: '#C084FC',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)',
    stat: '<200ms data latency',
  },
  {
    num: '04',
    icon: Shuffle,
    title: 'Smart Call Routing',
    tagline: 'Right Agent, Right Moment',
    desc: 'AI-driven routing uses caller history, skills, and queue data to connect customers to the optimal resource instantly.',
    extra: 'Cuts average queue times by 55% while boosting agent utilization rates by 30%.',
    color: '#0D9488',
    color2: '#2DD4BF',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)',
    stat: '55% wait time reduction',
  },
  {
    num: '05',
    icon: ShieldCheck,
    title: 'Enterprise Security',
    tagline: 'Zero-Trust Call Protection',
    desc: 'End-to-end AES-256 encryption, GDPR & HIPAA compliance, and real-time fraud detection safeguard every call.',
    extra: 'Biometric voice verification and multi-factor validation secure sensitive transactions.',
    color: '#10B981',
    color2: '#34D399',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    stat: 'HIPAA + GDPR compliant',
  },
  {
    num: '06',
    icon: Layers,
    title: 'Scalable Architecture',
    tagline: 'Built for Enterprise Volume',
    desc: 'Handle millions of concurrent calls with modular microservices that scale horizontally in under 30 seconds.',
    extra: 'Zero performance degradation under spike loads, supported by containerized pods.',
    color: '#EC4899',
    color2: '#F472B6',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    stat: '1M+ concurrent calls',
  },
  {
    num: '07',
    icon: Clock,
    title: '24/7 Reliability',
    tagline: 'Never Misses a Call',
    desc: 'Proactive system monitoring and automated health checks guarantee continuous system availability.',
    extra: 'Self-healing workflows trigger backup routes in under 5 seconds with zero active call drops.',
    color: '#F59E0B',
    color2: '#FBBF24',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    stat: '<5s recovery time',
  },
  {
    num: '08',
    icon: Link2,
    title: 'Seamless Integrations',
    tagline: 'Connect Your Entire Stack',
    desc: 'Native CRM, helpdesk, and ERP connectors plus REST APIs allow instant data sync across your ecosystem.',
    extra: 'Supports Salesforce, HubSpot, Zendesk, and custom database webhooks natively.',
    color: '#3B82F6',
    color2: '#60A5FA',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    stat: '200+ integrations',
  },
];

/* ─── Feature Card Component ────────────────────────────────────── */
const FeatureCard = ({
  step,
  index,
  isActive,
  isHoveredElsewhere,
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  step: typeof steps[0];
  index: number;
  isActive: boolean;
  isHoveredElsewhere: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  const handleMouseEnter = () => {
    setHovered(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave();
  };

  return (
    <div
      id={`feature-step-${index}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        width: '380px',
        padding: '3rem 2.2rem',
        borderRadius: '32px',
        background: hovered
          ? 'rgba(255, 255, 255, 0.98)'
          : isActive
          ? 'rgba(255, 255, 255, 0.94)'
          : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid transparent',
        boxShadow: hovered
          ? '0 30px 60px rgba(108, 99, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          : isActive
          ? '0 20px 40px rgba(77, 168, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          : '0 8px 24px rgba(31, 38, 135, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered
          ? 'translateY(-14px) scale(1.03)'
          : isActive
          ? 'translateY(-6px) scale(1.02)'
          : 'translateY(0) scale(0.96)',
        opacity: isHoveredElsewhere ? 0.45 : isActive ? 1 : 0.6,
        transition: 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
        flexShrink: 0,
      }}
    >
      {/* Premium animated gradient border shimmer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1.5px',
        background: hovered || isActive
          ? `linear-gradient(135deg, ${step.color}, #4DA8FF, #A78BFA, ${step.color})`
          : 'rgba(255, 255, 255, 0.6)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: hovered || isActive ? 1 : 0.3,
        backgroundSize: '200% 200%',
        animation: hovered || isActive ? 'shimmerBorder 4s linear infinite' : 'none',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Main card background glow on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${step.color}12 0%, ${step.color2}0a 50%, ${step.color}05 100%)`,
        backgroundSize: '200% 200%',
        animation: hovered ? 'gradientShift 6s ease infinite' : 'none',
        opacity: hovered || isActive ? 1 : 0,
        transition: 'opacity 0.4s ease',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Background motion graphics */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {/* Soft moving gradient blob */}
        <motion.div
          animate={hovered || isActive ? {
            x: [0, 25, -15, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.25, 0.9, 1],
          } : { x: 0, y: 0, scale: 1 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${step.color}1e 0%, transparent 70%)`,
            filter: 'blur(24px)',
            opacity: hovered || isActive ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Dynamic Light Reflection Streak */}
        <motion.div
          animate={hovered ? {
            x: ['-100%', '100%'],
            y: ['-20%', '120%'],
          } : { x: '-100%', y: '-20%' }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.8,
          }}
          style={{
            position: 'absolute',
            width: '50px',
            height: '300px',
            background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.35), transparent)',
            transform: 'rotate(45deg)',
            filter: 'blur(6px)',
            opacity: hovered ? 0.7 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Hover Floating Micro-particles */}
        {(hovered || isActive) && (
          <>
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 12, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '75%',
                left: '25%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: step.color,
                filter: 'blur(0.5px)',
              }}
            />
            <motion.div
              animate={{
                y: [0, -35, 0],
                x: [0, -10, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              style={{
                position: 'absolute',
                top: '30%',
                right: '20%',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: step.color2,
                filter: 'blur(0.5px)',
              }}
            />
          </>
        )}
      </div>

      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        {/* Icon Container with glowing aura */}
        <div style={{ position: 'relative', width: '60px', height: '60px' }}>
          <motion.div
            animate={hovered || isActive ? {
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
            } : { scale: 1, opacity: 0.1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '24px',
              background: step.gradient,
              filter: 'blur(8px)',
              zIndex: 0,
            }}
          />

          <motion.div
            animate={hovered ? {
              y: [0, -4, 2, 0],
              scale: 1.08,
            } : { y: 0, scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '18px',
              background: hovered || isActive
                ? step.gradient
                : `linear-gradient(135deg, ${step.color}22 0%, ${step.color}07 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: hovered || isActive ? 'white' : step.color,
              boxShadow: hovered || isActive
                ? `0 8px 24px ${step.color}40`
                : `0 4px 12px ${step.color}15`,
              transition: 'all 0.4s ease',
              zIndex: 1,
            }}
          >
            <Icon size={26} strokeWidth={2} />
          </motion.div>
        </div>

        <span style={{
          fontSize: '2.2rem',
          fontWeight: 900,
          color: hovered || isActive ? `${step.color}25` : 'rgba(108, 99, 255, 0.08)',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-1px',
          transition: 'color 0.4s ease',
        }}>
          {step.num}
        </span>
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: '0.8rem',
        fontWeight: 700,
        color: step.color,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        zIndex: 1,
        transition: 'color 0.3s ease',
      }}>
        {step.tagline}
      </div>

      {/* Title */}
      <h4 style={{
        fontSize: '1.45rem',
        fontWeight: 800,
        color: '#1F2340',
        margin: 0,
        letterSpacing: '-0.3px',
        zIndex: 1,
      }}>
        {step.title}
      </h4>

      {/* Description */}
      <p style={{
        fontSize: '0.94rem',
        color: '#5A5D7A',
        lineHeight: 1.65,
        margin: 0,
        zIndex: 1,
      }}>
        {step.desc}
      </p>
    </div>
  );
};

/* ─── Main Features Component ────────────────────────────────────── */
const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Set up screen size listener for exact centering offsets
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle auto-scroll timeline rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 310 : 380;
  const gap = isMobile ? 16 : 28;

  // Center index card in the viewport mathematically
  const trackX = (windowWidth / 2) - (cardWidth / 2) - (activeIndex * (cardWidth + gap));

  return (
    <section
      id="features"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#F7F9FF',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(108, 99, 255, 0.035) 1px, transparent 0)',
        backgroundSize: '32px 32px',
        padding: '8rem 0',
      }}
    >
      {/* CSS keyframes for border shimmers and background shifts */}
      <style>{`
        @keyframes shimmerBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '650px',
        height: '650px',
        background: 'radial-gradient(circle, rgba(108, 99, 255, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '650px',
        height: '650px',
        background: 'radial-gradient(circle, rgba(77, 168, 255, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Section Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 5rem', padding: '0 1.5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.4rem',
              borderRadius: '50px',
              background: 'rgba(108, 99, 255, 0.07)',
              color: '#6C63FF',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              letterSpacing: '1.8px',
              marginBottom: '1.2rem',
            }}
          >
            Core Capabilities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: '#1F2340',
            }}
          >
            Enterprise-Grade IVR Features Designed for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #4DA8FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Intelligent Communication
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.1rem',
              color: '#5A5D7A',
              lineHeight: 1.8,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Empower your contact center with cutting-edge AI capability, carrier-grade infrastructure, and sub-second intelligent routing designed to deliver unparalleled customer experiences.
          </motion.p>
        </div>

        {/* Carousel Viewport Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '3rem 0',
          }}
        >
          {/* Draggable animated track */}
          <motion.div
            drag="x"
            dragConstraints={{ left: trackX, right: trackX }}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                handleNext();
              } else if (info.offset.x > swipeThreshold) {
                handlePrev();
              }
            }}
            animate={{ x: trackX }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            style={{
              display: 'flex',
              gap: `${gap}px`,
              width: 'max-content',
              cursor: 'grab',
              padding: '0 50px',
            }}
          >
            {steps.map((step, index) => (
              <FeatureCard
                key={index}
                step={step}
                index={index}
                isActive={activeIndex === index}
                isHoveredElsewhere={hoveredIndex !== null && hoveredIndex !== index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
