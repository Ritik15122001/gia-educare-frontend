import { create } from 'zustand';

export const useUiStore = create((set) => ({
  mobileMenuOpen: false,
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),

  enquiryModalOpen: false,
  openEnquiryModal: () => set({ enquiryModalOpen: true }),
  closeEnquiryModal: () => set({ enquiryModalOpen: false }),
}));
