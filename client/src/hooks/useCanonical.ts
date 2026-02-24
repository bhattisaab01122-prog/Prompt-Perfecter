import { useEffect } from "react";
import { useLocation } from "wouter";

const CANONICAL_BASE = "https://www.getpromptfix.com";

export function useCanonical() {
  const [location] = useLocation();

  useEffect(() => {
    const canonicalPath = location === "/" ? "/" : location.replace(/\/$/, "");
    const canonicalUrl = `${CANONICAL_BASE}${canonicalPath}`;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [location]);
}
