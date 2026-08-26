import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground sm:flex-row">
        <span className="font-bold text-foreground">Seeds4Clix</span>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/services" className="transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="/ai-development" className="transition-colors hover:text-primary">
            Custom solutions
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        <span>© {new Date().getFullYear()} Seeds4Clix — All rights reserved.</span>
      </div>
    </footer>
  );
}
