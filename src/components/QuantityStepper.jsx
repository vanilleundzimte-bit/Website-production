import { Minus, Plus } from '@phosphor-icons/react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="vz-stepper">
      <button
        type="button"
        className="vz-stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={13} />
      </button>
      <span className="vz-stepper-value">{value}</span>
      <button
        type="button"
        className="vz-stepper-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
