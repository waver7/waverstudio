import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Workflow,
  Database,
  Cable,
  MonitorSmartphone,
  Boxes,
  Home,
  Briefcase,
  Building2,
  Car,
  Stethoscope,
  Store,
  Search,
  PenTool,
  Hammer,
  LineChart,
  MapPin,
  Wand2,
  Puzzle,
} from "lucide-react";

export type Service = {
  slug: string;
  href: string;
  title: string;
  icon: LucideIcon;
  description: string;
  capabilities: string[];
  span?: "wide" | "tall" | "normal";
};

export const services: Service[] = [
  {
    slug: "ai-agents",
    href: "/ai-agents",
    title: "AI Agents",
    icon: Bot,
    description:
      "AI assistants that answer questions, qualify leads, search your business data, perform tasks and support your team 24/7.",
    capabilities: [
      "Customer support agents",
      "Lead qualification",
      "Internal knowledge assistants",
      "AI email handling",
      "Document processing",
      "Intelligent routing",
    ],
    span: "wide",
  },
  {
    slug: "workflow-automation",
    href: "/workflow-automation",
    title: "Workflow Automation",
    icon: Workflow,
    description:
      "Turn repetitive multi-step work into reliable automated processes that run without anyone remembering to start them.",
    capabilities: [
      "Lead automation",
      "Notifications",
      "Scheduling",
      "Follow-ups",
      "Data entry",
      "Approval workflows",
    ],
  },
  {
    slug: "salesforce-crm",
    href: "/salesforce-crm",
    title: "CRM & Salesforce",
    icon: Database,
    description:
      "Build a CRM your team actually wants to use — with automation, integrations and intelligent workflows built in.",
    capabilities: [
      "Salesforce development",
      "CRM architecture",
      "Apex & Lightning",
      "Experience Cloud",
      "CRM automation",
      "Data integrations",
    ],
  },
  {
    slug: "integrations",
    href: "/integrations",
    title: "Connect Everything",
    icon: Cable,
    description:
      "Make your existing systems communicate instead of forcing your team to copy information between them.",
    capabilities: [
      "REST APIs",
      "Webhooks",
      "Third-party integrations",
      "Data synchronization",
      "Legacy system integration",
    ],
    span: "wide",
  },
  {
    slug: "web-development",
    href: "/web-development",
    title: "Websites & Customer Portals",
    icon: MonitorSmartphone,
    description:
      "Fast, modern websites designed to generate business — plus secure portals and web applications when a basic website isn't enough.",
    capabilities: [
      "Business websites",
      "Customer portals",
      "Internal applications",
      "Booking experiences",
      "Dashboards",
    ],
  },
  {
    slug: "custom-software",
    href: "/custom-software",
    title: "Custom Software",
    icon: Boxes,
    description:
      "When off-the-shelf software doesn't fit your process, we build the system that does.",
    capabilities: [
      "Internal tools",
      "Business applications",
      "Dashboards",
      "SaaS development",
      "Process modernization",
    ],
  },
];

export type UseCase = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const useCases: UseCase[] = [
  {
    title: "Home Services",
    icon: Home,
    description:
      "Lead response, quoting, scheduling, review requests and customer follow-up.",
  },
  {
    title: "Professional Services",
    icon: Briefcase,
    description:
      "Client intake, documents, CRM updates, scheduling and internal knowledge.",
  },
  {
    title: "Real Estate",
    icon: Building2,
    description:
      "Lead qualification, property inquiries, follow-up and CRM automation.",
  },
  {
    title: "Automotive",
    icon: Car,
    description:
      "Appointments, customer communication, service reminders and lead handling.",
  },
  {
    title: "Healthcare Practices",
    icon: Stethoscope,
    description:
      "Administrative workflow assistance, scheduling and internal processes.",
  },
  {
    title: "Local Retail & Service",
    icon: Store,
    description:
      "Customer questions, inventory workflows, communications and repetitive back-office work.",
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discover",
    description:
      "Tell us where your team loses time, repeats work or moves information manually.",
  },
  {
    n: "02",
    title: "Design",
    description:
      "We map the workflow and identify the best opportunities for automation.",
  },
  {
    n: "03",
    title: "Build",
    description:
      "We create and connect the AI, software and integrations required to run it.",
  },
  {
    n: "04",
    title: "Improve",
    description:
      "We monitor the workflow, refine it and expand automation as your business grows.",
  },
];

export type Value = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const values: Value[] = [
  {
    title: "Local",
    icon: MapPin,
    description:
      "Based in Miamisburg, Ohio — available for local businesses that prefer working with someone nearby.",
  },
  {
    title: "Custom",
    icon: PenTool,
    description:
      "Your business doesn't operate exactly like anyone else's. Your automation shouldn't either.",
  },
  {
    title: "Practical AI",
    icon: Wand2,
    description:
      "We use AI where it creates measurable operational value — not because it's trendy.",
  },
  {
    title: "Built to Integrate",
    icon: Puzzle,
    description:
      "Keep the tools that already work. We'll connect and improve the systems around them.",
  },
];

