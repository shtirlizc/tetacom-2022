const FALLBACK_SITE = "https://tetacom.pro";

export const getBasePath = () => {
  const basePath = import.meta.env.BASE_URL || "/";

  return basePath.endsWith("/") ? basePath : `${basePath}/`;
};

export const getSitePath = (pathname = "/") => {
  const basePath = getBasePath();
  const normalizedBasePath = basePath.replace(/^\/+|\/+$/g, "");
  const normalizedPathname = pathname.replace(/^\/+/, "");

  if (
    normalizedBasePath &&
    (normalizedPathname === normalizedBasePath ||
      normalizedPathname.startsWith(`${normalizedBasePath}/`))
  ) {
    return `/${normalizedPathname}`;
  }

  return `${basePath}${normalizedPathname}`;
};

export const getSiteUrl = (pathname = "/", site?: URL | string) =>
  new URL(getSitePath(pathname), site ?? FALLBACK_SITE).toString();
