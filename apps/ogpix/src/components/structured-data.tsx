import Script from "next/script";

const siteUrl = "https://ogpix.vercel.app";

interface StructuredDataProps {
  type?: "website" | "softwareApp";
}

export function StructuredData({ type = "website" }: StructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PixTools",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: ["https://github.com/milo4jo", "https://twitter.com/milo4jo"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OGPix",
    url: siteUrl,
    description:
      "Generate beautiful Open Graph images with a single API call. 21 themes, 22 templates, and full customization.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/docs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OGPix",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "Instant OG Image API - Generate beautiful Open Graph images with a single URL. Perfect for blogs, SaaS, and social media.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with 500 images/month",
    },
    featureList: [
      "21 beautiful themes including gradients",
      "22 templates (blog, product, announcement, tutorial, etc.)",
      "Custom fonts and colors",
      "No design skills required",
      "Edge-rendered for maximum speed",
      "API and URL-based generation",
    ],
    author: {
      "@type": "Person",
      name: "Milo",
      url: "https://milo-site-self.vercel.app",
    },
  };

  const schemas =
    type === "softwareApp"
      ? [organizationSchema, softwareAppSchema]
      : [organizationSchema, websiteSchema, softwareAppSchema];

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
