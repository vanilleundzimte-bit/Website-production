import { Quotes } from '@phosphor-icons/react';
import { TESTIMONIALS } from '../data/testimonials';

export default function VZTestimonials() {
  if (!TESTIMONIALS.length) return null;

  return (
    <section className="vz-section vz-section-tonal">
      <div className="vz-section-head" style={{ textAlign: 'center' }}>
        <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>from our table to yours</span>
        <h2 className="vz-section-title" style={{ margin: '14px auto 0' }}>
          Loved, <em>one box at a time.</em>
        </h2>
      </div>
      <div className="vz-testimonials-grid">
        {TESTIMONIALS.map(t => (
          <figure key={t.name} className="vz-testimonial">
            <Quotes size={22} weight="fill" className="vz-testimonial-mark" />
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="vz-testimonial-name">{t.name}</span>
              {t.detail && <span className="vz-testimonial-detail">{t.detail}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
