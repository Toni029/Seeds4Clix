import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Strategy first, technology second | Seeds4Clix" },
      {
        name: "description",
        content:
          "We structure, automate and scale companies with AI. Meet the thinking behind the work, how we run projects, and why we start at the decision.",
      },
      {
        property: "og:title",
        content: "About — Strategy first, technology second | Seeds4Clix",
      },
      {
        property: "og:description",
        content:
          "A team that starts at the decision, builds the smallest thing that proves it, and keeps judgment with people.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const BELIEFS = [
  {
    title: "Strategy first, technology second",
    body: "The order is not a slogan. It is what separates a model that impresses in a demo from one someone actually uses on Monday morning.",
  },
  {
    title: "A process you cannot say out loud cannot be delegated",
    body: "Before automating anything, we get the knowledge out of people's heads and onto paper. Only then can it be handed to a person or a machine.",
  },
  {
    title: "People decide where judgment is needed",
    body: "Automation does the heavy lifting and stops at the moments that need judgment. A system that decides alone where it should not is what makes a team stop trusting it.",
  },
  {
    title: "We do not hand over and disappear",
    body: "Solutions are maintained and adjusted as the process changes, because something custom that stops following the business stops being custom.",
  },
];

const FACTS = [
  { value: "13+", label: "Companies deciding with AI alongside us" },
  { value: "4", label: "Functions covered: marketing, sales, operations, HR" },
  { value: "Weeks", label: "Time to know if an idea is worth it — not quarters" },
];

function AboutPage() {
  return (
    <div>
      <section className="hero-backdrop border-b border-border/60">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:py-28">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            <span className="text-gradient-headline">We solve business</span>
            <br />
            problems, not tech puzzles.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Seeds4Clix works with companies that have outgrown improvisation. We find
            where the business stalls, write the process down, and automate what should
            never have depended on a person remembering it.
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 py-14">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="surface-card p-8">
              <p className="text-4xl font-bold text-gradient-headline">{fact.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">What we believe</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Four rules we do not bend</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {BELIEFS.map((belief) => (
              <article key={belief.title} className="surface-card p-8">
                <h3 className="text-2xl">{belief.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {belief.body}
                </p>
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
            It is the question we open every diagnostic conversation with. If the answer
            makes you uncomfortable, that is where we should start.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/ai-development"
              hash="tell-us"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
            >
              Tell us the problem
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              See the services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
