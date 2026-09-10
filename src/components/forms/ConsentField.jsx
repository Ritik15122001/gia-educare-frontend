import { useSettings } from '../../hooks/useContent';

export default function ConsentField({ checked, onChange, error }) {
  const settings = useSettings();

  return (
    <div className={`field f-full${error ? ' err' : ''}`}>
      <label className="consent">
        <input type="checkbox" name="consent" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>
          I agree to be contacted by {settings.brand} about my enquiry, by phone, email or WhatsApp.
        </span>
      </label>
      <span className="f-msg">Please accept to continue</span>
    </div>
  );
}
