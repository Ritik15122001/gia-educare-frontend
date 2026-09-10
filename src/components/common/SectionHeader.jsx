import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import { cn } from '../../utils/cn';

export default function SectionHeader({ eyebrow, title, lead, center, className, style }) {
  return (
    <Reveal className={cn('sec-head', center && 'center', className)} style={style}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
