export default function FaqItem({ item }) {
  return (
    <div className="vz-faq-item" id={`faq-${item.slug}`}>
      <h3 className="vz-faq-q">{item.question}</h3>
      <p className="vz-faq-a">{item.answer}</p>
      <p className="vz-fineprint vz-faq-meta">Last updated: {item.dateModified}</p>
    </div>
  );
}
