import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/ai-development")({
  head: () => ({
    meta: [
      { title: "Custom AI solutions, without the upfront investment | Seeds4Clix" },
      {
        name: "description",
        content:
          "Some problems no bought tool solves. We build the custom solution and finance the development — you pay monthly for as long as it serves the business.",
      },
      {
        property: "og:title",
        content: "Custom AI solutions, without the upfront investment | Seeds4Clix",
      },
      {
        property: "og:description",
        content:
          "Strategy first, technology second. We start at the decision, build the smallest thing that proves it, and keep judgment with people.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiDevelopmentPage,
});

const HOW = [
  {
    title: "We start at the decision",
    body: "Before talking about data or models, we work out which decision starts being made differently. A prediction that changes no decision is an expensive number.",
  },
  {
    title: "The smallest thing that proves it",
    body: "We build the smallest version that answers the business question first. If the answer is that it is not worth it, better to know in weeks than in quarters.",
  },
  {
    title: "People decide where judgment is needed",
    body: "Automation does the heavy lifting and stops at the moments that need judgment. A system that decides alone where it should not is what makes a team stop trusting it.",
  },
  {
    title: "It runs, and it keeps changing",
    body: "We do not hand over and disappear. The solution is maintained, fixed and adjusted as the process changes — because a custom solution that stops following the business stops being custom.",
  },
];

const PROBLEMS = [
  {
    title: "Data nobody can use",
    body: "It exists, it is spread across systems that do not talk to each other, and the question that matters is still unanswered.",
  },
  {
    title: "Decisions repeated by expensive people",
    body: "Someone senior decides the same thing dozens of times a week, and that judgment is written down nowhere.",
  },
  {
    title: "A process that does not scale",
    body: "It works while the volume stays where it is. If it doubles, it gives — and nobody knows exactly where.",
  },
  {
    title: "An idea that does not exist yet",
    body: "A new service that is only possible if the hard part is automated. It is the most interesting work we do.",
  },
];

function ProblemForm() {
  const [sent, setSent] = useState(false);

  const field =
    "h-14 w-full rounded-2xl border border-border bg-secondary/60 px-5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="surface-card mt-10 grid gap-4 p-8 sm:grid-cols-2"
    >
      <input required aria-label="Name" placeholder="Name" className={field} />
      <input
        required
        type="email"
        aria-label="Work email"
        placeholder="Work email"
        className={field}
      />
      <input type="tel" aria-label="Phone" placeholder="Phone" className={field} />
      <input aria-label="Website" placeholder="Website" className={field} />
      <textarea
        required
        aria-label="What you want to solve"
        placeholder="What you want to solve"
        rows={5}
        className="w-full rounded-2xl border border-border bg-secondary/60 px-5 py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70 sm:col-span-2"
      />
      <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]" />
        I want to receive content about AI applied to business
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="h-14 w-full rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5 sm:w-auto"
        >
          {sent ? "Thank you — we'll be in touch" : "Send and book a call"}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          When you submit, what you wrote and your details are used only to prepare the
          conversation.
        </p>
      </div>
    </form>
  );
}

function AiDevelopmentPage() {
  return (
    <div>
      <section className="hero-backdrop border-b border-border/60">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:py-28">
          <p className="eyebrow">Custom solutions</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            <span className="text-gradient-headline">Custom AI solutions</span>
            <br />
            without the upfront investment.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Some problems no bought tool solves, because they depend on what only your
            company knows. We build the solution for them without tying up your capital
            at the start: we finance the development, and you pay a monthly fee for as
            long as the solution is serving the business.
          </p>
          <a
            href="#tell-us"
            className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
          >
            Tell us the problem
          </a>
        </div>
      </section>

      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Strategy first, technology second
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The order is not a slogan. It is what separates a model that impresses in a
            demo from one someone uses on Monday morning.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {HOW.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">Where this fits</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            The problems that tend to arrive here
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PROBLEMS.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tell-us" className="hero-backdrop py-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Tell us what you want to solve
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Write the problem in your own words. We read it before talking to you, and
            the conversation starts there — not on a company deck.
          </p>
          <ProblemForm />
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to browse first?{" "}
            <Link to="/services" className="font-semibold text-primary hover:underline">
              See all services
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
