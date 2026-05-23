import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CTO, CloudScale AI',
    text: 'Navabharath’s IVR solution transformed our customer support. The AI voice assistant handles 40% of routine queries, allowing our agents to focus on complex issues. Truly game-changing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'VP of Operations, Global Bank',
    text: 'Security and reliability are non-negotiable for us. Navabharath delivered a bank-grade secure platform with guaranteed uptime. Their smart routing reduced wait times by 60%.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Director of Customer Experience, EduTech Corp',
    text: 'The multi-level IVR and seamless CRM integration have made a huge difference. Our team has full context before answering a call, improving first-call resolution significantly.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" style={{ position: 'relative', overflow: 'hidden', background: '#F8F9FF' }}>
      {/* Ambient background */}
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(108,76,241,0.04) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: '50px', background: 'rgba(108,76,241,0.1)', color: '#6C4CF1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}
          >
            Testimonials
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '1.5rem', color: '#1E1E2F' }}
          >
            What Our Clients{' '}
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1, #35C9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Are Saying
            </span>
          </motion.h2>
        </div>

        {/* Testimonial Slider */}
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', height: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                padding: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FF7B72" color="#FF7B72" />
                  ))}
                </div>
                
                <p style={{ fontSize: '1.15rem', lineHeight: 1.7, fontStyle: 'italic', color: '#4A4A68' }}>
                  "{testimonials[current].text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={testimonials[current].avatar} 
                  alt={testimonials[current].name} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#1E1E2F' }}>{testimonials[current].name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#6E7191' }}>{testimonials[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: current === i ? '#6C4CF1' : 'rgba(108, 76, 241, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
