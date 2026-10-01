import React from 'react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-row">
          <div>
            <a href="#hero" className="brand-logo">
              <span className="brand-glyph" aria-hidden="true">A</span>
              <span>AURA<span className="text-gold">.</span>STUDIO</span>
            </a>
            <p className="footer-brand-bio">
              Independent digital design &amp; full-stack MERN engineering studio. Building high-speed headless CMS websites and resilient SaaS MVPs for ambitious founders.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li><a href="#works" className="footer-link">Selected Work</a></li>
              <li><a href="#services" className="footer-link">Capabilities</a></li>
              <li><a href="#calculator" className="footer-link">Scope Calculator</a></li>
              <li><a href="#pricing" className="footer-link">Pricing Packages</a></li>
              <li><a href="#process" className="footer-link">Process Pipeline</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-link-list">
              <li><a href="#services" className="footer-link">Headless CMS</a></li>
              <li><a href="#services" className="footer-link">Pre-Launch Bootstrapping</a></li>
              <li><a href="#services" className="footer-link">SaaS MVP Engineering</a></li>
              <li><a href="#services" className="footer-link">Core Web Vitals SEO</a></li>
              <li><a href="#services" className="footer-link">3D WebGL Interactions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Direct Connect</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Ready to collaborate? Reach out directly to the founders:
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--palette-soft-sky-blue)', marginBottom: '8px' }}>
              hello@aurastudio.agency
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--palette-subtle-mist-grey)' }}>
              Bengaluru, India • Serving Global Founders
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            &copy; 2026 AURA Studio. All rights reserved. MERN Architecture &amp; 3D WebGL crafted 100% in-house.
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#contact" className="footer-link">Privacy Policy</a>
            <a href="#contact" className="footer-link">Terms of Service</a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="footer-link"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  color: 'rgba(206, 210, 213, 0.45)',
                  fontSize: '0.82rem'
                }}
                title="Founder Access (Ctrl + Shift + A)"
              >
                Founder Portal 🔒
              </button>
            )}
            <a href="#main-header" className="footer-link">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
