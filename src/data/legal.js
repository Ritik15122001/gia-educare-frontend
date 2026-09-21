/**
 * Copy for the three policy pages (/privacy-policy, /terms-of-service,
 * /refund-policy).
 *
 * The bodies are markdown, rendered by `utils/markdown.jsx` — the same renderer
 * blog posts use — so they pick up the existing `.article` styles and never go
 * through dangerouslySetInnerHTML. The page header (title + lead) is also a
 * section key, so an editor can reword the intro from the CRM without a deploy;
 * the body deliberately stays in code because it is a legal document and should
 * change through review, not through a text box.
 *
 * `{brand}`, `{entity}`, `{email}`, `{phone}` and `{address}` are substituted
 * from live site settings at render time, so a change in Settings → Legal &
 * location flows through all three documents.
 */

export const LEGAL_UPDATED = '22 September 2026';

const privacy = `
We are **{brand}**, {entity}. This policy explains what we collect when you use
{site}, why we collect it, who we share it with, and the choices you have. It
applies to our website, our enquiry forms, and the counselling we provide over
phone, email and WhatsApp.

## 1. Information we collect

**Information you give us.** When you submit an enquiry, book a profile
evaluation or contact us, we ask for your name, email address, phone number, the
destination and course you are considering, the entrance test you have taken or
plan to take, your budget range, and anything you write in the message box.

**Information you share during counselling.** If you go ahead with an
application, we collect the documents the process needs — academic transcripts
and certificates, test scorecards, passport details, work experience letters,
financial and loan documents, and your statement of purpose and
recommendations.

**Information collected automatically.** When you submit a form we record your
IP address and browser user-agent alongside the enquiry as a basic anti-abuse
measure. If you arrive through a referral link or a campaign, we store the
referral code, the campaign parameters and the referring website in your
browser's local storage for **30 days**, and attach them to any enquiry you send
in that window, so we know which channel introduced us.

We do **not** collect payment card details on this website. Any fee you pay is
collected offline or through a payment provider that handles the card data
itself.

## 2. Why we use it

- To respond to your enquiry and give you counselling, shortlists and timelines.
- To prepare, submit and follow up on applications to universities and colleges on your instruction.
- To send you the confirmation of your enquiry, updates on your application, and reminders about deadlines.
- To keep an internal record of your file so any counsellor on your case has context.
- To improve our services and understand which channels our students come from.
- To meet legal, accounting and record-keeping obligations.

We rely on your consent for marketing messages, and on the performance of our
engagement with you or our legitimate interest in running the practice for
everything else.

## 3. Who we share it with

- **Universities, colleges and their authorised representatives**, where you have asked us to apply or to seek information on your behalf. Some of these are outside India, so an application necessarily transfers your details to that country.
- **Test bodies, accommodation providers, insurers, forex and loan partners**, only where you have asked us to arrange or introduce that service.
- **Visa authorities and appointed visa application centres**, where a submission requires it.
- **Service providers who run our systems** — hosting, database, email delivery and communication tools — under confidentiality obligations and only to the extent needed to run those systems.
- **Authorities**, where the law or a valid legal process requires disclosure.

**We do not sell your personal data, and we do not rent or trade your contact
details to other consultancies or advertisers.**

## 4. Cookies and local storage

The website uses browser storage rather than advertising cookies. We store your
referral and campaign attribution for 30 days, as described above, and short-
lived values needed for the enquiry form and the security challenge that
protects it. Our admin system uses a strictly necessary cookie to keep staff
signed in; it is never set on a visitor's browser.

Pages that embed a map are served from Google Maps, and clicking a WhatsApp or
social link takes you to that company's platform. Those services set their own
cookies under their own policies, which we do not control.

## 5. How long we keep it

- **Enquiries that do not proceed:** up to 24 months from your last contact with us, so we can pick up the conversation if you come back for a later intake.
- **Student files where an application was made:** up to 7 years, because admission, visa and financial records may need to be produced later.
- **Accounting records:** as long as Indian tax and company law requires.
- **Delivery logs for automated emails:** 90 days.

When a retention period ends we delete the record or anonymise it so it can no
longer identify you.

## 6. How we protect it

Access to student files is restricted by role, so a counsellor sees the files
assigned to them rather than the whole database. Staff passwords are stored
hashed, sessions expire, and administrative access is logged. Data is
transmitted over encrypted connections. No system is perfect, and we will tell
you and the relevant authority without undue delay if a breach is likely to
affect you.

## 7. Your choices

You can ask us to:

- **See** a copy of the personal data we hold about you.
- **Correct** anything that is wrong or out of date.
- **Delete** your data, where we are not required to keep it.
- **Stop marketing** to you — every promotional email has an unsubscribe link, and you can reply STOP to messages or simply tell your counsellor.
- **Withdraw consent** you gave earlier, without affecting what we did lawfully before you withdrew it.

Write to **{email}** and we will respond within 30 days. We may ask you to
confirm your identity first.

## 8. Children

Our services are aimed at students planning higher education. If you are under
18, please use this website with a parent or guardian, and have them submit the
enquiry with you. We do not knowingly collect data from children under 13.

## 9. Changes to this policy

We update this page when our practices change. The date at the top always shows
the current version, and material changes will be notified to active students by
email.

## 10. Contact us

- **{brand}** — {entity}
- {address}
- Email: [{email}](mailto:{email})
- Phone: [{phone}](tel:{phoneDigits})
`;

