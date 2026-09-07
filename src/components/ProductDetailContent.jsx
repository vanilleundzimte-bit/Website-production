import { useState } from 'react';
import { ShoppingBag } from '@phosphor-icons/react';
import { formatINR, getPrice, getPackWeight } from '../lib/pricing';
import Checkbox from './Checkbox';
import QuantityStepper from './QuantityStepper';

// titleTag defaults to h1 for the standalone product page, where this is the page's
// only heading. The modal passes h2 — on /shop the collection already owns the h1,
// and opening a product used to put a second one on the page.
export default function ProductDetailContent({ product, onAdd, longDescription, titleTag: TitleTag = 'h1' }) {
  const [qty, setQty] = useState(1);
  const [dairyFree, setDairyFree] = useState(false);
  const [notes, setNotes] = useState('');

  const weight = getPackWeight(product);
  const price = getPrice(product);
  const subtotal = price === null ? null : price * qty;

  return (
    <div className="vz-modal-body">
      <span className="vz-eyebrow">{product.cat}</span>
      <TitleTag className="vz-modal-title">{product.name}</TitleTag>
      {price !== null && (
        <p className="vz-price vz-price-lg">
          {formatINR(price)}
          <span className="vz-price-unit"> / {weight} pack</span>
        </p>
      )}
      <p className="vz-modal-blurb">{longDescription || product.blurb || ''}</p>

      <div className="vz-modal-tags">
        {(product.tags || []).map(t => (
          <span key={t} className="vz-tag-pill">
            <span className="vz-tick">✓</span> {t}
          </span>
        ))}
        {weight && (
          <span className="vz-tag-pill">
            <span className="vz-tick">✓</span> {weight}
          </span>
        )}
      </div>

      <div className="vz-modal-row">
        <span className="vz-eyebrow vz-tight">Dietary</span>
        <Checkbox label="Dairy-free, please" checked={dairyFree} onChange={() => setDairyFree(v => !v)} />
      </div>

      <div className="vz-modal-row">
        <span className="vz-eyebrow vz-tight">Notes</span>
        <div className="vz-field">
          <textarea
            rows={2}
            placeholder="Flavour notes, occasion message, inscription…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="vz-modal-row">
        <span className="vz-eyebrow vz-tight">Quantity</span>
        <QuantityStepper value={qty} onChange={setQty} />
      </div>

      {/* The running subtotal sits inside the foot, not up beside the stepper: the
          foot goes sticky under 960px, so on a phone the total stays pinned next to
          the CTA instead of scrolling away with the quantity row. */}
      <div className="vz-modal-foot">
        {subtotal !== null && (
          <div className="vz-modal-subtotal">
            <span className="vz-eyebrow vz-tight">Subtotal</span>
            <span className="vz-price">
              {formatINR(subtotal)}
              {qty > 1 && <span className="vz-price-unit"> · {qty} × {formatINR(price)}</span>}
            </span>
          </div>
        )}
        <button
          className="vz-btn vz-btn-primary vz-btn-block"
          onClick={() => onAdd({ product, qty, dairyFree, notes })}
        >
          Add to box <ShoppingBag size={16} />
        </button>
      </div>
      <p className="vz-fineprint">
        Made to order in our gluten-free kitchen. Prices are indicative and confirmed on WhatsApp. Dispatched via standard courier the next business day — courier charges apply on orders below ₹1000.
      </p>
    </div>
  );
}
