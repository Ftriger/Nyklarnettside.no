export default function sitemap() {
  return [
    {
      url: "https://klarnettside.no",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://klarnettside.no/artikler",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://klarnettside.no/artikler/hvorfor-nettside-nystartet-bedrift",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://klarnettside.no/artikler/finn-siden-i-google-og-ai-sok",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
