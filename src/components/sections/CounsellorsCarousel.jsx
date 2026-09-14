import { useCallback, useEffect, useRef, useState } from 'react';
import Eyebrow from '../common/Eyebrow';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import Icon from '../common/Icon';
import SocialIcon from '../common/SocialIcon';
import { useCounsellors, useSection, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { telHref, whatsappHref } from '../../utils/contact';

const DEFAULTS = {
  eyebrow: 'Meet your counsellors',
  title: 'Talk to a senior counsellor today',
  lead: 'Pick the counsellor who knows your destination best, then call or WhatsApp them directly.',
};

const initialsOf = (name = '') => name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

function CounsellorCard({ counsellor, brand }) {
  const openEnquiry = useOpenEnquiry();
  const call = telHref(counsellor.phone);
  const whatsapp = whatsappHref(
    counsellor.whatsapp,
    `Hi ${counsellor.name.split(' ')[0]}, I found you on the ${brand} website and would like free study-abroad counselling.`,
  );

  return (
    <article className="cc-card">
      <div className="cc-head">
        {counsellor.photoUrl ? (
          <img className="cc-avatar" src={counsellor.photoUrl} alt={counsellor.name} loading="lazy" />
        ) : (
          <span className="cc-avatar cc-avatar--initials" aria-hidden="true">
            {counsellor.initials || initialsOf(counsellor.name)}
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <h3>{counsellor.name}</h3>
          <p className="cc-role">{counsellor.role}</p>
        </div>
      </div>

      {counsellor.specialisation && <p className="cc-spec">{counsellor.specialisation}</p>}

      <div className="cc-stats">
        {counsellor.experienceYears > 0 && (
          <div>
            <b>{counsellor.experienceYears}+</b>
            <span>years</span>
          </div>
        )}
        {counsellor.studentsCounselled > 0 && (
          <div>
            <b>{Number(counsellor.studentsCounselled).toLocaleString('en-IN')}+</b>
            <span>students</span>
          </div>
        )}
      </div>

      {Boolean(counsellor.languages?.length) && <p className="cc-langs">Speaks {counsellor.languages.join(', ')}</p>}

      <div className="cc-actions">
        {call && (
          <a className="btn btn--dark" href={call} aria-label={`Call ${counsellor.name}`}>
            <Icon name="phone" size={16} strokeWidth={2.2} /> Call
          </a>
        )}
        {whatsapp && (
          <a className="btn btn--whatsapp" href={whatsapp} target="_blank" rel="noreferrer noopener" aria-label={`WhatsApp ${counsellor.name}`}>
            <SocialIcon name="whatsapp" size={16} /> WhatsApp
          </a>
        )}
        {!call && !whatsapp && (
          <Button block onClick={() => openEnquiry({ message: `I'd like to speak with ${counsellor.name}.` })}>
            Request a call
          </Button>
        )}
      </div>
    </article>
  );
}

export default function CounsellorsCarousel() {
  const counsellors = useCounsellors();
  const settings = useSettings();
  const section = useSection('home.counsellors', DEFAULTS);
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges, counsellors.length]);

  // Move by one card (plus the gap), so each click lands cleanly on a snap point.
  const scroll = (direction) => {
    const el = trackRef.current;
    const card = el?.querySelector('.cc-card');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  if (!counsellors.length) return null;

  return (
    <div className="section counsellors">
      <div className="wrap">
        <Reveal className="sec-head cc-top">
          <div style={{ maxWidth: 620 }}>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            <p className="lead">{section.lead}</p>
          </div>
          <div className="cc-nav">
            <button type="button" className="cc-arrow" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous counsellors">
              ←
            </button>
            <button type="button" className="cc-arrow" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next counsellors">
              →
            </button>
          </div>
        </Reveal>

        <div className="cc-track" ref={trackRef} onScroll={updateEdges} role="region" aria-label="Top counsellors" tabIndex={0}>
          {counsellors.map((c) => (
            <CounsellorCard key={c.id} counsellor={c} brand={settings.brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
