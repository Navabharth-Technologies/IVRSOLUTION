import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Radio, 
  Shuffle, 
  Mic2, 
  Grid3X3, 
  Link2, 
  BarChart3, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: 'Cloud IVR Solutions',
    desc: 'Scalable cloud-based interactive voice response systems for modern enterprises.',
    icon: Cloud,
  },
  {
    title: 'GSM Gateway Integration',
    desc: 'Seamlessly bridge cellular networks with your VOIP infrastructure.',
    icon: Radio,
  },
  {
    title: 'Call Routing Automation',
    desc: 'Smart algorithms to route calls to the right agent every single time.',
    icon: Shuffle,
  },
  {
    title: 'Voice Broadcasting',
    desc: 'Reach thousands of customers instantly with automated voice campaigns.',
    icon: Mic2,
  },
  {
    title: 'DTMF Systems',
    desc: 'Advanced touch-tone response systems for data collection and navigation.',
    icon: Grid3X3,
  },
  {
    title: 'CRM & API Integrations',
    desc: 'Connect your communication tools with your favorite business software.',
    icon: Link2,
  },
  {
    title: 'Call Analytics & Reporting',
    desc: 'Deep insights into call volumes, agent performance, and customer behavior.',
    icon: BarChart3,
  },
  {
    title: 'White Label IVR Solutions',
    desc: 'Professional-grade IVR systems rebranded for your own business clients.',
    icon: ShieldCheck,
  },
];

const ServiceCard = ({ service, index }: any) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      style={{ 
        background: 'var(--white)', 
        padding: '2.5rem', 
        borderRadius: '1.5rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #f1f5f9',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        width: '50px', 
        height: '50px', 
        borderRadius: '12px', 
        backgroundColor: 'rgba(18, 62, 124, 0.05)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--secondary)',
        marginBottom: '1.5rem'
      }}>
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>{service.title}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, fontSize: '0.95rem' }}>{service.desc}</p>
      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        color: 'var(--secondary)', 
        fontWeight: 600,
        background: 'transparent',
        fontSize: '0.9rem'
      }}>
        Learn More <ChevronRight size={16} />
      </button>
      
      {/* Decorative accent */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        width: '40px', 
        height: '40px', 
        background: 'linear-gradient(135deg, transparent 50%, rgba(216, 155, 43, 0.1) 50%)',
        borderBottomRightRadius: '1.5rem'
      }} />
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}
          >
            What We Offer
          </motion.span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Core Communication Services</h2>
          <div style={{ width: '80px', height: '4px', background: 'var(--accent)', margin: '1.5rem auto' }} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
