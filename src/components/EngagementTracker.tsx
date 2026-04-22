"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function EngagementTracker() {
  useEffect(() => {
    const startedAt = Date.now();
    const scrollReached = new Set<number>();
    const timeReached = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, (window.scrollY / scrollable) * 100);
      for (const milestone of [25, 50, 75, 100] as const) {
        if (pct >= milestone && !scrollReached.has(milestone)) {
          scrollReached.add(milestone);
          track(`scroll_depth_${milestone}`);
        }
      }
    };

    const timers = [15, 30, 60, 120].map((seconds) =>
      window.setTimeout(() => {
        if (!timeReached.has(seconds)) {
          timeReached.add(seconds);
          track(`time_on_page_${seconds}s`);
        }
      }, seconds * 1000),
    );

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const seconds = Math.round((Date.now() - startedAt) / 1000);
        track("page_exit", { visible_seconds: seconds });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
