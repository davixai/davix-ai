import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /oferta e pagina de prospectare trimisă pe WhatsApp. E privată: nu
        // se caută pe Google, nu concurează cu /site-uri și îmi lasă libertatea
        // să vorbesc mai direct decât aș face-o într-o pagină indexată.
        disallow: ["/api/", "/oferta"],
      },
    ],
    sitemap: "https://www.davixai.website/sitemap.xml",
    host: "https://www.davixai.website",
  }
}
