import Breadcrumbs from '../components/Breadcrumbs';
import FaqItem from '../components/FaqItem';
import { JsonLd, buildFaqSchema, buildBreadcrumbSchema } from '../seo/schema';
import { FAQ_ITEMS, FAQ_LAST_UPDATED } from '../data/faq';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `FAQ — Bulk Gifting, Gluten-Free Baking & Delivery | ${SITE_NAME}`;
  const description = 'Answers on bulk gluten-free party gifting, shelf life, delivery across Delhi NCR, dietary customisation, pricing, and WhatsApp ordering for Vanille & Zimté.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/faq'),
    ...socialMetaTags({ title, description }),
  ];
}

export default function FaqRoute() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />

      <section className="vz-section">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>frequently asked</span>
          <h1 className="vz-section-title">
            Questions, <em>answered.</em>
          </h1>
          <p className="vz-section-lede">
            Everything about bulk party gifting, gluten-free baking, shelf life, and delivery across Delhi NCR.
          </p>
          <p className="vz-fineprint">Last updated: {FAQ_LAST_UPDATED}</p>
        </div>
        <div className="vz-faq-list">
          {FAQ_ITEMS.map(item => <FaqItem key={item.slug} item={item} />)}
        </div>
      </section>

      <JsonLd data={buildFaqSchema(FAQ_ITEMS)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ])} />
    </>
  );
}
