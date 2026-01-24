import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero / Header */}
      <section className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-12 md:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-sky-50/50 blur-3xl" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Company Blog
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
              Insights from the team that builds your product.
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg max-w-xl">
              Short, practical posts about how we design, build, and grow
              digital products. No fluff, just what actually works for us and
              our clients.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:mt-2">
            <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              What you&apos;ll find here
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500" />
                How we work with startups and growing teams
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500" />
                Tech decisions and stack breakdowns in simple words
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500" />
                Culture, communication, and behind-the-scenes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Latest posts
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Product", "Culture", "Engineering"].map((filter) => (
              <button 
                key={filter}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 font-medium text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  <Tag className="h-3 w-3" />
                  {post.tag}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-bold text-blue-600 transition-all duration-200 group-hover:translate-x-1"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
