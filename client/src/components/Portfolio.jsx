import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const FALLBACK_PROJECTS = [
  {
    slug: 'bharatscale',
    title: 'BharatScale CMS — High-Velocity D2C Content Engine',
    client: 'BharatScale Labs (Bangalore, India)',
    category: 'cms',
    categoryLabel: 'Headless CMS',
    metrics: '0.4s Global Load Time • +240% Organic Traffic • 100/100 Core Web Vitals',
    statBadge: '+240% Traffic Lift',
    year: '2026 • Bangalore',
    image: '/assets/cms-preview.jpg',
    desc: 'Ultra-fast headless content infrastructure for a high-growth Indian direct-to-consumer technology brand preparing for pan-India expansion.',
    overview: 'BharatScale is an emerging Indian direct-to-consumer technology brand preparing for rapid scaling across tier-1 and tier-2 markets. They were hindered by a slow, monolithic CMS template that caused 65% drop-offs on 4G mobile connections.',
    architecture: 'Engineered with a Headless CMS architecture connected to a statically generated edge frontend. Implemented instant route prefetching, razor-thin CSS bundles, localized Indian content CDN routing, and optimized payment funnel flows.',
    stack: ['Headless CMS', 'Next.js Edge', 'Tailored CSS', 'Razorpay Turbo', 'Redis Edge Cache'],
    quote: '"AURA Studio delivered our entire headless platform in 18 days. Our mobile conversion rate jumped by 3.2x immediately after switchover."'
  },
  {
    slug: 'saasflow',
    title: 'SaaSFlow — Developer Infrastructure MVP',
    client: 'SaaSFlow Technologies (San Francisco / Remote)',
    category: 'saas',
    categoryLabel: 'SaaS MVP',
    metrics: 'Shipped in 21 Days • 4,500+ Active Beta Users • $185k ARR Pre-seed',
    statBadge: '21 Days to Launch',
    year: '2026 • SF / Remote',
    image: '/assets/saas-preview.jpg',
    desc: 'High-precision developer tools dashboard with real-time latency visualization and frictionless API key provisioning for enterprise software teams.',
    overview: 'SaaSFlow required a high-fidelity MVP web application to demo to venture capitalists and onboard early engineering teams. They needed a luxury dark interface that matched the precision of modern developer tools.',
    architecture: 'Engineered an ultra-clean modular frontend architecture with interactive API playground keys, real-time latency visualization graphs, secure authentication gates, and instant responsive layouts.',
    stack: ['TypeScript', 'Full-stack MERN', 'MongoDB / Postgres', 'Vite', 'Modern Web Standards'],
    quote: '"The fastest, cleanest engineering team we have worked with. They design and write code themselves without any agency bloat."'
  },
  {
    slug: 'vedaliving',
    title: 'Veda Living — Luxury Ayurvedic Brand Flagship',
    client: 'Veda Wellness Collective (Mumbai & London)',
    category: 'editorial',
    categoryLabel: 'Luxury & D2C',
    metrics: '+310% Waitlist Signups • 99.9% Uptime • Featured on Awwwards Site of the Day',
    statBadge: '3.1x Conversion Rate',
    year: '2025 • Mumbai & London',
    image: '/assets/luxury-preview.jpg',
    desc: 'Editorial luxury e-commerce experience crafted for an ancient wellness house, featuring fluid typography, gold foil textures, and instant checkout.',
    overview: 'A premium lifestyle and wellness brand needed a tactile, editorial digital experience that reflected ancient wisdom through a modern dark luxury lens.',
    architecture: 'Created bespoke typography layouts, custom image fluid zoom shaders, headless editorial publishing, and seamless international multi-currency checkout.',
    stack: ['Custom Editorial CMS', 'WebGL Motion', 'Shopify Storefront API', 'Vanilla CSS Tokens', 'Cloudflare Pages'],
    quote: '"Our customers constantly message us about how luxurious and smooth our website feels. The investment paid for itself within 2 weeks."'
  },
  {
    slug: 'omnisync',
    title: 'OmniSync Cloud — Developer Docs & Platform Portal',
    client: 'OmniSync Systems (Global)',
    category: 'saas',
    categoryLabel: 'Web Platform',
    metrics: 'Sub-30ms Search Queries • 8,200 Weekly Docs Readers • 0 Outages',
    statBadge: 'Sub-30ms Search',
    year: '2025 • Global',
    image: '/assets/devtools-preview.jpg',
    desc: 'Mission-critical developer documentation hub with instant client-side full-text search, dark syntax themes, and interactive API playgrounds.',
    overview: 'A distributed cloud infrastructure provider needed a unified developer portal with interactive syntax testing, live webhook logs, and enterprise pricing calculators.',
    architecture: 'Built with instant client-side full-text search, keyboard shortcut navigation (Cmd + K), dynamic code copy endpoints, and responsive API reference trees.',
    stack: ['Edge API Engine', 'Syntax Highlighting', 'Custom Design System', 'PWA Architecture'],
    quote: '"Every developer that visits our docs praises the dark aesthetic and instant responsiveness."'
  }
];

