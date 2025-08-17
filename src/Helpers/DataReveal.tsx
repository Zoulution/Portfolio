import { useEffect } from "react";

type RevealOptions = {
  delayMs?: number;
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  visibleClass?: string;
  revealClosest?: string;
};

export function useRevealOnView(
  selector = ".section[data-reveal]",
  {
    delayMs = 1000,
    threshold = 0.5,
    rootMargin = "0px",
    once = true,
    visibleClass = "is-visible",
    revealClosest,
  }: RevealOptions = {}
) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const timers = new WeakMap<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const target = revealClosest
            ? (el.closest(revealClosest) as HTMLElement | null)
            : el;

          if (entry.isIntersecting) {
            const t = window.setTimeout(() => {
              (target ?? el).classList.add(visibleClass);
              if (once) io.unobserve(el);
            }, delayMs);
            timers.set(el, t);
          } else {
            const t = timers.get(el);
            if (t) window.clearTimeout(t);
          }
        }
      },
      { threshold, rootMargin }
    );

    nodes.forEach((n) => io.observe(n));

    return () => {
      nodes.forEach((n) => {
        const t = timers.get(n);
        if (t) window.clearTimeout(t);
        io.unobserve(n);
      });
      io.disconnect();
    };
  }, [
    selector,
    delayMs,
    threshold,
    rootMargin,
    once,
    visibleClass,
    revealClosest,
  ]);
}
