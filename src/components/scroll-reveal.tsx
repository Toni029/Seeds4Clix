"use client";
import { useEffect } from "react";

/**
 * Applies staggered scroll-reveal animations to page content.
 * Targets direct children of section containers and animates them in
 * as they enter the viewport, re-running on every route change.
 */
export function ScrollReveal() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let fallback: number | undefined;

    // Wait for hydration to settle before mutating the DOM directly.
    const start = window.setTimeout(() => {
      const targets: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>("section").forEach((section) => {
        const container = (section.firstElementChild as HTMLElement) ?? section;
        const kids = Array.from(container.children) as HTMLElement[];
        const list = kids.length ? kids : [container];
        list.forEach((el, i) => {
          if (el.hasAttribute("data-reveal")) return;
          el.setAttribute("data-reveal", "");
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
          targets.push(el);
        });
      });

      const show = (el: Element) => el.classList.add("is-visible");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target);
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -40px 0px", threshold: 0 },
      );

      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
        else observer?.observe(el);
      });

      // Safety net: never leave content invisible.
      fallback = window.setInterval(() => {
        targets.forEach((el) => {
          if (
            !el.classList.contains("is-visible") &&
            el.getBoundingClientRect().top < window.innerHeight
          ) {
            show(el);
            observer?.unobserve(el);
          }
        });
      }, 500);
    }, 250);

    return () => {
      window.clearTimeout(start);
      if (fallback) window.clearInterval(fallback);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
