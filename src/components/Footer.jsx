import { Link } from 'react-router';
import { InstagramLogo, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';
import { BUSINESS } from '../lib/siteConfig';
import { VZ_DATA } from '../data/products';

// Built from the catalog instead of hand-listed: this column used to advertise
// Birthday Cakes, Cheesecakes, Tres Leches and Namkeens, none of which exist as
// products — all six links dumped you on an unfiltered /shop.
const CATEGORY_ITEMS = [
  { label: 'Everything', to: '/shop' },
  ...VZ_DATA.categories
    .filter(c => c !== 'All')
    .map(c => ({ label: `${c}s`, to: `/shop?cat=${encodeURIComponent(c)}` })),
];

const COLS = [
  { h: 'The Collection', items: CATEGORY_ITEMS },
  {
    h: 'Visit',
    items: [
      { label: 'Custom Orders', to: '/custom-orders' },
      { label: 'Bulk & Party Gifting', to: '/bulk-party-gifting' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    h: 'About',
    items: [
      { label: 'Our Story', to: '/our-story' },
    ],
  },
];

export default function VZFooter() {
  return (
    <footer className="vz-footer">
      <div className="vz-footer-grid">
        <div className="vz-footer-brand">
          <img src="/assets/logo-mark.png" alt="vanille & zimté" width="465" height="654" />
          <p className="vz-footer-name">vanille &amp; zimté</p>
          <p className="vz-footer-tag">Baked with intention. <br />Free from compromise.</p>
          <div className="vz-social">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsappLogo size={18} weight="fill" />
            </a>
            <a
              href={`https://instagram.com/${BUSINESS.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramLogo size={18} />
            </a>
            <a href={`mailto:${BUSINESS.email}`} aria-label="Email">
              <EnvelopeSimple size={18} />
            </a>
          </div>
        </div>
        {COLS.map(col => (
          <div key={col.h} className="vz-footer-col">
            <span className="vz-eyebrow">{col.h}</span>
            <ul>
              {col.items.map(item => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="vz-footer-foot">
        <span>© 2026 vanille &amp; zimté · Noida · delivering across Delhi NCR</span>
        <span className="vz-flourish">baked with intention <span className="vz-star">✦</span></span>
      </div>
    </footer>
  );
}
