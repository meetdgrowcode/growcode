import {
  Heart,
  Users,
  Sparkles,
  Coffee,
  PartyPopper,
  MapPin,
  Play,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function LifeAndCulture() {
  const culturePillars = [
    {
      icon: Users,
      title: "People First",
      desc: "Small, focused teams where everyone has a voice and real ownership.",
    },
    {
      icon: Sparkles,
      title: "Craft & Quality",
      desc: "We care about clean code, thoughtful design and long-term maintainability.",
    },
    {
      icon: Heart,
      title: "Enjoy the Journey",
      desc: "We celebrate wins, learn from failures and have fun along the way.",
    },
  ];

  const events = [
    {
      title: "Annual Retreat",
      subtitle: "3 days of learning, bonding & planning",
      description:
        "A mix of strategy sessions, team games and late-night conversations. We disconnect from day-to-day work to align on the bigger picture.",
      icon: MapPin,
      tag: "Once a year",
    },
    {
      title: "Hack Fridays",
      subtitle: "Experiment, prototype and play",
      description:
        "Every month we reserve time to hack on internal tools, wild ideas or explore new technologies together.",
      icon: Sparkles,
      tag: "Monthly",
    },
    {
      title: "Demo & Chai",
      subtitle: "Share, learn, improve",
      description:
        "Short informal demos where the team showcases what they’ve built, followed by open feedback and chai.",
      icon: Coffee,
      tag: "Bi-weekly",
    },
    {
      title: "Celebrate Everything",
      subtitle: "Birthdays, launches & small wins",
      description:
        "We keep it simple but meaningful — cakes, team lunches and shout-outs to appreciate each other.",
      icon: PartyPopper,
      tag: "All year",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-10 md:py-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-sky-100/50 blur-3xl" />

        <div className="container mx-auto max-w-5xl px-4 text-center space-y-6 relative z-10">
           <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
            Our Culture
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-blue-950">
            A team where growth, <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">learning and fun</span> go together
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beyond projects and deadlines, Growcode Solution is about people:
            how we work, learn, celebrate and support each other every day.
          </p>
        </div>
      </section>

      {/* Culture pillars */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              What life at Growcode feels like
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              A calm, focused environment with enough energy to keep things
              exciting, and enough structure to keep things moving.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {culturePillars.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="group border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="space-y-4 p-8">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image gallery / life moments */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
                Snapshots from our days
              </h2>
              <p className="text-base text-gray-600 max-w-xl">
                Team lunches, whiteboard sessions, late-night releases and
                everything in between — here&apos;s a glimpse into everyday life
                at Growcode.
              </p>
            </div>
          </div>

          {/* 6 Card Image Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/team-outdoor-section.png", alt: "Team retreat outdoor session", caption: "Annual retreat — strategy & fun activities" },
              { src: "/Hackathon.png", alt: "Hackathon night", caption: "Hack Friday — building experiments" },
              { src: "/TeamLunch.png", alt: "Team lunch celebration", caption: "Celebrating launches & birthdays" },
              { src: "/Whiteboard-session.png", alt: "Whiteboard planning session", caption: "Architecture & design brainstorming" },
              { src: "/office-game-night.png", alt: "Office game night", caption: "Friday game night — unwind & bond" },
              { src: "/team-collabration.png", alt: "Team collaboration", caption: "Pair programming & team collaboration" },
            ].map((img, idx) => (
              <figure key={idx} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] border border-gray-200">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Growcode+Moment";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-white shadow-sm">
                    {img.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Events & traditions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Events & traditions we care about
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Some of the rituals that keep us connected, motivated and
              constantly learning.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <Card
                  key={event.title}
                  className="border border-blue-100 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 rounded-2xl"
                >
                  <CardContent className="pt-8 pb-8 px-8 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-4 ring-blue-50/50">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {event.title}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">
                            {event.tag}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-blue-600">
                          {event.subtitle}
                        </p>
                        <p className="text-sm text-gray-600 pt-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
                Step inside our workspace
              </h2>
              <p className="text-base text-gray-600 max-w-xl">
                Short clips from everyday life at Growcode — from quiet focus
                time to launches, standups and celebrations.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
                { title: "Office tour — where we design, build & ship", desc: "A quick walkthrough of our workspace, collaboration corners and spaces we use for focused work.", poster: "/culture/office-tour-poster.jpg" },
                { title: "Team stories — building together", desc: "Hear directly from the team about how we collaborate, learn from each other and grow our careers at Growcode.", poster: "/culture/team-story-poster.jpg" }
            ].map((vid, idx) => (
                <div key={idx} className="space-y-4 group">
                    <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-lg aspect-video isolate">
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <div className="h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg">
                                    <Play className="h-5 w-5 fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                        <video
                            controls
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            poster={vid.poster}
                        >
                            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {vid.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                             {vid.desc}
                        </p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Want to be part of this journey?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We&apos;re always open to meeting curious developers, designers and
            product folks who care about building things the right way.
          </p>
          <Button size="lg" className="h-12 px-8 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-semibold text-base shadow-lg hover:shadow-xl transition-all" asChild>
            <a href="/contact">Talk to us</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
