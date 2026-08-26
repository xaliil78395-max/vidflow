import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/generated/",
      ],
    },
    sitemap: "https://unique-essence-production-6bed.up.railway.app/sitemap.xml",
  };
}
