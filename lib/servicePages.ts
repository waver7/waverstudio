export type ServicePageCopy = {
  intro: string;
  outcomes: string[];
  metaTitle: string;
  metaDescription: string;
};

export const servicePageCopy: Record<string, ServicePageCopy> = {
  "ai-agents": {
    intro:
      "AI agents that work like a capable team member — answering questions, qualifying leads and handling routine tasks around the clock, connected directly to your business tools.",
    outcomes: [
      "Every inquiry gets an immediate, on-brand response.",
      "Leads are qualified before they reach your team.",
      "Staff stop answering the same questions over and over.",
      "Conversations are logged and handed off cleanly when a human is needed.",
    ],
    metaTitle: "AI Agents for Local Businesses",
    metaDescription:
      "Custom AI agents that answer questions, qualify leads and support your team 24/7 — built and connected to your business tools by WaverStudio.",
  },
  "workflow-automation": {
    intro:
      "We turn the repetitive, multi-step work your team does by hand into reliable automated processes that run on their own — accurately, every time.",
    outcomes: [
      "Manual copy-paste between systems disappears.",
      "Follow-ups and notifications happen without anyone remembering.",
      "Fewer dropped balls and data-entry mistakes.",
      "Your team spends time on work that actually needs a human.",
    ],
    metaTitle: "Workflow Automation",
    metaDescription:
      "Turn repetitive multi-step work into reliable automated processes. Workflow automation for businesses in Miamisburg and the Dayton area.",
  },
  "salesforce-crm": {
    intro:
      "A CRM your team actually wants to use — architected around your process, with automation, integrations and intelligent workflows built in from the start.",
    outcomes: [
      "One source of truth instead of scattered spreadsheets.",
      "Records that update themselves as work happens.",
      "Salesforce configured for how your team really operates.",
      "Reporting you can trust because the data stays clean.",
    ],
    metaTitle: "CRM & Salesforce Development",
    metaDescription:
      "Salesforce and custom CRM development with automation and integrations built in. Salesforce consulting for the Dayton, Ohio area.",
  },
  integrations: {
    intro:
      "Make your existing systems talk to each other instead of forcing your team to move information between them by hand.",
    outcomes: [
      "Your apps stay in sync automatically.",
      "No more re-entering the same data in three places.",
      "Legacy tools keep working — just better connected.",
      "A single, reliable flow of information across the business.",
    ],
    metaTitle: "Integrations & APIs",
    metaDescription:
      "Connect the tools your business already uses with REST APIs, webhooks and reliable integrations built by WaverStudio.",
  },
  "web-development": {
    intro:
      "Fast, modern websites built to generate business — plus secure portals and web applications for when a basic website isn't enough.",
    outcomes: [
      "A site that loads fast and converts visitors into leads.",
      "Customer portals and booking experiences that reduce back-and-forth.",
      "Dashboards and internal apps tailored to your team.",
      "A foundation that's easy to extend as you grow.",
    ],
    metaTitle: "Web Development & Customer Portals",
    metaDescription:
      "Fast, modern websites, customer portals and web applications for local businesses. Web development in Miamisburg and Dayton, Ohio.",
  },
  "custom-software": {
    intro:
      "When off-the-shelf software doesn't fit the way you work, we build the system that does — practical, maintainable and shaped around your process.",
    outcomes: [
      "Software that matches your process instead of fighting it.",
      "Internal tools that replace fragile spreadsheets.",
      "A codebase built to be maintained and extended.",
      "Automation and AI baked in where it adds real value.",
    ],
    metaTitle: "Custom Software Development",
    metaDescription:
      "Custom internal tools, business applications and dashboards built around your process. Custom software development in Dayton, Ohio.",
  },
};
