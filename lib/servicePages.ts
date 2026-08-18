export type ServicePageCopy = {
  intro: string;
  outcomes: string[];
  metaTitle: string;
  metaDescription: string;
  example: { scenario: string; steps: string[] };
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
    example: {
      scenario:
        "A service company was losing after-hours website leads to slow replies.",
      steps: [
        "We connected an agent to their site, calendar and CRM.",
        "It answers common questions and asks a few qualifying ones.",
        "Qualified leads get a booking link and land in the CRM.",
        "Anything it isn't sure about is handed to a person with the full transcript.",
      ],
    },
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
    example: {
      scenario:
        "Every new lead meant the same eight manual steps across three apps.",
      steps: [
        "We mapped the workflow end to end with the team.",
        "A single trigger now creates the CRM record and sends the response.",
        "The appointment link, owner alert and follow-up all fire automatically.",
        "The team went from eight manual steps to one.",
      ],
    },
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
    example: {
      scenario:
        "A team ran their pipeline in spreadsheets nobody trusted or kept current.",
      steps: [
        "We modelled their real stages and hand-off points in the CRM.",
        "Records update themselves as work moves through the pipeline.",
        "Automations handle the reminders and status changes staff used to forget.",
        "Reporting finally matches reality because the data stays clean.",
      ],
    },
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
    example: {
      scenario:
        "The same customer detail was being typed into three separate systems.",
      steps: [
        "We identified the source of truth for each piece of data.",
        "Webhooks and APIs now push changes between the systems in real time.",
        "An older tool with no modern API was wrapped in a small connector.",
        "Information flows once and stays in sync everywhere.",
      ],
    },
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
    example: {
      scenario:
        "A dated site loaded slowly and gave customers no way to self-serve.",
      steps: [
        "We rebuilt it fast, mobile-first and focused on one clear action.",
        "A secure portal lets customers book and check status themselves.",
        "The back-and-forth of phone tag and email dropped sharply.",
        "The codebase is built to extend as the business grows.",
      ],
    },
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
    example: {
      scenario:
        "A critical process lived in a fragile spreadsheet only one person understood.",
      steps: [
        "We turned it into a proper internal tool the whole team can use.",
        "Validation and permissions replaced error-prone manual edits.",
        "AI handles the tedious classification step in the middle.",
        "It's documented and built to be maintained, not a black box.",
      ],
    },
  },
};
