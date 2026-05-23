import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '1. How does Navabharath Technologies IVR help businesses?',
    answer: 'Our IVR solutions automate customer interactions, reduce manual workload, improve call routing, enhance customer experience, and provide real-time analytics for better communication management.'
  },
  {
    question: '2. Can the IVR system be customized for different businesses?',
    answer: 'Yes. Our IVR solutions are fully customizable based on your business workflows, departments, languages, call routing requirements, and customer engagement processes.'
  },
  {
    question: '3. Does your IVR solution support cloud telephony?',
    answer: 'Yes. We provide cloud-based IVR and telephony solutions that enable scalable, secure, and reliable communication from anywhere with centralized management.'
  },
  {
    question: '4. Can the IVR integrate with CRM software?',
    answer: 'Absolutely. Our platform supports seamless integration with CRM systems, customer databases, ticketing platforms, and enterprise applications for improved workflow automation.'
  },
  {
    question: '5. Does the system support multi-level call routing?',
    answer: 'Yes. Our IVR supports intelligent multi-level call routing to connect customers to the right department or agent efficiently.'
  },
  {
    question: '6. How quickly can the IVR solution be deployed?',
    answer: 'Deployment timelines depend on project requirements, but our scalable architecture allows rapid implementation and seamless integration.'
  }
];

const FAQItem = ({ faq, isOpen, toggleOpen }: any) => {
  return (
    <div
      style={{
        marginBottom: '1rem',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: isOpen ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={toggleOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          color: isOpen ? 'var(--saas-violet)' : 'var(--text-main)',
          transition: 'color 0.3s ease'
        }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          style={{ color: isOpen ? 'var(--saas-violet)' : '#6E7191' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{
              padding: '0 1.5rem 1.5rem',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              background: 'rgba(91, 95, 239, 0.1)',
              color: 'var(--saas-violet)',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: '2px',
              marginBottom: '1rem'
            }}
          >
            Support
          </motion.span>
          <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>
            Frequently Asked <span style={{ background: 'linear-gradient(135deg, var(--saas-violet), var(--saas-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Questions</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0', fontSize: '1.1rem' }}>
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: '1.2rem',
          alignItems: 'start',
          maxWidth: '1140px',
          margin: '0 auto'
        }}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
