import { useNavigate } from 'react-router-dom';

export const ENQUIRY_PATH = '/profile-evaluation';

// One call sends the visitor to the enquiry page from anywhere: a nav CTA, a
// course card, a destination band. Any prefill (a course title, a counsellor's
// name) travels in router state and lands in the form on the other side.
// Kept as a hook with the old signature so every call site works unchanged.
export function useOpenEnquiry() {
  const navigate = useNavigate();
  return (prefill) => navigate(ENQUIRY_PATH, { state: prefill ? { prefill } : undefined });
}
