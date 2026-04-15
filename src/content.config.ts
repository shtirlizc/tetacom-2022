import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { BLOG_TAG_SLUGS } from "./data/blog-tags";

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

const articleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  pubDate: z.coerce.date(),
  draft: z.boolean(),
});

const blogArticleSchema = articleSchema.extend({
  tags: z.array(z.enum(BLOG_TAG_SLUGS)),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogArticleSchema,
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: articleSchema,
});

export const collections = { vacancies, blog, news };
