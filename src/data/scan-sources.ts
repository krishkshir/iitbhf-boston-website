export interface ScanSource {
  /** URL segment; also what qrencode encodes onto the printed flyer. */
  slug: string;
  /** Display name for the greeting: "You scanned us at {name}." */
  name: string;
  /** For the runbook/retrospective, not shown on the page. */
  date?: string;
}

export const scanSources: ScanSource[] = [
  { slug: 'colors-of-india', name: 'Colors of India', date: '2026-08-15' },
];
