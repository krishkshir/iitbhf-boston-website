import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const BRANCHES = [
  'Aero',
  'ChemE',
  'Chemistry',
  'CivilE',
  'CSE',
  'EE',
  'EP',
  'Humanities',
  'IDC',
  'Math',
  'MechE',
  'MetE',
  'Physics',
  'SJMSOM',
  'Other',
] as const;

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        datePrecision: z.enum(['day', 'month']).default('day'),
        location: z.string(),
        summary: z.string().max(200),
        coHosts: z.array(z.string()).default([]),
        openToPublic: z.boolean().default(true),
        rsvpUrl: z.url({ protocol: /^https$/ }).optional(),
        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.heroImage || !!d.heroImageAlt, {
        message: 'heroImageAlt is required when heroImage is set',
        path: ['heroImageAlt'],
      }),
});

const ec = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/ec' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.enum(['President', 'Vice President', 'Secretary', 'Treasurer', 'Trustee', 'Member']),
      order: z.number().int(),
      batchYear: z.number().int().min(1958).max(2100),
      branch: z.enum(BRANCHES),
      bio: z.string().max(160),
      linkedin: z.url({ protocol: /^https$/ }).optional(),
      photo: image().optional(),
    }),
});

export const collections = { events, ec };
