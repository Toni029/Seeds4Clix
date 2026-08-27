"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const SERVICES_MENU = [
  {
    href: "/ai-academy",
    title: "AI Academy",
    description: "Team training with an AI tutor",
  },
  {
    href: "/ai-operating-system",
    title: "AI Operating System",
    description: "Where the automated work happens",
  },
  {
    href: "/ai-roadmap",
    title: "AI Strategic Roadmap",
    description: "Diagnosis and a prioritized plan",
  },
  {
    href: "/ai-development",
    title: "Custom AI Development",
    description: "Tailored builds for your stack",
  },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openServices = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-5 ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Link
          href="/"
          aria-label="Seeds4Clix home"
          className="group flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight transition-transform duration-300 hover:-translate-y-0.5 sm:text-xl"
        >
          <img
            src="/seeds4clix-logo.png"
            alt=""
            aria-hidden="true"
            className="size-8 object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:size-9"
          />
          <span>
            Seeds
            <span className="text-gradient-headline inline-block">4</span>
            CLix
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-foreground/80 min-[560px]:flex lg:gap-8">
          <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
            <DropdownMenuTrigger
              className="nav-link inline-flex items-center gap-1 transition-colors duration-300 outline-none hover:text-primary"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              Services
              <ChevronDown size={14} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              {SERVICES_MENU.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex flex-col items-start gap-0.5 py-2">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/services" className="font-semibold text-primary">
                  View all services →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/tools"
            className="nav-link transition-colors duration-300 hover:text-primary"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="nav-link transition-colors duration-300 hover:text-primary"
          >
            About
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary md:inline">
            EN
          </span>
          <ThemeToggle />
          <Link
            href="/ai-development"
            className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground cta-glow sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="hidden sm:inline">I want to automate my company</span>
            <span className="sm:hidden">Automate my company</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
