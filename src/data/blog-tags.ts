const BLOG_TAGS = [
  { label: "RockStim", slug: "rockstim" },
  { label: "RockFrac", slug: "rockfrac" },
  {
    label: "Лабораторные исследования",
    slug: "lab-research",
  },
  { label: "Engineering", slug: "engineering" },
  { label: "Industry", slug: "industry" },
  { label: "Petroleum", slug: "petroleum" },
  { label: "Production", slug: "production" },
  { label: "Coiled Tubing", slug: "coiled-tubing" },
  { label: "Acidizing", slug: "acidizing" },
  { label: "Well Stimulation", slug: "well-stimulation" },
  { label: "Cases", slug: "cases" },
  { label: "Company", slug: "company" },
  { label: "Reservoir Engineering", slug: "reservoir-engineering" },
  { label: "Well Modeling", slug: "well-modeling" },
] as const;

export const getBlogTagBySlug = (slug: string) =>
  BLOG_TAGS.find((tag) => tag.slug === slug);

export const BLOG_TAG_SLUGS = BLOG_TAGS.map(({ slug }) => slug) as [
  (typeof BLOG_TAGS)[number]["slug"],
  ...(typeof BLOG_TAGS)[number]["slug"][],
];
