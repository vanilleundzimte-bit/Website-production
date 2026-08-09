import { useState } from 'react';
import { ShoppingBag } from '@phosphor-icons/react';
import { getFixedWeight } from '../lib/productMeta';
import Checkbox from './Checkbox';
import QuantityStepper from './QuantityStepper';

export default function ProductDetailContent({ product, onAdd, longDescription }) {
  const [qty, setQty] = useState(1);
  const [dairyFree, setDairyFree] = useState(false);
  const [notes, setNotes] = useState('');

  const weight = getFixedWeight(product.cat);

  return (
    <div className="vz-modal-body">
      <span className="vz-eyebrow">{product.cat}</span>
      <h1 className="vz-modal-title">{product.name}</h1>
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

      <div className="vz-modal-foot">
        <button
          className="vz-btn vz-btn-primary vz-btn-block"
          onClick={() => onAdd({ product, qty, dairyFree, notes })}
        >
          Add to box <ShoppingBag size={16} />
        </button>
      </div>
      <p className="vz-fineprint">
        Made to order in our 100% gluten-free kitchen. Dispatched via standard courier the next business day — courier charges apply on orders below ₹1000.
      </p>
    </div>
  );
}
