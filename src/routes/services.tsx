import { createFileRoute, Link } from "@tanstack/react-router";
import { NeuralField } from "../components/neural-field";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Structure, automate and scale with AI | Seeds4Clix" },
      {
        name: "description",
        content:
          "Three ways to work with us: the AI Academy for your team, an AI Operating System for SMEs, and a strategic roadmap prioritized by impact and risk.",
      },
      {
        property: "og:title",
        content: "Services — Structure, automate and scale with AI | Seeds4Clix",
      },
      {
        property: "og:description",
        content:
          "Training, an operating system for marketing, sales, operations and HR, and a prioritized automation roadmap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const OFFERS = [
  {
    title: "AI Academy",
    body: "Training for your team with an AI tutor and content personalized to your context. The people using the tools every day need to understand them, not just receive them.",
    to: "/ai-academy" as const,
    points: [
      "Personalized learning paths per role",
      "Hands-on work on your own processes",
      "An AI tutor available between sessions",
    ],
  },
  {
    title: "The AI Operating System for SMEs",
    body: "The platform where the work actually happens: marketing, sales, operations and HR automations, with your team and ours working in the same place.",
    to: "/ai-operating-system" as const,
    points: [
      "Assisted autopilot across four functions",
      "Human decisions kept where judgment matters",
      "One place for your team and ours",
    ],
  },
  {
    title: "AI Strategic Roadmap",
    body: "A deep diagnosis of your business, team interviews, and an automation roadmap prioritized by impact and risk — from diagnosis to implementation.",
    to: "/ai-roadmap" as const,
    points: [
      "Interviews across the whole operation",
      "Queue ordered by real return, not novelty",
      "Alignment before a single line of code",
    ],
  },
  {
    title: "Custom AI solutions",
    body: "Some problems no bought tool solves, because they depend on what only your company knows. We build those, without tying up your capital at the start.",
    points: [
      "We finance the development",
      "You pay monthly while it serves the business",
      "Maintained as the process changes",
    ],
    to: "/ai-development" as const,
  },
];

const DELIVERABLES = [
  {
    title: "Time recovered",
    body: "Repetitive work leaves the calendar of the people you hired to think.",
  },
  {
    title: "Decisions delegated",
    body: "Written rules mean the operation stops waiting on two or three heads.",
  },
  {
    title: "Margin protected",
    body: "Volume can grow without headcount growing at the same pace.",
  },
];

function ServicesPage() {
  return (
    <div>
      <section className="hero-backdrop relative isolate overflow-hidden border-b border-border/60">
        <NeuralField />
        <div className="relative mx-auto max-w-[1200px] px-5 py-24 sm:py-28">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            <span className="text-gradient-headline">Structure, automate</span>
            <br />
            and then scale.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Software is the means. What we deliver is measured in time recovered, decisions
            delegated and margin protected — in that order.
          </p>
          <Link
            to="/ai-development"
            hash="tell-us"
            className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
          >
            Tell us the problem
          </Link>
        </div>
      </section>

      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">How we work with you</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Four ways in</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {OFFERS.map((offer) => (
              <article key={offer.title} className="surface-card flex flex-col p-8">
                <h3 className="text-2xl">{offer.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-foreground/80">
                  {offer.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="font-mono text-primary" aria-hidden>
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                {offer.to ? (
                  <Link
                    to={offer.to}
                    className="mt-6 text-sm font-semibold text-primary hover:underline"
                  >
                    Explore this service →
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">What you actually get</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Outcomes, not dashboards</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {DELIVERABLES.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-backdrop py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl sm:text-5xl">Not sure which one you need?</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Most companies start with the diagnosis. It usually decides the rest for them.
          </p>
          <Link
            to="/ai-development"
            hash="tell-us"
            className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
          >
            Analyze my company
          </Link>
        </div>
      </section>
    </div>
  );
}
