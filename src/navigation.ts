export const menuItems = [
  { id: "home", label: "Главная", href: "/", exact: true },
  { id: "products", label: "Продукты", href: "/products", exact: true },
  { id: "vacancies", label: "Вакансии", href: "/vacancies", exact: false },
  { id: "education", label: "Обучение", href: "/education/opz-course", exact: true },
  { id: "blog", label: "Блог", href: "/blog", exact: false },
  { id: "news", label: "Новости", href: "/news", exact: false },
  { id: "contacts", label: "Контакты", href: "/contacts", exact: true },
] as const;
