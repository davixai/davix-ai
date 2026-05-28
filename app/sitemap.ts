import type { MetadataRoute } from "next"

const BASE = "https://www.davixai.website"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/site-uri`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/automatizari`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/davix-dental`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/proiecte`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/despre-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/testimoniale`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/intrebari-frecvente`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/termeni`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/confidentialitate`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
