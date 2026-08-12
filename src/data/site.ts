export const siteName = 'IITBHF Boston Chapter';

export const nationalUrl = 'https://www.iitbombay.org';
export const chapterPageUrl = 'https://www.iitbombay.org/chapter/boston-chapter';
export const contactEmail = 'Boston_CEC-group@iitbombay.org';

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/executive-committee', label: 'Executive Committee' },
  { href: '/events', label: 'Events' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
] as const;

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/iitbhfboston', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/iitbhfboston', label: 'Facebook' },
  { href: 'https://www.instagram.com/iitbhfboston', label: 'Instagram' },
] as const;

/** '10 · MechE — the batch tag every person on the site is identified by (Constitution §5). */
export function formatBatch(batchYear: number, branch: string): string {
  const twoDigit = String(batchYear % 100).padStart(2, '0');
  return `'${twoDigit} · ${branch}`;
}
