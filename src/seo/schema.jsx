import { SITE_URL, BUSINESS } from '../lib/siteConfig';
import { getPackSizes, getSizePrice } from '../lib/pricing';

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify doesn't escape "<", so a value containing "</script>" would
      // otherwise close this tag early and let injected markup execute as HTML.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function buildBakerySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    sameAs: [`https://instagram.com/${BUSINESS.instagram}`],
    image: `${SITE_URL}/assets/logo-mark.png`,
    priceRange: '₹₹',
    servesCuisine: 'Gluten-free bakery, plant-based desserts',
    // schema.org has no FSSAI-specific property, so the licence rides on the
    // generic identifier slot as a named PropertyValue.
    identifier: {
      '@type': 'PropertyValue',
      name: 'FSSAI License',
      value: BUSINESS.fssaiLicence,
    },
    areaServed: BUSINESS.areaServed.map(name => ({ '@type': 'City', name })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  };
}

export function buildProductSchema(product, { url, description } = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: description || product.blurb,
    category: product.cat,
    url,
    brand: { '@type': 'Brand', name: BUSINESS.name },
  };

  const sizes = getPackSizes(product);

  if (product.weight) {
    // One pack means one weight; several means a range. Claiming a bare 200g on a page
    // that also sells a 500g cake would be a true statement used to say something false.
    schema.weight = sizes.length > 1
      ? {
          '@type': 'QuantitativeValue',
          minValue: sizes[0],
          maxValue: sizes[sizes.length - 1],
          unitCode: 'GRM',
        }
      : { '@type': 'QuantitativeValue', value: sizes[0], unitCode: 'GRM' };
  }

  // schema.org wants the price unformatted — a bare number, no symbol and no
  // separators — so this deliberately does not go through formatINR. seller
  // points at the Bakery node root.jsx already emits on every page.
  //
  // Prices come from getSizePrice rather than product.price so the markup can never
  // disagree with the rupees rendered beside it. getPrice's own guard inside
  // getSizePrice subsumes the finite-and-positive check this used to make: an unpriced
  // product yields an empty list and no offers key, exactly as before. The add-on is
  // left out of the range because no pack is sold at base-plus-sauce as a listed price.
  const prices = sizes.map(g => getSizePrice(product, g)).filter(p => p !== null);
  const offerBase = {
    url,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${SITE_URL}/#business` },
  };

  // AggregateOffer rather than ProductGroup/hasVariant: a variant has to be a Product
  // with its own URL, and there is one prerendered route per product with no ?size=
  // param, so every variant would claim this same URL.
  if (prices.length > 1) {
    schema.offers = {
      '@type': 'AggregateOffer',
      ...offerBase,
      lowPrice: String(prices[0]),
      highPrice: String(prices[prices.length - 1]),
      offerCount: prices.length,
    };
  } else if (prices.length === 1) {
    schema.offers = { '@type': 'Offer', ...offerBase, price: String(prices[0]) };
  }

  return schema;
}

export function buildFaqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      datePublished: item.datePublished,
      dateModified: item.dateModified,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
