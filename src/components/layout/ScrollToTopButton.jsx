import Icon from '../common/Icon';
import { useNavigationStore } from '../../store/navigationStore';
import { cn } from '../../utils/cn';

export default function ScrollToTopButton() {
  const showToTop = useNavigationStore((s) => s.showToTop);

  return (
    <button
      className={cn('to-top', showToTop && 'show')}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="chevron-up" size={18} strokeWidth={2.4} />
    </button>
  );
}
