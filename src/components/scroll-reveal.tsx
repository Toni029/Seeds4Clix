import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Applies staggered scroll-reveal animations to page content.
 * Targets direct children of section containers and animates them in
 * as they enter the viewport, re-running on every route change.
 */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("main section, section").forEach((section) => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
