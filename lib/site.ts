export const site = {
  name: "WaverStudio",
  tagline: "Automate the work. Accelerate the business.",
  positioning: "AI Automation & Software for Modern Businesses",
  description:
    "WaverStudio builds AI agents, workflow automation, CRM integrations, websites and custom software for businesses in Miamisburg, Dayton and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://waverstudio.com",
  email: "waverstudio@gmail.com",
  // Optional external booking link (Cal.com / Calendly). When set, "Book a call"
  // CTAs appear; otherwise those CTAs fall back to the on-page contact form.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  city: "Miamisburg",
  region: "Ohio",
  regionShort: "OH",
  zip: "45342",
  area: "Dayton area",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Solutions", href: "/#solutions" },
    { label: "How It Works", href: "/#process" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/#about" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
