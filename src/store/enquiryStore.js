import { create } from 'zustand';

// Bridges context into the enquiry modal — which fields to prefill (e.g. a
// course title clicked from a card) and which form variant to show. Each
// <EnquiryForm> instance still keeps its own field/validation/submission
// state locally; this store only carries the handoff.
export const useEnquiryStore = create((set) => ({
  prefill: null,
  modalVariant: 'compact',
  lastSubmission: null,
  setPrefill: (data) => set({ prefill: data }),
  clearPrefill: () => set({ prefill: null }),
  setModalVariant: (variant) => set({ modalVariant: variant }),
  setLastSubmission: (data) => set({ lastSubmission: data }),
}));
