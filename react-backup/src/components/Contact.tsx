import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, Sparkles, Clock, Phone } from 'lucide-react';

const FloatingInput = ({ label, id, type = 'text', as = 'input', rows }: any) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const InputComponent = as;
  const isFilled = value.length > 0;
  const isActive = focused || isFilled;

  const validate = (val: string) => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) {
        setError('Email is required');
      } else if (!emailRegex.test(val)) {
        setError('Invalid email address');
      } else {
        setError('');
      }
    } else if (id === 'firstName' || id === 'lastName') {
      if (!val) {
        setError(`${label} is required`);
      } else if (!/^[A-Za-z\s]+$/.test(val)) {
        setError(`${label} should only contain letters`);
      } else if (val.length < 2) {
        setError(`${label} must be at least 2 characters`);
      } else {
        setError('');
      }
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      <motion.label
        htmlFor={id}
        animate={{
          y: isActive ? -28 : 16,
          scale: isActive ? 0.85 : 1,
          color: error ? '#FF4D4F' : (isActive ? '#6C4CF1' : '#6E7191'),
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '1rem',
          pointerEvents: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          transformOrigin: 'left top',
          zIndex: 2,
        }}
      >
        {label}
      </motion.label>
      <InputComponent
        id={id}
        type={type}
        rows={rows}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          validate(value);
        }}
        onChange={(e: any) => {
          setValue(e.target.value);
          if (error) validate(e.target.value);
        }}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid',
          borderColor: error ? '#FF4D4F' : (focused ? '#6C4CF1' : 'rgba(108, 76, 241, 0.15)'),
          borderRadius: '1rem',
          fontSize: '1rem',
          color: '#1E1E2F',
          outline: 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          boxShadow: focused ? '0 0 0 4px rgba(108, 76, 241, 0.05)' : 'none',
          resize: 'none',
        }}
      />
      {error && (
        <span style={{ color: '#FF4D4F', fontSize: '0.75rem', position: 'absolute', bottom: '-1.2rem', left: '0.5rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {/* Ambient background */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(108,76,241,0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: '50px', background: 'rgba(108,76,241,0.1)', color: '#6C4CF1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}
          >
            Connect With Us
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '1.5rem', color: '#1E1E2F' }}
          >
            Let's Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1, #35C9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Great Together
            </span>
          </motion.h2>
        </div>

        {/* Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 20px 50px rgba(108, 76, 241, 0.05)',
          overflow: 'hidden',
        }}>
          
          {/* Left Panel: Form (Get in Touch) */}
          <div style={{ padding: '3rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E1E2F', marginBottom: '2rem' }}>Get in Touch</div>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <FloatingInput label="First Name" id="firstName" />
                <FloatingInput label="Last Name" id="lastName" />
              </div>

              <FloatingInput label="Work Email" id="email" type="email" />

              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <label style={{ position: 'absolute', left: '1rem', top: '-0.7rem', fontSize: '0.8rem', fontWeight: 500, color: '#6C4CF1', background: '#FFFFFF', padding: '0 0.5rem', zIndex: 2 }}>
                  Subject
                </label>
                <select style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(108, 76, 241, 0.15)',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  color: '#1E1E2F',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer',
                }}>
                  <option value="ivr">Intelligent IVR Solutions</option>
                  <option value="cloud">Cloud Telephony Systems</option>
                  <option value="api">API Integrations</option>
                  <option value="other">Other Inquiries</option>
                </select>
                <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6C4CF1' }}>
                  ▼
                </div>
              </div>

              <FloatingInput label="Message" id="message" as="textarea" rows={4} />

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(108, 76, 241, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 100%)',
                  color: 'white',
                  borderRadius: '1rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </div>

          {/* Right Panel: Info & Map */}
          <div style={{ padding: '3rem', background: 'rgba(108, 76, 241, 0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E1E2F', marginBottom: '2rem' }}>Contact Information</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(108,76,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C4CF1' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6E7191', fontWeight: 600 }}>Email</div>
                    <div style={{ fontSize: '1rem', color: '#1E1E2F', fontWeight: 600 }}>contact@navabharathtechnologies.com</div>
                  </div>
                </div>



                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(108,76,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C4CF1' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6E7191', fontWeight: 600 }}>Business Hours</div>
                    <div style={{ fontSize: '1rem', color: '#1E1E2F', fontWeight: 600 }}>Mon - Sat, 9:30 AM - 6:00 PM IST</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(108,76,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C4CF1', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#6E7191', fontWeight: 600 }}>Headquarters</div>
                    <div style={{ fontSize: '1rem', color: '#1E1E2F', fontWeight: 600 }}>
                      #667/B 2nd Floor, Chitrabhanu Road<br />
                      Kuvempu Nagar, Mysore,<br />
                      Karnataka - 570023
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
