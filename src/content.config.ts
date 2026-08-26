import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects live as Markdown so adding one means adding a file - no HTML
 * editing, and no chance of the projects page and the home page drifting
 * apart the way the four hand-written pages did.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Lower sorts first on the projects index. */
    order: z.number().default(99),
    featured: z.boolean().default(false),
    year: z.string(),
    status: z.enum(['in-progress', 'complete', 'ongoing']),
    category: z.enum(['ai-ml', 'forensics', 'security', 'database']),
    tags: z.array(z.string()).default([]),
    /** Hue in degrees, seeds the generated cover art. */
    hue: z.number().min(0).max(360).default(214),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

/**
 * Writeups are the shorter-form counterpart to projects: a technique, a bug,
 * a lab exercise. Adding one is adding a Markdown file.
 */
const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Rough read time in minutes; shown on the index. */
    readingTime: z.number().default(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups };
