const FALLBACK_SITE = "https://tetacom.pro";

export const getBasePath = () => {
  const basePath = import.meta.env.BASE_URL || "/";

  return basePath.endsWith("/") ? basePath : `${basePath}/`;
};

export const getSitePath = (pathname = "/") => {
  const normalizedPathname = pathname.replace(/^\/+/, "");

  return `${getBasePath()}${normalizedPathname}`;
};

export const getSiteUrl = (pathname = "/", site?: URL | string) =>
  new URL(getSitePath(pathname), site ?? FALLBACK_SITE).toString();
