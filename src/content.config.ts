import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { BLOG_TAG_SLUGS } from "./data/blog-tags";
import { NEWS_TAG_SLUGS } from "./data/news-tags";
import { VACANCY_DEPARTMENT_SLUGS } from "./data/vacancy-departments";

const vacancies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/vacancies" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    department: z.enum(VACANCY_DEPARTMENT_SLUGS),
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

const newsArticleSchema = articleSchema.extend({
  tags: z.array(z.enum(NEWS_TAG_SLUGS)),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogArticleSchema,
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: newsArticleSchema,
});

const productTextBlockSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const productImageBlockSchema = productTextBlockSchema.extend({
  image: z.string().optional(),
});

const productInlineTextSchema = z.union([
  z.string(),
  z.array(
    z.object({
      text: z.string(),
      href: z.string().optional(),
    }),
  ),
]);

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    menuTitle: z.string().optional(),
    description: z.string(),
    draft: z.boolean(),
    order: z.number(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    productLink: z.string().optional(),
    demoImage: z.string().optional(),
    demoImage2x: z.string().optional(),
    demoVideo: z.string().optional(),
    demoImageFill: z.boolean().default(false),
    prompt1: productTextBlockSchema.extend({ label: z.string() }).optional(),
    prompt2: productTextBlockSchema.extend({ label: z.string() }).optional(),
    banners: z
      .array(
        productImageBlockSchema.omit({ description: true }).extend({
          description: productInlineTextSchema,
          type: z.enum(["horizontal", "vertical"]),
          image2x: z.string().optional(),
          backgroundColor: z.string().optional(),
        }),
      )
      .default([]),
    modulesTitle: z.string().optional(),
    modules: z.array(productImageBlockSchema).default([]),
    infoBlocks: z
      .array(
        z.object({
          titleLines: z.array(z.string()),
          points: z.array(z.string()),
        }),
      )
      .default([]),
  }),
});

export const collections = { vacancies, blog, news, products };
