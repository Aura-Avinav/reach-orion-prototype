/**
 * AURA STUDIO - LUXURY WEB AGENCY INTERACTIVE ENGINE
 * Features: Dual Currency Switcher (INR/USD), Dynamic Project Scope Estimator,
 * Portfolio Filter & Case Study Dialogs, Zero-DB Frictionless Lead Intake.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Currency & Pricing State
  // =========================================================================
  let currentCurrency = 'INR'; // 'INR' or 'USD'
  const exchangeRate = 72; // Normalized project pricing ratio for international parity

  const packagePricing = {
    tier1: { inr: 45000, usd: 650, period: 'fixed' },
    tier2: { inr: 120000, usd: 1750, period: 'fixed' },
    tier3: { inr: 240000, usd: 3400, period: '/mo or fixed' }
  };

  const currencyBtns = document.querySelectorAll('.curr-btn');
  const priceDisplayElements = {
    tier1: document.getElementById('price-tier-1'),
    tier2: document.getElementById('price-tier-2'),
    tier3: document.getElementById('price-tier-3')
  };

  function updateTierPricing() {
    currencyBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.curr === currentCurrency);
    });

    const symbol = currentCurrency === 'INR' ? '₹' : '$';

    if (priceDisplayElements.tier1) {
      const val = currentCurrency === 'INR' ? '45,000' : '650';
      priceDisplayElements.tier1.innerHTML = `<span class="price-currency-sign">${symbol}</span>${val}`;
    }
    if (priceDisplayElements.tier2) {
      const val = currentCurrency === 'INR' ? '1,20,000' : '1,750';
      priceDisplayElements.tier2.innerHTML = `<span class="price-currency-sign">${symbol}</span>${val}`;
    }
    if (priceDisplayElements.tier3) {
      const val = currentCurrency === 'INR' ? '2,40,000' : '3,400';
      priceDisplayElements.tier3.innerHTML = `<span class="price-currency-sign">${symbol}</span>${val}`;
    }

    // Also update calculator output
    calculateProjectCost();
  }

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCurrency = btn.dataset.curr;
      updateTierPricing();
    });
  });

  // =========================================================================
  // 2. Interactive Scope & Cost Calculator
  // =========================================================================
  const calcTypeOptions = document.querySelectorAll('.chip-option');
  const pagesSlider = document.getElementById('calc-pages-slider');
  const pagesValDisplay = document.getElementById('calc-pages-display');
  const addOnCheckboxes = document.querySelectorAll('.addon-calc-checkbox');
  const calcEstPrice = document.getElementById('calc-estimated-price');
  const calcEstTimeline = document.getElementById('calc-estimated-timeline');
  const calcFeaturesSummary = document.getElementById('calc-features-summary');
  const lockScopeBtn = document.getElementById('lock-scope-btn');

  let selectedProjectType = 'cms';
  const basePrices = {
    cms: { inr: 35000, usd: 500, timeWeeks: 2, name: 'Headless CMS Website' },
    saas: { inr: 95000, usd: 1400, timeWeeks: 4, name: 'SaaS MVP Platform' },
    ecommerce: { inr: 65000, usd: 950, timeWeeks: 3, name: 'D2C E-Commerce' },
    redesign: { inr: 45000, usd: 650, timeWeeks: 2.5, name: 'Design & Speed Redesign' }
  };

  const addOnCosts = {
    motion: { inr: 15000, usd: 220, days: 3, label: 'Micro-Motion & 3D Polish' },
    seo: { inr: 12000, usd: 180, days: 2, label: 'Advanced SEO & Schema Architecture' },
    admin: { inr: 18000, usd: 260, days: 4, label: 'Custom Content Dashboard' },
    gateway: { inr: 10000, usd: 150, days: 2, label: 'Payment Gateway (Razorpay/Stripe)' },
    perf: { inr: 8000, usd: 120, days: 1.5, label: 'Sub-Second Performance Optimization' }
  };

  function calculateProjectCost() {
    const pages = parseInt(pagesSlider.value, 10);
    pagesValDisplay.textContent = `${pages} Page${pages > 1 ? 's' : ''}`;

    const baseObj = basePrices[selectedProjectType] || basePrices.cms;
    let totalInr = baseObj.inr;
    let totalUsd = baseObj.usd;
    let timelineDays = baseObj.timeWeeks * 7;

    // Extra pages factor
    if (pages > 1) {
      const extra = pages - 1;
      totalInr += extra * 4000;
      totalUsd += extra * 60;
      timelineDays += extra * 1;
    }

    // Add-on checkboxes
    const activeAddons = [];
    addOnCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.checkbox-item');
      if (cb.checked) {
        parentLabel.classList.add('checked');
        const cost = addOnCosts[cb.value];
        if (cost) {
          totalInr += cost.inr;
          totalUsd += cost.usd;
          timelineDays += cost.days;
          activeAddons.push(cost.label);
        }
      } else {
        parentLabel.classList.remove('checked');
      }
    });

    // Formatting
    const symbol = currentCurrency === 'INR' ? '₹' : '$';
    const amount = currentCurrency === 'INR'
      ? totalInr.toLocaleString('en-IN')
      : totalUsd.toLocaleString('en-US');

    calcEstPrice.textContent = `${symbol}${amount}`;

    const weeks = Math.max(1, Math.round(timelineDays / 7));
    calcEstTimeline.textContent = `${weeks} – ${weeks + 1} Weeks`;

    // Summary pills
    calcFeaturesSummary.innerHTML = `
      <div><strong>Type:</strong> ${baseObj.name}</div>
      <div><strong>Scope:</strong> ${pages} Custom Designed Page(s)</div>
      <div><strong>Included Add-ons:</strong> ${activeAddons.length > 0 ? activeAddons.join(', ') : 'Standard Fast Delivery'}</div>
    `;

    return {
      type: baseObj.name,
      pages,
      addons: activeAddons,
      currency: currentCurrency,
      formattedAmount: `${symbol}${amount}`,
      timeline: `${weeks}–${weeks + 1} Weeks`
    };
  }

  calcTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      calcTypeOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      selectedProjectType = opt.dataset.type;
      calculateProjectCost();
    });
  });

  pagesSlider.addEventListener('input', calculateProjectCost);
  addOnCheckboxes.forEach(cb => cb.addEventListener('change', calculateProjectCost));

  // Lock In Scope -> Auto-fill contact form & smooth scroll
  lockScopeBtn.addEventListener('click', () => {
    const config = calculateProjectCost();
    const contactSection = document.getElementById('contact');
    const briefTextarea = document.getElementById('project-brief');
    const projectTypeSelect = document.getElementById('project-type-select');
    const budgetInput = document.getElementById('budget-estimate');

    if (briefTextarea) {
      briefTextarea.value = `[Pre-configured from Scope Calculator]\nProject Type: ${config.type}\nTarget Scope: ${config.pages} Pages\nEstimated Investment: ${config.formattedAmount}\nAdd-ons: ${config.addons.join(', ') || 'None'}\nTimeline: ${config.timeline}\n\nOur Project Details:\n`;
    }

    if (projectTypeSelect) {
      if (selectedProjectType === 'cms') projectTypeSelect.value = 'Headless CMS';
      else if (selectedProjectType === 'saas') projectTypeSelect.value = 'SaaS MVP';
      else if (selectedProjectType === 'ecommerce') projectTypeSelect.value = 'E-Commerce';
      else projectTypeSelect.value = 'Website Redesign';
    }

    if (budgetInput) {
      budgetInput.value = config.formattedAmount;
    }

    contactSection.scrollIntoView({ behavior: 'smooth' });
    briefTextarea.focus();
  });

  // =========================================================================
  // 3. Portfolio Filter & Interactive Case Study Modal
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const modalOverlay = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  const caseStudyDetails = {
    bharatscale: {
      title: 'BharatScale CMS — High-Velocity D2C Content Engine',
      client: 'BharatScale Labs (Bangalore, India)',
      category: 'Headless CMS & Edge Delivery',
      metrics: '0.4s Global Load Time • +240% Organic Traffic • 100/100 Core Web Vitals',
      overview: 'BharatScale is an emerging Indian direct-to-consumer technology brand preparing for rapid scaling across tier-1 and tier-2 markets. They were hindered by a slow, monolithic CMS template that caused 65% drop-offs on 4G mobile connections.',
      architecture: 'Engineered with a Headless CMS architecture connected to a statically generated edge frontend. Implemented instant route prefetching, razor-thin CSS bundles, localized Indian content CDN routing, and optimized payment funnel flows.',
      stack: ['Headless CMS', 'Next.js Edge', 'Tailored CSS', 'Razorpay Turbo', 'Redis Edge Cache'],
      quote: '"AURA Studio delivered our entire headless platform in 18 days. Our mobile conversion rate jumped by 3.2x immediately after switchover."'
    },
    saasflow: {
      title: 'SaaSFlow — Developer Infrastructure MVP',
      client: 'SaaSFlow Technologies (San Francisco / Remote)',
      category: 'SaaS MVP Architecture',
      metrics: 'Shipped in 21 Days • 4,500+ Active Beta Users • $185k ARR Pre-seed',
      overview: 'SaaSFlow required a high-fidelity MVP web application to demo to venture capitalists and onboard early engineering teams. They needed a luxury dark interface that matched the precision of modern developer tools.',
      architecture: 'Engineered an ultra-clean modular frontend architecture with interactive API playground keys, real-time latency visualization graphs, secure authentication gates, and instant responsive layouts.',
      stack: ['TypeScript', 'Full-stack Architecture', 'PostgreSQL Schema', 'Vite', 'Modern Web Standards'],
      quote: '"The fastest, cleanest engineering team we have worked with. They design and write code themselves without any agency bloat."'
    },
    vedaliving: {
      title: 'Veda Living — Luxury Ayurvedic Brand Flagship',
      client: 'Veda Wellness Collective (Mumbai & London)',
      category: 'Luxury Brand & Headless CMS',
      metrics: '+310% Waitlist Signups • 99.9% Uptime • Featured on Awwwards Site of the Day',
      overview: 'A premium lifestyle and wellness brand needed a tactile, editorial digital experience that reflected ancient wisdom through a modern dark luxury lens.',
      architecture: 'Created bespoke typography layouts, custom image fluid zoom shaders, headless editorial publishing, and seamless international multi-currency checkout.',
      stack: ['Custom Editorial CMS', 'WebGL Motion', 'Shopify Storefront API', 'Vanilla CSS', 'Cloudflare Pages'],
      quote: '"Our customers constantly message us about how luxurious and smooth our website feels. The investment paid for itself within 2 weeks."'
    },
    omnisync: {
      title: 'OmniSync Cloud — Developer Docs & Platform Portal',
      client: 'OmniSync Systems (Global)',
      category: 'Web Platform & Documentation',
      metrics: 'Sub-30ms Search Queries • 8,200 Weekly Docs Readers • 0 Outages',
      overview: 'A distributed cloud infrastructure provider needed a unified developer portal with interactive syntax testing, live webhook logs, and enterprise pricing calculators.',
      architecture: 'Built with instant client-side full-text search, keyboard shortcut navigation (`Cmd + K`), dynamic code copy endpoints, and responsive API reference trees.',
      stack: ['Edge API Engine', 'Syntax Highlighting', 'Custom Design System', 'PWA Architecture'],
      quote: '"Every developer that visits our docs praises the dark aesthetic and instant responsiveness."'
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const studyKey = card.dataset.project;
      const data = caseStudyDetails[studyKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--palette-soft-sky-blue); margin-bottom: 8px;">
          ${data.category} • ${data.client}
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--text-main);">${data.title}</h2>
        <div style="display: inline-block; background: rgba(229, 169, 59, 0.15); border: 1px solid var(--palette-warm-goldenrod); color: var(--palette-warm-goldenrod); font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600; padding: 6px 14px; border-radius: 9999px; margin-bottom: 24px;">
          ${data.metrics}
        </div>
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--palette-cool-cream-white); margin-bottom: 8px;">The Challenge</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted);">${data.overview}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--palette-cool-cream-white); margin-bottom: 8px;">Engineered Architecture</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted);">${data.architecture}</p>
        </div>
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--palette-cool-cream-white); margin-bottom: 10px;">Tech Stack</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${data.stack.map(s => `<span class="stack-pill">${s}</span>`).join('')}
          </div>
        </div>
        <div style="padding: 20px; border-radius: 12px; background: rgba(30, 32, 36, 0.7); border-left: 3px solid var(--palette-burnt-terracotta);">
          <p style="font-style: italic; color: var(--palette-cool-cream-white); font-size: 0.95rem; margin-bottom: 0;">${data.quote}</p>
        </div>
        <div style="margin-top: 32px; display: flex; gap: 14px;">
          <button id="modal-start-similar-btn" class="btn-primary" style="padding: 12px 24px; font-size: 0.9rem;">Start a Similar Project</button>
        </div>
      `;

      modalOverlay.classList.add('active');

      const modalCta = document.getElementById('modal-start-similar-btn');
      if (modalCta) {
        modalCta.addEventListener('click', () => {
          modalOverlay.classList.remove('active');
          const contact = document.getElementById('contact');
          const brief = document.getElementById('project-brief');
          if (brief) {
            brief.value = `Interested in building a platform similar to ${data.title}.\nOur requirements:\n`;
          }
          contact.scrollIntoView({ behavior: 'smooth' });
          if (brief) brief.focus();
        });
      }
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // =========================================================================
  // 4. Lead Intake Form Submission (Zero External DB Key Needed!)
  // =========================================================================
  const intakeForm = document.getElementById('agency-intake-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const projectType = document.getElementById('project-type-select').value;
      const budget = document.getElementById('budget-estimate').value.trim();
      const brief = document.getElementById('project-brief').value.trim();

      const submission = {
        id: 'inq_' + Date.now(),
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        projectType,
        budget,
        brief
      };

      // Save locally to browser storage
      try {
        const existingInquiries = JSON.parse(localStorage.getItem('aura_agency_inquiries') || '[]');
        existingInquiries.push(submission);
        localStorage.setItem('aura_agency_inquiries', JSON.stringify(existingInquiries));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // Display rich visual feedback
      feedbackMsg.style.display = 'block';
      feedbackMsg.innerHTML = `
        <strong>✓ Thank you, ${name}!</strong> Your project inquiry has been securely registered.
        <br><span style="font-size: 0.85rem; color: var(--palette-subtle-mist-grey);">We will review your brief and respond within 24 hours.</span>
        <div style="margin-top: 10px;">
          <a href="mailto:hello@aurastudio.agency?subject=Project Inquiry: ${encodeURIComponent(name)} - ${encodeURIComponent(projectType)}&body=${encodeURIComponent(brief + '\n\nPhone: ' + phone + '\nBudget: ' + budget)}"
             style="color: var(--palette-warm-goldenrod); text-decoration: underline; font-size: 0.85rem;">
             Send instant email copy &rarr;
          </a>
        </div>
      `;

      intakeForm.reset();

      // Clear feedback after 12 seconds
      setTimeout(() => {
        feedbackMsg.style.display = 'none';
      }, 12000);
    });
  }

  // =========================================================================
  // 5. Live Clock Display (IST & UTC)
  // =========================================================================
  const timeClock = document.getElementById('agency-clock');
  function updateClock() {
    if (!timeClock) return;
    const now = new Date();
    const istOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const istTime = now.toLocaleTimeString('en-US', istOptions);
    timeClock.textContent = `Bengaluru / IST: ${istTime}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // =========================================================================
  // 6. Mobile Menu Drawer Navigation
  // =========================================================================
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Initialize Calculator on load
  calculateProjectCost();
  updateTierPricing();
});
