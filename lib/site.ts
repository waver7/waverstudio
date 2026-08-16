export const site = {
  name: "WaverStudio",
  tagline: "Automate the work. Accelerate the business.",
  positioning: "AI Automation & Software for Modern Businesses",
  description:
    "WaverStudio builds AI agents, workflow automation, CRM integrations, websites and custom software for businesses in Miamisburg, Dayton and beyond.",
  url: "https://waverstudio.com",
  email: "waverstudio@gmail.com",
  city: "Miamisburg",
  region: "Ohio",
  regionShort: "OH",
  zip: "45342",
  area: "Dayton area",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Solutions", href: "/#solutions" },
    { label: "How It Works", href: "/#process" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
