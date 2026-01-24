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
    accent: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Employee-First Philosophy",
    description: "People-centric culture with open communication.",
    accent: "bg-sky-50",
  },
  {
    icon: Medal,
    title: "Reward & Recognition",
    description: "Your efforts are celebrated and appreciated.",
    accent: "bg-blue-50",
  },
  {
    icon: HandHeart,
    title: "Positive & Inclusive Environment",
    description: "Supportive teams where everyone belongs.",
    accent: "bg-sky-50",
  },
  {
    icon: Cpu,
    title: "Advanced Tools & Technologies",
    description: "Work with modern stacks and best practices.",
    accent: "bg-blue-50",
  },
  {
    icon: Globe2,
    title: "Onsite & Global Opportunities",
    description: "Grow your career with international exposure.",
    accent: "bg-sky-50",
  },
  {
    icon: Gift,
    title: "Referral Benefits",
    description: "Earn rewards for helping us hire great people.",
    accent: "bg-blue-50",
  },
  {
    icon: PartyPopper,
    title: "Fun, Festivals & Connect",
    description: "Regular events, celebrations and team bonding.",
    accent: "bg-sky-50",
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
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-32 px-4 selection:bg-blue-100 selection:text-blue-900">
        {/* Background Elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-sky-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        
        <div className="flex justify-center relative z-10">
          <motion.div 
            className="max-w-5xl w-full space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             
            
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-blue-950">
              Transform Your Ideas Into
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>
            
            <p className="mx-auto text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              We build cutting-edge web applications, mobile apps, and cloud
              solutions that drive your business forward with precision and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-105" asChild>
                <Link to="/contact" className="inline-flex items-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 text-gray-700 transition-all hover:scale-105" asChild>
                <Link to="/services" className="inline-flex items-center">
                  View Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: "Projects Delivered", value: "100+" },
              { label: "Happy Clients", value: "50+" },
              { label: "Years Experience", value: "5+" },
              { label: "Team Members", value: "25+" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-950">
              Why Choose Growcode?
            </h2>
            <p className="text-lg text-gray-600">
              We combine innovation, expertise, and dedication to deliver exceptional results that scale with your business.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Expert Team",
                description: "Highly skilled developers with years of industry experience across diverse domains.",
                icon: Users,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "Latest Tech",
                description: "We leverage cutting-edge technologies and modern architectures for robust solutions.",
                icon: Cpu,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "24/7 Support",
                description: "Dedicated round-the-clock support to ensure your business never stops running.",
                icon: HandHeart,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-950">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive solutions tailored to your unique business needs.
            </p>
          </div>

          <ServicesGrid />
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 md:py-32 px-4 overflow-hidden bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="text-center space-y-6 mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-blue-950"
              variants={cardVariants}
            >
              Perks of Being a Part of{" "}
              <span className="text-blue-600">
                Growcode
              </span>
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={cardVariants}>
              We believe in nurturing a culture where talent thrives and innovation flourishes.
            </motion.p>
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {perks.map((perk) => {
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
                  className="group rounded-3xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div
                    className={`inline-flex rounded-2xl ${perk.accent} p-4 mb-5 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-blue-600 px-4 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-700 opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Trusted by Clients
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our partners say about working with us.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
             {[
               {
                 quote: "Growcode transformed our digital presence. Their team is efficient, creative, and a joy to work with.",
                 author: "Sarah Johnson",
                 role: "CTO, TechStart Inc."
               },
               {
                 quote: "The best development partner we've had. They understood our vision perfectly and delivered beyond expectations.",
                 author: "Michael Chen",
                 role: "Founder, InnovateLab"
               },
               {
                 quote: "Professional, skilled, and reliable. Growcode has been instrumental in scaling our platform.",
                 author: "Emily Davis",
                 role: "Product Manager, CloudNet"
               }
             ].map((testimonial, i) => (
               <div key={i} className="bg-blue-700/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/30">
                 <div className="flex text-blue-300 mb-4">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                   ))}
                 </div>
                 <p className="text-lg leading-relaxed mb-6 font-medium">"{testimonial.quote}"</p>
                 <div>
                   <div className="font-bold text-white">{testimonial.author}</div>
                   <div className="text-blue-200 text-sm">{testimonial.role}</div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="flex justify-center">
          <motion.div
            className="max-w-4xl w-full text-center space-y-8 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-950">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's bring your vision to life. Contact us today for a free consultation and see how we can help you grow.
            </p>
            <div className="pt-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100" asChild>
                <Link to="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
