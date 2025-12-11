import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

const openings = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Surat, Gujarat (On-site)",
    experience: "1–3 years",
    description:
      "Build responsive web applications using React, TypeScript & Tailwind.",
    image: "public/frontend-development.png",
    alt: "Frontend developer working on UI and code",
  },
  {
    title: "Backend Developer (Node.js)",
    type: "Full-time",
    location: "Hybrid - Surat",
    experience: "2–4 years",
    description:
      "Develop scalable APIs, manage databases & improve server performance.",
    image: "public/backend-development.png",
    alt: "Backend developer with servers and API diagrams",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Remote / Hybrid",
    experience: "1–3 years",
    description:
      "Design modern, intuitive UI/UX for SaaS & enterprise projects.",
    image: "public/UIUX.png",
    alt: "UI/UX designer working with wireframes and color palettes",
  },
  {
    title: "QA Engineer",
    type: "Full-time",
    location: "On-site",
    experience: "0–2 years",
    description:
      "Test applications, write test cases, and ensure product quality.",
    image: "public/QA-engineer.png",
    alt: "QA engineer testing software with checklists and screens",
  },
];

export default function Careers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 select-none">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-xs font-medium text-indigo-700 opacity-0 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          Join our growing team
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl opacity-0 animate-slide-up">
          Careers at{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Growcode Solution
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600 opacity-0 animate-slide-up delay-150">
          Build real products, solve meaningful problems, and work with a
          passionate technical team.
        </p>

        <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-4 text-sm text-gray-500 opacity-0 animate-slide-up delay-300">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            Friendly team
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-600" />
            Flexible timings
          </span>
        </div>
      </section>

      {/* Job Cards with Images */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900 sm:text-3xl">
          Open Positions
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {openings.map((job, index) => (
            <Card
              key={job.title}
              className="group cursor-pointer border-gray-200 bg-white p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="mb-4 h-40 overflow-hidden rounded-lg sm:h-48">
                <img
                  src={job.image}
                  alt={job.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                    {job.title}
                  </CardTitle>

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {job.type}
                  </span>
                </div>

                <CardDescription className="mt-2 text-sm text-gray-600">
                  {job.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="border-t border-gray-100 pt-4">
                <div className="mb-3 flex flex-col gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {job.experience} experience
                  </span>
                </div>

                <Button
                  size="sm"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700"
                  onClick={() =>
                    navigate(`/apply/${encodeURIComponent(job.title)}`)
                  }
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.7s ease forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}
