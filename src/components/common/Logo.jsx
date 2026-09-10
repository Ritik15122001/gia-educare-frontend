import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useSettings } from '../../hooks/useContent';

export default function Logo({ inverted, size = 'sm', className }) {
  const settings = useSettings();

  const img = (
    <img
      src={settings.logoUrl || '/logo.jpg'}
      alt={`${settings.brand} logo`}
      className={cn('brand-img', size === 'lg' && 'brand-img--lg')}
    />
  );

  return (
    <Link to="/" className={cn('brand', className)} aria-label={`${settings.brand} home`}>
      {inverted ? <span className="brand-chip">{img}</span> : img}
    </Link>
  );
}
