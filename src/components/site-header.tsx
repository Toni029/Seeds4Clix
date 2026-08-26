"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/ai-development", label: "Custom solutions" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Link
          href="/"
          aria-label="Seeds4Clix home"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight transition-transform duration-300 hover:-translate-y-0.5"
        >
          <img
            src="/seeds4clix-logo.png"
            alt=""
            aria-hidden="true"
            className="size-9 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span>
            Seeds
            <span className="text-gradient-headline inline-block">4</span>
            CLix
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/80 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="nav-link transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary sm:inline">
            EN
          </span>
          <Link
            href="/ai-development"

            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground cta-glow"
          >
            I want to automate my company
          </Link>
        </div>
      </div>
    </header>
  );
}
