import type { MetadataRoute } from "next";
import { SITE_URL } from "../libs/seo";
import { createClient } from "@/libs/supabase/client";

function withPath(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: withPath("/case-studies"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select("slug,updated_at")
      .not("slug", "is", null)
      .order("sort_order", { ascending: true });

    if (error) throw error;

    const rows = (data ?? []) as Array<{
      slug: string | null;
      updated_at: string | null;
    }>;

    const caseStudyRoutes: MetadataRoute.Sitemap = rows
      .filter((row) => Boolean(row.slug))
      .map((row) => ({
        url: withPath(`/case-studies/${row.slug!}`),
        lastModified: row.updated_at ? new Date(row.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
      .filter((entry) => !entry.url.endsWith("/case-studies/null"));

    return [...staticRoutes, ...caseStudyRoutes];
  } catch {
    // If Supabase env vars aren't set (or fetch fails), still ship a valid sitemap.
    return staticRoutes;
  }
}
