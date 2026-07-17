import blogs from "./blogs.json";

export const allBlogs = blogs;

export function getBlogPath(blog) {
  return `/blog/${blog.slug}`;
}

export function getAllBlogs() {
  return allBlogs.map((blog) => ({
    ...blog,
    href: getBlogPath(blog),
  }));
}

export function getBlogBySlug(slug) {
  return getAllBlogs().find((blog) => blog.slug === slug);
}

export function getBlogCategories() {
  const counts = getAllBlogs().reduce((result, blog) => {
    result[blog.category] = (result[blog.category] || 0) + 1;
    return result;
  }, {});

  return [
    { name: "All", count: allBlogs.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, count })),
  ];
}

export function getRecentBlogs(limit = 3) {
  return getAllBlogs()
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}
