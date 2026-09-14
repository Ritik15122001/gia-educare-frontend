import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { fetchCaptcha } from '../../services/enquiryService';

/**
 * Server-verified arithmetic captcha. The parent owns the answer and gets the
 * token through `onToken`; bumping `refreshKey` loads a new sum.
 */
export default function CaptchaField({ value, onChange, onToken, refreshKey = 0, error, full }) {
  const [challenge, setChallenge] = useState(null);
  const [failed, setFailed] = useState(false);
  const [manualKey, setManualKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchCaptcha(controller.signal)
      .then((data) => {
        setChallenge(data);
        setFailed(false);
        onToken(data.token);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setChallenge(null);
        setFailed(true);
        onToken('');
      });
    return () => controller.abort();
  }, [onToken, refreshKey, manualKey]);

  return (
    <div className={cn('field', full && 'f-full', error && 'err')}>
      <label>
        Security check <span className="req">*</span>
      </label>
      <div className="captcha-row">
        <span className="captcha-img" aria-live="polite">
          {challenge ? (
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(challenge.svg)}`}
              alt="Security check: solve the sum shown in the image"
              width="190"
              height="60"
            />
          ) : (
            <span className="captcha-loading">{failed ? 'Could not load' : 'Loading…'}</span>
          )}
        </span>
        <button type="button" className="captcha-refresh" onClick={() => setManualKey((k) => k + 1)} aria-label="Show a different sum" title="Show a different sum">
          ↻
        </button>
        <input
          className="captcha-input"
          inputMode="numeric"
          autoComplete="off"
          placeholder="= ?"
          aria-label="Answer to the sum"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d-]/g, '').slice(0, 4))}
        />
      </div>
      <span className="f-msg">{failed ? 'Could not load the security check — refresh the page or call us.' : 'Solve the sum to continue'}</span>
    </div>
  );
}
