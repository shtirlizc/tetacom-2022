const NEWS_TAGS = [
  { label: "RockStim", slug: "rockstim" },
  { label: "RockFrac", slug: "rockfrac" },
  { label: "RockWow", slug: "rockwow" },
  { label: "RockLis", slug: "rocklis" },
  { label: "Обучение", slug: "education" },
] as const;

export const getNewsTagBySlug = (slug: string) =>
  NEWS_TAGS.find((tag) => tag.slug === slug);

export const NEWS_TAG_SLUGS = NEWS_TAGS.map(({ slug }) => slug) as [
  (typeof NEWS_TAGS)[number]["slug"],
  ...(typeof NEWS_TAGS)[number]["slug"][],
];
