// Bundled copies of the launch articles. Like the rest of src/data/*, these are
// the offline fallback only — the live posts come from the API. Bodies are the
// markdown subset understood by utils/markdown.jsx.
export const posts = [
  {
    slug: 'uk-or-canada-2027-intake',
    category: 'country-guides',
    destination: 'uk',
    title: 'UK or Canada for the 2027 intake? The honest trade-off',
    author: 'Rhea Malhotra',
    tags: ['Destinations', 'Costs'],
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Oxford_University_Press_Building_%E2%80%93_Walton_Street.jpg/960px-Oxford_University_Press_Building_%E2%80%93_Walton_Street.jpg',
    readMinutes: 2,
    publishedAt: '2026-09-02T09:00:00.000Z',
    excerpt:
      'One finishes in twelve months, the other hands you a three-year work permit. Here is how we actually choose between them on a counselling call.',
    body: `Students ask us this more than any other question, and the honest answer is that it depends on one thing: whether you want to **finish fast** or **stay long**.

## The twelve-month argument for the UK

A UK taught masters is one year. That means one year of tuition, one year of living cost, and one year of lost salary instead of two.

- Tuition: ₹18 – 39 Lakh
- Living: ₹13 – 19 Lakh
- Post-study work: 2 years on the Graduate Route

## The three-year argument for Canada

Canada is slower and cheaper per year, and the post-graduation work permit runs up to three years.

> If you want the degree, go to the UK. If you want the address, go to Canada.

Ranking is the last filter, not the first.`,
  },
  {
    slug: 'sop-mistakes-that-cost-admits',
    category: 'applications',
    destination: '',
    title: 'Five SOP mistakes that quietly cost students their admit',
    author: 'Arjun Verma',
    tags: ['Applications', 'SOP'],
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Pen-writing-notes-studying.jpg/960px-Pen-writing-notes-studying.jpg',
    readMinutes: 2,
    publishedAt: '2026-08-21T09:00:00.000Z',
    excerpt:
      'Admissions officers read thousands of these. After the first paragraph they already know whether yours was written for them or for everyone.',
    body: `We read a lot of statements of purpose. The weak ones fail in the same five ways.

## 1. Opening with a childhood anecdote

"Ever since I was a child, I have been fascinated by computers." So has everyone applying.

## 2. Describing the university back to itself

They know they have excellent faculty. Naming *one* professor whose work connects to something you have actually done is worth more than a paragraph of praise.

## 3. Listing your CV again

The SOP exists to explain what a transcript cannot: why the gap, why the switch, why this course now.`,
  },
  {
    slug: 'education-loan-checklist',
    category: 'finances',
    destination: '',
    title: 'The education loan checklist we give every family',
    author: 'Sana Nair',
    tags: ['Funding', 'Loans'],
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Financial_Calculator_Hewlett-Packard_HP-12C_built_from_1981%2C_this_item_produced_1988_%28edited_to_remove_background%2C_warmer_colours%29.jpg/960px-Financial_Calculator_Hewlett-Packard_HP-12C_built_from_1981%2C_this_item_produced_1988_%28edited_to_remove_background%2C_warmer_colours%29.jpg',
    readMinutes: 2,
    publishedAt: '2026-08-08T09:00:00.000Z',
    excerpt:
      'Collateral or not, co-applicant income, moratorium period, and the four documents that hold up more files than anything else.',
    body: `Most loan rejections we see are not credit problems. They are paperwork problems.

## Sort these four first

1. **Co-applicant income proof** — three years of ITR, not one.
2. **Admission letter** — conditional offers are usually fine.
3. **Cost of attendance breakdown** — tuition *plus* living, on university letterhead.
4. **Collateral valuation** — start this a month early.

We do not lend and we take nothing from lenders.`,
  },
];

export const postCategories = [
  { key: 'beginner-doubts', label: 'Beginner Doubts', description: 'The questions every student asks before they pick a country.' },
  { key: 'finances', label: 'Finances', description: 'Costs, education loans, scholarships and money abroad.', showInNav: true },
  { key: 'country-guides', label: 'Country Guides', description: 'What studying in a specific country actually involves.' },
  { key: 'applications', label: 'Applications', description: 'SOPs, LORs, deadlines and getting the admit.' },
];