const terms = `
These terms govern your use of {site} and the counselling and application
support provided by **{brand}**, {entity}. By using this website or engaging our
counsellors, you accept them. If you do not agree, please do not use the
service.

## 1. What we do

We are an independent education consultancy. We evaluate your profile, help you
shortlist countries, universities and courses, guide you through applications,
documentation, scholarships, loans and visas, and support you up to departure.

We act as your adviser and representative. We are **not** a university, a
government body, a visa authority or an immigration agent, and we do not make
admission, scholarship or visa decisions.

## 2. No guarantee of outcome

Admission, scholarship, loan and visa decisions rest entirely with the
institution, lender or authority concerned, and are made against criteria they
control and may change without notice.

Nothing said by a counsellor, written on this website, or included in a
shortlist is a promise or guarantee of admission, of a specific scholarship
amount, of a loan sanction, of a visa, or of any job, salary, internship or
post-study work outcome. Estimates of tuition, living costs, timelines and
chances are informed opinions based on the information you have given us and the
rules as they stand on the date we give them.

## 3. Your responsibilities

You agree to:

- Give us **complete, accurate and genuine** information and documents.
- Tell us promptly if anything changes — a new test score, a visa refusal, a change of plan, a change of contact details.
- Meet the deadlines, interviews, test dates and appointments we schedule with you.
- Pay the fees charged by universities, test bodies, visa authorities and other third parties directly and on time.
- Read what you sign, including every university offer and loan document.

**Submitting a forged, altered or misrepresented document is your
responsibility alone.** We will stop work immediately on discovering one, we
will not refund fees already earned, and we accept no liability for the refusal,
ban or legal consequence that follows.

## 4. Free and paid services

Profile evaluation, country and university shortlisting and the first
counselling session are **free and carry no obligation**.

Optional paid services — coaching for entrance tests, premium application
handling and similar — are priced in writing and confirmed by you before any
work starts or any payment is taken. Third-party charges such as university
application fees, test fees, visa fees, medicals, biometrics, courier and
attestation charges are **not** part of our fee and are payable by you to those
organisations.

Fees quoted are in Indian Rupees and, unless stated otherwise, exclude
applicable taxes. Refunds are governed by our Refund policy.

## 5. Communication and consent

By submitting an enquiry you agree that we may contact you by phone, SMS,
WhatsApp and email about your enquiry and your application — including where
your number is registered on a Do Not Disturb list, for the limited purpose of
servicing the enquiry you sent us. You can opt out of promotional messages at
any time; we will still send you messages that concern an application in
progress.

## 6. Website use

You may use this website for your own study-abroad research. You may not scrape
it, copy it wholesale, attempt to break into it, interfere with the enquiry form
or the security challenge that protects it, or use it to send unsolicited or
unlawful content.

## 7. Intellectual property

The name, logo, text, layout, graphics, guides and comparison data on this site
belong to us or to our licensors and are protected by Indian and international
copyright law. You may share links and quote short passages with attribution.
Republishing our content, in whole or as a rebadged version, is not permitted
without written permission.

## 8. Third-party links and content

We link to universities, test bodies, government pages, lenders and other
resources for your convenience. We do not control them, we do not endorse
everything they say, and we are not responsible for their content, their
accuracy or their handling of your data. Fees, deadlines and eligibility rules
published by third parties change frequently — always confirm them on the
official source before you act.

## 9. Limitation of liability

To the extent permitted by law, our total liability arising out of or connected
with our services is limited to the professional fees you have actually paid us
for the service in question. We are not liable for indirect or consequential
loss, including lost opportunity, lost intake, travel or accommodation costs,
currency movements, or loss caused by a third party's decision, delay or error.

Nothing in these terms excludes liability that cannot lawfully be excluded.

## 10. Ending the engagement

You may stop using our services at any time by telling us in writing. We may end
an engagement if the information you have given is false, if you ask us to do
something unlawful or unethical, if agreed fees remain unpaid, or if the
relationship has broken down. On termination we will hand back your original
documents and confirm the status of every application in progress.

## 11. Governing law

These terms are governed by the laws of India. The courts at Gautam Buddh Nagar,
Uttar Pradesh have exclusive jurisdiction over any dispute, and we ask that you
raise the issue with us first — most things are resolved in a phone call.

## 12. Changes

We may update these terms. The version published on this page on the date you
use the service is the one that applies.

## 13. Contact us

- **{brand}** — {entity}
- {address}
- Email: [{email}](mailto:{email})
- Phone: [{phone}](tel:{phoneDigits})
`;

