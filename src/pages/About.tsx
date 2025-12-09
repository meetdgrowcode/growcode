import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Target,
  Zap,
  HeartHandshake,
  Rocket,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from "lucide-react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ---- Scroll reveal hook (no framer-motion) ----
function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Simple avatar fallback
const Avatar = ({ name }: { name: string }) => (
  <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg overflow-hidden">
    <span className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
    <span className="relative z-10">
      {name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </span>
  </div>
);

const teams = [
  { name: "Milan Marakna", role: "CEO & Founder" },
  { name: "Raj Kanani", role: "CEO & Co-Founder" },
  { name: "Hasti Kanani", role: "UI/UX Designer" },
  { name: "Krupal Kotadiya", role: "Sr Developer" },
  { name: "Akshay Vaghasiya", role: "Sr Developer" },
  { name: "Manshi Kukadiya", role: "Sr Developer" },
  { name: "Bansi Rangpariya", role: "Sr Developer" },
  { name: "Khushi Savaliya", role: "Jr Developer" },
  { name: "Meet Dhaduk", role: "Jr Developer" },
];

export function About() {
  useRevealOnScroll();
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings: Settings = {
    infinite: true,
    speed: 450,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-16 md:py-20 lg:py-24 reveal">
        {/* animated gradient background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            About Growcode Solution
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            We don&apos;t just build{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              products
            </span>
            , we craft{" "}
            <span className="underline decoration-indigo-300 decoration-4 underline-offset-4">
              experiences.
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
            A tight-knit team of developers, designers, and problem-solvers
            helping global businesses turn ambitious ideas into digital
            realities that actually ship.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition"
              asChild
            >
              <Link to="/contact">
                <Rocket className="h-4 w-4" />
                Start a project
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full flex items-center gap-2 border-gray-300 bg-white/80 hover:border-blue-300 hover:bg-blue-50/60 shadow-sm hover:shadow-md active:scale-95 transition"
              asChild
            >
              <Link to="/portfolio">
                <Globe2 className="h-4 w-4" />
                Explore our work
              </Link>
            </Button>
          </div>

          {/* BIGGER CENTERED STATS */}
          <div className="mt-10 flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full text-center">
              <div className="rounded-3xl bg-white/95 p-6 shadow-md border border-blue-100/70">
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
                  50+
                </p>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Products shipped
                </p>
              </div>

              <div className="rounded-3xl bg-white/95 p-6 shadow-md border border-blue-100/70">
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
                  100+
                </p>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Happy clients
                </p>
              </div>

              <div className="rounded-3xl bg-white/95 p-6 shadow-md border border-blue-100/70">
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600">
                  9
                </p>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Core team members
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE + PROCESS */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 reveal">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Who we are
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              Growcode Solution is a digital product studio where engineering
              and design work hand-in-hand. We’re small by choice, fast by
              culture, and quality-obsessed by default.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.15fr,1fr] items-start">
            <div className="space-y-5">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                From early-stage startups to established enterprises, we bring
                structure, clarity, and velocity—turning messy ideas into
                delightful apps that people actually love using.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Core strengths</p>
                  <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                    <li>• Modern React / Next.js</li>
                    <li>• Clean, scalable UI systems</li>
                    <li>• Pixel-perfect frontends</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">How we work</p>
                  <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                    <li>• Small, dedicated teams</li>
                    <li>• Weekly demos & feedback</li>
                    <li>• Transparent communication</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
                <HeartHandshake className="h-5 w-5 text-blue-600" />
                Our process
              </h3>
              <div className="space-y-3">
                {[
                  {
                    step: "01",
                    title: "Discover",
                    desc: "We understand your users, goals, and constraints in detail.",
                  },
                  {
                    step: "02",
                    title: "Design",
                    desc: "We prototype flows, interfaces, and interactions that feel natural.",
                  },
                  {
                    step: "03",
                    title: "Build & Launch",
                    desc: "We ship production-ready, well-tested code and stay for the launch.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="mt-0.5">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-14 md:py-18 reveal">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              The values that drive us
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              We keep our culture simple: build excellent products, be kind, and
              stay curious.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl w-full">
              {[
                {
                  icon: Users,
                  title: "Collaboration",
                  desc: "We work as one team with you, not as a separate vendor.",
                },
                {
                  icon: Target,
                  title: "Excellence",
                  desc: "We care about details—performance, accessibility, and polish.",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  desc: "We love experimenting with new tools and ideas to move faster.",
                },
              ].map((value, i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition" />
                  <CardContent className="relative px-8 py-9 text-left">
                    <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 p-4 mb-5">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION WITH SLIDER */}
      <section className="py-16 md:py-20 bg-gray-50 reveal">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Meet the people behind the pixels
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md mx-auto md:mx-0">
                A diverse mix of engineers and designers who share one thing in
                common: shipping work we’re proud of.
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-3">
              <button
                onClick={handlePrev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-95 transition"
                aria-label="Previous team member slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-95 transition"
                aria-label="Next team member slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="-mx-3">
              <Slider ref={sliderRef} {...sliderSettings}>
                {teams.map((member, index) => (
                  <div key={index} className="px-3">
                    <Card className="mx-auto max-w-xs bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 rounded-2xl">
                      <CardContent className="p-8 text-center">
                        <Avatar name={member.name} />
                        <h3 className="mt-6 text-lg font-semibold text-gray-900">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-blue-600 uppercase tracking-wide">
                          {member.role}
                        </p>
                        <p className="mt-3 text-xs text-gray-500">
                          Building reliable, maintainable and beautiful
                          experiences for our clients.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE / LIFE AT GROWCODE */}
      <section className="py-14 md:py-18 reveal">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Life at Growcode
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              We keep things ambitious but human—your work matters, and so do
              you.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Flexible & Focused
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                5-day work week, realistic deadlines, and async-friendly
                collaboration so we can do our best work without burning out.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Learning culture
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Internal sessions, code reviews, and constant experimentation
                keep everyone sharp and up to date with new tools.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                People-first
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Open communication, low ego, and a genuine focus on helping each
                other grow as professionals and humans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 reveal">
        <div className="container mx-auto px-4 max-w-5xl text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Have an idea in mind?
          </h2>
          <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto mb-6">
            Tell us about your product, and we&apos;ll help you shape the
            roadmap, UX, and tech stack from day zero.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-blue-700 hover:bg-blue-50 shadow-md hover:shadow-lg active:scale-95 transition flex items-center gap-2"
              asChild
            >
              <Link to="/contact">Let&apos;s talk</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/60 text-blue-700  active:scale-95 transition flex items-center gap-2"
              asChild
            >
              <Link to="/portfolio">View portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
