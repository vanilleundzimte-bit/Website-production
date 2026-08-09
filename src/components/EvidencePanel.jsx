export default function EvidencePanel({ panel }) {
  return (
    <aside className="vz-evidence-panel" id={`evidence-${panel.id}`}>
      <h4 className="vz-evidence-title">{panel.title}</h4>
      <dl className="vz-evidence-list">
        <dt>Claim</dt>
        <dd>{panel.claim}</dd>
        <dt>Methodology</dt>
        <dd>{panel.methodology}</dd>
        <dt>Source</dt>
        <dd>{panel.source}</dd>
        <dt>Date</dt>
        <dd>{panel.date}</dd>
        <dt>Limitations</dt>
        <dd>{panel.limitations}</dd>
      </dl>
      <p className="vz-fineprint">Last updated: {panel.date}</p>
    </aside>
  );
}
