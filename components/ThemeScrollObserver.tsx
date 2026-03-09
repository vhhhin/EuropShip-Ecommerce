import { useEffect, useRef } from "react";

/**
 * Scroll-based theme switcher
 * - Adds/removes `global-light-mode` on <html> depending on visible sections
 * - Adds `theme-anim` ONLY during the switch for premium smooth transitions
 * - Uses hysteresis + rAF batching to avoid flicker/split
 */

const ENTER_LIGHT = 0.68; // threshold to enable light
const EXIT_LIGHT = 0.58;  // threshold to disable light (hysteresis)

const ThemeScrollObserver: React.FC = () => {
  const isLightRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-theme-trigger="light"]')
    );

    // If no triggers exist, make sure we stay in dark baseline
    if (!targets.length) {
      document.documentElement.classList.remove("global-light-mode");
      document.documentElement.setAttribute("data-theme", "dark");
      return;
    }

    const visibility = new Map<Element, number>();
    targets.forEach((el) => visibility.set(el, 0));

    const withThemeAnim = () => {
      // Add temporary class to enable transitions only during switch
      document.documentElement.classList.add("theme-anim");
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-anim");
      }, 260);
    };

    const setTheme = (shouldBeLight: boolean) => {
      if (isLightRef.current === shouldBeLight) return;

      isLightRef.current = shouldBeLight;

      // Enable smooth switch for a short time only
      withThemeAnim();

      // Toggle light mode class and attribute (useful for CSS)
      document.documentElement.classList.toggle("global-light-mode", shouldBeLight);
      document.documentElement.setAttribute("data-theme", shouldBeLight ? "light" : "dark");
    };

    const computeAndApply = () => {
      let maxRatio = 0;
      visibility.forEach((ratio) => {
        if (ratio > maxRatio) maxRatio = ratio;
      });

      const currentlyLight = isLightRef.current;

      // Hysteresis prevents rapid toggling near the threshold
      const shouldBeLight = currentlyLight
        ? maxRatio >= EXIT_LIGHT
        : maxRatio >= ENTER_LIGHT;

      setTheme(shouldBeLight);
    };

    const scheduleUpdate = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        computeAndApply();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;

          // Ratio by visible height within viewport (stable for big sections)
          const visibleByHeight =
            rootHeight > 0
              ? Math.min(entry.intersectionRect.height / rootHeight, 1)
              : 0;

          // Effective visibility ratio (robust)
          const effectiveRatio = Math.max(entry.intersectionRatio, visibleByHeight);

          visibility.set(entry.target, effectiveRatio);
        }

        scheduleUpdate();
      },
      {
        root: null,
        // Balanced margins to avoid aggressive toggling that causes "split"
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.15, 0.3, 0.45, 0.58, 0.68, 0.8, 1],
      }
    );

    targets.forEach((el) => observer.observe(el));
    scheduleUpdate();

    return () => {
      observer.disconnect();
      visibility.clear();

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      document.documentElement.classList.remove("theme-anim");
      document.documentElement.classList.remove("global-light-mode");
      document.documentElement.setAttribute("data-theme", "dark");
      isLightRef.current = false;
    };
  }, []);

  return null;
};

export default ThemeScrollObserver;