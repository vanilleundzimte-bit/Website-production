import { Link } from 'react-router';
import { SITE_NAME } from '../lib/siteConfig';

export function meta() {
  return [
    { title: `Page not found | ${SITE_NAME}` },
    { name: 'robots', content: 'noindex' },
  ];
}

export default function NotFoundRoute() {
  return (
    <section className="vz-section">
      <div className="vz-section-head">
        <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>404</span>
        <h1 className="vz-section-title">
          This page has <em>left the oven.</em>
        </h1>
        <p className="vz-section-lede">
          We couldn&rsquo;t find that page — it may have moved, or the link may be mistyped.
        </p>
      </div>
      <div className="vz-hero-cta" style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Link className="vz-btn vz-btn-primary" to="/shop">Browse the collection</Link>
        <Link className="vz-btn vz-btn-ghost" to="/">Back home <span aria-hidden>→</span></Link>
      </div>
    </section>
  );
}
