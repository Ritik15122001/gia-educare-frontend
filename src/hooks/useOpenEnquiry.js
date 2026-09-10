import { useUiStore } from '../store/uiStore';
import { useEnquiryStore } from '../store/enquiryStore';

// One call opens the global enquiry modal from anywhere: a nav CTA, a course
// card, a destination band. Optionally hands it prefill fields and which
// form variant ('compact' | 'full') to render.
export function useOpenEnquiry() {
  const openModal = useUiStore((s) => s.openEnquiryModal);
  const setPrefill = useEnquiryStore((s) => s.setPrefill);
  const setModalVariant = useEnquiryStore((s) => s.setModalVariant);

  return (prefill, variant = 'compact') => {
    setPrefill(prefill || null);
    setModalVariant(variant);
    openModal();
  };
}
