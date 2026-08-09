import { Leaf, Cake, FlowerLotus, Heart } from '@phosphor-icons/react';

const VALUES = [
  { Icon: Leaf,        title: 'Wholesome Craft',       desc: 'Gluten-free, plant-based, and made to feel like a treat — never a compromise.' },
  { Icon: Cake,        title: 'Celebration First',      desc: 'We exist to make moments memorable. Every cake is wrapped in warmth.' },
  { Icon: FlowerLotus, title: 'Customisation as Care',  desc: 'Dairy-free, allergy-sensitive, or flavour notes — we treat each request as an act of love.' },
  { Icon: Heart,       title: 'Honest Ingredients',     desc: 'No hidden nasties. As clean as home baking gets.' },
];

const PROCESS = [
  { label: 'Alternative flour blends',        desc: 'Rice, almond and tapioca flours, tested batch after batch for the right rise and crumb.' },
  { label: 'Small-batch ovens',                desc: 'Nothing mass-produced — every bake is portioned and finished by hand.' },
  { label: 'Dairy-free swaps, tried and tested', desc: 'Coconut, cashew and oat bases, refined until no one can tell the difference.' },
];

export default function VZStory({ headingTag: HeadingTag = 'h2' }) {
  return (
    <section className="vz-section vz-section-tonal">
      <div className="vz-section-head">
        <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>our story</span>
        <HeadingTag className="vz-section-title">
          A bakery for everyone <em>at the table.</em>
        </HeadingTag>
        <p className="vz-section-lede">
          Vanille &amp; Zimté began in a London kitchen with one quiet conviction — that no one should be the afterthought at a celebration. Every recipe here is built ground-up for plant-based, gluten-free baking. We don't adapt; we begin from there. Today, we bake from Noida and deliver across Delhi NCR — same conviction, closer to home.
        </p>
      </div>
      <div className="vz-values">
        {VALUES.map(({ Icon, title, desc }) => (
          <div key={title} className="vz-value">
            <div className="vz-value-icon">
              <Icon size={24} />
            </div>
            <h4 className="vz-value-title">{title}</h4>
            <p className="vz-value-desc">{desc}</p>
          </div>
        ))}
      </div>
      <div className="vz-process">
        {PROCESS.map(({ label, desc }) => (
          <div key={label}>
            <span className="vz-process-label">{label}</span>
            <p className="vz-process-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
