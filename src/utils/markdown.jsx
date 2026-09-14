/**
 * A deliberately small markdown renderer for blog post bodies.
 *
 * It returns React elements rather than an HTML string, so nothing is ever
 * passed through dangerouslySetInnerHTML and admin-authored copy cannot inject
 * markup. A full markdown library would be ~40KB for the handful of constructs
 * an article actually uses — the same reasoning behind the hand-rolled SVG
 * chart in the admin.
 *
 * Supported: ## / ### headings, paragraphs, - and 1. lists, > blockquotes,
 * --- rules, and inline **bold**, *italic*, `code` and [links](url).
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

// Only http(s), mailto, tel and site-relative links survive — no javascript:.
const safeHref = (href) => (/^(https?:|mailto:|tel:|\/)/i.test(href) ? href : '#');

function inline(text, keyPrefix) {
  return String(text)
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>;
      if (part.startsWith('*') && part.endsWith('*')) return <em key={key}>{part.slice(1, -1)}</em>;

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = safeHref(link[2]);
        const external = /^https?:/i.test(href);
        return (
          <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
            {link[1]}
          </a>
        );
      }
      return part;
    });
}

export function renderMarkdown(source = '') {
  const lines = String(source).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  let list = null; // { ordered, items: [] }

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(' ');
    out.push(<p key={`p-${out.length}`}>{inline(text, `p${out.length}`)}</p>);
    para = [];
  };

  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    out.push(
      <Tag key={`l-${out.length}`} className={list.ordered ? 'md-ol' : 'md-ul'}>
        {list.items.map((item, i) => (
          <li key={i}>{inline(item, `li${out.length}-${i}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  const flushAll = () => {
    flushPara();
    flushList();
  };

  lines.forEach((raw) => {
    const line = raw.trimEnd();

    if (!line.trim()) return flushAll();

    if (/^---+$/.test(line.trim())) {
      flushAll();
      return out.push(<hr key={`hr-${out.length}`} className="md-hr" />);
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushAll();
      const Tag = `h${heading[1].length}`;
      return out.push(
        <Tag key={`h-${out.length}`} className="md-h">
          {inline(heading[2], `h${out.length}`)}
        </Tag>,
      );
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushAll();
      return out.push(
        <blockquote key={`q-${out.length}`} className="md-quote">
          {inline(quote[1], `q${out.length}`)}
        </blockquote>,
      );
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
    if (bullet || numbered) {
      flushPara();
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      return undefined;
    }

    flushList();
    return para.push(line.trim());
  });

  flushAll();
  return out;
}
