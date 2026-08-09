import { Link } from 'react-router';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav className="vz-breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {i > 0 && <span className="vz-crumb-sep">/</span>}
          {i === crumbs.length - 1
            ? <span aria-current="page">{crumb.name}</span>
            : <Link to={crumb.path}>{crumb.name}</Link>}
        </span>
      ))}
    </nav>
  );
}
