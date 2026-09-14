import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import LinkArrow from '../common/LinkArrow';
import PostCard from '../cards/PostCard';
import { useRecentPosts, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'Insights',
  title: 'Advice worth reading before you apply',
  lead: 'Notes from our counselling desk — costs, applications and funding, written by the people who handle the files.',
};

export default function BlogPreview() {
  const posts = useRecentPosts();
  const section = useSection('home.blog', DEFAULTS);

  // Nothing published yet — drop the band rather than render an empty grid.
  if (!posts.length) return null;

  return (
    <div className="section">
      <div className="wrap">
        <Reveal
          className="sec-head"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, maxWidth: 'none', flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: 600 }}>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            <p className="lead">{section.lead}</p>
          </div>
          <LinkArrow to="/blog">All articles</LinkArrow>
        </Reveal>

        <div className="grid cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} delay={i % 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
