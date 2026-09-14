export const isValidName = (v) => v.trim().length >= 2;
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
export const isValidPhone = (v) => v.replace(/\D/g, '').length >= 8;
export const isChecked = (v) => Boolean(v);
export const isNotEmpty = (v) => v !== '' && v != null;
export const isCaptchaAnswer = (v) => /^-?\d{1,3}$/.test(String(v).trim());
