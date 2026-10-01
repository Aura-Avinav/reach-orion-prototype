import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="main-header" id="main-header">
      <div className="container nav-container">
        <a href="#hero" className="brand-logo" aria-label="AURA Studio Home" onClick={closeMobileMenu}>
          <span className="brand-glyph" aria-hidden="true">A</span>
          <span>AURA<span className="text-gold">.</span>STUDIO</span>
        </a>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} aria-label="Primary Navigation">
          <ul className="nav-links">
            <li><a href="#works" className="nav-link" onClick={closeMobileMenu}>Selected Works</a></li>
            <li><a href="#services" className="nav-link" onClick={closeMobileMenu}>Capabilities</a></li>
            <li><a href="#calculator" className="nav-link" onClick={closeMobileMenu}>Scope Calculator</a></li>
            <li><a href="#pricing" className="nav-link" onClick={closeMobileMenu}>Pricing</a></li>
            <li><a href="#process" className="nav-link" onClick={closeMobileMenu}>Process</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="#contact" className="nav-cta-btn" id="nav-book-btn" onClick={closeMobileMenu}>
            <span>Book Discovery</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="mobile-menu-btn"
            id="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
