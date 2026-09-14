import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDestinations, usePosts } from '../../../hooks/useContent';
import { cn } from '../../../utils/cn';

const BEGINNER = 'beginner-doubts';

/**
 * The "Countries" mega menu: a list on the left (Beginner Doubts, then every
 * published destination) and a panel on the right that follows whichever item
 * is hovered or focused. Every left-hand item is also a real link, so it works
 * without hover (touch, keyboard, screen readers).
 */
export default function CountriesMenu({ id, onNavigate }) {
  const destinations = useDestinations();
  const posts = usePosts();
  const [active, setActive] = useState(BEGINNER);

  const beginnerPosts = posts.filter((p) => p.category === BEGINNER);
  const country = destinations.find((d) => d.slug === active);
  const countryPosts = country ? posts.filter((p) => p.destination === country.slug) : [];

  const item = (key, to, label, extra) => (
    <li key={key}>
      <Link
        to={to}
        className={cn('mega-item', active === key && 'on')}
        onMouseEnter={() => setActive(key)}
        onFocus={() => setActive(key)}
        onClick={onNavigate}
      >
        {extra}
        <span>{label}</span>
        <span className="mega-chev" aria-hidden="true">›</span>
      </Link>
    </li>
  );

  return (
    <div className="mega" id={id}>
      <ul className="mega-list">
        {item(BEGINNER, `/blog?category=${BEGINNER}`, 'Beginner Doubts')}
        {destinations.map((d) =>
          item(d.slug, `/destinations/${d.slug}`, d.name, <span className="mega-flag" aria-hidden="true">{d.flag}</span>),
        )}
        <li>
          <Link to="/destinations" className="mega-item mega-item--all" onClick={onNavigate}>
            <span>Compare all countries</span>
            <span className="mega-chev" aria-hidden="true">→</span>
          </Link>
        </li>
      </ul>

      <div className="mega-panel">
        {!country && (
          <>
            <p className="mega-kicker">Start here</p>
            <h3 className="mega-title">Questions every student asks first</h3>
            <ul className="mega-links">
              {beginnerPosts.map((p) => (
                <li key={p.id}>
                  <Link to={`/blog/${p.slug}`} onClick={onNavigate}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to={`/blog?category=${BEGINNER}`} className="mega-more" onClick={onNavigate}>
              All beginner doubts →
            </Link>
          </>
        )}

        {country && (
          <div className="mega-country">
            <div>
              <p className="mega-kicker">
                {country.flag} {country.tag || 'Study destination'}
              </p>
              <h3 className="mega-title">Study in {country.name}</h3>
              <div className="mega-cols">
                <div>
                  <p className="mega-sub">Explore</p>
                  <ul className="mega-links">
                    <li><Link to={`/destinations/${country.slug}`} onClick={onNavigate}>Why study in {country.name}</Link></li>
                    <li><Link to={`/destinations/${country.slug}#costs`} onClick={onNavigate}>Costs & tuition in INR</Link></li>
                    <li><Link to={`/destinations/${country.slug}#facts`} onClick={onNavigate}>Intakes, tests & work rights</Link></li>
                    <li><Link to="/destinations#compare" onClick={onNavigate}>Compare with other countries</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="mega-sub">Articles</p>
                  {countryPosts.length ? (
                    <ul className="mega-links">
                      {countryPosts.slice(0, 5).map((p) => (
                        <li key={p.id}>
                          <Link to={`/blog/${p.slug}`} onClick={onNavigate}>
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mega-empty">No articles yet — a counsellor can answer your {country.name} questions directly.</p>
                  )}
                </div>
              </div>
            </div>
            {country.imageUrl && (
              <Link to={`/destinations/${country.slug}`} className="mega-photo" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
                <img src={country.imageUrl} alt="" loading="lazy" />
                <span>{country.blurb}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
