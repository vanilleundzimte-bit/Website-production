import { Link } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';
import EvidencePanel from '../components/EvidencePanel';
import FaqItem from '../components/FaqItem';
import VZOrderForm from '../components/OrderForm';
import { JsonLd, buildFaqSchema, buildBreadcrumbSchema } from '../seo/schema';
import { EVIDENCE_PANELS } from '../data/evidencePanels';
import { VZ_DATA } from '../data/products';
import { PRODUCT_DESCRIPTIONS } from '../data/productDescriptions';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `Bulk Gluten-Free Party Gifting, Delhi NCR | ${SITE_NAME}`;
  const description = 'Healthy, homemade, gluten-free bulk gifting for house parties, birthdays, office parties, and kitty parties across Delhi NCR — shelf-stable favours and centrepiece cakes, various price ranges.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/bulk-party-gifting'),
    ...socialMetaTags({ title, description }),
  ];
}

const MINI_FAQ = [
  {
    slug: 'bulk-large-office-event',
    question: 'Can you handle gifting for a large office event?',
    answer: 'Yes — we regularly bake larger batches of gluten-free cookies, tea cakes, and namkeen mix for office events. Share your headcount and date on WhatsApp and we\'ll confirm feasibility and pricing for your event size.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
  },
  {
    slug: 'mixed-dietary-guests-one-order',
    question: 'How do I gift guests with different dietary needs in one order?',
    answer: 'Since everything is gluten-free and most items have a dairy-free option, a single mixed order can cover guests with different needs without a separate "special" box for anyone — everyone gets the same treat.',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
  },
  {
    slug: 'advance-booking-bulk',
    question: 'Do bulk gifting orders need to be booked in advance?',
    answer: 'Yes, 7 days notice is needed since every order is baked fresh, in small batches, to order — advance booking matters more for larger office events or festive-season dates.',
    datePublished: '2026-07-08',
    dateModified: '2026-08-02',
  },
  {
    slug: 'minimum-spend-bulk-gifting',
    question: 'Is there a minimum spend for bulk party gifting?',
    answer: 'Bulk orders start at 10 units per box or flavour rather than a fixed rupee minimum — this covers small kitty parties and scales up for larger office or birthday events.',
    datePublished: '2026-07-08',
    dateModified: '2026-08-02',
  },
];

const SHELF_STABLE_IDS = ['cardamom-rose', 'spiced-cookie', 'masala-namkeen', 'lemon-thyme'];
const REFRIGERATED_IDS = ['vanilla-bean', 'tres-leches', 'tiramisu', 'pistachio-no-3'];

function productLinks(ids) {
  return ids
    .map(id => VZ_DATA.products.find(p => p.id === id))
    .filter(Boolean);
}

export default function BulkPartyGiftingRoute() {
  const shelfStable = productLinks(SHELF_STABLE_IDS);
  const refrigerated = productLinks(REFRIGERATED_IDS);

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Bulk & Party Gifting', path: '/bulk-party-gifting' }]} />

      <section className="vz-section" style={{ paddingBottom: 48 }}>
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>bulk &amp; party gifting</span>
          <h1 className="vz-section-title">
            Healthy, homemade, gluten-free gifting <em>for every party.</em>
          </h1>
          <p className="vz-section-lede">
            House parties, birthdays, office parties, kitty parties — Vanille &amp; Zimté bakes gluten-free,
            plant-based gifting in bulk from our Noida kitchen and delivers across Delhi NCR. Every box is a
            homemade alternative to typical bakery gifting, made from scratch with honest ingredients, across a
            range of price points.
          </p>
        </div>
      </section>

      <section className="vz-section vz-section-tonal" style={{ paddingTop: 0 }}>
        <div className="vz-bulk-split">
          <div className="vz-bulk-card">
            <h3>Shelf-stable party favours</h3>
            <p>
              These stay fresh at room temperature for <strong>1 month</strong> — the
              right pick for bulk orders that need to travel, wait, or be handed out one by one.
            </p>
            <ul>
              {shelfStable.map(p => (
                <li key={p.id}>✓ <Link to={`/shop/${p.id}`}>{p.name}</Link></li>
              ))}
            </ul>
            <p className="vz-fineprint">Individually packed for office parties, kitty party return gifts, and birthday favours.</p>
          </div>
          <div className="vz-bulk-card">
            <h3>Refrigerated celebration centrepieces</h3>
            <p>
              These keep for <strong>15 days chilled</strong> and are best ordered for a
              specific date rather than stockpiled — the centrepiece for the table, not the party favour bag.
            </p>
            <ul>
              {refrigerated.map(p => (
                <li key={p.id}>✓ <Link to={`/shop/${p.id}`}>{p.name}</Link></li>
              ))}
            </ul>
            <p className="vz-fineprint">Pair one centrepiece with a shelf-stable favour box for the best of both.</p>
          </div>
        </div>
      </section>

      <section className="vz-section">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>price ranges</span>
          <h2 className="vz-section-title">Illustrative <em>bulk pricing.</em></h2>
          <p className="vz-section-lede">
            Final pricing depends on quantity and product mix — these tiers give a sense of range before you confirm on WhatsApp.
          </p>
        </div>
        <div className="vz-price-table-wrap">
          <table className="vz-price-table">
            <thead>
              <tr><th>Tier</th><th>Example mix</th><th>Price range</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Favour box</td>
                <td>Single cookie flavour, individually packed per guest</td>
                <td>From ₹351</td>
              </tr>
              <tr>
                <td>Mixed box</td>
                <td>Cookies + namkeen mix + tea cake, per guest</td>
                <td>From ₹751</td>
              </tr>
              <tr>
                <td>Premium hamper</td>
                <td>Full mixed box + a centrepiece cake for the table</td>
                <td>From ₹1,201</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="vz-fineprint" style={{ maxWidth: 1240, margin: '16px auto 0' }}>
          Minimum order: 10 units per box/flavour. Lead time: 7 days notice recommended. Courier and handling charged additionally.
        </p>
      </section>

      <section className="vz-section vz-section-tonal">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>the evidence</span>
          <h2 className="vz-section-title">What we can <em>back up.</em></h2>
        </div>
        <div className="vz-evidence-grid">
          {EVIDENCE_PANELS.map(panel => <EvidencePanel key={panel.id} panel={panel} />)}
        </div>
      </section>

      <VZOrderForm
        defaultOccasion="Corporate / Bulk Event"
        eyebrow="bulk & party gifting"
        heading={<>Tell us about <em>your event.</em></>}
        lede="House party, office party, kitty party, or a bulk gift run — share your headcount and we'll help you build the order."
        showHeadcount
      />

      <section className="vz-section">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>quick questions</span>
          <h2 className="vz-section-title">Bulk gifting, <em>answered.</em></h2>
        </div>
        <div className="vz-faq-list">
          {MINI_FAQ.map(item => <FaqItem key={item.slug} item={item} />)}
        </div>
        <p className="vz-faq-mini-note">
          <Link to="/faq" style={{ color: 'var(--vz-blue-ink)', fontWeight: 500 }}>See all frequently asked questions →</Link>
        </p>
      </section>

      <JsonLd data={buildFaqSchema(MINI_FAQ)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Bulk & Party Gifting', path: '/bulk-party-gifting' },
      ])} />
    </>
  );
}
