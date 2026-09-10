import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const VARIANT_CLASS = {
  gold: '',
  ghost: 'btn--ghost',
  dark: 'btn--dark',
  outline: 'btn--outline',
};

export default function Button({
  variant = 'gold',
  size,
  block,
  to,
  href,
  arrow = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'btn',
    VARIANT_CLASS[variant],
    size === 'lg' && 'btn--lg',
    block && 'btn--block',
    className
  );

  const content = (
    <>
      {children}
      {arrow && <span className="ar">→</span>}
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
