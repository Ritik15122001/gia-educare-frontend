import { Link } from 'react-router-dom';
import MegaMenu, { PanelArticles, PanelLinks } from './MegaMenu';
import { useDestinations, usePosts } from '../../../hooks/useContent';

export default function CountriesMenu({ id, onNavigate }) {
  const destinations = useDestinations();
  const posts = usePosts();

  return (
    <MegaMenu
      id={id}
      onNavigate={onNavigate}
      doubts={{
        key: 'beginner-doubts',
        to: '/blog?category=beginner-doubts',
        label: 'Beginner Doubts',
        kicker: 'Start here',
        title: 'Questions every student asks first',
        posts: posts.filter((p) => p.category === 'beginner-doubts'),
        allLabel: 'All beginner doubts',
      }}
      items={destinations.map((d) => ({
        key: d.slug,
        to: `/destinations/${d.slug}`,
        label: d.name,
        prefix: <span className="mega-flag" aria-hidden="true">{d.flag}</span>,
        destination: d,
      }))}
      footer={{ to: '/destinations', label: 'Compare all countries' }}
      renderPanel={({ destination: country }) => (
        <div className="mega-country">
          <div>
            <p className="mega-kicker">
              {country.flag} {country.tag || 'Study destination'}
            </p>
            <h3 className="mega-title">Study in {country.name}</h3>
            <div className="mega-cols">
              <PanelLinks
                title="Explore"
                onNavigate={onNavigate}
                links={[
                  [`/destinations/${country.slug}`, `Why study in ${country.name}`],
                  [`/destinations/${country.slug}#costs`, 'Costs & tuition in INR'],
                  [`/destinations/${country.slug}#facts`, 'Intakes, tests & work rights'],
                  ['/destinations#compare', 'Compare with other countries'],
                ]}
              />
              <PanelArticles
                onNavigate={onNavigate}
                posts={posts.filter((p) => p.destination === country.slug)}
                empty={`No articles yet — a counsellor can answer your ${country.name} questions directly.`}
              />
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
    />
  );
}
