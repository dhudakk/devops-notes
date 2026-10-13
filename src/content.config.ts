import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /**
         * What role the page plays inside its course. Drives the label above the
         * title ("Python · Chapter 3 of 8"), the course chapter list, and progress.
         */
        kind: z.enum(['home', 'overview', 'chapter', 'cheatsheet', 'sources', 'wisdom']).optional(),
        /** Lesson day the chapter comes from, shown as "Deň 1" / "Day 1". */
        day: z.number().int().positive().optional(),
      }),
    }),
  }),
};
