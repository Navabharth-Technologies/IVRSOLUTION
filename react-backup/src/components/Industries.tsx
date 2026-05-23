import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark, GraduationCap, ShoppingBag,
  Wifi, Headphones, Truck, Hotel,
} from 'lucide-react';

/* ─── Industry Data ──────────────────────────────────────────────── */
const industries = [
  {
    name: 'Banking & Finance',
    icon: Landmark,
    desc: 'Secure, AI-driven IVR for account inquiries, fraud alerts, and smart call routing.',
    tag: 'Secure & Compliant',
    color: '#35C9FF',
    colorRgb: '53,201,255',
    gradient: 'linear-gradient(135deg, #35C9FF 0%, #6C4CF1 100%)',
    stat: '3x faster resolution',
  },
  {
    name: 'Education',
    icon: GraduationCap,
    desc: 'Admission helplines, result announcements, and automated student engagement.',
    tag: 'Always Available',
    color: '#A855F7',
    colorRgb: '168,85,247',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #35C9FF 100%)',
    stat: '80% query automation',
  },
  {
    name: 'E-Commerce',
    icon: ShoppingBag,
    desc: 'Order tracking, return management, and real-time customer support at scale.',
    tag: 'High-Volume Ready',
    color: '#EC4899',
    colorRgb: '236,72,153',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
    stat: '45% support cost cut',
  },
  {
    name: 'Telecom',
    icon: Wifi,
    desc: 'Network issue triage, plan upgrades, and intelligent tier-based call flows.',
    tag: 'Always Connected',
    color: '#06B6D4',
    colorRgb: '6,182,212',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #6C4CF1 100%)',
    stat: '99.9% uptime SLA',
  },
  {
    name: 'Customer Support',
    icon: Headphones,
    desc: 'Omnichannel IVR, CRM integration, and intelligent agent handoff for enterprise teams.',
    tag: 'CRM-Integrated',
    color: '#F59E0B',
    colorRgb: '245,158,11',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
    stat: '92% CSAT achieved',
  },
  {
    name: 'Logistics',
    icon: Truck,
    desc: 'Delivery status, route tracking, and proactive customer notifications via voice.',
    tag: 'Real-Time Alerts',
    color: '#10B981',
    colorRgb: '16,185,129',
    gradient: 'linear-gradient(135deg, #10B981 0%, #35C9FF 100%)',
    stat: '70% WISMO reduction',
  },
  {
    name: 'Hospitality',
    icon: Hotel,
    desc: 'Reservation management, concierge automation, and guest experience enhancement.',
    tag: 'Guest-Centric',
    color: '#8B5CF6',
    colorRgb: '139,92,246',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    stat: '5★ service delivery',
  },
];

/* ─── Floating Particle ──────────────────────────────────────────── */
const Particle = ({ x, y, color, size, dur, delay }: any) => (
  <motion.div
    animate={{ y: [0, -24, 0], opacity: [0, 0.55, 0] }}
    transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: '50%',
      background: color, filter: 'blur(1px)', pointerEvents: 'none',
    }}
  />
);

