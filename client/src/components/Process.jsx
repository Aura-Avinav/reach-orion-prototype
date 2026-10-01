import React from 'react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Blueprint & Architecture',
      desc: 'We dissect your business model, target audience, and pre-launch positioning. We define the exact schema, tech stack, and content model before touching a single pixel.'
    },
    {
      num: '02',
      title: 'Bespoke Design',
      desc: 'We craft an editorial dark design system around your brand palette. High-fidelity interactive prototypes in Figma let you experience the exact feel and flow.'
    },
    {
      num: '03',
      title: 'Clean Engineering',
      desc: 'We write clean, semantic HTML5, modern CSS tokens, and lightweight JavaScript. Every route is verified for sub-second latency, accessible ARIA rules, and zero layout shift.'
    },
    {
      num: '04',
      title: 'Launch & Hypercare',
      desc: 'Production deployment, domain DNS switchover, search console verification, and founder training on your new CMS. We stand by your side with 30-60 days dedicated support.'
    }
  ];

  return (
    <section className="process-section" id="process" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Agency Methodology</div>
          <h2 className="section-title" id="process-heading">A Disciplined, Zero-Nonsense Pipeline</h2>
          <p className="section-desc">
            We eliminate endless design committees and bureaucratic lag. Here is how your project goes from concept to live production.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step) => (
            <div key={step.num} className="process-card">
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
