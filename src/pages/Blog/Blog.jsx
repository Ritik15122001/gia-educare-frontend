import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHead from '../../components/layout/PageHead';
import SectionHeader from '../../components/common/SectionHeader';
import Reveal from '../../components/common/Reveal';
import PostCard from '../../components/cards/PostCard';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { usePostCategories, usePosts, useSection, useSettings, splitAccent } from '../../hooks/useContent';
import { cn } from '../../utils/cn';

const HEAD = {
  title: 'Notes from the |counselling desk.',
  lead: 'No listicles and no brochure copy. What we actually tell students about costs, applications, visas and funding — written by the counsellors who handle the files.',
};
const LIST = { eyebrow: 'All articles', title: 'Latest from GIA Educare' };
const CTA = {
  eyebrow: 'Still have a question?',
  title: 'Reading only gets you so far. Ask a counsellor.',
  lead: 'Fifteen minutes on a call is worth three weeks of forum reading. Tell us where you are and we will give you an honest read on your options.',
};

export default function Blog() {
  const posts = usePosts();
  const settings = useSettings();
  const head = useSection('blog.head', HEAD);
  const list = useSection('blog.list', LIST);
  const cta = useSection('blog.cta', CTA);
  const categories = usePostCategories();
  // The active category lives in the URL, so menu links like
  // /blog?category=finances open straight onto that filter.
  const [params, setParams] = useSearchParams();
  const activeKey = params.get('category') || 'all';
  const active = categories.find((c) => c.key === activeKey);
  const { before, accent } = splitAccent(head.title);

  useEffect(() => {
    document.title = `Blog · ${settings.brand}`;
  }, [settings.brand]);

  // Only categories that actually have articles get a tab.
  const tabs = categories.filter((c) => posts.some((p) => p.category === c.key));
  const filtered = active ? posts.filter((p) => p.category === active.key) : posts;
  const select = (key) => setParams(key === 'all' ? {} : { category: key }, { replace: true });

  return (
    <>
      <PageHead
        crumb="Blog"
        title={
          <>
            {before}
            {accent && <em className="serif-i gold-text">{accent}</em>}
          </>
        }
        lead={head.lead}
      />

      <div className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow={active ? 'Blog category' : list.eyebrow}
            title={active ? active.label : list.title}
            lead={active ? active.description : list.lead}
          />

          {tabs.length > 0 && (
            <Reveal className="tabs">
              <button className={cn('tab', !active && 'on')} onClick={() => select('all')}>
                All articles
              </button>
              {tabs.map((c) => (
                <button key={c.key} className={cn('tab', active?.key === c.key && 'on')} onClick={() => select(c.key)}>
                  {c.label}
                </button>
              ))}
            </Reveal>
          )}

          {filtered.length ? (
            <div className="grid cols-3">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} delay={i % 3} />
              ))}
            </div>
          ) : (
            <p className="center small" style={{ color: 'var(--muted)', padding: '30px 0' }}>
              No articles in this category yet — try another one.
            </p>
          )}
        </div>
      </div>

      <EnquiryBand eyebrow={cta.eyebrow} title={cta.title} lead={cta.lead} />
    </>
  );
}
