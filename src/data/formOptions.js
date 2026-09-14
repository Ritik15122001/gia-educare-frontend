export const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+353', '+49', '+64', '+971', '+65'];

export const DESTINATION_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'Ireland',
  'New Zealand',
  'Dubai / Singapore',
  'Not decided yet',
];

// Total program budget in INR. Mirrors BUDGET_RANGES in backend/src/models/Enquiry.js —
// the API rejects anything not in that list.
export const BUDGET_OPTIONS = ['Up to ₹10 Lakh', '₹10 – 20 Lakh', '₹20 – 30 Lakh', '₹30 – 50 Lakh', 'Above ₹50 Lakh'];

export const LEVEL_OPTIONS = ['Masters', 'Bachelors', 'MBA', 'PhD', 'Diploma / Pathway'];

export const INTAKE_OPTIONS = ['Jan 2027', 'May 2027', 'Sep 2027', 'Jan 2028', 'Flexible'];

export const TEST_OPTIONS = [
  'Not taken yet',
  'IELTS done',
  'TOEFL done',
  'PTE done',
  'GRE / GMAT done',
  'Preparing now',
];

export const QUALIFICATION_OPTIONS = [
  'Class 12',
  'Bachelors — final year',
  'Bachelors — completed',
  'Masters',
  'Working professional',
];
