import { X } from '@phosphor-icons/react';
import ProductDetailContent from './ProductDetailContent';

export default function VZProductDetail({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div className="vz-modal-bg" onClick={onClose}>
      <div className="vz-modal" onClick={e => e.stopPropagation()}>
        <button className="vz-modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="vz-modal-art" style={{ background: product.color }}>
          {product.photo
            ? <img src={product.photo} alt={product.name} className="vz-modal-photo" />
            : (
              <>
                <img src="/assets/pattern.png" alt="" className="vz-modal-pattern" width="530" height="370" />
                <img src="/assets/logo-mark.png" alt="" className="vz-modal-mark" width="465" height="654" />
              </>
            )}
        </div>
        <ProductDetailContent
          product={product}
          onAdd={selection => { onAdd(selection); onClose(); }}
        />
      </div>
    </div>
  );
}
