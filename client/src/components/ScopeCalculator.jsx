import React, { useState, useMemo } from 'react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

const BASE_PRICES = {
  cms: { inr: 35000, usd: 500, timeWeeks: 2, name: 'Headless CMS Website', desc: 'For pre-launch businesses & fast blogs' },
  saas: { inr: 95000, usd: 1400, timeWeeks: 4, name: 'SaaS MVP Platform', desc: 'App dashboard, auth & dynamic data' },
  ecommerce: { inr: 65000, usd: 950, timeWeeks: 3, name: 'D2C E-Commerce', desc: 'Shopify storefront or custom checkout' },
  redesign: { inr: 45000, usd: 650, timeWeeks: 2.5, name: 'Design & Speed Redesign', desc: 'Rebuild existing slow website for conversion' }
};

const ADD_ONS = [
  { id: 'seo', label: 'Advanced SEO & Schema Architecture', inr: 12000, usd: 180, days: 2 },
  { id: 'admin', label: 'Visual CMS Admin Panel', inr: 18000, usd: 260, days: 4 },
  { id: 'motion', label: 'Bespoke Micro-Motion & 3D Polish', inr: 15000, usd: 220, days: 3 },
  { id: 'gateway', label: 'Razorpay / Stripe Gateway', inr: 10000, usd: 150, days: 2 },
  { id: 'perf', label: 'Sub-Second TTFB & Edge Tuning', inr: 8000, usd: 120, days: 1.5 }
];

export default function ScopeCalculator({ currency = 'INR', onLockScope }) {
  const [selectedType, setSelectedType] = useState('cms');
  const [pages, setPages] = useState(5);
  const [selectedAddons, setSelectedAddons] = useState(['seo', 'admin', 'perf']);

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const base = BASE_PRICES[selectedType] || BASE_PRICES.cms;
    let totalInr = base.inr;
    let totalUsd = base.usd;
    let timelineDays = base.timeWeeks * 7;

    if (pages > 1) {
      const extra = pages - 1;
      totalInr += extra * 4000;
      totalUsd += extra * 60;
      timelineDays += extra * 1;
    }

    const activeLabels = [];
    selectedAddons.forEach(addonId => {
      const item = ADD_ONS.find(a => a.id === addonId);
      if (item) {
        totalInr += item.inr;
        totalUsd += item.usd;
        timelineDays += item.days;
        activeLabels.push(item.label);
      }
    });

    const weeks = Math.max(1, Math.round(timelineDays / 7));
    const symbol = currency === 'INR' ? '₹' : '$';
    const amountVal = currency === 'INR' ? totalInr : totalUsd;
    const formattedAmount = `${symbol}${amountVal.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`;

    return {
      typeName: base.name,
      pages,
      currency,
      totalInr,
      totalUsd,
      formattedAmount,
      timeline: `${weeks} – ${weeks + 1} Weeks`,
      addonLabels: activeLabels
    };
  }, [selectedType, pages, selectedAddons, currency]);

  const handleLockIn = () => {
    if (onLockScope) {
      onLockScope(calculation);
    }
  };

  return (
    <section className="calculator-section" id="calculator" aria-labelledby="calc-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Interactive Estimator</div>
          <h2 className="section-title" id="calc-heading">Estimate Your Investment &amp; Timeline</h2>
          <p className="section-desc">
            No vague "get in touch for pricing" walls. Configure your exact requirements below and see transparent estimates instantly.
          </p>
        </div>

        <div className="calculator-wrapper">
          {/* Left Column: Config inputs */}
          <div className="calc-inputs-col">
            {/* 1. Project Type */}
            <div>
              <label className="calc-group-title" id="lbl-project-type">
                <span>1. Select Project Archetype</span>
              </label>
              <div className="calc-chips-grid" role="radiogroup" aria-labelledby="lbl-project-type">
                {Object.entries(BASE_PRICES).map(([key, item]) => (
                  <label
                    key={key}
                    className={`chip-option ${selectedType === key ? 'selected' : ''}`}
                    onClick={() => setSelectedType(key)}
                  >
                    <input
                      type="radio"
                      name="calc-project-type"
                      value={key}
                      checked={selectedType === key}
                      onChange={() => setSelectedType(key)}
                    />
                    <span className="chip-title">{item.name}</span>
                    <span className="chip-desc">{item.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Scope / Page Count Slider */}
            <div className="range-slider-container">
              <div className="slider-label-row">
                <span className="calc-group-title" style={{ marginBottom: 0 }}>2. Number of Custom Pages</span>
                <span className="slider-value-display" id="calc-pages-display">
                  {pages} Page{pages > 1 ? 's' : ''}
                </span>
              </div>
              <input
                type="range"
                className="custom-range"
                id="calc-pages-slider"
                min="1"
                max="15"
                value={pages}
                step="1"
                onChange={(e) => setPages(parseInt(e.target.value, 10))}
                aria-label="Select custom page count"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                <span>1 Page (Landing)</span>
                <span>5 Pages (Standard)</span>
                <span>10 Pages (Comprehensive)</span>
                <span>15+ Pages</span>
              </div>
            </div>

            {/* 3. Feature Add-ons */}
            <div>
              <label className="calc-group-title">
                <span>3. Optional High-Impact Capabilities</span>
              </label>
              <div className="calc-checkbox-list">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`checkbox-item ${isChecked ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleAddon(addon.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="addon-calc-checkbox"
                        value={addon.id}
                        checked={isChecked}
                        onChange={() => {}}
                      />
                      <span>{addon.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Output Card */}
          <div className="calc-output-col">
            <div className="calc-result-card glass-panel">
              <span className="result-label">Estimated Investment</span>
              <div className="result-price" id="calc-estimated-price">
                {calculation.formattedAmount}
              </div>

              <div className="result-timeline-box">
                <span className="timeline-title">Estimated Rapid Sprint:</span>
                <span className="timeline-value" id="calc-estimated-timeline">
                  {calculation.timeline}
                </span>
              </div>

              <div className="calc-summary-pills" id="calc-features-summary">
                <div><strong>Type:</strong> {calculation.typeName}</div>
                <div><strong>Scope:</strong> {calculation.pages} Custom Designed Page(s)</div>
                <div>
                  <strong>Included Add-ons:</strong>{' '}
                  {calculation.addonLabels.length > 0 ? calculation.addonLabels.join(', ') : 'Standard Fast Delivery'}
                </div>
              </div>

              <button
                type="button"
                className="btn-primary"
                id="lock-scope-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleLockIn}
              >
                <span>Lock In This Configuration</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                <ShieldCheck size={14} color="var(--palette-medium-sage-green)" />
                <span>Zero hidden fees • Strict milestone escrow billing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
