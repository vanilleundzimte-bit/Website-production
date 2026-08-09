// A real <input type="checkbox"> rather than a click handler on the <label>: the
// previous version couldn't be reached or toggled by keyboard, and screen readers
// were never told these were checkboxes or whether they were ticked.
export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="vz-check">
      <input type="checkbox" className="vz-check-input" checked={checked} onChange={onChange} />
      <span className={`vz-checkbox ${checked ? 'is-on' : ''}`} aria-hidden="true">{checked ? '✓' : ''}</span>
      {label}
    </label>
  );
}
