const VACANCY_DEPARTMENTS = [
  { label: "Отдел разработки", slug: "development" },
  { label: "Отдел продаж", slug: "sales" },
  { label: "Менеджмент и аналитика", slug: "management" },
] as const;

export const getVacancyDepartmentBySlug = (slug: string) =>
  VACANCY_DEPARTMENTS.find((department) => department.slug === slug);

export const VACANCY_DEPARTMENT_SLUGS = VACANCY_DEPARTMENTS.map(
  ({ slug }) => slug,
) as [
  (typeof VACANCY_DEPARTMENTS)[number]["slug"],
  ...(typeof VACANCY_DEPARTMENTS)[number]["slug"][],
];
