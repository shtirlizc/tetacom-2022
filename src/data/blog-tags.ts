const BLOG_TAGS = [
  { label: "RockStim", slug: "rockstim" },
  { label: "RockFrac", slug: "rockfrac" },
  {
    label: "Лабораторные исследования",
    slug: "laboratornye-issledovaniya",
  },
] as const;

export const getBlogTagBySlug = (slug: string) =>
  BLOG_TAGS.find((tag) => tag.slug === slug);

export const BLOG_TAG_SLUGS = BLOG_TAGS.map(({ slug }) => slug) as [
  (typeof BLOG_TAGS)[number]["slug"],
  ...(typeof BLOG_TAGS)[number]["slug"][],
];
