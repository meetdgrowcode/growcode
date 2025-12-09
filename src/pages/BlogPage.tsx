import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Company Blog
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Insights from the team that builds your product.
            </h1>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              Short, practical posts about how we design, build, and grow
              digital products. No fluff, just what actually works for us and
              our clients.
            </p>
          </div>

          <div className="mt-4 w-full max-w-sm rounded-2xl border bg-white p-4 shadow-sm md:mt-0">
            <h2 className="text-sm font-semibold text-gray-900">
              What you&apos;ll find here
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• How we work with startups and growing teams</li>
              <li>• Tech decisions and stack breakdowns in simple words</li>
              <li>• Culture, communication, and behind-the-scenes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Latest posts
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
              Product
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
              Culture
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
              Engineering
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mt-3 text-base font-semibold text-gray-900 group-hover:underline">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {post.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                  <Tag className="h-3 w-3" />
                  {post.tag}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-medium text-indigo-600 transition-transform duration-200 group-hover:translate-x-0.5"
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
