import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  CalendarCheck2,
  Users,
  Medal,
  HandHeart,
  Cpu,
  Globe2,
  Gift,
  PartyPopper,
} from "lucide-react";
import { ServicesGrid } from "@/components/ServicesGrid";
import { motion } from "framer-motion";

const perks = [
  {
    icon: CalendarCheck2,
    title: "5-Day Work Week",
    description: "A healthy work-life balance so you stay energized.",
    accent: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Employee-First Philosophy",
    description: "People-centric culture with open communication.",
    accent: "bg-emerald-50",
  },
  {
    icon: Medal,
    title: "Reward & Recognition",
    description: "Your efforts are celebrated and appreciated.",
    accent: "bg-violet-50",
  },
  {
    icon: HandHeart,
    title: "Positive & Inclusive Environment",
    description: "Supportive teams where everyone belongs.",
    accent: "bg-indigo-50",
  },
  {
    icon: Cpu,
    title: "Advanced Tools & Technologies",
    description: "Work with modern stacks and best practices.",
    accent: "bg-cyan-50",
  },
  {
    icon: Globe2,
    title: "Onsite & Global Opportunities",
    description: "Grow your career with international exposure.",
    accent: "bg-pink-50",
  },
  {
    icon: Gift,
    title: "Referral Benefits",
    description: "Earn rewards for helping us hire great people.",
    accent: "bg-rose-50",
  },
  {
    icon: PartyPopper,
    title: "Fun, Festivals & Connect",
    description: "Regular events, celebrations and team bonding.",
    accent: "bg-blue-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function Home() {
  return (
    // Prevent any page-level horizontal scroll
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="space-y-6 pb-6 pt-6 md:pb-10 md:pt-10 lg:py-20 px-4">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl whitespace-normal break-words">
              Transform Your Ideas Into
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                Digital Reality
              </span>
            </h1>
            <p className="mx-auto text-xl text-gray-600 max-w-3xl whitespace-normal">
              We build cutting-edge web applications, mobile apps, and cloud
              solutions that drive your business forward.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link to="/contact" className="inline-flex items-center">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services" className="inline-flex items-center">
                  View Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6 py-6 md:py-10 lg:py-14 px-4">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose Growcode?
            </h2>
            <p className="text-lg text-gray-600">
              We combine innovation, expertise, and dedication to deliver
              exceptional results
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-5xl w-full grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Expert Team",
                description:
                  "Highly skilled developers with years of industry experience",
              },
              {
                title: "Latest Tech",
                description:
                  "We use cutting-edge technologies and best practices",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock support for all your needs",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="space-y-2 rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-6 py-8 md:py-12 lg:py-20 bg-gray-50 px-4">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-7xl w-full">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-10 md:py-14 lg:py-20 px-4">
        <motion.div
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl w-full space-y-10">
            <div className="text-center space-y-3">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600"
                variants={cardVariants}
              >
                
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                variants={cardVariants}
              >
                Perks of Being a Part of{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Growcode
                </span>{" "}
                
              </motion.h2>
            </div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
            >
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={perk.title}
                    variants={cardVariants}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 250, damping: 18 },
                    }}
                    className="group rounded-3xl bg-white border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div
                      className={`inline-flex rounded-2xl ${perk.accent} p-3 sm:p-4 mb-4 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-slate-800" />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-1.5 text-slate-900">
                      {perk.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {perk.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6 py-8 md:py-12 lg:py-20 px-4">
        <div className="flex justify-center">
          <motion.div
            className="max-w-2xl w-full space-y-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600">
              Let's bring your vision to life. Contact us today for a free
              consultation.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
