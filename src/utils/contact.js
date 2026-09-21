// Link builders for call / WhatsApp / email buttons.
export const digitsOf = (value) => String(value || '').replace(/\D/g, '');

export const telHref = (value) => {
  const raw = String(value || '').replace(/[^\d+]/g, '');
  return raw ? `tel:${raw}` : '';
};

// wa.me needs the full international number with no "+", spaces or dashes.
export const whatsappHref = (value, text) => {
  const digits = digitsOf(value);
  if (!digits) return '';
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

/**
 * Where a WhatsApp link should open. On a phone the tap hands off to the
 * WhatsApp app and the new tab is left behind empty, so keep those in the
 * same tab; on desktop a new tab for WhatsApp Web is what people expect.
 */
export const waTarget = () =>
  (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches ? '_self' : '_blank');

export const mailHref = (value, subject) => (value ? `mailto:${value}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}` : '');
