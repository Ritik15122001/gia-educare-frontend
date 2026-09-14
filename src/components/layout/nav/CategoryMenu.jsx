import { Link } from 'react-router-dom';
import { usePosts } from '../../../hooks/useContent';

// A compact dropdown of one blog category's articles, e.g. "Finances".
export default function CategoryMenu({ id, category, onNavigate }) {
  const posts = usePosts().filter((p) => p.category === category.key);

  return (
    <div className="dropdown" id={id}>
      {category.description && <p className="dropdown-lead">{category.description}</p>}
      <ul className="mega-links">
        {posts.slice(0, 7).map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.slug}`} onClick={onNavigate}>
              {p.title}
            </Link>
          </li>
        ))}
        {!posts.length && <li className="mega-empty">Articles are on the way.</li>}
      </ul>
      <Link to={`/blog?category=${category.key}`} className="mega-more" onClick={onNavigate}>
        See all in {category.label} →
      </Link>
    </div>
  );
}
