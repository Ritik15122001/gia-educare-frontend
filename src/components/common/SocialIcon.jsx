const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 12s0-3.4-.43-5.03a2.9 2.9 0 0 0-2.04-2.05C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.53.42A2.9 2.9 0 0 0 1.43 6.97C1 8.6 1 12 1 12s0 3.4.43 5.03a2.9 2.9 0 0 0 2.04 2.05C5.1 19.5 12 19.5 12 19.5s6.9 0 8.53-.42a2.9 2.9 0 0 0 2.04-2.05C23 15.4 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4c-.1.1-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  ),
};

export default function SocialIcon({ name, size = 16 }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <span style={{ width: size, height: size, display: 'inline-flex' }} aria-hidden="true">
      {icon}
    </span>
  );
}
