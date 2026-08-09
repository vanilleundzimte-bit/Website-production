import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowRight } from '@phosphor-icons/react';
import { VZ_DATA } from '../data/products';

function VZProductCard({ product, onOpen }) {
  return (
    <article className="vz-card" onClick={() => onOpen(product)}>
      <div className="vz-card-img" style={{ background: product.color }}>
        {product.photo
          ? <img src={product.photo} alt={product.name} className="vz-card-photo" loading="lazy" />
          : <img src="/assets/logo-mark.png" alt="" className="vz-card-mark" width="465" height="654" />}
        <div className="vz-card-tags">
          {(product.tags || []).map(t => <span key={t} className="vz-tag-mini">{t}</span>)}
        </div>
        <button
          className="vz-card-quickadd"
          onClick={e => { e.stopPropagation(); onOpen(product); }}
        >
          Add to box <ArrowRight size={12} />
        </button>
      </div>
      <div className="vz-card-body">
        <span className="vz-eyebrow">{product.cat}</span>
        {product.occasion && <span className="vz-card-occasion">{product.occasion}</span>}
        <h3 className="vz-card-title">
          <Link to={`/shop/${product.id}`} onClick={e => e.stopPropagation()}>
            {product.name}
          </Link>
        </h3>
        <p className="vz-card-blurb">{product.blurb || ''}</p>
        <div className="vz-card-foot">
          <button
            className="vz-link-btn"
            onClick={e => { e.stopPropagation(); onOpen(product); }}
          >
            Add to box <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function VZCollection({ products, onOpen, headingTag: HeadingTag = 'h2' }) {
  const cats = VZ_DATA.categories;
  // The active filter lives in the URL rather than local state so /shop?cat=Cookie
  // is shareable and the footer's category links land on a filtered collection —
  // an unrecognised value just falls back to showing everything.
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('cat');

  // These pages are prerendered without a query string, so the first client render
  // has to paint the same unfiltered grid the HTML already contains — applying
  // ?cat= before hydration finishes is a mismatch React resolves by throwing away
  // the prerendered markup and re-rendering the whole page.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const cat = hydrated && cats.includes(requested) ? requested : 'All';
  const setCat = next =>
    setSearchParams(next === 'All' ? {} : { cat: next }, { replace: true, preventScrollReset: true });

  const filtered = cat === 'All' ? products : products.filter(p => p.cat === cat);

  return (
    <section className="vz-section">
      <div className="vz-section-head">
        <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>the collection</span>
        <HeadingTag className="vz-section-title">
          All gluten-free.<br /><em>All made to order.</em>
        </HeadingTag>
        <p className="vz-section-lede">
          For teatime, birthdays, gifting, or just because — everything here is baked to order.
        </p>
      </div>
      <div className="vz-cat-row">
        {cats.map(c => (
          <button
            key={c}
            className={`vz-chip ${cat === c ? 'is-active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="vz-grid">
        {filtered.map(p => (
          <VZProductCard key={p.id} product={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
