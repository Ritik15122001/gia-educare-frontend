import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import Tick from '../common/Tick';
import Button from '../common/Button';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

export default function EnquiryBand({
  id,
  eyebrow,
  title,
  lead,
  items = [],
  formVariant = 'compact',
  prefill,
  ctaTitle = 'Ready when you are',
  ctaLabel = 'Request my free callback',
  ctaPoints = ['Free profile evaluation', 'Shortlist matched to your budget', 'One counsellor, start to finish'],
  extra,
}) {
  const openEnquiry = useOpenEnquiry();

  return (
    <div className="section enq-band" id={id}>
      <div className="wrap">
        <div className="enq-band-grid">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="h2">{title}</h2>
            <p className="lead lead--light">{lead}</p>
            {items.length > 0 && (
              <ul className="band-list">
                {items.map((item, i) => (
                  <li key={i}>
                    <Tick />
                    <span>
                      <b>{item.bold}</b> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {extra}
          </Reveal>

          <Reveal delay={2} className="enq enq--cta">
            <span className="enq-badge">No obligation</span>
            <div className="enq-head">
              <h3>{ctaTitle}</h3>
              <p>Takes 40 seconds. A senior counsellor replies within one working day.</p>
            </div>
            <ul className="cta-points">
              {ctaPoints.map((point) => (
                <li key={point}>
                  <Tick />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="enq-foot">
              <Button block size="lg" arrow onClick={() => openEnquiry(prefill, formVariant)}>
                {ctaLabel}
              </Button>
              <p className="enq-note">🔒 We never sell your data or share it with universities without your consent.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
