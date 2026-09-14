import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import Pill from '../../components/common/Pill';
import Button from '../../components/common/Button';
import Eyebrow from '../../components/common/Eyebrow';
import SectionHeader from '../../components/common/SectionHeader';
import PostCard from '../../components/cards/PostCard';
import DestinationCard from '../../components/cards/DestinationCard';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useDestinations, usePosts, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

const COST_RX = /tuition|living|cost|fee|budget/i;

export default function DestinationDetail() {
  const { slug } = useParams();
  const destinations = useDestinations();
  const posts = usePosts();
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();

  const destination = destinations.find((d) => d.slug === slug);

  useEffect(() => {
    document.title = destination ? `Study in ${destination.name} · ${settings.brand}` : `Destination not found · ${settings.brand}`;
  }, [destination, settings.brand]);

  if (!destination) {
    return (
      <div className="section">
        <div className="wrap center" style={{ maxWidth: 620 }}>
          <h1 className="h2">We don't have a page for that country yet.</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            A counsellor can still tell you everything about it — or compare the destinations we cover.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Button to="/destinations" arrow>
              All destinations
            </Button>
            <Button variant="outline" onClick={() => openEnquiry()}>
              Ask a counsellor
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const facts = destination.facts || [];
  const costFacts = facts.filter((f) => COST_RX.test(f.label));
  const otherFacts = facts.filter((f) => !COST_RX.test(f.label));
  const costChips = (destination.meta || []).filter((m) => m.includes('₹'));
  const articles = posts.filter((p) => p.destination === destination.slug);
  const others = destinations.filter((d) => d.slug !== destination.slug).slice(0, 3);
  const prefill = { destination: destination.name };

  return (
    <>
      <div className="country-hero" style={{ background: destination.bg }}>
        {destination.imageUrl && <img className="country-hero-img" src={destination.imageUrl} alt="" />}
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <i>/</i>
            <Link to="/destinations">Destinations</Link>
            <i>/</i>
            <span>{destination.name}</span>
          </div>
          <div className="country-hero-flag" aria-hidden="true">
            {destination.flag}
          </div>
          <h1 className="display">Study in {destination.name}</h1>
          {destination.tag && (
            <Pill variant="light" className="country-hero-tag">
              {destination.tag}
            </Pill>
          )}
          {destination.blurb && <p className="lead">{destination.blurb}</p>}
          <div className="hero-actions">
            <Button size="lg" arrow onClick={() => openEnquiry(prefill)}>
              Get free {destination.name} counselling
            </Button>
            <Button to="/destinations#compare" variant="ghost" size="lg">
              Compare countries
            </Button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <Eyebrow>Why {destination.name}</Eyebrow>
              <h2 className="h2">What makes {destination.name} worth considering</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {destination.description}
              </p>
              {Boolean(destination.tags?.length) && (
                <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
                  {destination.tags.map((t) => (
                    <Pill variant="plain" key={t}>
                      {t}
                    </Pill>
                  ))}
                </div>
              )}
            </Reveal>

            <Reveal delay={2} className="fact-card" id="facts">
              <h3 className="h4">Key facts</h3>
              <dl className="dl">
                {(otherFacts.length ? otherFacts : facts).map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      {(costFacts.length > 0 || costChips.length > 0) && (
        <div className="section section--tight" id="costs" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <SectionHeader eyebrow="Costs in INR" title={`What studying in ${destination.name} costs`} lead="Indicative annual figures for international students, converted to Indian rupees. Fees change every intake — we confirm live numbers for your shortlist on the call." />
            <div className="grid cols-3">
              {costFacts.map((f, i) => (
                <Reveal key={f.label} delay={i} className="cost-card">
                  <span className="cost-label">{f.label}</span>
                  <b className="cost-value">{f.value}</b>
                </Reveal>
              ))}
              {!costFacts.length &&
                costChips.map((c, i) => (
                  <Reveal key={c} delay={i} className="cost-card">
                    <span className="cost-label">Tuition</span>
                    <b className="cost-value">{c}</b>
                  </Reveal>
                ))}
              <Reveal delay={costFacts.length || 1} className="cost-card cost-card--cta">
                <span className="cost-label">Your exact budget</span>
                <b className="cost-value">Get a costed shortlist</b>
                <button type="button" className="link-arrow link-arrow--gold" onClick={() => openEnquiry(prefill, 'full')}>
                  <span>Ask a counsellor</span>
                  <span>→</span>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div className="section">
          <div className="wrap">
            <SectionHeader eyebrow="Read before you apply" title={`${destination.name} guides from our counsellors`} />
            <div className="grid cols-3">
              {articles.slice(0, 6).map((p, i) => (
                <PostCard key={p.id} post={p} delay={i % 3} />
              ))}
            </div>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <SectionHeader eyebrow="Keep exploring" title="Other destinations students compare" />
            <div className="grid cols-3">
              {others.map((d, i) => (
                <DestinationCard key={d.id} destination={d} delay={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryBand
        eyebrow={`Thinking about ${destination.name}?`}
        title="Find out where you'll actually get in"
        lead={`Share your marks and budget and a counsellor will come back with realistic ${destination.name} universities — and alternatives if the numbers don't work.`}
        prefill={prefill}
        items={[
          { bold: 'Costed in INR', text: '— tuition, living and visa, for your shortlist.' },
          { bold: 'Honest odds', text: 'on every university before you pay an application fee.' },
          { bold: 'Free and no obligation.', text: 'Counselling costs nothing.' },
        ]}
      />
    </>
  );
}
