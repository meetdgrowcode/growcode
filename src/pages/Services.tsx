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
import { Reveal } from "@/components/Reveal";

export function Services() {
  const selectedService = useSelector(
    (state: RootState) => state.services.selectedService
  );
  const dispatch = useDispatch();

  return (
    <div className="space-y-10 md:space-y-14 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative flex justify-center py-10 md:py-16 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
        {/* soft background glow */}
        <div className="pointer-events-none absolute inset-0 flex justify-center -z-10">
          <div className="h-64 w-[80%] max-w-3xl bg-gradient-to-r from-blue-100 via-sky-100 to-blue-50 blur-3xl opacity-60" />
        </div>

        <div className="max-w-4xl space-y-4 text-center px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-950">
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
        <div className="max-w-7xl w-full px-4 space-y-6">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-950">
                What we can help you with
              </h2>
              <p className="text-sm text-gray-500">
                Click on any service to see more details.
              </p>
            </div>

            <ServicesGrid />
          </Reveal>
        </div>
      </section>

      {/* Selected Service Details */}
      {selectedService && (
        <section className="flex justify-center py-8 md:py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
          <div className="max-w-3xl w-full px-4">
            <Card className="border border-blue-100 bg-white shadow-lg transition-transform duration-300">
              <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-blue-950">
                    {selectedService.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-600 text-sm md:text-base">
                    {selectedService.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(clearSelectedService())}
                  className="self-start text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Close
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-900">
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
      <section className="flex justify-center py-10 md:py-20 bg-gray-50">
        <div className="max-w-5xl w-full space-y-12 px-4">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-blue-950">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              A clear, transparent workflow that keeps you involved at every
              step—from first conversation to launch.
            </p>
          </div>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-[2.25rem] left-0 right-0 mx-auto h-0.5 max-w-4xl bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            <div className="grid gap-8 md:grid-cols-4 relative z-10">
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
                  className="process-card bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center group"
                >
                  <CardContent className="pt-8 pb-8 space-y-4 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 md:text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
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
