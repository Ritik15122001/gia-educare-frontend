import { create } from 'zustand';

export const useCourseStore = create((set) => ({
  selectedCategory: 'all',
  setSelectedCategory: (key) => set({ selectedCategory: key }),
}));
