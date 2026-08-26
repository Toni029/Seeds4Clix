import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Calculator,
  Gauge,
  Globe2,
  Radar,
  ScanSearch,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    icon: ScanSearch,
    tag: "Business clarity",
    title: "Company Snapshot",
    text: "See the signals behind your growth, positioning, and customer journey in one focused read.",
    result: "A sharper starting point",
    time: "3 min",
  },
  {
    icon: Globe2,
    tag: "Digital presence",
    title: "Visibility Check",
    text: "Find the moments where your website and channels lose attention, trust, or momentum.",
    result: "Your next visibility wins",
    time: "4 min",
  },
  {
    icon: Radar,
    tag: "Market intelligence",
    title: "Competitor Radar",
    text: "Map the patterns in your market so you can compete with a point of view, not guesswork.",
    result: "A clearer market position",
    time: "5 min",
  },
  {
    icon: Calculator,
    tag: "Operations",
    title: "Recoverable Time",
    text: "Estimate how much capacity is hidden in repetitive work across your team and day.",
    result: "Hours worth recovering",
    time: "2 min",
  },
  {
    icon: BarChart3,
    tag: "Growth signals",
    title: "AI Opportunity Map",
    text: "Connect business friction to practical AI opportunities worth exploring first.",
    result: "A prioritized opportunity list",
    time: "6 min",
  },
];

export const metadata = {
  title: "Tools",
  description: "Practical diagnostic tools from Seeds4Clix.",
};

export default function ToolsPage() {
  return (
    <div className="tools-page">
      <section className="tools-hero mx-auto max-w-[1200px] px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
        <div className="tools-hero-copy">
          <p className="eyebrow">Seeds4Clix / tools</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Turn a vague feeling into a{" "}
            <span className="text-gradient-headline">useful signal.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A set of quick, practical lenses for finding where your business is ready for better
            systems, clearer decisions, and a smarter use of AI.
          </p>
          <Link
            href="#toolkit"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground cta-glow transition-transform hover:-translate-y-1"
          >
            Explore the toolkit <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="tools-signal" aria-hidden="true">
          <div className="tools-signal-core">
            <Sparkles size={26} />
          </div>
          <span className="tools-signal-line" />
          <span className="tools-signal-dot dot-one" />
          <span className="tools-signal-dot dot-two" />
          <span className="tools-signal-dot dot-three" />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="tools-compare surface-card">
          <div className="tools-compare-intro">
            <p className="eyebrow">A first lens</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              You do not need more noise. You need a place to look first.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These tools help you spot the shape of the problem before investing in the full
              solution.
            </p>
          </div>
          <div className="tools-compare-grid">
            <div className="tools-compare-item">
              <span className="tools-compare-kicker">In a few minutes</span>
              <h3>See the signal</h3>
              <p>
                Surface friction, missed opportunities, and repeatable patterns hiding in plain
                sight.
              </p>
            </div>
            <div className="tools-compare-item tools-compare-item-accent">
              <span className="tools-compare-kicker">With Seeds4Clix</span>
              <h3>Build the system</h3>
              <p>Translate the signal into a practical roadmap your team can actually use.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="toolkit" className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:pb-36">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The toolkit</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Start with the question
              <br className="hidden sm:block" /> closest to your friction.
            </h2>
          </div>
          <p className="max-w-xs leading-relaxed text-muted-foreground">
            Fast reads. Clear outputs. No jargon disguised as strategy.
          </p>
        </div>
        <div className="tools-grid">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <article
                className="tools-card surface-card"

                key={tool.title}
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <div className="tools-card-top">
                  <div className="tools-icon">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {tool.tag}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{tool.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-relaxed text-muted-foreground">
                  {tool.text}
                </p>
                <div className="tools-card-meta">
                  <span>
                    <b>Result</b>
                    {tool.result}
                  </span>
                  <span>
                    <b>Takes</b>
                    {tool.time}
                  </span>
                </div>
                <Link href="/ai-roadmap" className="tools-card-link">
                  Use this lens <ArrowUpRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:pb-36">
        <div className="tools-cta">
          <Gauge className="tools-cta-icon" size={42} />
          <p className="eyebrow">The useful next step</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            A tool can show you the door. We help you walk through it.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Bring your result to a Seeds4Clix conversation and we will turn the first signal into a
            focused plan for your business.
          </p>
          <Link
            href="/ai-development"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground cta-glow"
          >
            Talk through your result <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
