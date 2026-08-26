import Link from "next/link";

const SERVICES = [
  {
    title: "AI Academy",
    body: "Hands-on training for your team, paired with an AI tutor and material built around your actual workflows.",
    href: "/ai-academy",
  },
  {
    title: "AI Operating System",
    body: "The platform where the work happens: marketing, sales, operations and HR automations, running alongside your team.",
    href: "/ai-operating-system",
  },
  {
    title: "AI Strategic Roadmap",
    body: "A close look at your business, conversations with your team, and a plan prioritized by impact and risk.",
    href: "/ai-roadmap",
  },
  {
    title: "Custom AI Development",
    body: "Tailored builds for your stack when the off-the-shelf platform is not enough.",
    href: "/ai-development",
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col gap-10 px-6 py-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-semibold tracking-tight">Services</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Four ways to bring practical AI into how your business actually runs.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="surface-card flex flex-col gap-3 p-8 no-underline"
          >
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
