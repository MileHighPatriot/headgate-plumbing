import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/help",
    "/book",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/commercial",
    "/pricing",
    "/plans",
    "/tools",
    "/tools/whose-pipe",
    "/tools/water-heater-age",
    "/tools/freeze-watch",
    "/service-area",
    "/about",
    "/contact",
  ];
  return routes.map((path) => ({ url: `${site.url}${path}/`, lastModified }));
}
