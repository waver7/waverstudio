import { site } from "./site";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  areaServed: ["Miamisburg OH", "Dayton OH", "Ohio", "United States"],
};

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.regionShort,
    postalCode: site.zip,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Miamisburg" },
    { "@type": "City", name: "Dayton" },
  ],
  knowsAbout: [
    "AI automation",
    "AI agents",
    "Workflow automation",
    "Salesforce development",
    "CRM integration",
    "Custom software development",
    "Web development",
  ],
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function serviceLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    url,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["Miamisburg OH", "Dayton OH"],
  };
}
