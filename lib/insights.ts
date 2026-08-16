export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "where-to-start-with-business-automation",
    title: "Where to start with business automation",
    description:
      "You don't need an AI strategy to benefit from automation. You need one annoying, repetitive task. Here's how to find it and what to do next.",
    date: "2026-06-24",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Most owners we talk to assume automation is a big, all-or-nothing project. It isn't. The businesses that get the most out of it almost always start with a single task that quietly eats an hour a day — and expand from there once they've seen it work.",
      },
      { type: "h2", text: "Find the task, not the technology" },
      {
        type: "p",
        text: "Forget AI for a moment. Instead, watch where information gets copied by hand, where the same message gets typed over and over, and where things slip through the cracks when someone is busy. Those three patterns are where automation pays off fastest.",
      },
      {
        type: "p",
        text: "A quick exercise: for one week, jot down every time you or your team do something that felt mechanical. By Friday you'll have a shortlist. The best first candidate is usually the task that is repetitive, rule-based, and happens often.",
      },
      { type: "h2", text: "Good first automations" },
      {
        type: "ul",
        items: [
          "Responding to new leads within seconds instead of hours",
          "Copying customer details from a form into your CRM",
          "Sending appointment reminders and follow-ups",
          "Turning a filled-out form into a draft quote",
          "Keeping two apps in sync so nobody re-enters data",
        ],
      },
      { type: "h2", text: "Start small on purpose" },
      {
        type: "p",
        text: "Automating one workflow well beats half-automating five. A small, reliable win builds trust with your team, gives you a real sense of the payback, and tells you where the next opportunity is. It also keeps the cost and risk low while you learn what's worth doing.",
      },
      { type: "h2", text: "Know what not to automate" },
      {
        type: "p",
        text: "Some work should stay human: judgement calls, sensitive conversations, anything that only happens occasionally. A good automation partner will tell you when a task isn't worth automating — the goal is to remove busywork, not to automate for its own sake.",
      },
      {
        type: "p",
        text: "If you already have a task in mind, that's usually enough to start. Describe it plainly — what triggers it, what steps follow, where the information lives — and the path to automating it tends to become obvious.",
      },
    ],
  },
  {
    slug: "ai-agents-vs-chatbots",
    title: "AI agents vs. chatbots: what actually helps a small business",
    description:
      "\"Chatbot\" and \"AI agent\" get used interchangeably, but they solve different problems. Here's the practical difference and when each one is worth it.",
    date: "2026-07-15",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "If you've shopped for anything AI recently, you've seen both words used for the same thing. The distinction matters, though, because it changes what you can expect the tool to actually do for your business.",
      },
      { type: "h2", text: "The old chatbot" },
      {
        type: "p",
        text: "Traditional chatbots follow a script. They match what a customer types against a set of pre-written rules and reply with canned answers. They're fine for a handful of FAQs, but they break the moment a customer phrases something unexpectedly, and they can't take action beyond handing off or showing a link.",
      },
      { type: "h2", text: "What an AI agent adds" },
      {
        type: "p",
        text: "An AI agent understands natural language, so it can handle questions it wasn't explicitly scripted for. More importantly, it can be connected to your tools — your calendar, your CRM, your knowledge base — and actually do things: check availability, book an appointment, look up an order, create a record, and escalate to a person when it isn't sure.",
      },
      {
        type: "p",
        text: "The practical difference is this: a chatbot answers, an agent gets things done. For a small business, that's the gap between deflecting a question and capturing a booked, qualified lead while you're on another job.",
      },
      { type: "h2", text: "When each one is worth it" },
      {
        type: "ul",
        items: [
          "A simple FAQ on a low-traffic page: a basic bot (or a good FAQ page) is plenty.",
          "After-hours inquiries you keep losing: an agent that qualifies and books pays for itself quickly.",
          "Repetitive support questions tying up staff: an agent connected to your docs frees real hours.",
          "Anything requiring an action — booking, lookups, updating records: that's agent territory.",
        ],
      },
      { type: "h2", text: "The guardrails that matter" },
      {
        type: "p",
        text: "A well-built agent knows its limits. It should be grounded in your actual business information rather than making things up, and it should hand off to a human the moment it's uncertain or the conversation gets sensitive. Reliability comes from good design and clear escalation rules — not from hoping the model always gets it right.",
      },
      {
        type: "p",
        text: "The right question isn't \"chatbot or agent?\" It's \"what do I want this to accomplish?\" Start from the outcome — a booked appointment, a qualified lead, a freed-up afternoon — and the right tool becomes clear.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
