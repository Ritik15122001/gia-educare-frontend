import { create } from 'zustand';
import { fetchSiteContent } from '../services/contentService';
import { FALLBACK_CONTENT } from '../data/fallback';

/**
 * Holds every piece of site content. Starts from the bundled fallback so the
 * first paint is never empty, then swaps in the live API payload.
 */
export const useContentStore = create((set, get) => ({
  content: FALLBACK_CONTENT,
  status: 'idle', // idle | loading | live | fallback
  error: null,

  hydrate: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });

    try {
      const data = await fetchSiteContent();
      // Guard against a half-seeded database wiping out visible content.
      const content = Object.fromEntries(
        Object.entries(FALLBACK_CONTENT).map(([key, fallbackValue]) => {
          const live = data[key];
          if (Array.isArray(fallbackValue)) return [key, Array.isArray(live) && live.length ? live : fallbackValue];
          return [key, live ?? fallbackValue];
        }),
      );
      set({ content, status: 'live', error: null });
    } catch (err) {
      // Keep showing the bundled content rather than an error page.
      set({ status: 'fallback', error: err.message });
    }
  },
}));
