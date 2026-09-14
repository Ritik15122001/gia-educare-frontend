import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

/**
 * Two-column mega menu shared by "Countries" and "Exams": a list on the left
 * (a "Beginner Doubts" entry first, then one row per item) and a panel on the
 * right that follows whichever row is hovered or focused. Every row is also a
 * real link, so the menu works without hover — touch, keyboard, screen readers.
 */
export default function MegaMenu({ id, onNavigate, doubts, items, footer, renderPanel }) {
  const [active, setActive] = useState(doubts.key);
  const current = items.find((it) => it.key === active);

  const row = (key, to, label, prefix) => (
    <li key={key}>
      <Link
        to={to}
        className={cn('mega-item', active === key && 'on')}
        onMouseEnter={() => setActive(key)}
        onFocus={() => setActive(key)}
        onClick={onNavigate}
      >
        {prefix}
        <span>{label}</span>
        <span className="mega-chev" aria-hidden="true">›</span>
      </Link>
    </li>
  );

  return (
    <div className="mega" id={id}>
      <ul className="mega-list">
        {row(doubts.key, doubts.to, doubts.label)}
        {items.map((it) => row(it.key, it.to, it.label, it.prefix))}
        {footer && (
          <li>
            <Link to={footer.to} className="mega-item mega-item--all" onClick={onNavigate}>
              <span>{footer.label}</span>
              <span className="mega-chev" aria-hidden="true">→</span>
            </Link>
          </li>
        )}
      </ul>

      <div className="mega-panel">
        {current ? (
          renderPanel(current)
        ) : (
          <>
            <p className="mega-kicker">{doubts.kicker}</p>
            <h3 className="mega-title">{doubts.title}</h3>
            {doubts.posts.length ? (
              <ul className="mega-links">
                {doubts.posts.map((p) => (
                  <li key={p.id}>
                    <Link to={`/blog/${p.slug}`} onClick={onNavigate}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mega-empty">Articles are on the way — ask a counsellor in the meantime.</p>
            )}
            <Link to={doubts.to} className="mega-more" onClick={onNavigate}>
              {doubts.allLabel} →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// Shared right-panel pieces.
export function PanelLinks({ title, links, onNavigate }) {
  return (
    <div>
      <p className="mega-sub">{title}</p>
      <ul className="mega-links">
        {links.map(([to, label]) => (
          <li key={to + label}>
            <Link to={to} onClick={onNavigate}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PanelArticles({ posts, empty, onNavigate }) {
  return (
    <div>
      <p className="mega-sub">Articles</p>
      {posts.length ? (
        <ul className="mega-links">
          {posts.slice(0, 5).map((p) => (
            <li key={p.id}>
              <Link to={`/blog/${p.slug}`} onClick={onNavigate}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mega-empty">{empty}</p>
      )}
    </div>
  );
}
