import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function LinkArrow({ to, href, gold, className, children, ...rest }) {
  const classes = cn('link-arrow', gold && 'link-arrow--gold', className);
  const content = (
    <>
      <span>{children}</span>
      <span>→</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
