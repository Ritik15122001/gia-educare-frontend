import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../utils/cn';

const DELAY_CLASS = { 0: '', 1: 'rv-d1', 2: 'rv-d2', 3: 'rv-d3' };

export default function StatCard({ stat, delay = 0 }) {
  const [ref, inView] = useInView();
  const value = useCountUp(stat.value ?? stat.to, inView);

  return (
    <div ref={ref} className={cn('stat', 'rv', DELAY_CLASS[delay], inView && 'in')}>
      <div className="n">
        <span>{value.toLocaleString('en-IN')}</span>
        <span className="suf">{stat.suffix}</span>
      </div>
      <div className="l">{stat.label}</div>
    </div>
  );
}
