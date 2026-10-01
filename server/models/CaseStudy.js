const initialCaseStudies = [
  {
    slug: 'bharatscale',
    title: 'BharatScale CMS — High-Velocity D2C Content Engine',
    client: 'BharatScale Labs (Bangalore, India)',
    category: 'cms',
    categoryLabel: 'Headless CMS',
    metrics: '0.4s Global Load Time • +240% Organic Traffic • 100/100 Core Web Vitals',
    statBadge: '+240% Traffic Lift',
    year: '2026',
    location: 'Bangalore, India',
    image: '/assets/cms-preview.jpg',
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
    year: '2026',
    location: 'SF / Remote',
    image: '/assets/saas-preview.jpg',
    overview: 'SaaSFlow required a high-fidelity MVP web application to demo to venture capitalists and onboard early engineering teams. They needed a luxury dark interface that matched the precision of modern developer tools.',
    architecture: 'Engineered an ultra-clean modular frontend architecture with interactive API playground keys, real-time latency visualization graphs, secure authentication gates, and instant responsive layouts.',
    stack: ['TypeScript', 'Full-stack Architecture', 'PostgreSQL Schema', 'Vite', 'Modern Web Standards'],
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
    year: '2025',
    location: 'Mumbai & London',
    image: '/assets/luxury-preview.jpg',
    overview: 'A premium lifestyle and wellness brand needed a tactile, editorial digital experience that reflected ancient wisdom through a modern dark luxury lens.',
    architecture: 'Created bespoke typography layouts, custom image fluid zoom shaders, headless editorial publishing, and seamless international multi-currency checkout.',
    stack: ['Custom Editorial CMS', 'WebGL Motion', 'Shopify Storefront API', 'Vanilla CSS', 'Cloudflare Pages'],
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
    year: '2025',
    location: 'Global',
    image: '/assets/devtools-preview.jpg',
    overview: 'A distributed cloud infrastructure provider needed a unified developer portal with interactive syntax testing, live webhook logs, and enterprise pricing calculators.',
    architecture: 'Built with instant client-side full-text search, keyboard shortcut navigation (Cmd + K), dynamic code copy endpoints, and responsive API reference trees.',
    stack: ['Edge API Engine', 'Syntax Highlighting', 'Custom Design System', 'PWA Architecture'],
    quote: '"Every developer that visits our docs praises the dark aesthetic and instant responsiveness."'
  }
];

class CaseStudyService {
  static getAll() {
    return initialCaseStudies;
  }

  static getBySlug(slug) {
    return initialCaseStudies.find(c => c.slug === slug) || null;
  }
}

module.exports = { CaseStudyService, initialCaseStudies };