const refund = `
This policy explains what is refundable, what is not, and how long a refund
takes. It applies to fees paid to **{brand}**, {entity}, and should be read with
our Terms of service.

## 1. Free services stay free

Profile evaluation, country and university shortlisting, and your first
counselling session cost nothing. There is no fee to refund and no obligation to
continue with any paid service. If anyone asks you to pay for these, tell us at
**{email}**.

## 2. What you may pay for

Our paid services are optional, quoted in writing, and confirmed by you before
work begins. They may include entrance-test coaching, premium application
handling, and documentation support.

Separately, you will pay **third parties** directly — university application
fees, tuition and deposits, entrance-test fees, visa and biometric fees,
medicals, translation, attestation and courier charges.

## 3. Third-party fees are not refundable by us

We do not hold, and cannot return, money paid to a university, a test body, a
visa authority, a lender or a courier. Those are governed by that
organisation's own refund rules, and most application, test and visa fees are
non-refundable once submitted. Where a refund is possible — a tuition deposit
after a deferral or a visa refusal, for example — we will help you file the
claim and follow it up, but the decision and the timeline belong to that
institution.

## 4. Refunds on our professional fees

**Before work starts.** Cancel in writing within **7 days** of payment and
before we have begun work on your file, and you get a **full refund**.

**After work starts.** Once we have begun — shortlisting, drafting your
statement of purpose, preparing or submitting applications — we refund the
portion of the fee for milestones not yet delivered, after deducting work
already completed and any non-refundable costs we have paid out on your behalf.
We will send you a written breakdown of what has been delivered.

**Once applications are submitted.** Professional fees for an application that
has been submitted are **not refundable**, because the work has been performed.

**Coaching and test preparation.** Refundable on a pro-rata basis for sessions
not yet attended, if you cancel before the halfway point of the batch. Study
material already issued and any registration component are not refundable. After
the halfway point, no refund is due, but we will transfer your remaining
sessions to a later batch once, free of charge.

## 5. Situations where no refund is due

- An admission, scholarship, loan or **visa application is refused**. Those decisions are not ours to make, and our fee is for the work done, not for the outcome — see clause 2 of our Terms of service.
- You gave **incorrect, incomplete, forged or misrepresented** information or documents.
- You **missed a deadline, interview, test or appointment** we scheduled and confirmed with you.
- You **changed your plan**, destination or intake after applications were submitted.
- You engaged **another consultant** in parallel for the same application without telling us.
- Services that have been **fully delivered**.

## 6. Cancellation by us

If we cancel an engagement for a reason that is ours — we cannot service your
case, or we discontinue a batch — you receive a **full refund of the undelivered
portion**, with no deduction.

## 7. How to request a refund

1. Email **{email}** from the address on your file, with the subject "Refund request".
2. Include your full name, phone number, the service paid for, the payment date, the amount, and the payment reference or receipt.
3. Tell us briefly why you are asking.

We acknowledge every request within **3 working days** and give you a written
decision, with the calculation, within **10 working days**.

## 8. How refunds are paid

Approved refunds are paid in Indian Rupees to the **original payment method or
the bank account the payment came from**, within **15 working days** of
approval. We do not refund to a third party's account. Bank charges, payment-
gateway charges and any applicable taxes already remitted are deducted. Your
bank may take a few extra days to credit the amount.

## 9. If you disagree with the decision

Write back to **{email}** within 15 days with your reasons and we will have the
file reviewed by someone who was not involved in the original decision. If it
still cannot be resolved, clause 11 of our Terms of service applies.

## 10. Contact us

- **{brand}** — {entity}
- {address}
- Email: [{email}](mailto:{email})
- Phone: [{phone}](tel:{phoneDigits})
`;

export const LEGAL_DOCS = {
  privacy: {
    path: '/privacy-policy',
    crumb: 'Privacy policy',
    sectionKey: 'legal.privacy',
    head: {
      title: 'Privacy |policy',
      lead: 'What we collect when you enquire, why we collect it, who it is shared with, and how to have it removed.',
    },
    body: privacy,
  },
  terms: {
    path: '/terms-of-service',
    crumb: 'Terms of service',
    sectionKey: 'legal.terms',
    head: {
      title: 'Terms of |service',
      lead: 'The rules of the engagement — what we do, what we do not promise, what we expect from you, and how disputes are handled.',
    },
    body: terms,
  },
  refund: {
    path: '/refund-policy',
    crumb: 'Refund policy',
    sectionKey: 'legal.refund',
    head: {
      title: 'Refund |policy',
      lead: 'What is refundable, what is not, how to raise a request, and how long the money takes to come back.',
    },
    body: refund,
  },
};

export const LEGAL_ORDER = ['privacy', 'terms', 'refund'];
