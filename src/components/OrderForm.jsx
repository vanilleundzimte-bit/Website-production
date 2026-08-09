import { useState } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { openWhatsApp } from '../lib/whatsapp';
import Checkbox from './Checkbox';

const OCCASIONS = [
  'Birthday', 'Wedding', 'Dinner Party', 'House Party',
  'Office Party', 'Kitty Party', 'Corporate / Bulk Event', 'Just because',
];

export default function VZOrderForm({
  defaultOccasion = 'Birthday',
  eyebrow = 'custom orders',
  heading = <>Tell us about <em>your celebration.</em></>,
  headingTag: HeadingTag = 'h2',
  lede = 'Birthdays, weddings, dinner parties, "just because". Share the occasion and we\'ll bake something just for it.',
  showHeadcount = false,
}) {
  const [checks, setChecks] = useState({ dairyfree: true, giftnote: false, waxstamp: true });
  const [form, setForm] = useState({ name: '', occasion: defaultOccasion, date: '', headcount: '', details: '' });

  const toggle = key => setChecks(c => ({ ...c, [key]: !c[key] }));
  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const extras = [
      checks.dairyfree && 'Dairy-free, please',
      checks.giftnote && 'Add a hand-written gift note',
      checks.waxstamp && 'Wax-stamped tag',
    ].filter(Boolean).join(' · ');

    const message = [
      `Hi Vanille & Zimté! I'd like to enquire about a custom order.`,
      '',
      `Name: ${form.name || '—'}`,
      `Occasion: ${form.occasion}`,
      `Preferred date: ${form.date || '—'}`,
      form.headcount && `Headcount: ${form.headcount}`,
      `Details: ${form.details || '—'}`,
      extras && `Extras: ${extras}`,
    ].filter(Boolean).join('\n');

    openWhatsApp(message);
  };

  return (
    <section className="vz-section vz-section-deep">
      <img src="/assets/pattern.png" alt="" className="vz-deep-pattern" width="530" height="370" />
      <div className="vz-section-head">
        <span className="vz-eyebrow" style={{ color: 'var(--vz-rose-soft)' }}>{eyebrow}</span>
        <HeadingTag className="vz-section-title vz-on-deep">
          {heading}
        </HeadingTag>
        <p className="vz-section-lede vz-on-deep">
          {lede}
        </p>
      </div>
      <form className="vz-form" onSubmit={handleSubmit}>
        <div className="vz-form-grid">
          <div className="vz-field">
            <label>Your name</label>
            <input placeholder="Your name" value={form.name} onChange={update('name')} />
          </div>
          <div className="vz-field">
            <label>The occasion</label>
            <select value={form.occasion} onChange={update('occasion')}>
              {OCCASIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="vz-field" style={{ gridColumn: showHeadcount ? undefined : '1 / -1' }}>
            <label>Preferred date</label>
            <input placeholder="e.g. Saturday 23 May" value={form.date} onChange={update('date')} />
          </div>
          {showHeadcount && (
            <div className="vz-field">
              <label>Headcount / bulk quantity</label>
              <input placeholder="e.g. 25 guests" value={form.headcount} onChange={update('headcount')} />
            </div>
          )}
          <div className="vz-field" style={{ gridColumn: '1 / -1' }}>
            <label>Tell us more</label>
            <textarea rows={3} placeholder="Flavours, dietary needs, number of guests, inscriptions…" value={form.details} onChange={update('details')} />
          </div>
        </div>
        <div className="vz-form-extras">
          <Checkbox label="Dairy-free, please"          checked={checks.dairyfree} onChange={() => toggle('dairyfree')} />
          <Checkbox label="Add a hand-written gift note" checked={checks.giftnote}  onChange={() => toggle('giftnote')} />
          <Checkbox label="Wax-stamped tag"              checked={checks.waxstamp}  onChange={() => toggle('waxstamp')} />
        </div>
        <div className="vz-form-foot">
          <span className="vz-fineprint vz-on-deep">
            Opens WhatsApp with your details filled in — we reply within one business day.
          </span>
          <button className="vz-btn vz-btn-accent" type="submit">
            Continue on WhatsApp <WhatsappLogo size={16} weight="fill" />
          </button>
        </div>
      </form>
    </section>
  );
}
