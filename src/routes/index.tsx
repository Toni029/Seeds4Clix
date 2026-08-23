import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seeds4Clix — Scale your company with Artificial Intelligence" },
      {
        name: "description",
        content:
          "We find where your business stalls, automate the repetitive work, and give you back time, margin and decisions that stop depending on you.",
      },
      {
        property: "og:title",
        content: "Seeds4Clix — Scale your company with Artificial Intelligence",
      },
      {
        property: "og:description",
        content:
          "AI Academy, an AI Operating System for SMEs, and a strategic roadmap prioritized by impact and risk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LOGOS = [
  "149Photos",
  "Algar",
  "Continental",
  "HGreg",
  "HoneyBook",
  "IMP Diagnostics",
  "Matador",
  "Metro do Porto",
  "MobileODT",
  "P2Sample",
  "Pentadata",
  "PicUP",
  "Vonovia",
];

const PILLARS = [
  {
    title: "Structure",
    body: "We turn the knowledge living in your team's heads into clear, delegable processes. Only a verbalized process can be handed to a person or a machine.",
  },
  {
    title: "Automate",
    body: "Our operating system puts marketing, sales, operations and HR on assisted autopilot, with human decisions at the moments that require judgment.",
  },
  {
    title: "Scale",
    body: "With the process written down and automated, volume grows without the team growing with it. The strategic plan keeps the queue ordered by real return.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Anarchy",
    body: "Critical knowledge lives in two or three people's heads and every day is firefighting.",
  },
  {
    n: "2",
    title: "Processes",
    body: "Rules become written and repeatable, and the operation stops depending on individual heroes.",
  },
  {
    n: "3",
    title: "AI",
    body: "Beyond running the repetitive work, it opens what was not possible before: new business models, markets you could not serve, and revenue that does not exist yet.",
  },
];

const PATHS = [
  {
    title: "AI Academy",
    body: "Training for your team with an AI tutor and content personalized to your context. The people using the tools every day need to understand them, not just receive them.",
    cta: "See the courses ↗",
  },
  {
    title: "The AI Operating System for SMEs",
    body: "The platform where the work happens: marketing, sales, operations and HR automations, with your team and ours working in the same place.",
    cta: "See the platform →",
  },
  {
    title: "AI Strategic Roadmap",
    body: "A deep diagnosis of your business, team interviews, and an automation roadmap prioritized by impact and risk. From diagnosis to implementation, with the whole company aligned.",
    cta: "See the roadmap →",
  },
];

const TYPED = "If your demand doubled tomorrow, what would break first?";

function TypedQuestion() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= TYPED.length ? 0 : c + 1));
    }, 55);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="font-mono text-sm text-foreground/80 sm:text-base">
      <span className="text-primary">?</span> {TYPED.slice(0, count)}
      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary" />
    </p>
  );
}

function EmailCapture({
  placeholder,
  label,
}: {
  placeholder: string;
  label: string;
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        aria-label={placeholder}
        placeholder={placeholder}
        className="h-14 flex-1 rounded-full border border-border bg-secondary/60 px-6 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70"
      />
      <button
        type="submit"
        className="h-14 shrink-0 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
      >
        {label}
      </button>
    </form>
  );
}

function Index() {
  return (
    <div>
      <section className="hero-backdrop border-b border-border/60">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:py-32">
          <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="text-gradient-headline">Scale your company</span>
            <br />
            with Artificial Intelligence.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            We find where your business stalls, automate the repetitive work, and give
            you back time, margin and decisions that stop depending on you.
          </p>
          <div className="mt-8">
            <TypedQuestion />
          </div>
          <div className="mt-8">
            <EmailCapture
              placeholder="your.name@yourcompany.com"
              label="Analyze my company"
            />
          </div>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Company email only. We research public information about your company and
            return the likely pains and where AI creates value. No commitment.
          </p>
          <a
            href="#paths"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Or see how we work <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <section className="border-b border-border/60 py-14">
        <p className="eyebrow text-center">
          Companies already deciding with AI alongside us
        </p>
        <div className="mt-8 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-lg font-semibold text-muted-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-do" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">We solve business problems.</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Software is the means. The outcome we deliver is measured in time
            recovered, decisions delegated and margin protected.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.title} className="surface-card p-8">
                <h3 className="text-2xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="hero-backdrop border-b border-border/60 py-24"
      >
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">What we could do together</p>
          <h2 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
            How far your company can go with AI
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Leave your contact and we show you, on your own case, where AI creates
            value in your business. While we do it, this site becomes yours.
          </p>
          <div className="mt-8">
            <EmailCapture
              placeholder="Work email"
              label="See what we could do together"
            />
          </div>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Work email only. We analyse the domain of your email, using public
            information. By continuing, you agree that we may contact you about this
            analysis.
          </p>
        </div>
      </section>

      <section id="path" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">The path</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">From anarchy to scale</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            AI only delivers once the first two are in place. Skipping steps means
            scaling chaos.
          </p>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="surface-card p-8">
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <h3 className="mt-4 text-2xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
          <a
            href="#contact"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Find out where you stand in 2 minutes
          </a>
        </div>
      </section>

      <section id="paths" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">How we work with you</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Three paths to an intelligent business
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PATHS.map((p) => (
              <article key={p.title} className="surface-card flex flex-col p-8">
                <h3 className="text-2xl">{p.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <a
                  href="#contact"
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  {p.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-backdrop py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl sm:text-5xl">
            If your demand doubled tomorrow, what would break first?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            It is the question we open every diagnostic conversation with. If the
            answer makes you uncomfortable, that is where we should start.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
            >
              Analyze my company
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              I want to automate my company
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground sm:flex-row">
          <span className="font-bold text-foreground">
            Seeds4Clix
          </span>
          <span>© {new Date().getFullYear()} Seeds4Clix — All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