export type TechGroup = {
  label: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  { label: "AI", items: ["OpenAI", "Claude", "LLMs", "AI Agents"] },
  { label: "CRM", items: ["Salesforce", "Custom CRM", "CRM integrations"] },
  {
    label: "Automation",
    items: ["Webhooks", "APIs", "Workflow engines", "Background jobs"],
  },
  { label: "Applications", items: ["Next.js", "React", "Node.js"] },
  { label: "Infrastructure", items: ["Cloud services", "Databases"] },
];

export const trustPills = [
  "AI Agents",
  "OpenAI",
  "Claude",
  "Salesforce",
  "APIs",
  "CRM",
  "Automation",
  "Web Apps",
  "Integrations",
  "Cloud",
];

export type ExampleProject = {
  title: string;
  icon: LucideIcon;
  flow: string;
};

export const exampleProjects: ExampleProject[] = [
  {
    title: "AI Lead Qualification",
    icon: Search,
    flow: "Website inquiry → AI qualification → CRM → appointment → follow-up.",
  },
  {
    title: "Automated Customer Intake",
    icon: LineChart,
    flow: "Customer form → document processing → validation → CRM → team notification.",
  },
  {
    title: "Connected Business Systems",
    icon: Hammer,
    flow: "Website + CRM + accounting + internal systems synchronized through APIs.",
  },
];

/* Automation Finder — each option rebuilds a suggested workflow */
export type FinderOption = {
  id: string;
  label: string;
  steps: string[];
};

export const finderOptions: FinderOption[] = [
  {
    id: "leads",
    label: "Responding to leads",
    steps: [
      "Lead arrives",
      "AI responds in seconds",
      "AI asks qualification questions",
      "Qualified lead enters CRM",
      "Appointment link sent",
      "Owner notified",
      "Automatic follow-up if no response",
    ],
  },
  {
    id: "scheduling",
    label: "Scheduling appointments",
    steps: [
      "Customer requests a time",
      "AI checks live calendar",
      "Available slots offered",
      "Appointment booked",
      "Confirmation sent",
      "Reminder scheduled",
    ],
  },
  {
    id: "questions",
    label: "Customer questions",
    steps: [
      "Question comes in",
      "AI reads your knowledge base",
      "Instant, accurate answer",
      "Escalates to a human if unsure",
      "Conversation logged to CRM",
    ],
  },
  {
    id: "data-entry",
    label: "Data entry",
    steps: [
      "New record arrives",
      "AI extracts the details",
      "Fields validated",
      "Written to the right system",
      "Team notified of anything unusual",
    ],
  },
  {
    id: "crm",
    label: "Updating CRM",
    steps: [
      "Activity happens anywhere",
      "Automation captures it",
      "Contact matched or created",
      "CRM record updated",
      "Pipeline stage moved",
    ],
  },
  {
    id: "followups",
    label: "Sending follow-ups",
    steps: [
      "Interaction ends",
      "Follow-up scheduled",
      "Personalized message drafted",
      "Sent at the right time",
      "Replies routed back to your team",
    ],
  },
  {
    id: "quotes",
    label: "Generating quotes",
    steps: [
      "Request details captured",
      "AI applies your pricing rules",
      "Quote drafted for review",
      "Approved and sent",
      "Logged against the customer",
    ],
  },
  {
    id: "documents",
    label: "Processing documents",
    steps: [
      "Document received",
      "AI reads and classifies it",
      "Key data extracted",
      "Validated against records",
      "Filed and team notified",
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    steps: [
      "Data pulled from every source",
      "Numbers reconciled automatically",
      "Report generated on schedule",
      "Delivered to the right people",
    ],
  },
  {
    id: "sync",
    label: "Moving data between apps",
    steps: [
      "Change happens in one app",
      "Automation detects it",
      "Data mapped and transformed",
      "Synced to the other systems",
      "Kept in sync going forward",
    ],
  },
  {
    id: "internal",
    label: "Internal support",
    steps: [
      "Team member asks a question",
      "AI searches internal docs",
      "Answer delivered in chat",
      "Common tasks handled automatically",
    ],
  },
  {
    id: "other",
    label: "Something else",
    steps: [
      "Tell us the workflow",
      "We map every manual step",
      "We identify what AI can handle",
      "We build and connect it",
      "You stop doing it by hand",
    ],
  },
];

export const contactServiceOptions = [
  "AI Agent",
  "Workflow Automation",
  "Website",
  "CRM / Salesforce",
  "Integration",
  "Custom Software",
  "I'm not sure",
];
