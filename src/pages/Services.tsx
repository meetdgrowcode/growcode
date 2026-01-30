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
import {
  CheckCircle2,
  Zap,
  Shield,
  Users,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Clock,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Services() {
  const selectedService = useSelector(
    (state: RootState) => state.services.selectedService
  );
  const dispatch = useDispatch();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Fast Delivery",
      description:
        "We use agile methodologies to deliver high-quality software on time and within budget.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Secure & Scalable",
      description:
        "Security is baked in from day one. We build systems that scale as your business grows.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Expert Team",
      description:
        "Our team consists of senior engineers and designers with years of industry experience.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-blue-600" />,
      title: "Award Winning",
      description:
        "Recognized for our excellence in digital product design and software engineering.",
    },
  ];

  const testimonials = [
    {
      quote:
        "They transformed our legacy system into a modern, scalable platform. The team's expertise is unmatched.",
      author: "Sarah Johnson",
      role: "CTO, TechFlow",
    },
    {
      quote:
        "The best development partner we've worked with. delivered on time and exceeded our expectations.",
      author: "Michael Chen",
      role: "CEO, StartUp Inc",
    },
    {
      quote:
        "Incredible attention to detail and user experience. Our users love the new app!",
      author: "Emily Davis",
      role: "Product Manager, CreativeSoft",
    },
  ];

  const faqs = [
    {
      question: "How do you handle project communication?",
      answer:
        "We use Slack/Teams for daily updates and have weekly video calls to review progress. You'll have direct access to the team.",
    },
    {
      question: "What is your typical pricing model?",
      answer:
        "We offer both fixed-price contracts for well-defined projects and time-and-materials for ongoing agile development.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer maintenance packages to ensure your software stays secure, updated, and bug-free after launch.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "It varies by scope, but an MVP usually takes 8-12 weeks, while larger platforms can take 3-6 months.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative flex justify-center py-20 md:py-32 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-sky-100/30 blur-3xl" />
        </div>

        <div className="max-w-5xl w-full px-4 relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-950 leading-tight">
              We build <span className="text-blue-600">digital products</span>
              <br /> that act as business assets.
            </h1>
            <p className="max-w-2xl text-xl text-gray-600 mx-auto leading-relaxed">
              From web and mobile apps to cloud & AI, we design and build software that
              ships fast and scales with your vision.
            </p>
          </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button size="lg" className="h-12 px-8 text-base rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
               <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-blue-200 text-blue-700 hover:bg-blue-50">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Why leading companies choose us
            </h2>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We don't just write code; we partner with you to solve business problems through technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <Card className="h-full border-blue-100 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md bg-blue-50/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-600 border border-blue-100">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-950 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl w-full mx-auto px-4 space-y-12">
           <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Our Expertise
            </h2>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific industry and goals.
            </p>
          </div>

          <ServicesGrid />
        </div>
      </section>

      {/* Selected Service Details */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="absolute inset-0" onClick={() => dispatch(clearSelectedService())} />
            <Card className="relative max-w-3xl w-full border-0 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
               <CardHeader className="flex flex-row items-start justify-between gap-4 border-b p-6 sticky top-0 bg-white z-10">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-950">
                    {selectedService.title}
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-base">
                    {selectedService.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(clearSelectedService())}
                  className="rounded-full hover:bg-gray-100 -mr-2 -mt-2"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2 text-blue-900">
                    <CheckCircle2 className="h-5 w-5" />
                    Key Deliverables
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedService.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                 <div className="flex justify-end pt-4">
                   <Link to={`/services/${selectedService.id}`} onClick={() => dispatch(clearSelectedService())}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        View Full Details <ArrowRight className="h-4 w-4" />
                      </Button>
                   </Link>
                 </div>
              </CardContent>
            </Card>
        </div>
      )}

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl w-full mx-auto px-4 space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950">
              How we work
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A transparent, iterative process that keeps you in the loop.
            </p>
          </div>

          <div className="relative">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100" />

            <div className="grid gap-8 md:grid-cols-4 relative z-10">
              {[
                {
                  step: 1,
                  title: "Discovery",
                  description: "We dive deep into your business goals and user needs.",
                  icon: <MessageSquare className="h-5 w-5" />,
                },
                {
                  step: 2,
                  title: "Planning",
                  description: "We architect a scalable solution and detailed roadmap.",
                  icon: <Clock className="h-5 w-5" />,
                },
                {
                  step: 3,
                  title: "Development",
                  description: "Agile sprints with regular demos and feedback loops.",
                  icon: <Zap className="h-5 w-5" />,
                },
                {
                  step: 4,
                  title: "Launch & Scale",
                  description: "Smooth deployment and ongoing optimization.",
                  icon: <Trophy className="h-5 w-5" />,
                },
              ].map((item, idx) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform relative z-10">
                        {item.icon}
                        <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-blue-800 text-xs flex items-center justify-center border-2 border-white">
                            {item.step}
                        </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-950 text-white relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-50" />
           <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl rounded-r-none" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Client Success Stories</h2>
                  <p className="text-blue-200 max-w-2xl mx-auto text-lg">See what our partners have to say about working with us.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((t, i) => (
                      <Card key={i} className="bg-blue-900/50 border-blue-800 text-blue-50">
                          <CardContent className="p-8 space-y-6">
                              <div className="flex gap-1 text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                  ))}
                              </div>
                              <blockquote className="text-lg italic leading-relaxed">"{t.quote}"</blockquote>
                              <div className="flex items-center gap-4">
                                  <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-blue-200">
                                      {t.author[0]}
                                  </div>
                                  <div>
                                      <div className="font-semibold text-white">{t.author}</div>
                                      <div className="text-sm text-blue-300">{t.role}</div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-950">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">Common questions about our services and process.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-200">
                        <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                        >
                            <span className="font-semibold text-blue-950">{faq.question}</span>
                            {openFaq === idx ? (
                                <span className="text-blue-600 text-xl font-bold">−</span>
                            ) : (
                                <span className="text-gray-400 text-xl font-bold">+</span>
                            )}
                        </button>
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${
                                openFaq === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden bg-gray-50">
                                <p className="p-6 pt-0 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                 <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to transform your business?</h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Let's discuss your project and how we can help you achieve your digital goals.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact">
                            <Button size="lg" className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-full shadow-lg hover:translate-y-[-2px] transition-all">
                                Get in Touch
                            </Button>
                        </Link>
                         <Link to="/portfolio">
                           <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-blue-200 text-blue-600 hover:bg-white/10 hover:text-white rounded-full transition-all">
                                View Portfolio
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

      <TechnologyStackSection />
    </div>
  );
}

