import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { services } from "@/lib/content";
import { servicePageCopy } from "@/lib/servicePages";
import { serviceLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const slug = "integrations";
const service = services.find((s) => s.slug === slug)!;
const copy = servicePageCopy[slug];

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: { canonical: `/${slug}` },
};

export default function Page() {
  return (
    <PageShell>
      <ServiceDetail service={service} intro={copy.intro} outcomes={copy.outcomes} example={copy.example} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceLd(service.title, copy.metaDescription, `${site.url}/${slug}`),
          ),
        }}
      />
    </PageShell>
  );
}
