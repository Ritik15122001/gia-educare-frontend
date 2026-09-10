import { useState } from 'react';
import { submitEnquiry } from '../services/enquiryService';
import { isValidName, isValidEmail, isValidPhone, isNotEmpty, isChecked } from '../utils/validators';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  code: '+91',
  phone: '',
  destination: '',
  level: 'Masters',
  intake: 'Jan 2027',
  test: 'Not taken yet',
  qual: 'Class 12',
  message: '',
  consent: false,
};

const VALIDATORS = {
  name: isValidName,
  email: isValidEmail,
  phone: isValidPhone,
  destination: isNotEmpty,
  consent: isChecked,
};

export function useEnquiryForm(prefill) {
  const [values, setValues] = useState({ ...DEFAULT_VALUES, ...prefill });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState(null);

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
    try {
      await submitEnquiry({ ...values, sourcePage: window.location.pathname });
      setStatus('success');
      return true;
    } catch (err) {
      // Map field-level errors from the API back onto the form.
      if (err.errors?.length) {
        setErrors(Object.fromEntries(err.errors.map((e) => [e.field, true])));
      }
      setError(err.message);
      setStatus('error');
      return false;
    }
  };

  const reset = () => {
    setValues({ ...DEFAULT_VALUES, ...prefill });
    setErrors({});
    setStatus('idle');
    setError(null);
  };

  return { values, errors, status, error, setField, handleSubmit, reset };
}
