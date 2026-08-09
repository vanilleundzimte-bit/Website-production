import { Leaf, Cake, FlowerLotus } from '@phosphor-icons/react';

export default function VZHero({ onShop, onCustom }) {
  return (
    <section className="vz-hero">
      <img src="/assets/pattern.png" alt="" className="vz-hero-pattern" width="530" height="370" />
      <div className="vz-hero-grid">
        <div className="vz-hero-copy">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>
            small-batch · made to order
          </span>
          <h1 className="vz-hero-title">
            Baked with<br />
            <em>intention.</em><br />
            Free from <em>compromise.</em>
          </h1>
          <p className="vz-hero-lede">
            Every cake, cookie and creation here is gluten-free — without ever sacrificing taste, texture, or joy.
          </p>
          <div className="vz-hero-cta">
            <button className="vz-btn vz-btn-primary" onClick={onShop}>
              Browse the collection
            </button>
            <button className="vz-btn vz-btn-ghost" onClick={onCustom}>
              Custom orders <span aria-hidden>→</span>
            </button>
          </div>
          <div className="vz-hero-marks">
            <span><Leaf size={18} /> 100% plant-based</span>
            <span><Cake size={18} /> 100% gluten-free kitchen</span>
            <span><FlowerLotus size={18} /> dairy-free options</span>
          </div>
        </div>
        <div className="vz-hero-art">
          <img src="/assets/logo-badge.png" alt="vanille & zimté" className="vz-hero-badge" width="1256" height="1256" />
        </div>
      </div>
    </section>
  );
}
