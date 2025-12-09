import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioProjects } from "@/data/portfolioProjects";

type Filter = "All" | "Web" | "Mobile" | "UI/UX";

type Review = {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  quote: string;
  company?: string;
};

const reviews: Review[] = [
  {
    id: "r1",
    name: "Gagandeep Singh",
    role: "Head of Product, Acme",
    avatar: "/Gago.jpg",
    rating: 5,
    quote:
      "Growcode transformed our analytics UX — delivery was fast, communication perfect, and the end product exceeded expectations.",
    company: "Acme Inc.",
  },
  {
    id: "r2",
    name: "Ravi Shah",
    role: "CTO, Mountain Labs",
    avatar: "/testimonials/ravi.png",
    rating: 5,
    quote:
      "Highly professional team. They implemented critical features and helped optimize our stack for performance.",
    company: "Mountain Labs",
  },
  {
    id: "r3",
    name: "Nisha Rao",
    role: "Product Designer, Global",
    rating: 4,
    quote:
      "Outstanding design handoff and attention to detail. Our new design system is user-friendly and consistent.",
    company: "Global Co.",
  },
  {
    id: "r4",
    name: "Karan Mehta",
    role: "Founder, Hexagon",
    avatar: "/testimonials/karan.png",
    rating: 5,
    quote:
      "Great collaboration and proactive suggestions. Project completed ahead of schedule with great quality.",
    company: "Hexagon",
  },
  {
    id: "r5",
    name: "Asha Patel",
    role: "Head of Product, Acme",
    avatar: "/testimonials/asha.png",
    rating: 5,
    quote:
      "Growcode transformed our analytics UX — delivery was fast, communication perfect, and the end product exceeded expectations.",
    company: "Acme Inc.",
  },
  {
    id: "r6",
    name: "Samir Joshi",
    role: "Lead Engineer, Nova",
    rating: 5,
    quote:
      "Very reliable team — timely updates, clean code and quick iterations.",
    company: "Nova",
  },
];

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-4 w-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118L10 15.347l-3.391 2.577c-.784.57-1.838-.196-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.622 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? portfolioProjects
        : portfolioProjects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero (same light background as before) */}
      <header className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-100">
            Selected Work
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Our Portfolio
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Selected projects showcasing product design, web &amp; mobile
            engineering. Click any project to view full details.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-blue-600 text-white px-5 py-2.5 text-sm font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition"
            >
              Work with us
            </Link>
            <span className="text-xs text-gray-500">
              Available for product, web &amp; mobile builds
            </span>
          </div>
        </div>
      </header>

      {/* Filters (unchanged look, light BG) */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(["All", "Web", "Mobile", "UI/UX"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    filter === c
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                aria-pressed={filter === c}
              >
                {filter === c && (
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-blue-300/70" />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-4 pb-16 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, index) => (
              <article
                key={p.id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition"
                style={{ animation: `fadeUp 0.4s ease-out ${index * 0.04}s both` }}
              >
                {/* media */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-medium text-gray-900 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {p.category}
                  </span>
                </div>

                {/* content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {p.short}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      to={`/portfolio/${p.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 text-xs font-medium shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition"
                      aria-label={`View details for ${p.title}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      <span>View details</span>
                    </Link>
                    <span className="text-[11px] text-gray-400">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client reviews (same light BG style) */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What our clients say
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Real feedback from teams we&apos;ve worked with — quality,
              delivery &amp; collaboration.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, index) => (
              <figure
                key={r.id}
                className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-100 transition"
                style={{
                  animation: `fadeUp 0.4s ease-out ${0.1 + index * 0.03}s both`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <figcaption className="text-sm font-semibold text-gray-900">
                          {r.name}
                        </figcaption>
                        {r.role && (
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            {r.role}
                            {r.company ? ` • ${r.company}` : ""}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < r.rating} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-700 sm:text-sm">
                      “{r.quote}”
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-blue-400 transition"
            >
              Let&apos;s talk about your product
            </Link>
          </div>
        </div>
      </section>

      {/* CSS keyframes for subtle fade-up animation */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </main>
  );
};

export default Portfolio;
