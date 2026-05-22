import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      padding: '5rem 0 2rem',
      background: 'linear-gradient(135deg, #6C4CF1 0%, #35C9FF 100%)',
      color: '#FFFFFF',
      borderTop: 'none'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <img src="/navabharath_logo.png" alt="Navabharath Technologies" style={{ height: '40px' }} />
              <div>
                <div style={{ fontWeight: 900, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>NAVABHARATH</div>
                <div style={{ fontWeight: 500, fontSize: '0.7rem', color: '#E0F7FF', letterSpacing: '0.08em' }}>TECHNOLOGIES</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '300px' }}>
              Pioneering the future of communication with AI-integrated IVR and cloud-based telephony architectures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FooterLink text="Home" href="#home" />
              <FooterLink text="About Us" href="#about" />
              <FooterLink text="Features" href="#features" />
              <FooterLink text="Contact" href="#contact" />
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>Features</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FooterLink text="AI-Powered IVR" href="#feature-step-0" />
              <FooterLink text="Cloud Infrastructure" href="#feature-step-1" />
              <FooterLink text="Real-Time Analytics" href="#feature-step-2" />
              <FooterLink text="Smart Call Routing" href="#feature-step-3" />
              <FooterLink text="Enterprise Security" href="#feature-step-4" />
              <FooterLink text="Scalable Architecture" href="#feature-step-5" />
              <FooterLink text="24/7 Reliability" href="#feature-step-6" />
              <FooterLink text="Seamless Integrations" href="#feature-step-7" />
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          <div>&copy; {currentYear} Navabharath Technologies. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, href = "#" }: { text: string, href?: string }) => (
  <li>
    <a href={href} style={{ color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.3s', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">
      <ChevronRight size={14} color="#FFFFFF" /> {text}
    </a>
    <style dangerouslySetInnerHTML={{
      __html: `
      .footer-link:hover { color: #FFFFFF !important; transform: translateX(5px); }
    `}} />
  </li>
);

export default Footer;
