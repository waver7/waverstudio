import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      { label: "AI Agents", href: "/ai-agents" },
      { label: "Workflow Automation", href: "/workflow-automation" },
      { label: "CRM & Salesforce", href: "/salesforce-crm" },
      { label: "Integrations", href: "/integrations" },
      { label: "Web Development", href: "/web-development" },
      { label: "Custom Software", href: "/custom-software" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Local",
    links: [
      { label: "Miamisburg, OH", href: "/miamisburg-oh" },
      { label: "Centerville, OH", href: "/centerville-oh" },
      { label: "Kettering, OH", href: "/kettering-oh" },
      { label: "Dayton Area", href: "/miamisburg-oh" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              AI automation, software and connected systems for modern
              businesses.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="status text-ink-muted">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-secondary transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
