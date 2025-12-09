import { Link, useParams } from "react-router-dom";
import { portfolioProjects } from "@/data/portfolioProjects";
import { ArrowLeft, Tag, Layers, Sparkles, BarChart3 } from "lucide-react";

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = portfolioProjects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-900">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow">
          <h1 className="text-xl font-semibold">Project not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            The project you&apos;re looking for doesn&apos;t exist or the link
            is incorrect.
          </p>
          <Link
            to="/portfolio"
            className="mt-4 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  const project = portfolioProjects[currentIndex];
  const total = portfolioProjects.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prevProject = portfolioProjects[prevIndex];
  const nextProject = portfolioProjects[nextIndex];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO (same white background as before) */}
      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 md:px-6 lg:px-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            Back to portfolio
          </Link>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition"
              >
                ◀ Previous
              </Link>
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition"
              >
                Next ▶
              </Link>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
              <Tag className="h-3 w-3" />
              Case study
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              {project.category}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            {project.short}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* IMAGE + STORY */}
          <article
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
            style={{ animation: "fadeUp 0.4s ease-out 0.02s both" }}
          >
            <div className="mb-6 flex items-center justify-center rounded-xl bg-gray-50 p-4 border border-gray-100">
              <img
                src={project.img}
                alt={project.title}
                className="max-h-[60vh] w-full object-contain rounded-lg"
                draggable={false}
              />
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-gray-800">
              <section>
                <h2 className="flex items-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <Layers className="mr-2 h-4 w-4 text-blue-500" />
                  Problem
                </h2>
                <p className="mt-2">{project.problem}</p>
              </section>

              <section>
                <h2 className="flex items-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                  Solution
                </h2>
                <p className="mt-2">{project.solution}</p>
              </section>

              <section>
                <h2 className="flex items-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <BarChart3 className="mr-2 h-4 w-4 text-blue-500" />
                  Impact
                </h2>
                <p className="mt-2">{project.impact}</p>
              </section>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside
            className="space-y-4"
            style={{ animation: "fadeUp 0.4s ease-out 0.08s both" }}
          >
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                Project summary
              </h3>
              <div className="mt-3 space-y-2 text-xs md:text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  {project.category}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Focus:</span>{" "}
                  {project.tags.join(", ")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                Where this fits
              </h3>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs md:text-sm text-gray-600">
                <li>Startups needing a similar solution</li>
                <li>Existing products upgrading UX or tech</li>
                <li>Teams wanting a clear, practical implementation</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-blue-600 p-5 text-xs md:text-sm text-blue-50 shadow-sm">
              <h3 className="text-sm font-semibold">
                Want something like this?
              </h3>
              <p className="mt-2">
                We can design and build a similar project for your product —
                from idea to launch, with clear communication and predictable
                delivery.
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div
              style={{ animation: "fadeUp 0.4s ease-out 0.12s both" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                How this connects to our work
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Projects like{" "}
                <span className="font-medium text-gray-900">
                  {project.title}
                </span>{" "}
                reflect how we approach real client problems — simple
                architecture, clear UX and measurable outcomes.
              </p>
            </div>

            <div
              style={{ animation: "fadeUp 0.4s ease-out 0.16s both" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Next step
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                If this case study matches your situation, share a short note
                about your product and we&apos;ll outline how we would approach
                it — in clear, simple steps.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Contact us about this
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CSS keyframes (same as list page) */}
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
}
