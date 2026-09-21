import { useSettings } from '../../hooks/useContent';

export default function ConsentField({ checked, onChange, error }) {
  const settings = useSettings();

  return (
    <div className={`field f-full${error ? ' err' : ''}`}>
      <label className="consent">
        <input type="checkbox" name="consent" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>
          I agree to be contacted by {settings.brand} about my enquiry, by phone, email or WhatsApp, and
          I have read the{' '}
          {/* Plain anchors, not <Link>: the form also lives inside the enquiry
              modal, and a new tab keeps a half-filled form from being lost. */}
          <a href="/privacy-policy" target="_blank" rel="noreferrer noopener">
            privacy policy
          </a>{' '}
          and{' '}
          <a href="/terms-of-service" target="_blank" rel="noreferrer noopener">
            terms of service
          </a>
          .
        </span>
      </label>
      <span className="f-msg">Please accept to continue</span>
    </div>
  );
}
