import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type StackGroup = {
  title: string;
  items: string[];
};

type StackCategory = {
  id: string;
  label: string;
  groups: StackGroup[];
};

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: "backend",
    label: "Backend",
    groups: [
      {
        title: "Frameworks",
        items: [
          "NestJS",
          "Django",
          "Spring Boot",
          "Express",
          "FastAPI",
          "Laravel",
          "Flask",
          "Node.js",
        ],
      },
      {
        title: "Libraries",
        items: ["JWT", "GraphQL", "Socket.IO", "Prisma", "Apollo"],
      },
      {
        title: "Tools",
        items: ["Postman", "OpenAPI", "Redis", "Kafka"],
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    groups: [
      {
        title: "Frameworks",
        items: ["React", "Next.js", "Vue", "Nuxt", "Angular"],
      },
      {
        title: "Libraries",
        items: ["Redux", "Zustand", "React Query", "Framer Motion"],
      },
      {
        title: "Tools",
        items: ["Vite", "Webpack", "Storybook", "Figma"],
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    groups: [
      {
        title: "Platforms",
        items: ["Docker", "Kubernetes", "AWS", "Azure", "GCP"],
      },
      {
        title: "CI/CD",
        items: ["GitHub Actions", "GitLab CI", "CircleCI"],
      },
      {
        title: "Monitoring",
        items: ["Grafana", "Prometheus", "Sentry"],
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    groups: [
      {
        title: "Relational",
        items: ["PostgreSQL", "MySQL", "SQL Server","MicroSoft SQL Server"],
      },
      {
        title: "NoSQL",
        items: ["MongoDB", "Redis", "DynamoDB"],
      },
      {
        title: "ORMs",
        items: ["Prisma", "TypeORM", "Sequelize"],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    groups: [
      {
        title: "Frameworks",
        items: ["React Native", "Expo", "Flutter"],
      },
      {
        title: "Services",
        items: ["Firebase", "OneSignal", "AppCenter"],
      },
      {
        title: "Tools",
        items: ["Xcode", "Android Studio", "Fastlane"],
      },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    groups: [
      {
        title: "Testing",
        items: ["Jest", "React Testing Library", "Cypress", "Playwright"],
      },
      {
        title: "Quality",
        items: ["ESLint", "Prettier", "SonarQube"],
      },
      {
        title: "Automation",
        items: ["Postman Collections", "k6", "Locust"],
      },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    groups: [
      {
        title: "Frameworks",
        items: ["PyTorch", "TensorFlow", "scikit-learn"],
      },
      {
        title: "Services",
        items: ["OpenAI APIs", "Vertex AI", "SageMaker"],
      },
      {
        title: "Tools",
        items: ["Jupyter", "Weights & Biases", "MLflow"],
      },
    ],
  },
];

export function TechnologyStackSection() {
  const [activeId, setActiveId] = useState<string>("backend");
  const tabListRef = useRef<HTMLDivElement | null>(null);

  const activeCategory =
    STACK_CATEGORIES.find((c) => c.id === activeId) ?? STACK_CATEGORIES[0];

  const scrollTabs = (direction: "left" | "right") => {
    if (!tabListRef.current) return;
    const amount = 160;
    tabListRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex justify-center py-12 md:py-16 bg-white">
      <div className="w-full max-w-6xl px-4 space-y-8">
        {/* Heading */}
        <div className="space-y-3 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            Technology Stack That Powers Exceptional Development
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Explore the frameworks, tools and platforms we use to build secure,
            scalable and high-performance solutions tailored to every project.
          </p>
        </div>

        {/* Tabs with arrows on mobile/tablet */}
        <div className="relative">
          <div className="rounded-full border border-gray-200 bg-slate-50/60 shadow-sm px-3 py-2">
            <div className="flex items-center gap-2">
              {/* Left arrow */}
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 bg-white text-slate-700 text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition"
                aria-label="Scroll tabs left"
              >
                ‹
              </button>

              {/* Tabs */}
              <div
                ref={tabListRef}
                className="flex-1 min-w-0 flex items-center justify-evenly gap-2 md:gap-3 overflow-x-auto scroll-smooth"
              >
                {STACK_CATEGORIES.map((cat) => {
                  const isActive = cat.id === activeId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveId(cat.id)}
                      className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all text-xs sm:text-sm ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-transparent text-slate-700 hover:bg-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Right arrow */}
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 bg-white text-slate-700 text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition"
                aria-label="Scroll tabs right"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Content cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {activeCategory.groups.map((group) => (
            <Card
              key={group.title}
              className="border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg text-slate-900">
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-3 py-1 text-xs md:text-sm text-slate-800 shadow-sm hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
