import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Tag, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow">
          <h1 className="text-xl font-semibold text-gray-900">
            Post not found
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            The blog post you&apos;re looking for doesn&apos;t exist or the
            link is broken.
          </p>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  // Split content into blocks (already bullet-style and brief)
  const blocks = post.content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  // Extract key points (lines starting with •) for sidebar
  const keyPoints = post.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .slice(0, 4);

  const otherPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Hero / Breadcrumb */}
      <section className="border-b bg-gradient-to-r from-indigo-50 via-white to-purple-50">
        <div className="mx-auto w-full max-w-5xl px-4 pt-16 pb-8 md:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-xs font-medium text-indigo-600"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            Back to blog
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.date}</span>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              <Tag className="h-3.5 w-3.5" />
              <span>{post.tag}</span>
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            {post.description}
          </p>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Main article */}
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Overview
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
              {blocks.map((block, index) => (
                <p key={index}>{block}</p>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Why this matters
              </h3>
              <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                Each post on our blog comes directly from how we actually work
                with clients. These are the same principles we apply in real
                projects to keep products simple, stable and easy to grow.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">
                Quick summary
              </h3>
              <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                {post.description}
              </p>

              {keyPoints.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Key points
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-700 sm:text-sm">
                    {keyPoints.map((line, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                        <span>{line.replace(/^•\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Need this applied to your product?
              </h3>
              <p className="mt-2 text-xs text-gray-700 sm:text-sm">
                We use these exact ideas in real projects — from MVP builds to
                scaling production apps.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-700 sm:text-sm"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* More posts section */}
      {otherPosts.length > 0 && (
        <section className="border-t bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 lg:py-12">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                More from the blog
              </h2>
              <Link
                to="/blog"
                className="text-xs font-medium text-indigo-600"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-indigo-200 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-xs text-gray-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
