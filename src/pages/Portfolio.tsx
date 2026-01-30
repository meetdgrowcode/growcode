import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioProjects } from "@/data/portfolioProjects";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  TrendingUp,
  Globe2,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

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

const stats = [
  { label: "Projects Delivered", value: "100+", icon: Award },
  { label: "Client Retention", value: "95%", icon: Users },
  { label: "Global Reach", value: "10+ Countries", icon: Globe2 },
  { label: "Revenue Impact", value: "$50M+", icon: TrendingUp },
];

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
      {/* Hero */}
      <section className="relative flex justify-center py-20 md:py-32 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-sky-100/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-8"> 
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-950 leading-tight">
            Our Work <span className="text-blue-600">is Our Proof</span>
          </h1>

          <p className="max-w-2xl text-xl text-gray-600 mx-auto leading-relaxed">
            Selected projects showcasing product design, web & mobile engineering excellence. 
            We build digital products that drive real business results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-950">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-4 bg-gray-50/50">
        <Reveal>
          <div className="container mx-auto max-w-5xl mb-12 text-center">
             <h2 className="text-3xl font-bold text-blue-950 mb-6">Explore by Category</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(["All", "Web", "Mobile", "UI/UX"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      filter === c
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Projects grid */}
        <Reveal>
          <div className="container mx-auto max-w-7xl pb-16">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p, index) => (
                <article
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  style={{
                    animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* media */}
                  <div className="relative h-60 bg-gray-100 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-blue-950 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      {p.category}
                    </span>
                  </div>

                  {/* content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-600 transition-colors">
                        {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {p.short}
                        </p>
                    </div>

                    <div className="mt-auto space-y-6">
                        <div className="flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                            <span
                            key={t}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100"
                            >
                            {t}
                            </span>
                        ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                to={`/portfolio/${p.slug}`}
                                className="text-sm font-semibold text-blue-600 flex items-center gap-1 group/link"
                            >
                                View Case Study <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Client reviews */}
       <section className="py-20 bg-blue-950 text-white relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-50" />
           <div className="absolute -right-20 bottom-20 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl rounded-r-none" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Trusted by Industry Leaders</h2>
                  <p className="text-blue-200 max-w-2xl mx-auto text-lg">Don't just take our word for it.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {reviews.slice(0, 3).map((r, i) => (
                      <Card key={i} className="bg-blue-900/50 border-blue-800 text-blue-50 hover:bg-blue-900/70 transition-colors">
                          <CardContent className="p-8 space-y-6">
                              <div className="flex gap-1 text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                  ))}
                              </div>
                              <blockquote className="text-lg italic leading-relaxed">"{r.quote}"</blockquote>
                              <div className="flex items-center gap-4">
                                   <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-blue-200 shrink-0">
                                      {r.name[0]}
                                  </div>
                                  <div>
                                      <div className="font-semibold text-white">{r.name}</div>
                                      <div className="text-sm text-blue-300">{r.role}</div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                 <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Have a project in mind?</h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Let's collaborate to build something extraordinary. Our team is ready to bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact">
                            <Button size="lg" className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-full shadow-lg hover:translate-y-[-2px] transition-all">
                                Get in Touch
                            </Button>
                        </Link>
                         <Link to="/services">
                           <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-blue-200 text-blue-50 hover:bg-white/10 hover:text-white rounded-full transition-all">
                                View Services
                            </Button>
                        </Link>
                    </div>
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
