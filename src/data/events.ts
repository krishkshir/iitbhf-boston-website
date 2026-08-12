import type { CollectionEntry } from 'astro:content';

type Event = CollectionEntry<'events'>;

/**
 * An event stays "upcoming" through its last calendar day. Compared against
 * today in America/New_York (the chapter's timezone), read as UTC midnight to
 * match the UTC-midnight storage convention documented in EventDate.astro —
 * not the build machine's local time, and not raw UTC "now".
 */
function isUpcoming(event: Event, cutoff: number): boolean {
  const { date, datePrecision } = event.data;
  if (datePrecision === 'month') {
    const firstOfNextMonth = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    return firstOfNextMonth > cutoff;
  }
  return date.getTime() >= cutoff;
}

export function partitionEvents(events: Event[]): { upcoming: Event[]; past: Event[] } {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
  const cutoff = Date.parse(`${today}T00:00:00Z`);

  const upcoming = events
    .filter((e) => isUpcoming(e, cutoff))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const past = events
    .filter((e) => !isUpcoming(e, cutoff))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return { upcoming, past };
}
