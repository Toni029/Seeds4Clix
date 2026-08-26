import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  examples: { title: string; body: string }[];
  steps: string[];
  cta: string;
};

export function ServiceDetail({ eyebrow, title, intro, examples, steps, cta }: Props) {
  return (
    <div>
      <section className="hero-backdrop relative isolate overflow-hidden border-b border-border/60">
        <div className="relative mx-auto max-w-[1200px] px-5 py-24 sm:py-32">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="text-gradient-headline">{title}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <Link
            href="/ai-development"

            className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground cta-glow"
          >
            {cta}
          </Link>
        </div>
      </section>
      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">Business examples</p>
          <h2 className="mt-3 max-w-3xl text-4xl sm:text-5xl">Make the idea useful on Monday.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {examples.map((example) => (
              <article key={example.title} className="surface-card p-8">
                <h3 className="text-2xl">{example.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{example.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow">The engagement</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">A clear path from question to capability.</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className="surface-card p-8">
                <span className="font-mono text-sm text-primary">0{index + 1}</span>
                <p className="mt-5 text-lg leading-relaxed text-foreground/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="hero-backdrop py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl sm:text-5xl">Ready to find your next advantage?</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Bring us the friction, the ambition, or the question. We will help you turn it into a
            practical next step.
          </p>
          <Link
            href="/ai-development"

            className="mt-10 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground cta-glow"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
