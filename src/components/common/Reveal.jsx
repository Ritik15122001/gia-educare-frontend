import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';

const DELAY_CLASS = { 0: '', 1: 'rv-d1', 2: 'rv-d2', 3: 'rv-d3', 4: 'rv-d4', 5: 'rv-d5' };

export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={cn('rv', DELAY_CLASS[delay], inView && 'in', className)} {...rest}>
      {children}
    </Tag>
  );
}
