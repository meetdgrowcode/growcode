import {
  Heart,
  Users,
  Sparkles,
  Coffee,
  PartyPopper,
  MapPin,
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
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-5xl px-4 text-center space-y-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            A team where growth, learning and fun go together
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Beyond projects and deadlines, Growcode Solution is about people:
            how we work, learn, celebrate and support each other every day.
          </p>
        </div>
      </section>

      {/* Culture pillars */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What life at Growcode feels like
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              A calm, focused environment with enough energy to keep things
              exciting, and enough structure to keep things moving.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {culturePillars.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
                >
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
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
      {/* Image gallery / life moments */}
      <section className="py-10 md:py-14 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Snapshots from our days
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Team lunches, whiteboard sessions, late-night releases and
                everything in between — here&apos;s a glimpse into everyday life
                at Growcode.
              </p>
            </div>
          </div>

          {/* 6 Card Image Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/team-outdoor-section.png"
                alt="Team retreat outdoor session"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Annual retreat — strategy & fun activities
              </figcaption>
            </figure>

            {/* Card 2 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/Hackathon.png"
                alt="Hackathon night"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Hack Friday — building experiments
              </figcaption>
            </figure>

            {/* Card 3 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/TeamLunch.png"
                alt="Team lunch celebration"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Celebrating launches & birthdays
              </figcaption>
            </figure>

            {/* Card 4 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/Whiteboard-session.png"
                alt="Whiteboard planning session"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Architecture & design brainstorming
              </figcaption>
            </figure>

            {/* Card 5 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/office-game-night.png"
                alt="Office game night"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Friday game night — unwind & bond
              </figcaption>
            </figure>

            {/* Card 6 */}
            <figure className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
              <img
                src="public/team-collabration.png"
                alt="Team collaboration"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white">
                Pair programming & team collaboration
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Events & traditions */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Events & traditions we care about
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
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
                  className="border border-gray-100 bg-white shadow-sm rounded-2xl"
                >
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                            {event.title}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-700">
                            {event.tag}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-blue-700 mt-0.5">
                          {event.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Step inside our workspace
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Short clips from everyday life at Growcode — from quiet focus
                time to launches, standups and celebrations.
              </p>
            </div>
          </div>

          {/* Video grid – replace sources with your own mp4 files in /public */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl bg-black/5">
                <video
                  controls
                  className="w-full h-56 md:h-64 rounded-2xl object-cover bg-black"
                  poster="/culture/office-tour-poster.jpg"
                >
                  <source src="https://pin.it/bYwmkq1Xp" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Office tour — where we design, build & ship
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                A quick walkthrough of our workspace, collaboration corners and
                spaces we use for focused work.
              </p>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl bg-black/5">
                <video
                  controls
                  className="w-full h-56 md:h-64 rounded-2xl object-cover bg-black"
                  poster="/culture/team-story-poster.jpg"
                >
                  <source src="/culture/team-story.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Team stories — building together
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Hear directly from the team about how we collaborate, learn from
                each other and grow our careers at Growcode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Want to be part of this journey?
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            We&apos;re always open to meeting curious developers, designers and
            product folks who care about building things the right way.
          </p>
          <Button asChild>
            <a href="/contact">Talk to us</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
