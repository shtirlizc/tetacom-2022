import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

const SITE_URL = "https://tetacom.pro/";
const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const SRC_DIR = path.join(ROOT_DIR, "src");
const CONTENT_DIR = path.join(SRC_DIR, "content");
const PAGES_DIR = path.join(SRC_DIR, "pages");

const dateCache = new Map();

const normalizeUrl = (url) => {
  const pathname = new URL(url, SITE_URL).pathname;

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
};

const formatDate = (date) => date.toISOString().slice(0, 10);

const getFileLastmod = (filePath) => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(ROOT_DIR, filePath);

  if (dateCache.has(fullPath)) {
    return dateCache.get(fullPath);
  }

  let date;

  try {
    const gitDate = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", fullPath],
      { cwd: ROOT_DIR, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    if (gitDate) {
      date = new Date(gitDate);
    }
  } catch {
    date = undefined;
  }

  if (!date && existsSync(fullPath)) {
    date = statSync(fullPath).mtime;
  }

  const lastmod = date ? formatDate(date) : undefined;
  dateCache.set(fullPath, lastmod);

  return lastmod;
};

const getLatestLastmod = (lastmods) => lastmods.filter(Boolean).sort().at(-1);

const getFrontmatterValue = (frontmatter, key) => {
  const match = frontmatter.match(
    new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n#]*))`, "m"),
  );

  return match?.[1] ?? match?.[2] ?? match?.[3]?.trim();
};

const getFrontmatterList = (frontmatter, key) => {
  const match = frontmatter.match(
    new RegExp(`^${key}:\\n([\\s\\S]*?)(?=^\\S|\\Z)`, "m"),
  );
  const value = match?.[1];

  if (!value) {
    return [];
  }

  return [...value.matchAll(/^ {2}-\s*(.+)$/gm)].map((item) =>
    item[1].replace(/^["']|["']$/g, "").trim(),
  );
};

const readMarkdownEntry = (filePath) => {
  const source = readFileSync(filePath, "utf8");
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const slug = getFrontmatterValue(frontmatter, "slug");

  if (!slug || getFrontmatterValue(frontmatter, "draft") === "true") {
    return undefined;
  }

  return {
    filePath,
    slug,
    tags: getFrontmatterList(frontmatter, "tags"),
    department: getFrontmatterValue(frontmatter, "department"),
    lastmod: getFileLastmod(filePath),
  };
};

const readMarkdownEntries = (collection) => {
  const baseDir = path.join(CONTENT_DIR, collection);

  if (!existsSync(baseDir)) {
    return [];
  }

  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walk(entryPath);
      }

      if (!entry.isFile() || !entry.name.endsWith(".md")) {
        return [];
      }

      const markdownEntry = readMarkdownEntry(entryPath);

      return markdownEntry ? [markdownEntry] : [];
    });

  return walk(baseDir);
};

const createSitemapLastmodMap = () => {
  const map = new Map();
  const blog = readMarkdownEntries("blog");
  const news = readMarkdownEntries("news");
  const products = readMarkdownEntries("products");
  const vacancies = readMarkdownEntries("vacancies");

  const set = (url, lastmod) => {
    if (lastmod) {
      map.set(url, lastmod);
    }
  };

  const setStatic = (url, sourcePath) => set(url, getFileLastmod(sourcePath));
  const setCollection = (baseUrl, entries) => {
    entries.forEach((entry) => set(`${baseUrl}${entry.slug}/`, entry.lastmod));
  };
  const setTagPages = (baseUrl, entries, getTags) => {
    const tagLastmods = new Map();

    entries.forEach((entry) => {
      getTags(entry).forEach((tag) => {
        tagLastmods.set(
          tag,
          getLatestLastmod([tagLastmods.get(tag), entry.lastmod]),
        );
      });
    });

    tagLastmods.forEach((lastmod, tag) =>
      set(`${baseUrl}tag/${tag}/`, lastmod),
    );
  };

  setStatic("/", path.join(PAGES_DIR, "index.astro"));
  setStatic("/contacts/", path.join(PAGES_DIR, "contacts.astro"));
  setStatic(
    "/education/opz-course/",
    path.join(PAGES_DIR, "education/opz-course.astro"),
  );

  set("/blog/", getLatestLastmod(blog.map((entry) => entry.lastmod)));
  setCollection("/blog/", blog);
  setTagPages("/blog/", blog, (entry) => entry.tags);

  set("/news/", getLatestLastmod(news.map((entry) => entry.lastmod)));
  setCollection("/news/", news);
  setTagPages("/news/", news, (entry) => entry.tags);

  setCollection("/products/", products);

  set("/vacancies/", getLatestLastmod(vacancies.map((entry) => entry.lastmod)));
  setCollection("/vacancies/", vacancies);
  setTagPages("/vacancies/", vacancies, (entry) =>
    entry.department ? [entry.department] : [],
  );

  return map;
};

const sitemapLastmodMap = createSitemapLastmodMap();

export const addSitemapLastmod = (item) => ({
  ...item,
  lastmod: sitemapLastmodMap.get(normalizeUrl(item.url)),
});
