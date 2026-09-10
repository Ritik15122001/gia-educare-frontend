import { cn } from '../../utils/cn';
import { COUNTRY_CODES } from '../../data/formOptions';

export default function PhoneField({ code, phone, onCodeChange, onPhoneChange, error }) {
  return (
    <div className={cn('field', error && 'err')}>
      <label>
        Phone <span className="req">*</span>
      </label>
      <div className="phone-row">
        <select aria-label="Country code" value={code} onChange={(e) => onCodeChange(e.target.value)}>
          {COUNTRY_CODES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="tel"
          placeholder="90000 00000"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>
      <span className="f-msg">Enter a valid 10-digit number</span>
    </div>
  );
}
