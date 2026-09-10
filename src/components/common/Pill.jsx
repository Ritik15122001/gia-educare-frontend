import { cn } from '../../utils/cn';

export default function Pill({ variant, className, children }) {
  return (
    <span
      className={cn(
        'pill',
        variant === 'light' && 'pill--light',
        variant === 'plain' && 'pill--plain',
        className
      )}
    >
      {children}
    </span>
  );
}
