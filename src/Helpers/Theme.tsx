import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type Stored = Theme | "system";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Stored) {
  const resolved: Theme = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
}

export function useTheme() {
  const [stored, setStored] = useState<Stored>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(STORAGE_KEY) as Stored) || "system";
  });

  const effectiveTheme = useMemo<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return stored === "system" ? getSystemTheme() : stored;
  }, [stored]);

  useEffect(() => {
    applyTheme(stored);
    if (stored === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => applyTheme("system");
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }
  }, [stored]);

  function toggle() {
    const next: Theme = effectiveTheme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    setStored(next);
  }

  function resetToSystem() {
    localStorage.removeItem(STORAGE_KEY);
    setStored("system");
  }

  return { theme: effectiveTheme, mode: stored, toggle, resetToSystem };
}
