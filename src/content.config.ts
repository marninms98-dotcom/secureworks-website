/**
 * Astro Content Collections config (v5 — uses glob loader).
 * Defines schema for service pages used across patios, fencing, decking silos.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['patio', 'fencing', 'decking']),
    parent: z.string().optional(),           // slug of parent page (for child pages)
    image: z.string().optional(),            // hero image path
    order: z.number().optional(),            // sort order within silo
    draft: z.boolean().default(false),
  }),
});

export const collections = { services };
