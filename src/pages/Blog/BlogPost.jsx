import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import Pill from '../../components/common/Pill';
import Button from '../../components/common/Button';
import PostCard from '../../components/cards/PostCard';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { usePostCategories, usePosts, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { renderMarkdown } from '../../utils/markdown';
import { formatPostDate } from '../../utils/formatDate';

export default function BlogPost() {
  const { slug } = useParams();
  const posts = usePosts();
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();

  const post = posts.find((p) => p.slug === slug);
  const category = usePostCategories().find((c) => c.key === post?.category);

  useEffect(() => {
    document.title = post ? `${post.title} · ${settings.brand}` : `Article not found · ${settings.brand}`;
  }, [post, settings.brand]);

  // The store may still be hydrating, so an unknown slug is only really a 404
  // once some posts have arrived.
  if (!post) {
    return (
      <div className="section">
        <div className="wrap center" style={{ maxWidth: 620 }}>
          <h1 className="h2">{posts.length ? 'That article has moved.' : 'Loading…'}</h1>
          {Boolean(posts.length) && (
            <>
              <p className="lead" style={{ marginTop: 14 }}>
                The link may be out of date. Everything we have published is on the blog index.
              </p>
              <Button to="/blog" arrow style={{ marginTop: 24 }}>
                Back to the blog
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Same category first, then the most recent of the rest.
  const others = posts.filter((p) => p.id !== post.id);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  return (
    <>
      <div className="pagehead pagehead--article">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="crumb">
            <Link to="/">Home</Link>
            <i>/</i>
            <Link to="/blog">Blog</Link>
            <i>/</i>
            {category && (
              <>
                <Link to={`/blog?category=${category.key}`}>{category.label}</Link>
                <i>/</i>
              </>
            )}
            <span>{post.title}</span>
          </div>

          <div className="post-tags" style={{ marginBottom: 14 }}>
            {(post.tags || []).map((t) => (
              <Pill variant="light" key={t}>
                {t}
              </Pill>
            ))}
          </div>

          <h1 className="display display--article">{post.title}</h1>

          <div className="article-meta">
            <span>{post.author || 'GIA Educare'}</span>
            <span className="dot-sep" aria-hidden="true">·</span>
            <span>{formatPostDate(post.publishedAt)}</span>
            <span className="dot-sep" aria-hidden="true">·</span>
            <span>{post.readMinutes || 1} min read</span>
          </div>
        </div>
      </div>

      <div className="section section--tight">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {post.coverUrl && (
            <Reveal className="article-cover">
              <img src={post.coverUrl} alt="" />
            </Reveal>
          )}

          <Reveal className="article">{renderMarkdown(post.body)}</Reveal>

          <Reveal className="article-cta">
            <div>
              <b>Want this applied to your own profile?</b>
              <p>A counsellor will go through your marks, budget and timeline — completely free.</p>
            </div>
            <Button arrow onClick={() => openEnquiry({ message: `Read: ${post.title}` }, 'full')}>
              Book free counselling
            </Button>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 26 }}>
              Keep reading
            </h2>
            <div className="grid cols-3">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} delay={i % 3} />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryBand
        eyebrow="Start here"
        title="Book a free 1:1 profile evaluation"
        lead="Tell us where you are today. You'll get an honest read on your chances, a shortlist direction and a timeline — on the call itself."
      />
    </>
  );
}
