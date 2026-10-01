import React from 'react';
import { Layers, Globe, Shield, Sparkles } from 'lucide-react';

export default function Services() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Core Capabilities</div>
          <h2 className="section-title" id="services-heading">Full-Stack Craftsmanship Under One Roof</h2>
          <p className="section-desc">
            We do not juggle sub-contractors or junior hand-offs. The founders who lead your strategy are the ones writing your code.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento 1: Large */}
          <div className="glass-panel bento-card col-span-2">
            <div>
              <div className="bento-icon-wrap icon-teal">
                <Layers size={24} color="var(--palette-soft-sky-blue)" aria-hidden="true" />
              </div>
              <h3 className="bento-title">Headless CMS &amp; Modern Web Architecture</h3>
              <p className="bento-text">
                Tailored specifically for Indian businesses bootstrapping pre-launch who need complete content agility without the crippling load times or security vulnerabilities of bloated WordPress plugins.
              </p>
            </div>
            <ul className="bento-feature-list">
              <li className="bento-feature-item">
                <span className="check-dot"></span> Intuitive visual content authoring (Sanity, Strapi, Decap, or custom Markdown engines)
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Sub-second serverless edge page rendering on Cloudflare, Vercel, and Node.js
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Built-in Indian payment rails: Razorpay, Cashfree, UPI, and Stripe
              </li>
            </ul>
          </div>

          {/* Bento 2 */}
          <div className="glass-panel bento-card">
            <div>
              <div className="bento-icon-wrap icon-gold">
                <Globe size={24} color="var(--palette-warm-goldenrod)" aria-hidden="true" />
              </div>
              <h3 className="bento-title">Technical SEO &amp; Core Web Vitals</h3>
              <p className="bento-text">
                Ranking on Google requires more than keywords. We build search dominance directly into the document object model.
              </p>
            </div>
            <ul className="bento-feature-list">
              <li className="bento-feature-item">
                <span className="check-dot"></span> Complete Schema.org JSON-LD graph generation
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> 100/100 Lighthouse performance audits
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Zero layout shift (CLS) &amp; instant INP response
              </li>
            </ul>
          </div>

          {/* Bento 3 */}
          <div className="glass-panel bento-card">
            <div>
              <div className="bento-icon-wrap icon-terracotta">
                <Shield size={24} color="var(--palette-burnt-terracotta)" aria-hidden="true" />
              </div>
              <h3 className="bento-title">SaaS MVP &amp; MERN Engineering</h3>
              <p className="bento-text">
                Ready to evolve from pre-launch to a global SaaS? We construct clean, scalable web applications with modular data layers.
              </p>
            </div>
            <ul className="bento-feature-list">
              <li className="bento-feature-item">
                <span className="check-dot"></span> Secure authentication &amp; role-based access control
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Real-time analytics &amp; interactive data dashboards
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Rapid 3-week prototype-to-production pipeline
              </li>
            </ul>
          </div>

          {/* Bento 4: Large */}
          <div className="glass-panel bento-card col-span-2">
            <div>
              <div className="bento-icon-wrap icon-sage">
                <Sparkles size={24} color="var(--palette-medium-sage-green)" aria-hidden="true" />
              </div>
              <h3 className="bento-title">Bespoke Design Systems &amp; 3D Luxury Aesthetics</h3>
              <p className="bento-text">
                We don't use generic component libraries. Every color token, typography scale, 3D WebGL animation, and glassmorphic reflection is designed bespoke for an unmistakable luxury presence.
              </p>
            </div>
            <ul className="bento-feature-list">
              <li className="bento-feature-item">
                <span className="check-dot"></span> Tailored 12-color token systems with accessibility-audited contrast
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Interactive 3D WebGL particle constellation &amp; wave physics
              </li>
              <li className="bento-feature-item">
                <span className="check-dot"></span> Multi-device responsive precision across desktop, tablet, and mobile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
