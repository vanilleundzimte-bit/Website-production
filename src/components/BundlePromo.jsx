import { ArrowRight } from '@phosphor-icons/react';

export default function VZBundlePromo({ onShop }) {
  return (
    <section className="vz-bundle">
      <div className="vz-bundle-inner">
        <span className="vz-eyebrow" style={{ color: 'var(--vz-rose-soft)' }}>build your box</span>
        <h3 className="vz-bundle-title">Mix, match, and make it yours.</h3>
        <p className="vz-bundle-lede">
          Tell us how many pieces your celebration calls for and we'll help you build the box — tea cakes with cookies, cheesecake with namkeens, whatever the moment needs.
        </p>
        <button className="vz-btn vz-btn-accent" onClick={onShop}>
          Start your box <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
