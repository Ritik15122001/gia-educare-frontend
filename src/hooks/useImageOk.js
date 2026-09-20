import { useState } from 'react';

/**
 * Whether an image URL is worth rendering. A link that 404s — a deleted
 * upload, a host that has gone away — should fall back to the initials or
 * gradient placeholder instead of leaving a broken-image icon on the page.
 *
 *   const [showPhoto, onPhotoError] = useImageOk(member.photoUrl);
 *
 * The failed URL is remembered rather than a flag, so a new one is retried.
 */
export function useImageOk(src) {
  const [failedSrc, setFailedSrc] = useState(null);
  return [Boolean(src) && failedSrc !== src, () => setFailedSrc(src)];
}
