import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LocationDetail } from "@/components/sections/LocationDetail";
import { getLocation } from "@/lib/locations";
import { localBusinessLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const location = getLocation("centerville-oh")!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
  alternates: { canonical: `/${location.slug}` },
};

export default function Page() {
  return (
    <PageShell>
      <LocationDetail location={location} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...localBusinessLd,
            url: `${site.url}/${location.slug}`,
            areaServed: [{ "@type": "City", name: location.city }],
          }),
        }}
      />
    </PageShell>
  );
}
