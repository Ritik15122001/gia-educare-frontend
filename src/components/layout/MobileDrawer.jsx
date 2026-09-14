import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useDestinations, useExams, usePostCategories, usePosts, useSettings } from '../../hooks/useContent';
import { useUiStore } from '../../store/uiStore';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { cn } from '../../utils/cn';

function Section({ id, label, open, onToggle, children }) {
  return (
    <div className={cn('d-group', open && 'open')}>
      <button type="button" className="d-link d-toggle" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        {label} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="d-sub" id={id}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function MobileDrawer() {
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();
  const destinations = useDestinations();
  const exams = useExams();
  const posts = usePosts();
  const navCategories = usePostCategories().filter((c) => c.showInNav);
  const [expanded, setExpanded] = useState(null);

  const toggle = (key) => setExpanded((cur) => (cur === key ? null : key));
  const link = (to, label, end) => (
    <NavLink key={to} to={to} end={end} className="d-link" onClick={closeMobileMenu}>
      {label} <span>→</span>
    </NavLink>
  );
  const sub = (to, label) => (
    <Link key={to} to={to} onClick={closeMobileMenu}>
      {label}
    </Link>
  );

  return (
    <>
      <div className="scrim" onClick={closeMobileMenu} aria-hidden="true"></div>
      <aside className="drawer" aria-label="Mobile menu" aria-hidden={!mobileMenuOpen}>
        <div className="d-top">
          <Logo inverted size="sm" />
          <button
            className="burger"
            style={{ display: 'grid', background: 'transparent', borderColor: 'rgba(255,255,255,.2)' }}
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <span style={{ background: '#fff' }}></span>
          </button>
        </div>

        {link('/', 'Home', true)}

        <Section id="drawer-countries" label="Countries" open={expanded === 'countries'} onToggle={() => toggle('countries')}>
          {sub('/blog?category=beginner-doubts', 'Beginner doubts')}
          {destinations.map((d) => sub(`/destinations/${d.slug}`, `${d.flag} ${d.name}`))}
          {sub('/destinations', 'Compare all countries →')}
        </Section>

        <Section id="drawer-exams" label="Exams" open={expanded === 'exams'} onToggle={() => toggle('exams')}>
          {sub('/blog?category=exam-doubts', 'Beginner doubts')}
          {exams.map((e) => sub(`/exams/${e.slug}`, e.name))}
          {sub('/exams#colleges', 'Find colleges by exam →')}
        </Section>

        {link('/courses', 'Courses')}

        {navCategories.map((cat) => (
          <Section key={cat.key} id={`drawer-${cat.key}`} label={cat.label} open={expanded === cat.key} onToggle={() => toggle(cat.key)}>
            {posts.filter((p) => p.category === cat.key).slice(0, 6).map((p) => sub(`/blog/${p.slug}`, p.title))}
            {sub(`/blog?category=${cat.key}`, `See all in ${cat.label} →`)}
          </Section>
        ))}

        {link('/blog', 'Blog')}
        {link('/about', 'About Us')}
        {link('/contact', 'Contact')}

        <Button
          block
          style={{ marginTop: 22 }}
          onClick={() => {
            closeMobileMenu();
            openEnquiry();
          }}
        >
          Book free counselling
        </Button>

        <div className="d-foot">
          <b style={{ color: '#fff' }}>Talk to a counsellor</b>
          <br />
          <a href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>{settings.phonePrimary}</a>
          <br />
          <a href={`mailto:${settings.emailPrimary}`}>{settings.emailPrimary}</a>
        </div>
      </aside>
    </>
  );
}
