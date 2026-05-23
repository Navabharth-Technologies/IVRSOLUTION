import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Cpu, Shuffle, Layers, ArrowRight } from 'lucide-react';

const solutions = [
  { 
    title: 'Cloud IVR', 
    desc: 'Scalable cloud telephony infrastructure for modern enterprises with 99.9% uptime guaranteed.',
    icon: Cloud,
    color: '#6C4CF1'
  },
  { 
    title: 'AI Voice Bot', 
    desc: 'Smart AI assistants powered by natural language processing for automated customer support.',
    icon: Cpu,
    color: '#35C9FF'
  },
  { 
    title: 'Smart Routing', 
    desc: 'Intelligent call distribution based on agent availability, skill level, and customer priority.',
    icon: Shuffle,
    color: '#FF7B72'
  },
  { 
    title: 'Multi-Level IVR', 
    desc: 'Create complex, multi-layered call workflows with our intuitive drag-and-drop designer.',
    icon: Layers,
    color: '#6C4CF1'
  },
];

const Solutions = () => {
  return (
    <section id="solutions" className="section-padding" style={{ position: 'relative', background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>
              Advanced Solutions
            </span>
            <h2 style={{ fontSize: '3.5rem', marginTop: '1rem', lineHeight: 1.1 }}>
              Comprehensive <span className="text-gradient">Communication</span> Ecosystem
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8 }}
          >
            We provide a suite of integrated technologies designed to standardize and automate your enterprise telecom workflows globally.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ 
                padding: '3rem', 
                borderRadius: '2.5rem', 
                background: '#F8F9FF',
                border: '1px solid #EEF2FF',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(108, 76, 241, 0.1)' }}
            >
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '20px', 
                background: 'white',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: item.color,
                marginBottom: '2rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
              }}>
                <item.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>{item.desc}</p>
              <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                Learn More <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
