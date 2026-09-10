// The site ships with its launch content baked in. If the API is unreachable
// the page still renders real copy instead of empty sections — the API simply
// overwrites this once it responds.
import { services } from './services';
import { destinationsPreview, destinationsDetailed, comparisonRows } from './destinations';
import { courses, courseCategories, studyLevels } from './courses';
import { testimonials, team, milestones, values } from './testimonials';
import { SITE, stats, processSteps, faqs } from './site';

const withIds = (rows, prefix) =>
  rows.map((row, i) => ({ id: row.id || `${prefix}-${i}`, order: i, published: true, ...row }));

// Merge the two destination shapes the static files used into the one the API returns.
const mergedDestinations = destinationsDetailed.map((detail, i) => {
  const preview = destinationsPreview.find((p) => p.id === detail.id);
  return {
    id: detail.id,
    slug: detail.id,
    order: i,
    published: true,
    showOnHome: Boolean(preview),
    name: detail.name,
    flag: detail.flag,
    bg: detail.bg,
    tag: preview?.tag || '',
    blurb: preview?.blurb || detail.description,
    meta: preview?.meta || [],
    description: detail.description,
    facts: detail.facts,
    tags: detail.tags,
  };
});

export const FALLBACK_CONTENT = {
  settings: {
    brand: SITE.brand,
    tagline: SITE.tagline,
    logoUrl: '/logo.jpg',
    topbarMessage: 'Free profile evaluation — limited slots for the Sept 2027 intake',
    phonePrimary: SITE.phonePrimary,
    phoneSecondary: SITE.phoneSecondary,
    emailPrimary: SITE.emailPrimary,
    emailAdmissions: SITE.emailAdmissions,
    hours: SITE.hours,
    addressLine: 'Orion Tower, Sector 44, Gurugram',
    footerBlurb:
      'Independent study-abroad counselling since 2016. Honest shortlists, capped caseloads, and one counsellor with you from evaluation to departure.',
    offices: SITE.offices.map((o, i) => ({ ...o, hours: 'Mon–Sat · 10am–7pm', order: i })),
    socials: { instagram: '', linkedin: '', youtube: '', whatsapp: '' },
    seo: {
      title: 'GIA Educare – Study Abroad Consultants',
      description:
        'GIA Educare helps students get into top universities across 25+ countries – profile evaluation, university shortlisting, applications, visas and scholarships.',
    },
  },
  sections: {},
  destinations: mergedDestinations,
  destinationsHome: mergedDestinations.filter((d) => d.showOnHome),
  courses: withIds(courses, 'course'),
  courseCategories: withIds(courseCategories.filter((c) => c.key !== 'all'), 'cat'),
  studyLevels: withIds(studyLevels, 'level'),
  services: withIds(services, 'service'),
  testimonials: withIds(testimonials, 'testimonial'),
  team: withIds(team, 'team'),
  milestones: withIds(milestones, 'milestone'),
  values: withIds(values, 'value'),
  stats: withIds(stats.map((s) => ({ ...s, value: s.to })), 'stat'),
  processSteps: withIds(processSteps, 'step'),
  faqs: withIds(faqs.map((f) => ({ ...f, question: f.q, answer: f.a })), 'faq'),
  comparisonRows: withIds(comparisonRows, 'row'),
};
