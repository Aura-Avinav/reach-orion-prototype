const express = require('express');
const router = express.Router();

const BASE_PRICES = {
  cms: { inr: 35000, usd: 500, timeWeeks: 2, name: 'Headless CMS Website' },
  saas: { inr: 95000, usd: 1400, timeWeeks: 4, name: 'SaaS MVP Platform' },
  ecommerce: { inr: 65000, usd: 950, timeWeeks: 3, name: 'D2C E-Commerce' },
  redesign: { inr: 45000, usd: 650, timeWeeks: 2.5, name: 'Design & Speed Redesign' }
};

const ADDON_PRICING = {
  motion: { inr: 15000, usd: 220, days: 3, label: 'Micro-Motion & 3D Polish' },
  seo: { inr: 12000, usd: 180, days: 2, label: 'Advanced SEO & Schema Architecture' },
  admin: { inr: 18000, usd: 260, days: 4, label: 'Custom Content Dashboard' },
  gateway: { inr: 10000, usd: 150, days: 2, label: 'Payment Gateway (Razorpay/Stripe)' },
  perf: { inr: 8000, usd: 120, days: 1.5, label: 'Sub-Second Performance Optimization' }
};

// POST /api/estimates/calculate
router.post('/calculate', (req, res) => {
  const { projectType = 'cms', pages = 1, addons = [], currency = 'INR' } = req.body;
  const base = BASE_PRICES[projectType] || BASE_PRICES.cms;

  let totalInr = base.inr;
  let totalUsd = base.usd;
  let timelineDays = base.timeWeeks * 7;

  const validPages = Math.max(1, parseInt(pages, 10) || 1);
  if (validPages > 1) {
    const extra = validPages - 1;
    totalInr += extra * 4000;
    totalUsd += extra * 60;
    timelineDays += extra * 1;
  }

  const activeAddonDetails = [];
  addons.forEach(key => {
    if (ADDON_PRICING[key]) {
      const item = ADDON_PRICING[key];
      totalInr += item.inr;
      totalUsd += item.usd;
      timelineDays += item.days;
      activeAddonDetails.push(item.label);
    }
  });

  const weeks = Math.max(1, Math.round(timelineDays / 7));
  const symbol = currency === 'INR' ? '₹' : '$';
  const amount = currency === 'INR' ? totalInr : totalUsd;
  const formattedAmount = `${symbol}${amount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`;

  res.json({
    success: true,
    data: {
      type: base.name,
      pages: validPages,
      currency,
      totalInr,
      totalUsd,
      formattedAmount,
      timeline: `${weeks}–${weeks + 1} Weeks`,
      addons: activeAddonDetails
    }
  });
});

module.exports = router;