export default function Portfolio({ onSelectSimilarProject }) {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [activeModalProject, setActiveModalProject] = useState(null);

  useEffect(() => {
    // Attempt to load from Express API
    fetch('/api/case-studies')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          // Merge API data with desc property
          const merged = data.data.map(item => {
            const fallback = FALLBACK_PROJECTS.find(f => f.slug === item.slug);
            return { ...fallback, ...item };
          });
          setProjects(merged);
        }
      })
      .catch(() => {
        // Silently keep fallback projects
      });
  }, []);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const handleStartSimilar = (project) => {
    setActiveModalProject(null);
    if (onSelectSimilarProject) {
      onSelectSimilarProject(project.title);
    }
  };

  return (
    <section className="portfolio-section" id="works" aria-labelledby="works-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Case Studies</div>
          <h2 className="section-title" id="works-heading">Crafted For High Growth &amp; Distinction</h2>
          <p className="section-desc">
            Every project is custom-engineered from raw code to achieve sub-second load times, editorial prestige, and relentless conversion.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="portfolio-filter-bar" role="tablist" aria-label="Portfolio Filters">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            id="filter-all-btn"
          >
            All Projects
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'cms' ? 'active' : ''}`}
            onClick={() => setFilter('cms')}
            id="filter-cms-btn"
          >
            Headless CMS
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'saas' ? 'active' : ''}`}
            onClick={() => setFilter('saas')}
            id="filter-saas-btn"
          >
            SaaS MVPs
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'editorial' ? 'active' : ''}`}
            onClick={() => setFilter('editorial')}
            id="filter-editorial-btn"
          >
            Luxury &amp; D2C
          </button>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-grid" id="portfolio-items-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.slug}
              className="portfolio-card"
              data-category={project.category}
              data-project={project.slug}
              tabIndex={0}
              aria-label={`View ${project.title} Case Study`}
              onClick={() => setActiveModalProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModalProject(project);
                }
              }}
            >
              <div className="portfolio-thumbnail-wrap">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  className="mockup-preview-svg"
                  loading="lazy"
                />
                <span className="portfolio-tag-float">{project.categoryLabel}</span>
                <span className="portfolio-stat-badge">{project.statBadge}</span>
              </div>
              <div className="portfolio-info">
                <div className="portfolio-client-header">
                  <h3 className="portfolio-title">{project.title.split('—')[0].trim()}</h3>
                  <span className="portfolio-year">{project.year}</span>
                </div>
                <p className="portfolio-desc">{project.desc || project.overview}</p>
                <div className="portfolio-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-pill">{tech}</span>
                  ))}
                </div>
                <span className="card-action-link">
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Modal Dialog */}
      {activeModalProject && (
        <div
          className="modal-overlay active"
          id="case-study-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.id === 'case-study-modal') {
              setActiveModalProject(null);
            }
          }}
        >
          <div className="modal-container" role="document">
            <button
              type="button"
              className="modal-close"
              id="modal-close-btn"
              aria-label="Close dialog"
              onClick={() => setActiveModalProject(null)}
            >
              <X size={20} />
            </button>
            <div className="modal-body" id="modal-body-content">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--palette-soft-sky-blue)', marginBottom: '8px' }}>
                {activeModalProject.categoryLabel} • {activeModalProject.client}
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--text-main)' }}>
                {activeModalProject.title}
              </h2>
              <div style={{
                display: 'inline-block',
                background: 'rgba(229, 169, 59, 0.15)',
                border: '1px solid var(--palette-warm-goldenrod)',
                color: 'var(--palette-warm-goldenrod)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '9999px',
                marginBottom: '24px'
              }}>
                {activeModalProject.metrics}
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: 'var(--palette-cool-cream-white)', marginBottom: '8px' }}>The Challenge</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{activeModalProject.overview}</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: 'var(--palette-cool-cream-white)', marginBottom: '8px' }}>Engineered Architecture</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{activeModalProject.architecture}</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: 'var(--palette-cool-cream-white)', marginBottom: '10px' }}>Tech Stack</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeModalProject.stack.map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(30, 32, 36, 0.7)', borderLeft: '3px solid var(--palette-burnt-terracotta)' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--palette-cool-cream-white)', fontSize: '0.95rem', marginBottom: 0 }}>
                  {activeModalProject.quote}
                </p>
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '14px' }}>
                <button
                  type="button"
                  id="modal-start-similar-btn"
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '0.9rem' }}
                  onClick={() => handleStartSimilar(activeModalProject)}
                >
                  Start a Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
