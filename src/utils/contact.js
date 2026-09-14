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

export const mailHref = (value, subject) => (value ? `mailto:${value}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}` : '');
