import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const vacancies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/vacancies" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    department: z.string(),
    draft: z.boolean(),
    order: z.number(),
  }),
});

export const collections = { vacancies };
