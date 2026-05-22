import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks: { name: string; href: string; hasDropdown?: boolean }[] = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Industries', href: '#industries' },
  { name: "FAQ's", href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const activeRef = useRef('Home');

  // Keep activeRef in sync when activeLink changes (e.g. on click)
  useEffect(() => {
    activeRef.current = activeLink;
  }, [activeLink]);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur
      setIsScrolled(window.scrollY > 10);

      // Scrollspy — find the last section that has scrolled past the trigger threshold
      const threshold = window.innerHeight * 0.3; // 30% of viewport height
      let currentSection = navLinks[0].name;

      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = link.name;
          }
        }
      }

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      padding: isScrolled ? '0.75rem 2rem' : '1.25rem 2rem', transition: 'all 0.4s ease',
      background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(16px)' : 'none',
      boxShadow: isScrolled ? '0 4px 30px rgba(108, 76, 241, 0.03)' : 'none',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>

        {/* Logo */}
        <motion.a href="#home" whileHover={{ scale: 1.02 }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/navabharath_logo.png" alt="Logo"
            style={{
              height: isScrolled ? '42px' : '52px',
              transition: 'all 0.3s',
              objectFit: 'contain'
            }} />
          <div style={{ lineHeight: 1.15, marginLeft: '0.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#121A46', letterSpacing: '0.04em', fontFamily: "'Poppins', sans-serif" }}>NAVABHARATH</div>
            <div style={{ fontWeight: 600, fontSize: '0.62rem', color: '#6E7191', letterSpacing: '0.12em', fontFamily: "'Poppins', sans-serif" }}>TECHNOLOGIES</div>
          </div>
        </motion.a>

        {/* Center pill nav */}
        <nav className="nbt-desktop-nav" style={{
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          background: 'transparent',
          padding: '0',
        }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setActiveLink(link.name)}
              className="nbt-nav-pill"
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                padding: '0.5rem 0.25rem',
                fontSize: '0.88rem',
                fontWeight: activeLink === link.name ? 700 : 500,
                color: activeLink === link.name ? '#6C4CF1' : '#1E1E2F',
                textDecoration: 'none',
                transition: 'color 0.25s',
                whiteSpace: 'nowrap',
                margin: '0 0.65rem',
              }}>
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} style={{ marginLeft: '1px', opacity: 0.8 }} />}
              {activeLink === link.name && (
                <motion.div
                  layoutId="activeUnderline"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#6C4CF1',
                    borderRadius: '2px',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right: CTA Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <a href="#contact" className="nbt-desktop-cta" style={{
            background: 'linear-gradient(135deg, #6C4CF1 0%, #5A3AD2 100%)',
            color: '#FFFFFF',
            padding: '0.75rem 1.65rem',
            borderRadius: '100px',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 15px rgba(108, 76, 241, 0.2)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(108, 76, 241, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(108, 76, 241, 0.2)';
          }}
          >
            Request Demo
            <ArrowUpRight size={15} />
          </a>

          <button className="nbt-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6C4CF1' }}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: '100%', left: '1rem', right: '1rem',
              background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem', padding: '1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '0.8rem 1rem', fontWeight: 600, fontSize: '1rem', borderRadius: '0.75rem', color: '#1E1E2F', textDecoration: 'none' }}>
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
              style={{
                marginTop: '0.5rem',
                background: '#6C4CF1',
                color: '#FFFFFF',
                padding: '0.8rem 1rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none'
              }}>
              Request Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .nbt-nav-pill:hover { color: #6C4CF1 !important; }
        @media (max-width: 1100px) {
          .nbt-desktop-nav { display: none !important; }
          .nbt-desktop-cta { display: none !important; }
          .nbt-mobile-toggle { display: block !important; }
        }
        @media (min-width: 1101px) {
          .nbt-mobile-toggle { display: none !important; }
        }
      `}} />
    </header>
  );
};

export default Header;
