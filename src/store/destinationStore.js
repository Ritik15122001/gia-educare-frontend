import { create } from 'zustand';

export const useDestinationStore = create((set) => ({
  selectedDestinationId: null,
  setSelectedDestination: (id) => set({ selectedDestinationId: id }),
}));
