import { Link } from 'react-router-dom';

export default function PageHead({ crumb, title, lead, children }) {
  return (
    <div className="pagehead">
      <div className="wrap">
        <div className="crumb">
          <Link to="/">Home</Link>
          <i>/</i>
          <span>{crumb}</span>
        </div>
        <h1 className="display">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
