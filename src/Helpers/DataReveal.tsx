import { useEffect } from "react";

/**
 * Adds .is-visible to elements matching selector after `delayMs`
 * when they intersect the viewport.
 */
export function useRevealOnView(
  selector = ".section[data-reveal]",
  delayMs = 1000
) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const timers = new WeakMap<Element, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // delay, then reveal
            const t = window.setTimeout(() => {
              el.classList.add("is-visible");
            }, delayMs);
            timers.set(el, t);
          } else {
            // if it leaves before delay elapses, cancel
            const t = timers.get(el);
            if (t) window.clearTimeout(t);
          }
        }
      },
      {
        threshold: 0.5, //how much needs to be visible to trigger
      }
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
  }, [selector, delayMs]);
}
