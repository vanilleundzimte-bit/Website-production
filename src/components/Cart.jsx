import { X, ShoppingBag } from '@phosphor-icons/react';
import { formatINR, getPackWeight, lineTotal, cartTotal } from '../lib/pricing';
import useScrollLock from '../lib/useScrollLock';
import QuantityStepper from './QuantityStepper';

export default function VZCart({ items, onClose, onRemove, onUpdateQty, enquiryUrl }) {
  useScrollLock();
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const { total, allPriced } = cartTotal(items);

  return (
    <div className="vz-cart-pane" onClick={onClose}>
      <aside className="vz-cart-panel" onClick={e => e.stopPropagation()}>
        <header className="vz-cart-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>your box</span>
          <h3 className="vz-cart-title">Ready to wrap.</h3>
          <button className="vz-icon-btn" onClick={onClose} aria-label="Close box">
            <X size={19} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="vz-cart-empty">
            <ShoppingBag size={48} />
            <p>Your box is waiting.</p>
            <span className="vz-fineprint">Add something from the collection to begin.</span>
          </div>
        ) : (
          <ul className="vz-cart-list">
            {items.map(item => {
              const weight = getPackWeight(item.product);
              const sub = lineTotal(item);
              return (
                <li key={item.lineId} className="vz-cart-item">
                  <div className="vz-cart-thumb" style={{ background: item.product.color }}>
                    <img
                      src={item.product.photo || '/assets/logo-mark.png'}
                      alt=""
                      className={item.product.photo ? 'vz-cart-thumb-photo' : undefined}
                    />
                  </div>
                  <div className="vz-cart-info">
                    <span className="vz-eyebrow vz-tight">{item.product.cat}</span>
                    <span className="vz-cart-name">{item.product.name}</span>
                    <div className="vz-cart-tags">
                      {weight && <span className="vz-tag-mini">{weight}</span>}
                      {item.dairyFree && <span className="vz-tag-mini">Dairy-free</span>}
                    </div>
                    {item.notes && <span className="vz-cart-note">"{item.notes}"</span>}
                    <div className="vz-cart-item-controls">
                      <QuantityStepper value={item.qty} onChange={q => onUpdateQty(item.lineId, q)} />
                      <div className="vz-cart-line-end">
                        {sub !== null && <span className="vz-price vz-price-sm">{formatINR(sub)}</span>}
                        <button className="vz-link-btn vz-cart-remove" onClick={() => onRemove(item.lineId)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <footer className="vz-cart-foot">
          {/* Suppressed unless every line has a price — a total that silently leaves
              an item out is worse than no total at all. */}
          {items.length > 0 && allPriced && (
            <div className="vz-cart-total">
              <span className="vz-eyebrow vz-tight">Estimated total</span>
              <span className="vz-cart-total-value">{formatINR(total)}</span>
            </div>
          )}
          <p className="vz-fineprint">
            {items.length === 0
              ? 'Prices are per 200g pack. We’ll confirm availability and delivery over WhatsApp.'
              : `${totalCount} item${totalCount > 1 ? 's' : ''} in your box. Estimated from list prices, before courier — we’ll confirm the final total on WhatsApp.`}
          </p>
          {enquiryUrl ? (
            <a
              className="vz-btn vz-btn-primary vz-btn-block"
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue on WhatsApp
            </a>
          ) : (
            <button className="vz-btn vz-btn-primary vz-btn-block" disabled>
              Continue on WhatsApp
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}
