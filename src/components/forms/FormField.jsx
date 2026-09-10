import { cn } from '../../utils/cn';

export default function FormField({
  label,
  required,
  error,
  errorMessage = 'This field is required',
  full,
  as = 'input',
  className,
  ...inputProps
}) {
  const Tag = as;
  return (
    <div className={cn('field', full && 'f-full', error && 'err', className)}>
      {label && (
        <label>
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      <Tag {...inputProps} />
      <span className="f-msg">{errorMessage}</span>
    </div>
  );
}
