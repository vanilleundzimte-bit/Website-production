import { useEffect } from 'react';
import { Meta, Links, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { CartProvider, useCart } from './lib/CartContext';
import { SITE_NAME, ANALYTICS } from './lib/siteConfig';
import { JsonLd, buildBakerySchema } from './seo/schema';
import VZHeader from './components/Header';
import VZFooter from './components/Footer';
import VZCart from './components/Cart';
import './styles/tokens.css';
import './styles/site.css';

// Configures gtag from an external bundle instead of an inline <script>, so the
// site's CSP script-src can stay allowlist-only (no 'unsafe-inline' needed).
function GoogleAnalytics({ measurementId }) {
  useEffect(() => {
    if (!measurementId) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);
  }, [measurementId]);
  return null;
}

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/assets/logo-mark.png" />
        {/* Canonical URL is per-route — each route's meta() emits its own
            {tagName:'link', rel:'canonical'} entry via <Meta/> below, since
            every page needs its own canonical, not one shared with the homepage. */}
        {ANALYTICS.googleSiteVerification && (
          <meta name="google-site-verification" content={ANALYTICS.googleSiteVerification} />
        )}
        {ANALYTICS.bingSiteVerification && (
          <meta name="msvalidate.01" content={ANALYTICS.bingSiteVerification} />
        )}
        <Meta />
        <Links />
        <JsonLd data={buildBakerySchema()} />
        {ANALYTICS.ga4MeasurementId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4MeasurementId}`} />
        )}
        <GoogleAnalytics measurementId={ANALYTICS.ga4MeasurementId} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function meta() {
  return [
    { title: `${SITE_NAME} — gluten-free baking, Noida & Delhi NCR` },
    { name: 'description', content: 'Gluten-free, plant-based cakes, cookies, and bulk party gifting baked in Noida, delivered across Delhi NCR.' },
  ];
}

function AppShell() {
  const { showCart, setShowCart, cart, removeFromCart, updateQty, enquiryUrl } = useCart();
  return (
    <>
      <VZHeader />
      <main>
        <Outlet />
      </main>
      <VZFooter />
      {showCart && (
        <VZCart
          items={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          enquiryUrl={enquiryUrl}
        />
      )}
    </>
  );
}

export default function Root() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
