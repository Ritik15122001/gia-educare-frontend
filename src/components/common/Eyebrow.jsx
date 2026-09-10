import { cn } from '../../utils/cn';

export default function Eyebrow({ center, children }) {
  return <span className={cn('eyebrow', center && 'eyebrow--center')}>{children}</span>;
}
