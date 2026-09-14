import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useDestinations } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { TEST_OPTIONS } from '../../data/formOptions';
import { cn } from '../../utils/cn';

/**
 * "Find colleges by exam": the student picks an exam (or it is preset on an
 * exam page), adds a score and a country, and the enquiry form opens with all
 * of it filled in — a counsellor replies with matching universities.
 */
export default function CollegeFinder({ exams, preset }) {
  const destinations = useDestinations();
  const openEnquiry = useOpenEnquiry();
  const [slug, setSlug] = useState(preset?.slug || exams[0]?.slug || '');
  const [score, setScore] = useState('');
  const [country, setCountry] = useState('');

  const exam = preset || exams.find((e) => e.slug === slug);
  if (!exam) return null;

  const accepted = new Set(exam.acceptedIn || []);
  const acceptedDestinations = destinations.filter((d) => accepted.has(d.name));
  const otherDestinations = destinations.filter((d) => !accepted.has(d.name));

  const submit = (e) => {
    e.preventDefault();
    const done = `${exam.name} done`;
    openEnquiry(
      {
        destination: country,
        test: score && TEST_OPTIONS.includes(done) ? done : 'Preparing now',
        message: `Please suggest colleges for my ${exam.name} ${score ? `score: ${score.trim()}` : 'plan (score not yet available)'}${country ? ` in ${country}` : ''}.`,
      },
      'full',
    );
  };

  return (
    <form className="finder" onSubmit={submit}>
      {!preset && (
        <div className="finder-exams" role="radiogroup" aria-label="Exam">
          {exams.map((e) => (
            <button
              key={e.slug}
              type="button"
              role="radio"
              aria-checked={e.slug === slug}
              className={cn('tab', e.slug === slug && 'on')}
              onClick={() => setSlug(e.slug)}
            >
              {e.name}
            </button>
          ))}
        </div>
      )}

      <div className="finder-grid">
        <div className="finder-info">
          <span className="cost-label">Typical {exam.name} score asked</span>
          <b className="finder-score">{exam.typicalScore || 'Varies by program'}</b>
          {acceptedDestinations.length > 0 && (
            <p className="finder-accepted">
              Accepted in{' '}
              {acceptedDestinations.map((d, i) => (
                <span key={d.slug}>
                  {i > 0 && ', '}
                  <Link to={`/destinations/${d.slug}`}>
                    {d.flag} {d.name}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="finder-fields">
          <div className="field">
            <label htmlFor={`finder-score-${exam.slug}`}>Your {exam.name} score</label>
            <input
              id={`finder-score-${exam.slug}`}
              value={score}
              maxLength={40}
              placeholder="e.g. 7.0 — leave blank if not taken yet"
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`finder-country-${exam.slug}`}>Preferred country</label>
            <select id={`finder-country-${exam.slug}`} value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Any country</option>
              {acceptedDestinations.length > 0 && (
                <optgroup label={`Accept ${exam.name}`}>
                  {acceptedDestinations.map((d) => (
                    <option key={d.slug} value={d.name}>{d.name}</option>
                  ))}
                </optgroup>
              )}
              {otherDestinations.length > 0 && (
                <optgroup label="Other destinations">
                  {otherDestinations.map((d) => (
                    <option key={d.slug} value={d.name}>{d.name}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
          <Button type="submit" block arrow>
            Find colleges for my {exam.name} score
          </Button>
        </div>
      </div>
    </form>
  );
}
