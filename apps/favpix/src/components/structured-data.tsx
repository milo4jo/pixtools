import Script from "next/script";

const siteUrl = "https://favpix.vercel.app";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PixTools",
    url: siteUrl,
    sameAs: ["https://github.com/milo4jo", "https://twitter.com/milo4jo"],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FavPix",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "Instant Favicon API - Generate beautiful favicons with a single URL. Text, emoji, custom colors, all sizes.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to use",
    },
    featureList: [
      "Text and emoji favicons",
      "Custom colors and backgrounds",
      "Multiple sizes (16, 32, 48, 180, 192, 512)",
      "PWA manifest generator",
      "API and URL-based generation",
    ],
    author: {
      "@type": "Person",
      name: "Milo",
      url: "https://milo-site-self.vercel.app",
    },
  };

  const schemas = [organizationSchema, softwareAppSchema];

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
