import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';
import { formatPostDate } from '../../utils/formatDate';
import { usePostCategories } from '../../hooks/useContent';
import { useImageOk } from '../../hooks/useImageOk';

export default function PostCard({ post, delay = 0 }) {
  const category = usePostCategories().find((c) => c.key === post.category);
  const [showCover, onCoverError] = useImageOk(post.coverUrl);

  return (
    <Reveal as="article" delay={delay} className="post">
      <Link to={`/blog/${post.slug}`} className="post-cover" aria-label={post.title}>
        {showCover ? (
          <img src={post.coverUrl} alt="" loading="lazy" onError={onCoverError} />
        ) : (
          // No cover set — fall back to the brand gradient rather than a gap.
          <span className="post-cover-fallback" aria-hidden="true">
            {category?.label || (post.tags && post.tags[0]) || 'GIA'}
          </span>
        )}
      </Link>

      <div className="post-body">
        <div className="post-tags">
          {category && <span className="post-cat">{category.label}</span>}
          {(post.tags || []).slice(0, category ? 1 : 2).map((t) => (
            <Pill variant="plain" key={t}>
              {t}
            </Pill>
          ))}
        </div>

        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="desc">{post.excerpt}</p>

        <div className="post-foot">
          <span>{post.author || 'GIA Educare'}</span>
          <span className="dot-sep" aria-hidden="true">·</span>
          <span>{formatPostDate(post.publishedAt)}</span>
          <span className="dot-sep" aria-hidden="true">·</span>
          <span>{post.readMinutes || 1} min read</span>
        </div>
      </div>
    </Reveal>
  );
}
