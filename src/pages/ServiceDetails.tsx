import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type ServiceInfo = {
  title: string;
  overview: string;
  description: string;
  deliverables: string[];
  timeline: string;
  techStack: string[];
  idealFor: string;
  caseStudy?: { title: string; blurb: string; url?: string } | null;
};

const serviceData: Record<string, ServiceInfo> = {
  "web-development": {
    title: "Web Development",
    overview:
      "Design and build fast, accessible, and maintainable web applications tailored to your business goals — from marketing sites to large-scale SaaS platforms.",
    description:
      "We combine product thinking with engineering excellence: clean architecture, responsive UIs, robust APIs, and automated testing. We focus on performance, accessibility, SEO fundamentals, and long-term maintainability.",
    deliverables: [
      "UI/UX implementation (responsive)",
      "Frontend (React / Next.js / Remix) with state management",
      "Backend APIs (Node.js / Express / Nest / Fastify)",
      "Database design & migrations (Postgres / MongoDB)",
      "Automated tests (unit + integration)",
      "CI/CD pipeline and deployment docs",
      "Basic SEO and performance optimizations",
    ],
    timeline: "4–12 weeks depending on scope (MVP → Production-ready).",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Postgres",
      "Vercel",
    ],
    idealFor:
      "Startups launching an MVP, SMBs needing a customer portal, or enterprises refactoring monoliths into modular services.",
    caseStudy: {
      title: "SaaS Dashboard Rebuild",
      blurb:
        "Reduced page load time by 60% and decreased support tickets by optimizing onboarding flows.",
    },
  },

  "mobile-development": {
    title: "Mobile Development",
    overview:
      "Native and cross-platform mobile apps that feel native on both Android & iOS, designed for performance, push notifications, and smooth onboarding.",
    description:
      "We ship production-ready mobile apps with a focus on native-like performance, accessible UI, and seamless backend integration. We handle app store builds, release pipelines, and analytics setup.",
    deliverables: [
      "Native (Swift / Kotlin) or cross-platform (React Native / Flutter) app",
      "CI/CD for app builds and TestFlight / Play Store automation",
      "Push notifications and deep linking",
      "Offline support & syncing",
      "Analytics and crash reporting setup",
    ],
    timeline:
      "8–16 weeks for a feature-rich native app; 6–12 weeks for cross-platform MVP.",
    techStack: ["React Native", "TypeScript", "Expo", "Firebase", "AppCenter"],
    idealFor:
      "Companies who need mobile-first products, consumer apps, or companion apps for web platforms.",
    caseStudy: {
      title: "Marketplace Mobile App",
      blurb:
        "Delivered an iOS/Android app and increased DAU by 40% after launch.",
    },
  },

  "cloud-solutions": {
    title: "Cloud Solutions",
    overview:
      "Design, migrate, and operate scalable cloud infrastructure with security, resiliency, and cost optimization in mind.",
    description:
      "We help you choose the right cloud architecture (serverless, containers, or managed VMs), implement CI/CD, observability, and disaster recovery strategies that match your reliability needs.",
    deliverables: [
      "Cloud architecture design & cost estimate",
      "Containerization & orchestration (Docker + Kubernetes) or serverless setup",
      "CI/CD & automated deployments",
      "Infrastructure as Code (Terraform / Pulumi)",
      "Monitoring, logging, and alerting",
      "Runbooks & handover documentation",
    ],
    timeline:
      "2–8 weeks for greenfield infra; 4–12+ weeks for migrations depending on complexity.",
    techStack: [
      "AWS / GCP / Azure",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
    idealFor:
      "Teams that need scalable automation, migrate legacy apps to cloud, or want high availability for production systems.",
    caseStudy: {
      title: "Cloud Migration",
      blurb:
        "Migrated monolith to containerized services and cut monthly infra costs by 23%.",
    },
  },

  "ai-machine-learning": {
    title: "AI & Machine Learning",
    overview:
      "Build AI-powered features — from recommendation systems to custom model pipelines and intelligent automation.",
    description:
      "We evaluate your data, pick the right ML approach, train and validate models, and productionize them with safe inference APIs and monitoring for model drift.",
    deliverables: [
      "Data audit and ML feasibility study",
      "Proof-of-Concept model with evaluation metrics",
      "ETL / feature pipeline for production",
      "Model deployment (serverless or containerized inference)",
      "Monitoring and retraining strategy",
    ],
    timeline: "4–12 weeks for POC to production depending on data readiness.",
    techStack: [
      "Python",
      "PyTorch / TensorFlow",
      "scikit-learn",
      "MLflow",
      "AWS SageMaker",
    ],
    idealFor:
      "Companies with data to unlock: personalized experiences, automation, or predictive analytics use-cases.",
    caseStudy: {
      title: "Recommendation Engine",
      blurb:
        "Improved conversion rate by 18% by personalizing product suggestions.",
    },
  },
};

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : undefined;

  if (!service) {
    return (
      <div className="py-20 px-4 text-center">
        <h3 className="text-2xl font-semibold">Service not found</h3>
        <p className="text-gray-600 mt-2">
          Try visiting our{" "}
          <Link to="/services" className="text-blue-600 underline">
            services page
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12 px-4">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl">{service.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overview */}
          <div>
            <p className="text-gray-700">{service.overview}</p>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-lg font-semibold">What you get</h4>
            <ul className="mt-3 space-y-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-gray-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline & Ideal For */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h5 className="font-semibold">Typical timeline</h5>
              <p className="text-gray-700 mt-2">{service.timeline}</p>
            </div>
            <div>
              <h5 className="font-semibold">Ideal for</h5>
              <p className="text-gray-700 mt-2">{service.idealFor}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h5 className="font-semibold">Tech & tools</h5>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.techStack.map((t, i) => (
                <span
                  key={i}
                  className="rounded-full border px-3 py-1 text-sm text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Case study (optional) */}
          {service.caseStudy && (
            <div>
              <h5 className="font-semibold">Case study</h5>
              <p className="text-gray-700 mt-2">
                <strong>{service.caseStudy.title}:</strong>{" "}
                {service.caseStudy.blurb}
              </p>
            </div>
          )}

          {/* CTA */}
          {/* CTA */}
          <div className="flex justify-center md:justify-end mt-6">
            <Link
              to="/contact"
              className="w-full md:w-auto flex justify-center md:justify-end"
            >
              <Button
                size="lg"
                className="w-full md:w-auto text-center whitespace-normal break-words px-6 py-3"
              >
                Contact us about {service.title}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
