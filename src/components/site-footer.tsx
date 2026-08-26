import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const NAVIGATE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/ai-academy", label: "AI Academy" },
  { href: "/ai-operating-system", label: "AI Operating System" },
  { href: "/ai-roadmap", label: "AI Strategic Roadmap" },
] as const;

const RESOURCE_LINKS = [
  { href: "/ai-development", label: "Custom solutions" },
  { href: "/about", label: "About us" },
  { href: "/about", label: "Privacy approach" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="footer-grid">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Seeds4Clix
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              We help businesses structure, automate and scale their operations with practical,
              accountable Artificial Intelligence.
            </p>
            <div className="footer-social">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Seeds4Clix on LinkedIn"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Seeds4Clix on X">
                <Twitter size={16} aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Seeds4Clix on GitHub"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <p className="footer-column-title">Navigate</p>
            <nav className="footer-links">
              {NAVIGATE_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="footer-column-title">Resources</p>
            <nav className="footer-links">
              {RESOURCE_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Seeds4Clix. All rights reserved.</span>
          <span>Built for teams who want AI to do real work.</span>
        </div>
      </div>
    </footer>
  );
}
