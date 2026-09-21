import { useCallback, useEffect, useRef, useState } from 'react';
import Eyebrow from '../common/Eyebrow';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import Icon from '../common/Icon';
import SocialIcon from '../common/SocialIcon';
import { useCounsellors, useSection, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { telHref, whatsappHref, waTarget } from '../../utils/contact';
import { useImageOk } from '../../hooks/useImageOk';

const DEFAULTS = {
  eyebrow: 'Meet your counsellors',
  title: 'Talk to a senior counsellor today',
  lead: 'Pick the counsellor who knows your destination best, then call or WhatsApp them directly.',
};

// How long each position is shown before the track advances by one card.
const AUTOPLAY_MS = 4000;

const initialsOf = (name = '') => name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

function CounsellorCard({ counsellor, brand }) {
  const [showPhoto, onPhotoError] = useImageOk(counsellor.photoUrl);
  const openEnquiry = useOpenEnquiry();
  const call = telHref(counsellor.phone);
  const whatsapp = whatsappHref(
    counsellor.whatsapp,
    `Hi ${counsellor.name.split(' ')[0]}, I found you on the ${brand} website and would like free study-abroad counselling.`,
  );
  const hasStats = counsellor.experienceYears > 0 || counsellor.studentsCounselled > 0;

  return (
    <article className="cc-card">
      <div className="cc-banner" aria-hidden="true" />
      <div className="cc-body">
        {showPhoto ? (
          <img className="cc-avatar" src={counsellor.photoUrl} alt={counsellor.name} loading="lazy" onError={onPhotoError} />
        ) : (
          <span className="cc-avatar cc-avatar--initials" aria-hidden="true">
            {counsellor.initials || initialsOf(counsellor.name)}
          </span>
        )}

        <h3>{counsellor.name}</h3>
        {counsellor.role && <p className="cc-role">{counsellor.role}</p>}
        {counsellor.specialisation && <p className="cc-spec">{counsellor.specialisation}</p>}

        {hasStats && (
          <div className="cc-stats">
            {counsellor.experienceYears > 0 && (
              <div>
                <b>{counsellor.experienceYears}+</b>
                <span>Years</span>
              </div>
            )}
            {counsellor.studentsCounselled > 0 && (
              <div>
                <b>{Number(counsellor.studentsCounselled).toLocaleString('en-IN')}+</b>
                <span>Students guided</span>
              </div>
            )}
          </div>
        )}

        {Boolean(counsellor.languages?.length) && (
          <div className="cc-langs" aria-label={`Speaks ${counsellor.languages.join(', ')}`}>
            {counsellor.languages.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </div>
        )}

        <div className="cc-actions">
          {call && (
            <a className="btn btn--dark" href={call} aria-label={`Call ${counsellor.name}`}>
              <Icon name="phone" size={16} strokeWidth={2.2} /> Call
            </a>
          )}
          {whatsapp && (
            <a className="btn btn--whatsapp" href={whatsapp} target={waTarget()} rel="noreferrer noopener" aria-label={`WhatsApp ${counsellor.name}`}>
              <SocialIcon name="whatsapp" size={16} /> WhatsApp
            </a>
          )}
          {!call && !whatsapp && (
            <Button block onClick={() => openEnquiry({ message: `I'd like to speak with ${counsellor.name}.` })}>
              Request a call
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CounsellorsCarousel() {
  const counsellors = useCounsellors();
  const settings = useSettings();
  const section = useSection('home.counsellors', DEFAULTS);
  const trackRef = useRef(null);
  // Snap positions = cards that can sit at the left edge; 1 means everything fits.
  const [positions, setPositions] = useState(1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const stepWidth = () => {
    const el = trackRef.current;
    const card = el?.querySelector('.cc-card');
    if (!el || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  const measure = useCallback(() => {
    const el = trackRef.current;
    const step = stepWidth();
    if (!el || !step) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setPositions(maxScroll > 4 ? Math.round(maxScroll / step) + 1 : 1);
    setActive(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, counsellors.length]);

  const goTo = useCallback((index) => {
    const el = trackRef.current;
    const step = stepWidth();
    if (!el || !step) return;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  }, []);

  // Arrows wrap around, so the carousel never dead-ends.
  const move = useCallback(
    (direction) => goTo((active + direction + positions) % positions),
    [active, positions, goTo],
  );

  // Auto-advance one card at a time; pauses while the visitor hovers, focuses or
  // touches the track, when the tab is hidden, and for reduced-motion users.
  useEffect(() => {
    if (paused || positions < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) move(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, positions, move]);

  if (!counsellors.length) return null;

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div className="section counsellors">
      <div className="wrap">
        <Reveal className="sec-head cc-top">
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            <p className="lead">{section.lead}</p>
          </div>
          {positions > 1 && (
            <div className="cc-nav">
              <button type="button" className="cc-arrow" onClick={() => move(-1)} aria-label="Previous counsellor">
                ←
              </button>
              <button type="button" className="cc-arrow" onClick={() => move(1)} aria-label="Next counsellor">
                →
              </button>
            </div>
          )}
        </Reveal>

        <div
          className="cc-track"
          ref={trackRef}
          onScroll={measure}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          role="region"
          aria-label="Top counsellors"
          aria-roledescription="carousel"
          tabIndex={0}
        >
          {counsellors.map((c) => (
            <CounsellorCard key={c.id} counsellor={c} brand={settings.brand} />
          ))}
        </div>

        {positions > 1 && (
          <div className="cc-dots">
            {Array.from({ length: positions }, (_, i) => (
              <button
                key={i}
                type="button"
                className={i === active ? 'on' : undefined}
                onClick={() => goTo(i)}
                aria-label={`Show counsellor ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
