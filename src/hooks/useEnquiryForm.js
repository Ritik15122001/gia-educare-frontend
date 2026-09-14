import { useState } from 'react';
import { submitEnquiry } from '../services/enquiryService';
import { getAttribution } from '../utils/attribution';
import { isValidName, isValidEmail, isValidPhone, isNotEmpty, isChecked, isCaptchaAnswer } from '../utils/validators';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  code: '+91',
  phone: '',
  destination: '',
  budget: '',
  level: 'Masters',
  intake: 'Jan 2027',
  test: 'Not taken yet',
  qual: 'Class 12',
  message: '',
  referral: '',
  consent: false,
  captchaAnswer: '',
};

const VALIDATORS = {
  name: isValidName,
  email: isValidEmail,
  phone: isValidPhone,
  destination: isNotEmpty,
  budget: isNotEmpty,
  consent: isChecked,
  captchaAnswer: isCaptchaAnswer,
};

// API field names that map onto a different form field.
const SERVER_FIELD = { captcha: 'captchaAnswer' };

const initialValues = (prefill) => ({
  ...DEFAULT_VALUES,
  // A referral link the student arrived on pre-fills the (still editable) field.
  referral: getAttribution().referral,
  ...prefill,
});

export function useEnquiryForm(prefill) {
  const [values, setValues] = useState(() => initialValues(prefill));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState(null);
  const [captchaToken, setCaptchaToken] = useState('');
  // Bumped to fetch a fresh captcha: every token is single-use, right or wrong.
  const [captchaKey, setCaptchaKey] = useState(0);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: false } : e));
  };

  const validate = () => {
    const nextErrors = {};
    Object.entries(VALIDATORS).forEach(([field, test]) => {
      if (!test(values[field])) nextErrors[field] = true;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return false;

    setStatus('submitting');
    setError(null);
    const { captchaAnswer, ...fields } = values;
    try {
      await submitEnquiry({
        ...getAttribution(),
        ...fields,
        sourcePage: window.location.pathname,
        captchaToken,
        captchaAnswer,
      });
      setStatus('success');
      return true;
    } catch (err) {
      // Map field-level errors from the API back onto the form.
      if (err.errors?.length) {
        setErrors(Object.fromEntries(err.errors.map((fe) => [SERVER_FIELD[fe.field] || fe.field, true])));
      }
      setError(err.message);
      setStatus('error');
      setValues((v) => ({ ...v, captchaAnswer: '' }));
      setCaptchaKey((k) => k + 1);
      return false;
    }
  };

  const reset = () => {
    setValues(initialValues(prefill));
    setErrors({});
    setStatus('idle');
    setError(null);
    setCaptchaKey((k) => k + 1);
  };

  return { values, errors, status, error, setField, handleSubmit, reset, captchaKey, setCaptchaToken };
}
