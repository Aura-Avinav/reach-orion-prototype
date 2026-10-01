import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function PricingTiers({ currency = 'INR', onSelectTier }) {
  const symbol = currency === 'INR' ? '₹' : '$';

  const tiers = [
    {
      id: 'bootstrap',
      name: 'Bootstrap Sprint',
      desc: 'Ideal for Indian founders bootstrapping pre-launch who need a high-speed, credible digital presence to test market demand.',
      price: currency === 'INR' ? '45,000' : '650',
      timeline: '10 – 14 Days Turnaround',
      featured: false,
      deliverables: [
        'Up to 5 Custom Responsive Pages',
        'Intuitive Headless CMS for blog/content',
        'Fundamental Technical SEO & Meta Tags',
        'Sub-1s Mobile Page Load Speed',
        'Contact Form + WhatsApp Direct Lead Capture'
      ],
      ctaText: 'Choose Sprint'
    },
    {
      id: 'flagship',
      name: 'Flagship Bespoke',
      desc: 'For brands demanding a category-defining flagship website that establishes immediate trust, commands premium pricing, and dominates search.',
      price: currency === 'INR' ? '1,20,000' : '1,750',
      timeline: '3 – 4 Weeks Turnaround',
      featured: true,
      deliverables: [
        'Up to 10 Custom Bespoke Pages & Templates',
        'Figma Design System with 12-color token hierarchy',
        'Subtle micro-animations & smooth interactive motion',
        'Enterprise Headless CMS (Sanity / Strapi / Custom)',
        'Full Technical SEO Schema + Analytics Funnel',
        'Priority Post-Launch Support & CDN Routing'
      ],
      ctaText: 'Choose Flagship'
    },
    {
      id: 'saas',
      name: 'SaaS MVP & MERN Engineering',
      desc: 'Full-stack engineering for venture-backed and bootstrapped software products requiring secure architectures and instant user onboarding.',
      price: currency === 'INR' ? '2,40,000' : '3,400',
      timeline: '4 – 6 Weeks Delivery',
      featured: false,
      deliverables: [
        'Production-grade MERN Stack (React, Node, Express, MongoDB)',
        'User Authentication & Role-Based Access Control',
        'Interactive App Dashboard & Analytics Visualizations',
        'Stripe / Razorpay Subscription & Metered Billing',
        'REST / GraphQL APIs & Webhook Subscriptions',
        'Complete Source Code IP Transfer & Deployment Setup'
      ],
      ctaText: 'Build SaaS MVP'
    }
  ];

  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Flat Transparent Rates</div>
          <h2 className="section-title" id="pricing-heading">Packages Tailored To Your Growth Stage</h2>
          <p className="section-desc">
            Predictable investments with firm delivery timelines. Toggle between ₹ INR and $ USD at the top anytime.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`pricing-card ${tier.featured ? 'featured' : ''}`}
              id={`pricing-tier-${tier.id}`}
            >
              {tier.featured && <div className="featured-ribbon">Most Popular</div>}
              <h3 className={`pricing-tier-name ${tier.featured ? 'text-gold' : ''}`}>{tier.name}</h3>
              <p className="pricing-tier-desc">{tier.desc}</p>

              <div className="pricing-cost-row">
                <div className={`price-big-number ${tier.featured ? 'text-gold' : ''}`}>
                  <span className="price-currency-sign">{symbol}</span>
                  {tier.price}
                </div>
                <div className="pricing-timeline-badge">
                  <Clock size={14} aria-hidden="true" />
                  <span>{tier.timeline}</span>
                </div>
              </div>

              <ul className="pricing-deliverables">
                {tier.deliverables.map((item, idx) => (
                  <li key={idx} className="deliverable-item">
                    <Check size={18} color="var(--palette-medium-sage-green)" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`pricing-cta-btn ${tier.featured ? 'primary-tier-btn' : ''}`}
                onClick={() => onSelectTier && onSelectTier(tier.name, `${symbol}${tier.price}`)}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
