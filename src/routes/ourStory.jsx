import { Link } from 'react-router';
import VZStory from '../components/Story';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `Our Story — Gluten-Free, Plant-Based Baking | ${SITE_NAME}`;
  const description = 'Why Vanille & Zimté bakes gluten-free and plant-based from first principles, not as an afterthought — from a London kitchen to Noida, delivering across Delhi NCR.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/our-story'),
    ...socialMetaTags({ title, description }),
  ];
}

export default function OurStoryRoute() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Our Story', path: '/our-story' }]} />
      <VZStory headingTag="h1" />

      <section className="vz-section">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>the persona</span>
          <h2 className="vz-section-title">
            The Artisan Host<em>, at your table.</em>
          </h2>
          <p className="vz-section-lede">
            Vanille &amp; Zimté speaks like a trusted friend who also happens to be a brilliant baker — warm,
            knowledgeable, never preachy, and always a little poetic about food.
          </p>
        </div>
        <div className="vz-values">
          <div className="vz-value">
            <h4 className="vz-value-title">The Conscious Celebrator</h4>
            <p className="vz-value-desc">Planning a birthday or event and wants beautiful, inclusive food everyone can enjoy.</p>
          </div>
          <div className="vz-value">
            <h4 className="vz-value-title">The Allergy-Aware Host</h4>
            <p className="vz-value-desc">Navigating gluten or dairy restrictions without wanting guests to feel like an afterthought.</p>
          </div>
          <div className="vz-value">
            <h4 className="vz-value-title">The Plant-Based Foodie</h4>
            <p className="vz-value-desc">Prioritises clean, plant-forward eating and refuses to settle for dry, joyless treats.</p>
          </div>
          <div className="vz-value">
            <h4 className="vz-value-title">The Thoughtful Giver</h4>
            <p className="vz-value-desc">Wants a custom, handmade gift that says "I thought of you" in every bite — including bulk gifts for a whole office or party.</p>
          </div>
        </div>
      </section>

      <section className="vz-section vz-section-tonal" style={{ textAlign: 'center' }}>
        <div className="vz-section-head" style={{ textAlign: 'center' }}>
          <h2 className="vz-section-title" style={{ margin: '0 auto' }}>
            Baking in bulk, <em>without losing the point.</em>
          </h2>
          <p className="vz-section-lede" style={{ margin: '16px auto 0' }}>
            The same gluten-free, plant-based conviction that shapes a single birthday cake shapes every bulk order —
            whether it's fifty favour boxes for an office party or a kitty party's worth of return gifts. Nothing here
            is scaled down in care to be scaled up in quantity.{' '}
            <Link to="/bulk-party-gifting" style={{ color: 'var(--vz-blue-ink)', fontWeight: 500 }}>See bulk &amp; party gifting →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
