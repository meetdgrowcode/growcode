import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { ServicesGrid } from "@/components/ServicesGrid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { clearSelectedService } from "@/store/slices/servicesSlice";
import { TechnologyStackSection } from "@/components/TechnologyStackSection";

export function Services() {
  const selectedService = useSelector(
    (state: RootState) => state.services.selectedService
  );
  const dispatch = useDispatch();

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Hero */}
      <section className="relative flex justify-center py-10 md:py-16 bg-gradient-to-b from-gray-50 via-white to-white overflow-hidden">
        {/* soft background glow */}
        <div className="pointer-events-none absolute inset-0 flex justify-center -z-10">
          <div className="h-64 w-[80%] max-w-3xl bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 blur-3xl opacity-70" />
        </div>

        <div className="max-w-4xl space-y-4 text-center px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Comprehensive solutions for your digital products
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 mx-auto">
            From web and mobile apps to cloud & AI, we design and build products
            that ship fast and scale with your business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="flex justify-center">
        <div className="max-w-7xl w-full px-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              What we can help you with
            </h2>
            <p className="text-sm text-gray-500">
              Click on any service to see more details.
            </p>
          </div>

          <ServicesGrid />
        </div>
      </section>

      {/* Selected Service Details */}
      {selectedService && (
        <section className="flex justify-center py-8 md:py-12 bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="max-w-3xl w-full px-4">
            <Card className="border border-blue-100/70 bg-white/80 backdrop-blur shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-slate-900">
                    {selectedService.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-700 text-sm md:text-base">
                    {selectedService.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(clearSelectedService())}
                  className="self-start"
                >
                  Close
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-slate-900">
                    Key Features
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {selectedService.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="flex justify-center py-10 md:py-14 bg-gray-50">
        <div className="max-w-5xl w-full space-y-8 px-4">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              A clear, transparent workflow that keeps you involved at every
              step—from first conversation to launch.
            </p>
          </div>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            <div className="grid gap-6 md:grid-cols-4">
              {[
                {
                  step: 1,
                  title: "Discovery",
                  description: "Understand your needs and goals.",
                },
                {
                  step: 2,
                  title: "Planning",
                  description: "Create a detailed project roadmap.",
                },
                {
                  step: 3,
                  title: "Development",
                  description: "Build with modern, scalable tech.",
                },
                {
                  step: 4,
                  title: "Launch",
                  description: "Deploy and support your product.",
                },
              ].map((item) => (
                <Card
                  key={item.step}
                  className="process-card bg-white border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="pt-6 space-y-3">
                    <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TechnologyStackSection />
    </div>
  );
}
