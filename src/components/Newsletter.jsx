import { useState } from 'react';
import { EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react';
import { openWhatsApp } from '../lib/whatsapp';

export default function VZNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim()) return;
    openWhatsApp(`Hi Vanille & Zimté! I'd like to join the newsletter — my email is ${email}. Please send my 10% off code!`);
  };

  return (
    <section className="vz-section vz-newsletter">
      <div className="vz-newsletter-inner">
        <span className="vz-newsletter-flourish" aria-hidden="true">✦</span>
        <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>stay close to the oven</span>
        <h2 className="vz-section-title">
          Get <em>10% off</em> your first box.
        </h2>
        <p className="vz-section-lede">
          New flavours, small-batch drops, and the occasional treat in your inbox — sign up and we'll send your code over WhatsApp.
        </p>
        <form className="vz-newsletter-form" onSubmit={handleSubmit}>
          <label className="vz-newsletter-field">
            <EnvelopeSimple size={18} />
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <button className="vz-btn vz-btn-primary" type="submit">
            Get my code <WhatsappLogo size={16} weight="fill" />
          </button>
        </form>
        <p className="vz-fineprint" style={{ margin: '0 auto' }}>
          Opens WhatsApp so we can send your code directly — no spam, unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
