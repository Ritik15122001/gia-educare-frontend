// The site ships with its launch content baked in. If the API is unreachable
// the page still renders real copy instead of empty sections — the API simply
// overwrites this once it responds.
import { services } from './services';
import { destinationsPreview, destinationsDetailed, comparisonRows } from './destinations';
import { courses, courseCategories, studyLevels } from './courses';
import { testimonials, team, milestones, values } from './testimonials';
import { SITE, stats, processSteps, faqs } from './site';
import { posts, postCategories } from './posts';
import { exams } from './exams';
import { clients } from './clients';

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
    showOnHome: true,
    name: detail.name,
    imageUrl: detail.imageUrl || '',
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
    addressLine: "307, Second Floor, G25, Sector 3, Noida 201301",
    footerBlurb:
      'Independent study-abroad counselling since 2016. Honest shortlists, capped caseloads, and one counsellor with you from evaluation to departure.',
    offices: SITE.offices.map((o, i) => ({ ...o, hours: 'Mon–Sat · 10am–7pm', order: i })),
    socials: {
      facebook: "https://www.facebook.com/giaeducare",
      instagram: "https://www.instagram.com/giaeducare",
      linkedin: "https://linkedin.com/in/giaeducare/",
      youtube: "https://www.youtube.com/@giaeducare",
      whatsapp: "https://wa.me/919953414741",
    },
    legalEntity: "A Study Abroad Unit of HolidayAlong Hospitality LLP",
    legalLinks: {
      privacy: "https://giaeducare.com/privacy-policy",
      terms: "https://giaeducare.com/terms-of-service",
      refund: "https://giaeducare.com/refund-policy",
    },
    mapUrl: "https://maps.google.com/?q=28.580475,77.320351",
    founder: {
      enabled: true,
      name: 'Rhea Malhotra',
      title: 'Founder & Lead Counsellor',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Coffee-desk-laptop-notebook_%2824244320481%29.jpg/960px-Coffee-desk-laptop-notebook_%2824244320481%29.jpg',
      message:
        'I started GIA Educare after being mis-advised as a student myself. Every family deserves honest odds, a clear budget and one person who stays with them to the finish line. If you have a question, message me directly — I read every one.',
      email: "info@giaeducare.com",
      phone: "+91 99534 14741",
      whatsapp: "+91 99534 14741",
      linkedin: '',
      instagram: '',
      youtube: '',
      twitter: '',
      facebook: '',
    },
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
  counsellors: withIds(team, 'team').filter((m) => m.featured),
  milestones: withIds(milestones, 'milestone'),
  values: withIds(values, 'value'),
  stats: withIds(stats.map((s) => ({ ...s, value: s.to })), 'stat'),
  processSteps: withIds(processSteps, 'step'),
  faqs: withIds(faqs.map((f) => ({ ...f, question: f.q, answer: f.a })), 'faq'),
  comparisonRows: withIds(comparisonRows, 'row'),
  // contentStore only keeps keys present here, so both blog keys must exist or
  // the live payload's posts would be dropped on merge.
  posts: withIds(posts, 'post'),
  postsRecent: withIds(posts, 'post').slice(0, 3),
  postCategories: withIds(postCategories, 'pcat'),
  // No bundled videos: the section only renders once real ones are added.
  videoTestimonials: [],
  exams: withIds(exams, 'exam'),
  clients: withIds(clients, 'client'),
};
