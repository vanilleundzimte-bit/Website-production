export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="vz-check" onClick={onChange}>
      <span className={`vz-checkbox ${checked ? 'is-on' : ''}`}>{checked ? '✓' : ''}</span>
      {label}
    </label>
  );
}
