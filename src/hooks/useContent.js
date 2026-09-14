import { useContentStore } from '../store/contentStore';

// Granular selectors keep components subscribed to only the slice they render.
const select = (key) => () => useContentStore((s) => s.content[key]);

export const useSettings = select('settings');
export const useServices = select('services');
export const useDestinations = select('destinations');
export const useHomeDestinations = select('destinationsHome');
export const useCourses = select('courses');
export const useCourseCategories = select('courseCategories');
export const useStudyLevels = select('studyLevels');
export const useTestimonials = select('testimonials');
export const useTeam = select('team');
export const useMilestones = select('milestones');
export const useValues = select('values');
export const useStats = select('stats');
export const useProcessSteps = select('processSteps');
export const useFaqs = select('faqs');
export const useComparisonRows = select('comparisonRows');
export const usePosts = select('posts');
export const usePostCategories = select('postCategories');
export const useCounsellors = select('counsellors');
export const useVideoTestimonials = select('videoTestimonials');
export const useRecentPosts = select('postsRecent');

const EMPTY = {};

/**
 * Editable copy for a section, e.g. useSection('home.services').
 * Any field the admin has not filled in falls back to what the component
 * passes as defaults, so the site never renders blank headings.
 */
export function useSection(key, defaults = EMPTY) {
  const section = useContentStore((s) => s.content.sections?.[key]);
  if (!section) return defaults;

  return {
    eyebrow: section.eyebrow || defaults.eyebrow,
    title: section.title || defaults.title,
    lead: section.lead || defaults.lead,
    ctaLabel: section.ctaLabel || defaults.ctaLabel,
    items: section.items?.length ? section.items : defaults.items,
  };
}

// Splits admin copy on "|" so a heading can carry an accent phrase:
//   "A counselling desk, |not a sales floor." → ['A counselling desk, ', 'not a sales floor.']
export function splitAccent(text = '') {
  const parts = String(text).split('|');
  return { before: parts[0] || '', accent: parts[1] || '', after: parts[2] || '' };
}
