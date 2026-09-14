import { useEnquiryForm } from '../../hooks/useEnquiryForm';
import FormField from './FormField';
import SelectField from './SelectField';
import PhoneField from './PhoneField';
import ConsentField from './ConsentField';
import SuccessState from './SuccessState';
import CaptchaField from './CaptchaField';
import Button from '../common/Button';
import { cn } from '../../utils/cn';
import { useDestinations } from '../../hooks/useContent';
import {
  BUDGET_OPTIONS,
  LEVEL_OPTIONS,
  INTAKE_OPTIONS,
  TEST_OPTIONS,
  QUALIFICATION_OPTIONS,
} from '../../data/formOptions';

export default function EnquiryForm({ variant = 'compact', onDark = false, badge, prefill }) {
  const { values, errors, status, error, setField, handleSubmit, reset, captchaKey, setCaptchaToken } = useEnquiryForm(prefill);
  const destinations = useDestinations();
  const isFull = variant === 'full';
  const done = status === 'success';

  // The country list is whatever the admin has published, plus an escape hatch.
  const destinationOptions = [
    { value: '', label: 'Select a country' },
    ...destinations.map((d) => ({ value: d.name, label: d.name })),
    { value: 'Not decided yet', label: 'Not decided yet' },
  ];

  return (
    <div className={cn('enq', onDark && 'enq--onDark', done && 'done')}>
      {badge && <span className="enq-badge">{badge}</span>}

      <div className="enq-head">
        <h3>{isFull ? 'Send us your details' : 'Book your free counselling call'}</h3>
        <p>
          {isFull
            ? 'The more you tell us, the more specific the shortlist we come back with.'
            : 'Takes 40 seconds. A senior counsellor replies within one working day.'}
        </p>
      </div>

      <form className="enq-form" noValidate onSubmit={handleSubmit}>
        <div className="f-grid">
          <FormField
            full
            label="Full name"
            required
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            error={errors.name}
            errorMessage="Please enter your name"
          />

          <FormField
            label="Email"
            required
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            error={errors.email}
            errorMessage="Enter a valid email address"
          />

          <PhoneField
            code={values.code}
            phone={values.phone}
            onCodeChange={(v) => setField('code', v)}
            onPhoneChange={(v) => setField('phone', v)}
            error={errors.phone}
          />

          <SelectField
            label="Preferred destination"
            required
            options={destinationOptions}
            value={values.destination}
            onChange={(e) => setField('destination', e.target.value)}
            error={errors.destination}
            errorMessage="Please choose a destination"
          />

          <SelectField
            label="Your total budget"
            required
            options={[{ value: '', label: 'Select a budget range' }, ...BUDGET_OPTIONS.map((b) => ({ value: b, label: b }))]}
            value={values.budget}
            onChange={(e) => setField('budget', e.target.value)}
            error={errors.budget}
            errorMessage="Please choose your budget range"
          />

          <SelectField
            label="Study level"
            options={LEVEL_OPTIONS}
            value={values.level}
            onChange={(e) => setField('level', e.target.value)}
          />

          <SelectField
            label="Preferred intake"
            options={INTAKE_OPTIONS}
            value={values.intake}
            onChange={(e) => setField('intake', e.target.value)}
          />

          {isFull && (
            <>
              <SelectField
                label="Test status"
                options={TEST_OPTIONS}
                value={values.test}
                onChange={(e) => setField('test', e.target.value)}
              />

              <SelectField
                label="Highest qualification"
                options={QUALIFICATION_OPTIONS}
                value={values.qual}
                onChange={(e) => setField('qual', e.target.value)}
              />

              <FormField
                full
                as="textarea"
                label="Anything we should know?"
                placeholder="Backlogs, education gap, budget range, specific universities you're considering…"
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
              />
            </>
          )}

          <FormField
            full
            label="Referral code"
            name="referral"
            type="text"
            placeholder="Optional — a friend's name or partner code"
            autoComplete="off"
            maxLength={120}
            value={values.referral}
            onChange={(e) => setField('referral', e.target.value)}
          />

          <CaptchaField
            full
            value={values.captchaAnswer}
            onChange={(v) => setField('captchaAnswer', v)}
            onToken={setCaptchaToken}
            refreshKey={captchaKey}
            error={errors.captchaAnswer || errors.captcha}
          />

          <ConsentField
            checked={values.consent}
            onChange={(v) => setField('consent', v)}
            error={errors.consent}
          />
        </div>

        <div className="enq-foot">
          <Button type="submit" block size="lg" arrow disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Request my free callback'}
          </Button>
          {status === 'error' && (
            <p className="f-msg" style={{ display: 'block', textAlign: 'center' }}>
              {error || 'Something went wrong. Please try again or call us directly.'}
            </p>
          )}
          <p className="enq-note">🔒 We never sell your data or share it with universities without your consent.</p>
        </div>
      </form>

      {done && <SuccessState values={values} onReset={reset} />}
    </div>
  );
}
