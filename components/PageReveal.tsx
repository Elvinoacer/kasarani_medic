"use client";

import { useReveal } from "@/components/useReveal";

/** Client wrapper that scroll-reveals every `.reveal` descendant. */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}
