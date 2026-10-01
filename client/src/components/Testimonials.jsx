import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      stars: '★★★★★',
      quote:
        '"As an Indian startup bootstrapping pre-launch, every rupee and every week counts. AURA Studio gave us a headless CMS platform that feels like it cost 10x what we paid. Our investor pitch meetings started with compliments on our site."',
      author: 'Rohan Kulkarni',
      role: 'Founder, BharatScale Labs',
      initials: 'RK'
    },
    {
      stars: '★★★★★',
      quote:
        '"Most agencies claim they do full-stack, but then outsource the development to low-cost subcontractors. Working directly with founders who both designed our dark UI and wrote the entire MVP code in 3 weeks was a revelation."',
      author: 'Devin Ross',
      role: 'CTO, SaaSFlow Technologies',
      initials: 'DR'
    },
    {
      stars: '★★★★★',
      quote:
        '"Our mobile bounce rate dropped from 58% to under 18% within 48 hours of deploying our new headless store. The 12-color branding palette looks astonishing in dark mode. Absolutely world-class."',
      author: 'Ananya Sengupta',
      role: 'Co-Founder, Veda Wellness',
      initials: 'AS'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Founder Endorsements</div>
          <h2 className="section-title" id="testimonials-heading">Trusted By Visionaries Building What's Next</h2>
          <p className="section-desc">
            Read how our headless CMS and MVP builds accelerate pre-launch momentum and investor conviction.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-card">
              <div>
                <div className="quote-stars">{r.stars}</div>
                <p className="quote-body">{r.quote}</p>
              </div>
              <div className="client-author-row">
                <div className="client-avatar-circle">{r.initials}</div>
                <div>
                  <div className="client-name">{r.author}</div>
                  <div className="client-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
