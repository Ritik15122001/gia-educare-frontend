import { cn } from '../../utils/cn';

export default function SelectField({ label, required, error, errorMessage, full, options, className, ...selectProps }) {
  return (
    <div className={cn('field', full && 'f-full', error && 'err', className)}>
      {label && (
        <label>
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      <select {...selectProps}>
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      {errorMessage && <span className="f-msg">{errorMessage}</span>}
    </div>
  );
}
