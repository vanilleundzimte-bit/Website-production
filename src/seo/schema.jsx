import { SITE_URL, BUSINESS } from '../lib/siteConfig';

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

  if (product.weight) {
    schema.weight = {
      '@type': 'QuantitativeValue',
      value: parseInt(product.weight, 10),
      unitCode: 'GRM',
    };
  }

  // schema.org wants the price unformatted — a bare number, no symbol and no
  // separators — so this deliberately does not go through formatINR. seller
  // points at the Bakery node root.jsx already emits on every page.
  if (Number.isFinite(product.price) && product.price > 0) {
    schema.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: String(Math.round(product.price)),
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#business` },
    };
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
