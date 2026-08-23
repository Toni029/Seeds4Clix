import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/ai-development", label: "Custom solutions" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Seeds4CLix
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/80 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground sm:inline">
            EN
          </span>
          <Link
            to="/ai-development"
            hash="tell-us"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform cta-glow hover:-translate-y-0.5"
          >
            I want to automate my company
          </Link>
        </div>
      </div>
    </header>
  );
}
