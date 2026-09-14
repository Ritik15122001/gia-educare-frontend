/**
 * Referral attribution for enquiries.
 *
 * On the first page view of a visit we read ?ref= / ?referral= / ?utm_* and
 * the referring site, and keep them for 30 days — a student who lands from a
 * partner's link on Monday and enquires on Thursday is still credited. A newer
 * referral link replaces an older one. Storage can be unavailable (private
 * mode, blocked cookies), so every access is guarded and failures just mean
 * "no attribution".
 */

const KEY = 'gia_attribution';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

const read = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    return value && value.savedAt && Date.now() - value.savedAt < TTL_MS ? value : null;
  } catch {
    return null;
  }
};

const clip = (v, n) => String(v || '').trim().slice(0, n);

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const incoming = {
    referral: clip(params.get('ref') || params.get('referral') || params.get('referral_code'), 120),
    utmSource: clip(params.get('utm_source'), 120),
    utmMedium: clip(params.get('utm_medium'), 120),
    utmCampaign: clip(params.get('utm_campaign'), 120),
  };
  const hasCampaign = Object.values(incoming).some(Boolean);
  const existing = read();

  // Keep the first touch unless a new referral/campaign link arrives.
  if (existing && !hasCampaign) return;

  let referrerUrl = '';
  try {
    if (document.referrer && new URL(document.referrer).host !== window.location.host) referrerUrl = clip(document.referrer, 500);
  } catch {
    // Malformed referrer — ignore.
  }

  const value = { ...incoming, referrerUrl, landingPage: clip(window.location.pathname + window.location.search, 300), savedAt: Date.now() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage blocked — attribution simply won't persist across pages.
  }
}

/** The fields the enquiry API accepts, always as strings. */
export function getAttribution() {
  const v = read() || {};
  return {
    referral: v.referral || '',
    utmSource: v.utmSource || '',
    utmMedium: v.utmMedium || '',
    utmCampaign: v.utmCampaign || '',
    referrerUrl: v.referrerUrl || '',
    landingPage: v.landingPage || '',
  };
}
