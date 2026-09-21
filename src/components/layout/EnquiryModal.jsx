import { useEffect } from 'react';
import { useUiStore } from '../../store/uiStore';
import { useEnquiryStore } from '../../store/enquiryStore';
import EnquiryForm from '../forms/EnquiryForm';

export default function EnquiryModal() {
  const open = useUiStore((s) => s.enquiryModalOpen);
  const closeEnquiryModal = useUiStore((s) => s.closeEnquiryModal);
  const prefill = useEnquiryStore((s) => s.prefill);
  const modalVariant = useEnquiryStore((s) => s.modalVariant);
  const clearPrefill = useEnquiryStore((s) => s.clearPrefill);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('modal-open');
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeEnquiryModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeEnquiryModal]);

  if (!open) return null;

  const handleClose = () => {
    closeEnquiryModal();
    clearPrefill();
  };

  return (
    <div className="modal-scrim" onClick={handleClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" aria-label="Close" onClick={handleClose}>
          ×
        </button>
        <EnquiryForm variant={modalVariant} prefill={prefill} badge="No obligation" />
      </div>
    </div>
  );
}
