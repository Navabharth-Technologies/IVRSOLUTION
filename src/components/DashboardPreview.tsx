import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, PhoneIncoming, Activity } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <section id="dashboard" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {/* Ambient background */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(53,201,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: '50px', background: 'rgba(108,76,241,0.1)', color: '#6C4CF1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}
          >
            Platform Preview
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '1.5rem', color: '#1E1E2F' }}
          >
            Futuristic Analytics{' '}
            <span style={{ background: 'linear-gradient(135deg, #6C4CF1, #35C9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dashboard
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.1rem', color: '#6E7191', lineHeight: 1.8 }}
          >
            Monitor your communication performance in real-time with our advanced, intuitive dashboard.
          </motion.p>
        </div>

        {/* Dashboard Mockup (Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 20px 50px rgba(108, 76, 241, 0.05)',
            padding: '2.5rem',
            maxWidth: '1100px',
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          {/* Dashboard Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E1E2F' }}>Live Analytics</div>
              <div style={{ fontSize: '0.9rem', color: '#6E7191', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                System Live: Real-time updates
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '0.5rem 1rem', background: '#FFFFFF', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: '#1E1E2F', fontWeight: 600 }}>
                Today
              </div>
              <div style={{ padding: '0.5rem 1rem', background: '#6C4CF1', borderRadius: '10px', color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                Export Data
              </div>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { icon: PhoneIncoming, label: 'Active Calls', value: '142', color: '#6C4CF1' },
              { icon: Users, label: 'Queue Length', value: '12', color: '#35C9FF' },
              { icon: TrendingUp, label: 'Success Rate', value: '98.5%', color: '#10B981' },
              { icon: Activity, label: 'Avg Handle Time', value: '2m 14s', color: '#FF7B72' },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6E7191', fontWeight: 600 }}>{stat.label}</div>
                  <div style={{ color: stat.color }}><stat.icon size={18} /></div>
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1E1E2F' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Charts Area */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Chart 1: Bar Chart */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1E2F', marginBottom: '1.5rem' }}>Call Volume (Hourly)</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', paddingBottom: '1rem' }}>
                {[40, 70, 45, 90, 60, 100, 75, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.6, type: 'spring', stiffness: 100 }}
                    style={{
                      width: '25px',
                      background: i === 5 ? '#6C4CF1' : 'rgba(108, 76, 241, 0.2)',
                      borderRadius: '6px',
                      position: 'relative',
                    }}
                  >
                    {i === 5 && (
                      <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', background: '#1E1E2F', color: '#FFFFFF', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        Peak
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chart 2: Success Rate Line Area */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1E2F', marginBottom: '0.5rem' }}>Resolution Rate</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981' }}>95.2%</div>
                <div style={{ fontSize: '0.85rem', color: '#6E7191' }}>+2.4% from last week</div>
              </div>
              
              <div style={{ height: '80px', position: 'relative', overflow: 'hidden', borderRadius: '1rem', background: 'linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)' }}>
                {/* Simulated line path with decorative div */}
                <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, height: '2px', background: '#10B981', opacity: 0.5 }} />
                <div style={{ position: 'absolute', bottom: '40%', left: '30%', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </section>
  );
};

export default DashboardPreview;
