import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-pill-badge">
          <span className="text-sage" aria-hidden="true">●</span>
          <span>Independent Design &amp; Full-Stack MERN Engineering Studio</span>
        </div>

        <h1 className="hero-title" id="hero-heading">
          We Design &amp; Build Bespoke <span className="text-gradient-gold">CMS &amp; SaaS Flagships</span> That Scale.
        </h1>

        <p className="hero-subhead">
          Specialized in lightning-fast Headless CMS architectures for bootstrapping Indian businesses pre-launch, and resilient MERN &amp; MVP web platforms for global startups. We design and write code ourselves — zero outsourcing, zero digital bloat.
        </p>

        <div className="hero-action-group">
          <a href="#calculator" className="btn-primary" id="hero-cta-calc">
            <span>Calculate Project Scope</span>
            <Clock size={16} aria-hidden="true" />
          </a>
          <a href="#works" className="btn-secondary" id="hero-cta-works">
            <span>Explore Selected Work</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Hero Proof Metrics Strip */}
        <div className="hero-metrics-grid" role="region" aria-label="Key Agency Metrics">
          <div className="metric-item">
            <span className="metric-number text-gold">99.8%</span>
            <span className="metric-label">Lighthouse Performance &amp; SEO Score</span>
          </div>
          <div className="metric-item">
            <span className="metric-number text-sky">10-18 Days</span>
            <span className="metric-label">Average Rapid Pre-Launch Delivery</span>
          </div>
          <div className="metric-item">
            <span className="metric-number text-sage">₹22M+</span>
            <span className="metric-label">Client Revenue &amp; Funding Catalyzed</span>
          </div>
          <div className="metric-item">
            <span className="metric-number text-terracotta">100%</span>
            <span className="metric-label">In-House Crafted By Founders</span>
          </div>
        </div>
      </div>
    </section>
  );
}
