import { Sun, Moon } from "lucide-react";
import "./Header.css";
import { useTheme } from "../Helpers/Theme";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
];

type Indicator = {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
};

export function Header() {
  const { theme, mode, toggle, resetToSystem } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const [ind, setInd] = useState<Indicator>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useEffect(() => {
    const getTop = () =>
      document.scrollingElement?.scrollTop ??
      window.pageYOffset ??
      window.scrollY ??
      0;

    const onScroll = () => setScrolled(getTop() > 0);

    onScroll();

    const raf = requestAnimationFrame(onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("load", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  useEffect(() => {
    function onResize() {
      if (!ind.visible) return;
      const active = document.querySelector(
        ".header-link.is-hovered"
      ) as HTMLElement | null;
      if (active) positionFromEl(active);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ind.visible]);

  function positionFromEl(el: HTMLElement) {
    const nav = navRef.current;
    if (!nav) return;
    const padX = 6;
    const padY = 4;
    const r = el.getBoundingClientRect();
    const nr = nav.getBoundingClientRect();
    setInd({
      left: r.left - nr.left - padX,
      top: r.top - nr.top - padY,
      width: r.width + padX * 2,
      height: r.height + padY * 2,
      visible: true,
    });
  }

  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    el.classList.add("is-hovered");
    positionFromEl(el);
  }

  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.classList.remove("is-hovered");
  }

  function handleNavLeave() {
    setInd((s) => ({ ...s, visible: false }));
    document
      .querySelectorAll(".header-link.is-hovered")
      .forEach((n) => n.classList.remove("is-hovered"));
  }

  function handleClick() {
    setInd((s) => ({ ...s, visible: false }));
  }

  return (
    <nav
      className={`header-main ${
        scrolled ? "header-solid" : "header-transparent"
      }`}
      aria-label="Primary"
      onMouseLeave={handleNavLeave}
      ref={navRef}
    >
      <div
        className="hover-indicator"
        style={{
          left: ind.left,
          top: ind.top,
          width: ind.width,
          height: ind.height,
          opacity: ind.visible ? 1 : 0,
          transform: ind.visible
            ? "translateZ(0)"
            : "translateZ(0) scale(0.98)",
        }}
        aria-hidden
      />
      <ul className="header-list">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              className="header-link"
              href={l.href}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={handleClick}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="icon-btn"
        aria-label={`Toggle theme (currently ${
          mode === "system" ? `system → ${theme}` : theme
        })`}
        title={
          mode === "system"
            ? `Theme: System (${theme}). Alt-click to stay on system, click toggles explicit.`
            : `Theme: ${theme}. Alt-click to reset to System.`
        }
        onClick={(e) => (e.altKey ? resetToSystem() : toggle())}
      >
        {theme === "dark" ? (
          <Moon className="icon" />
        ) : (
          <Sun className="icon" />
        )}
      </button>
    </nav>
  );
}
