import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { ShoppingBag, List, X } from '@phosphor-icons/react';
import { useCart } from '../lib/CartContext';

const MARQUEE_ITEMS = ['GLUTEN-FREE', 'NOIDA-BAKED', 'PAN DELHI NCR DELIVERY'];

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'The Collection' },
  { to: '/bulk-party-gifting', label: 'Bulk & Party Gifting' },
  { to: '/custom-orders', label: 'Custom Orders' },
  { to: '/our-story', label: 'Our Story' },
];

function MarqueeGroup({ hidden }) {
  return (
    <div className="vz-marquee-group" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i}>
          {item}
          <span className="vz-dot">·</span>
        </span>
      ))}
    </div>
  );
}

function HeaderNavLink({ to, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `vz-nav-link ${isActive ? 'is-active' : ''}`}
    >
      {label}
    </NavLink>
  );
}

export default function VZHeader() {
  const { cartCount, setShowCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="vz-header">
      <div className="vz-header-inner">
        <Link className="vz-logo" to="/" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo-mark.png" alt="" width="465" height="654" />
          <span className="vz-logo-word">vanille &amp; zimté</span>
        </Link>
        <nav className="vz-nav">
          {NAV_LINKS.map(link => <HeaderNavLink key={link.to} {...link} />)}
        </nav>
        {/* The search and account buttons that used to sit here did nothing when
            tapped — there is no search index and no accounts. Two of the four
            targets in the mobile header were dead, so they're gone. */}
        <div className="vz-header-actions">
          <button
            className="vz-icon-btn"
            onClick={() => setShowCart(true)}
            aria-label={cartCount > 0 ? `Your box, ${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Your box'}
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="vz-cart-badge">{cartCount}</span>}
          </button>
          <button
            className="vz-icon-btn vz-menu-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="vz-mobile-nav"
          >
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="vz-mobile-nav" id="vz-mobile-nav">
            {NAV_LINKS.map(link => (
              <HeaderNavLink key={link.to} {...link} onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
        )}
      </div>
      <div className="vz-announcement">
        <div className="vz-marquee-track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </header>
  );
}