/* ─── Industry Card ──────────────────────────────────────────────── */
const IndustryCard = ({ industry, index }: { industry: typeof industries[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.6rem',
        padding: '1.8rem',
        flexBasis: '260px',
        flexGrow: 1,
        maxWidth: '320px',
        background: hovered ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${hovered ? `rgba(${industry.colorRgb},0.3)` : 'rgba(255,255,255,0.75)'}`,
        boxShadow: hovered
          ? `0 20px 50px rgba(${industry.colorRgb},0.14), 0 0 0 1px rgba(${industry.colorRgb},0.1), inset 0 1px 0 rgba(255,255,255,0.9)`
          : '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Internal gradient overlay on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: `radial-gradient(circle at 30% 30%, rgba(${industry.colorRgb},0.06) 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Top gradient glow streak */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '2px',
        background: industry.gradient,
        opacity: hovered ? 0.8 : 0,
        transition: 'opacity 0.4s ease',
        borderRadius: '0 0 4px 4px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Icon */}
        <div style={{ marginBottom: '1.4rem' }}>
          <motion.div
            animate={{ y: hovered ? 0 : [0, -4, 0] }}
            transition={hovered
              ? { duration: 0.3 }
              : { duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }
            }
            style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: hovered ? industry.gradient : `linear-gradient(135deg, rgba(${industry.colorRgb},0.15), rgba(${industry.colorRgb},0.06))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: hovered ? 'white' : industry.color,
              boxShadow: hovered ? `0 8px 24px rgba(${industry.colorRgb},0.3)` : 'none',
              transition: 'all 0.4s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <industry.icon size={24} strokeWidth={2} />
          </motion.div>
        </div>

        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: '0.18rem 0.65rem', borderRadius: '50px',
          background: `rgba(${industry.colorRgb},0.1)`,
          color: industry.color, fontSize: '0.68rem',
          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px',
          marginBottom: '0.65rem',
        }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: industry.color, display: 'inline-block',
          }} />
          {industry.tag}
        </div>

        {/* Title */}
        <h4 style={{
          fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.2px',
          marginBottom: '0.55rem',
          background: hovered ? industry.gradient : 'none',
          WebkitBackgroundClip: hovered ? 'text' : 'unset',
          WebkitTextFillColor: hovered ? 'transparent' : '#1E1E2F',
          color: hovered ? 'transparent' : '#1E1E2F',
          transition: 'all 0.4s ease',
        }}>
          {industry.name}
        </h4>

        {/* Description */}
        <p style={{
          color: hovered ? '#374151' : '#6E7191',
          fontSize: '0.86rem', lineHeight: 1.65,
          marginBottom: '1.1rem',
          transition: 'color 0.4s ease',
        }}>
          {industry.desc}
        </p>

      </div>
    </motion.div>
  );
};

/* ─── Main Industries Component ──────────────────────────────────── */
const Industries = () => {
  const particles = [
    { x: 3, y: 15, color: 'rgba(108,76,241,0.45)', size: 5, dur: 5, delay: 0 },
    { x: 8, y: 65, color: 'rgba(53,201,255,0.4)', size: 4, dur: 6, delay: 1.2 },
    { x: 92, y: 20, color: 'rgba(168,85,247,0.45)', size: 6, dur: 4.5, delay: 0.6 },
    { x: 96, y: 70, color: 'rgba(53,201,255,0.35)', size: 3, dur: 7, delay: 2 },
    { x: 50, y: 5, color: 'rgba(236,72,153,0.35)', size: 4, dur: 5.5, delay: 1.5 },
    { x: 20, y: 88, color: 'rgba(108,76,241,0.3)', size: 3, dur: 6.5, delay: 0.8 },
    { x: 75, y: 90, color: 'rgba(16,185,129,0.35)', size: 5, dur: 5, delay: 2.2 },
  ];

  return (
    <section
      id="industries"
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      {/* Animated CSS keyframes */}
      <style>{`
        @keyframes blobPulse1 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          50%       { transform: translate(-48%,-52%) scale(1.1); opacity: 1; }
        }
        @keyframes blobPulse2 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50%       { transform: translate(-52%,-48%) scale(1.08); opacity: 0.9; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '25%', left: '-8%',
        width: '650px', height: '650px',
        background: 'radial-gradient(circle, rgba(108,76,241,0.07) 0%, transparent 65%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
        animation: 'blobPulse1 12s ease-in-out infinite',
        transformOrigin: 'center center',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '-8%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(53,201,255,0.07) 0%, transparent 65%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
        animation: 'blobPulse2 15s ease-in-out infinite',
        transformOrigin: 'center center',
      }} />
      <div style={{
        position: 'absolute', top: '60%', left: '40%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)',
        filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', padding: '0.4rem 1.3rem',
              borderRadius: '50px', background: 'rgba(108,76,241,0.1)',
              color: '#6C4CF1', fontWeight: 700, textTransform: 'uppercase',
              fontSize: '0.78rem', letterSpacing: '1.5px', marginBottom: '1.2rem',
            }}
          >
            Global Reach
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 900, letterSpacing: '-1.5px',
              lineHeight: 1.15, marginBottom: '1.5rem',
            }}
          >
            Industries We{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 50%, #A855F7 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 6s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Elevate
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: '#6E7191', maxWidth: '680px', margin: '0 auto',
              fontSize: '1.08rem', lineHeight: 1.75,
            }}
          >
            Empowering industries with intelligent IVR automation, cloud communication,
            AI-driven routing, and scalable enterprise engagement solutions.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '1.8rem',
        }}>
          {industries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
