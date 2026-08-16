export type Location = {
  slug: string;
  city: string;
  zip: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
};

export const locations: Location[] = [
  {
    slug: "centerville-oh",
    city: "Centerville",
    zip: "45458",
    metaTitle: "AI Automation & Software in Centerville, OH",
    metaDescription:
      "AI agents, workflow automation, CRM integrations and custom software for businesses in Centerville, Ohio and the greater Dayton area.",
    intro:
      "WaverStudio helps Centerville businesses cut out repetitive work — from lead response and scheduling to connecting the tools your team already uses. We're a short drive up the road in Miamisburg, and everything we build works remotely too.",
  },
  {
    slug: "kettering-oh",
    city: "Kettering",
    zip: "45429",
    metaTitle: "AI Automation & Software in Kettering, OH",
    metaDescription:
      "AI agents, workflow automation, CRM and custom software for businesses in Kettering, Ohio and the Dayton area, built by a local studio.",
    intro:
      "From professional practices to home-services companies, Kettering businesses use WaverStudio to automate the manual steps between a new inquiry and a booked, qualified customer. Local to the Dayton area, remote-friendly, and focused on practical results.",
  },
];

export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);
