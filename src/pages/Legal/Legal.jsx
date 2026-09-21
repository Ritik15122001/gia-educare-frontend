import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/layout/PageHead';
import Reveal from '../../components/common/Reveal';
import Icon from '../../components/common/Icon';
import { renderMarkdown } from '../../utils/markdown';
import { useSection, useSettings, splitAccent } from '../../hooks/useContent';
import { LEGAL_DOCS, LEGAL_ORDER, LEGAL_UPDATED } from '../../data/legal';

// The documents are written with {brand}-style placeholders so one edit in
// Settings → Legal & location updates the contact block and the trading name in
// all three of them.
function fill(body, settings) {
  const email = settings.emailPrimary || 'info@giaeducare.com';
  const phone = settings.phonePrimary || '';
  // The live hostname, so the documents name the site they are served from —
  // but never "localhost" or an IP from a dev or preview build.
  const host = typeof window === 'undefined' ? '' : window.location.hostname.replace(/^www\./, '');
  const site = /^(localhost$|127\.|0\.0\.0\.0|\d+\.\d+\.\d+\.\d+$)/.test(host) || !host ? 'giaeducare.com' : host;

  const values = {
    brand: settings.brand || 'GIA Educare',
    entity: settings.legalEntity || 'an independent study-abroad consultancy',
    address: settings.addressLine || '',
    email,
    phone,
    phoneDigits: phone.replace(/[^\d+]/g, ''),
    site,
  };

  return body.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
}

export default function Legal({ doc }) {
  const settings = useSettings();
  const page = LEGAL_DOCS[doc];
  const head = useSection(page.sectionKey, page.head);
  const { before, accent } = splitAccent(head.title);

  useEffect(() => {
    document.title = `${page.crumb} · ${settings.brand}`;
  }, [page.crumb, settings.brand]);

  const content = useMemo(() => renderMarkdown(fill(page.body, settings)), [page.body, settings]);
  const others = LEGAL_ORDER.filter((key) => key !== doc);

  return (
    <>
      <PageHead
        crumb={page.crumb}
        title={
          <>
            {before}
            {accent && <em className="serif-i gold-text">{accent}</em>}
          </>
        }
        lead={head.lead}
      >
        <p className="legal-updated">
          <Icon name="calendar" size={15} />
          Last updated {LEGAL_UPDATED}
        </p>
      </PageHead>

      <div className="section section--tight">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {/* No <Reveal> on the body: the scroll-reveal threshold is a fraction
              of the element, and a policy is far taller than the viewport, so it
              would sit at opacity 0 until you had scrolled most of the way down. */}
          <div className="article">{content}</div>

          <Reveal className="article-cta legal-more">
            <div>
              <b>Something here unclear?</b>
              <p>Ask us before you commit to anything — we would rather explain it twice than have you guess.</p>
            </div>
            <ul className="legal-links">
              {others.map((key) => (
                <li key={key}>
                  <Link to={LEGAL_DOCS[key].path}>{LEGAL_DOCS[key].crumb}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </>
  );
}
