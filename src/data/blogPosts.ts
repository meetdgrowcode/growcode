// src/data/blogPosts.ts
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tag: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "build-reliable-software-for-startups",
    title: "How We Build Reliable Software for Startups",
    description:
      "Our workflow for shipping stable, fast MVPs for early-stage teams.",
    content:
      "• Start with the exact user problem, not features.\n\n" +
      "• Build the smallest version that delivers value.\n\n" +
      "• Choose a simple tech stack that avoids complexity.\n\n" +
      "• Test core flows only — signup, login, checkout.\n\n" +
      "• Launch early, improve weekly based on feedback.",
    date: "Dec 02, 2025",
    readTime: "2 min read",
    tag: "Process",
  },
  {
    id: 2,
    slug: "design-first-approach-for-better-ux",
    title: "Design-First Approach for Better UX",
    description: "Why planning UX early saves time and avoids rework.",
    content:
      "• Map user flow before UI design.\n\n" +
      "• Keep screens simple and predictable.\n\n" +
      "• Validate wireframes quickly with users.\n\n" +
      "• Use clear spacing, consistent buttons and readable text.\n\n" +
      "• Design clarity = faster development.",
    date: "Nov 24, 2025",
    readTime: "2 min read",
    tag: "Design",
  },
  {
    id: 3,
    slug: "scaling-your-product-safely",
    title: "Scaling Your Product Without Breaking It",
    description: "How we keep apps fast and stable as traffic grows.",
    content:
      "• Monitor first — fix what’s actually slow.\n\n" +
      "• Optimize only high-usage endpoints.\n\n" +
      "• Prefer horizontal scaling over complicated architecture.\n\n" +
      "• Release small updates with rollback available.\n\n" +
      "• Stability always beats premature scaling.",
    date: "Nov 10, 2025",
    readTime: "2 min read",
    tag: "Scaling",
  },
  {
    id: 4,
    slug: "remote-teams-that-actually-ship",
    title: "Working with Remote Teams That Actually Ship",
    description: "Simple rules we follow for smooth remote collaboration.",
    content:
      "• Clear responsibilities — one owner per task.\n\n" +
      "• Daily async updates instead of long calls.\n\n" +
      "• One project board for all tasks.\n\n" +
      "• Communicate early when blocked.\n\n" +
      "• Ship weekly, evaluate monthly.",
    date: "Oct 30, 2025",
    readTime: "2 min read",
    tag: "Culture",
  },
  {
    id: 5,
    slug: "picking-right-tech-stack-for-mvp",
    title: "Picking the Right Tech Stack for Your MVP",
    description: "How we choose easy, fast, reliable technologies.",
    content:
      "• Use tech the team already knows well.\n\n" +
      "• Prefer stacks with large communities.\n\n" +
      "• Avoid complex tools early on.\n\n" +
      "• Optimize for development speed.\n\n" +
      "• Scale later when the product grows.",
    date: "Oct 18, 2025",
    readTime: "2 min read",
    tag: "Tech",
  },
  {
    id: 6,
    slug: "why-code-quality-matters-from-day-one",
    title: "Why Code Quality Matters from Day One",
    description: "Small habits that make products stable and flexible.",
    content:
      "• Write readable, simple code.\n\n" +
      "• Use small pull requests for easy review.\n\n" +
      "• Add tests only for critical flows.\n\n" +
      "• Keep folder structure clean.\n\n" +
      "• Fix bugs before adding new features.",
    date: "Oct 01, 2025",
    readTime: "2 min read",
    tag: "Best Practices",
  },
];
