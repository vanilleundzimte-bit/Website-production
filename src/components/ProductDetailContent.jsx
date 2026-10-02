import { useState } from 'react';
import { ShoppingBag } from '@phosphor-icons/react';
import {
  formatINR, formatPackWeight, getPackSizes, getSizePrice, getAddOn,
} from '../lib/pricing';
import Checkbox from './Checkbox';
import QuantityStepper from './QuantityStepper';

// titleTag defaults to h1 for the standalone product page, where this is the page's
// only heading. The modal passes h2 — on /shop the collection already owns the h1,
// and opening a product used to put a second one on the page.
export default function ProductDetailContent({ product, onAdd, longDescription, titleTag: TitleTag = 'h1' }) {
  // Both of these come off the product record, never off product.cat, so a product
  // offers a pack choice or an add-on only if its own data says so.
  const sizes = getPackSizes(product);
  const addOn = getAddOn(product);

  const [qty, setQty] = useState(1);
  // Opens on the smallest pack — the one the shop card quotes — so the headline price
  // is the number that got the customer here, and the prerendered markup and the first
  // client render produce the identical string.
  const [grams, setGrams] = useState(sizes[0]);
  const [sauce, setSauce] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [notes, setNotes] = useState('');

  const weight = formatPackWeight(grams);
  const sizePrice = getSizePrice(product, grams);
  const unitPrice = sizePrice === null ? null : sizePrice + (sauce && addOn ? addOn.price : 0);
  const subtotal = unitPrice === null ? null : unitPrice * qty;

  return (
    <div className="vz-modal-body">
      <span className="vz-eyebrow">{product.cat}</span>
      <TitleTag className="vz-modal-title">{product.name}</TitleTag>
      {/* The headline tracks the selected pack but deliberately excludes the add-on:
          this is the cake's shelf price. The sauce surfaces in the foot instead, where
          the money being added sits next to the total it was added to. */}
      {sizePrice !== null && (
        <p className="vz-price vz-price-lg">
          {formatINR(sizePrice)}
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

      {/* Pack size and the add-on come before the modifier rows: these pick which SKU
          is being bought, and dietary/notes/quantity adjust a SKU already chosen. Both
          live in the scrollable body rather than the foot — the foot goes sticky under
          960px, so every row added there is a row taken off a phone screen. */}
      {sizes.length > 1 && (
        <div className="vz-modal-row">
          <span className="vz-eyebrow vz-tight">Pack size</span>
          <div className="vz-segmented" role="group" aria-label="Pack size">
            {sizes.map(g => (
              <button
                key={g}
                type="button"
                className={grams === g ? 'is-active' : ''}
                aria-pressed={grams === g}
                onClick={() => setGrams(g)}
              >
                {formatPackWeight(g)}
              </button>
            ))}
          </div>
        </div>
      )}

      {addOn && (
        <div className="vz-modal-row">
          <span className="vz-eyebrow vz-tight">Add-on</span>
          <Checkbox
            label={`${addOn.label} — ${addOn.weight}, +${formatINR(addOn.price)} each`}
            checked={sauce}
            onChange={() => setSauce(v => !v)}
          />
        </div>
      )}

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
          the CTA instead of scrolling away with the quantity row. The add-on rides in
          the existing breakdown line for the same reason, and that line now shows at
          qty 1 too — it is the only honest way to put a ₹523 headline beside a ₹573
          subtotal. */}
      <div className="vz-modal-foot">
        {subtotal !== null && (
          <div className="vz-modal-subtotal">
            <span className="vz-eyebrow vz-tight">Subtotal</span>
            <span className="vz-price">
              {formatINR(subtotal)}
              {(qty > 1 || (sauce && addOn)) && (
                <span className="vz-price-unit">
                  {' · '}{qty} × {formatINR(unitPrice)}{sauce && addOn ? ' incl. sauce' : ''}
                </span>
              )}
            </span>
          </div>
        )}
        <button
          className="vz-btn vz-btn-primary vz-btn-block"
          onClick={() => onAdd({ product, qty, grams, sauce, dairyFree, notes })}
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
