// src/data/portfolioProjects.ts

export type ProjectCategory = "Web" | "Mobile" | "UI/UX";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  short: string;
  img: string;
  tags: string[];
  problem: string;
  solution: string;
  impact: string;
};

export const portfolioProjects: Project[] = [
  {
    id: "p1",
    slug: "saas-dashboard-analytics",
    title: "SaaS Dashboard",
    category: "Web",
    short:
      "A fast analytics dashboard with custom charts, roles and permissions.",
    img: "/SaasDashboard.png",
    tags: ["React", "Tailwind", "D3"],
    problem:
      "The team needed a single place to see product metrics without waiting for exports or manual reports.",
    solution:
      "We designed and built a responsive dashboard with custom charts, filters and role-based access using a clean component system.",
    impact:
      "Stakeholders now get a clear view of KPIs in seconds instead of hours, and the dashboard became the daily starting point for the product team.",
  },
  {
    id: "p2",
    slug: "ecommerce-mobile-app",
    title: "E-commerce App",
    category: "Mobile",
    short: "Cross-platform shopping app with offline carts and payments.",
    img: "/e-commerce app.png",
    tags: ["React Native", "Stripe", "Redux"],
    problem:
      "Customers were dropping off on mobile web checkout, and the brand wanted a smoother app experience.",
    solution:
      "We built a cross-platform app with persistent carts, simple checkout and integrated payments using Stripe.",
    impact:
      "Checkout conversion improved, and repeat customers now prefer the app over the website for faster orders.",
  },
  {
    id: "p3",
    slug: "design-system-components",
    title: "Design System",
    category: "UI/UX",
    short: "Scalable component library and design tokens for product teams.",
    img: "/Designsystem.png",
    tags: ["Figma", "Tokens", "Accessibility"],
    problem:
      "Multiple teams were designing screens differently, creating inconsistency and extra dev work.",
    solution:
      "We created a shared design system with reusable components, tokens and usage guidelines inside Figma.",
    impact:
      "New screens started matching in style automatically, and dev handoff became much faster and clearer.",
  },
  {
    id: "p4",
    slug: "marketing-site-conversion",
    title: "Marketing Site",
    category: "Web",
    short: "High-performance marketing site with A/B testing and SEO.",
    img: "/Marketing-Site.png",
    tags: ["Next.js", "SEO", "Vercel"],
    problem:
      "The existing marketing site was slow, hard to change and not tuned for search or experiments.",
    solution:
      "We rebuilt the site using Next.js with clean content structure, SEO basics and simple A/B test hooks.",
    impact:
      "Pages started loading much faster, organic traffic grew and the team could test new pages without heavy dev work.",
  },
  {
    id: "p5",
    slug: "realtime-chat-app",
    title: "Chat App",
    category: "Mobile",
    short: "Realtime chat with typing indicators and message reactions.",
    img: "/ChatApp.png",
    tags: ["Socket.IO", "Expo"],
    problem:
      "The product needed realtime communication so users could coordinate in small groups without leaving the app.",
    solution:
      "We shipped a chat module with rooms, typing indicators, read states and emoji reactions on top of an existing product.",
    impact:
      "Teams started using in-app chat instead of external tools, increasing engagement and time spent in the product.",
  },
  {
    id: "p6",
    slug: "admin-ui-kit",
    title: "Admin UI Kit",
    category: "UI/UX",
    short: "Admin UI kit with dark mode, customizable tokens and docs.",
    img: "/adminuikit.png",
    tags: ["Tailwind", "Storybook"],
    problem:
      "Engineering maintained multiple admin panels with different looks and duplicated components.",
    solution:
      "We created a reusable admin UI kit with Tailwind, documented in Storybook and ready to plug into new panels.",
    impact:
      "Future admin tools now ship faster with consistent UI, and changes to the design system update all panels together.",
  },
];
