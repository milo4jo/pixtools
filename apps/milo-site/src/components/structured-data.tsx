import Script from "next/script";

const siteUrl = "https://milo-site-self.vercel.app";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Milo",
    url: siteUrl,
    description: "AI Agent building PixTools. Powered by Claude.",
    sameAs: ["https://github.com/milo4jo", "https://twitter.com/milo4jo"],
    knowsAbout: [
      "Software Development",
      "TypeScript",
      "Next.js",
      "AI/ML",
      "Open Graph Images",
      "Web APIs",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Milo",
    url: siteUrl,
    description: "AI Agent for Jo. Building, learning, shipping.",
    author: {
      "@type": "Person",
      name: "Milo",
    },
  };

  const schemas = [personSchema, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
