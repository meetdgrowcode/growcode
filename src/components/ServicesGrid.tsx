import React from "react";
import { Code2, Smartphone, Cloud, Cpu } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Cloud: <Cloud className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
};

export function ServicesGrid() {
  // const dispatch = useDispatch();

  const services = [
    {
      id: 1,
      slug: "web-development",
      title: "Web Development",
      description: "Custom web applications built with modern technologies.",
      icon: "Code2",
      label: "Web",
    },
    {
      id: 2,
      slug: "mobile-development",
      title: "Mobile Development",
      description: "Native and cross-platform mobile solutions.",
      icon: "Smartphone",
      label: "Mobile",
    },
    {
      id: 3,
      slug: "cloud-solutions",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment.",
      icon: "Cloud",
      label: "Cloud",
    },
    {
      id: 4,
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by cutting-edge AI.",
      icon: "Cpu",
      label: "AI",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <div key={service.id} className="group">
          <Card
            className="
              services-grid-card
              relative flex h-full flex-col overflow-hidden rounded-2xl
              border border-gray-100 bg-gradient-to-b from-white to-slate-50/80
              shadow-sm transition-all duration-300
              group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-blue-500/60
            "
          >
            {/* top accent gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardHeader className="pb-0">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    {iconMap[service.icon]}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700">
                    {service.label}
                  </span>
                </div>
              </div>

              <CardTitle className="text-lg md:text-xl text-slate-900">
                {service.title}
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600">
                {service.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4 flex flex-1 flex-col justify-end space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Strategy · Design · Build</span>
                <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Learn more
                  <span aria-hidden="true">↗</span>
                </span>
              </div>

              <Link to={`/services/${service.slug}`}>
                <Button
                  variant="outline"
                  className="
                    w-full border-blue-100 text-blue-700
                    hover:bg-blue-600 hover:text-white hover:border-blue-600
                    transition-colors duration-200
                  "
                >
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ))} 
    </div>
  );
}
