import { create } from 'zustand';

export const useNavigationStore = create((set) => ({
  isHeaderStuck: false,
  showToTop: false,
  setScrollState: (y) =>
    set({ isHeaderStuck: y > 8, showToTop: y > 600 }),
}));
