"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { CLINIC } from "@/lib/data";

/** Pinned mobile action bar — call / directions / book, always one tap away. */
export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      className={`fixed inset-x-0 bottom-0 z-[55] transition-transform duration-500 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-header flex items-stretch justify-between gap-2 border-t border-pine-100 px-3 py-2.5 [background:color-mix(in_oklab,#FBF9F4_88%,transparent)]">
        <a
          href={CLINIC.phoneHref}
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-ember-500 py-2.5 text-cream-50 active:scale-95"
        >
          <Icon name="phone" className="h-5 w-5" />
          <span className="text-[0.68rem] font-bold">Call now</span>
        </a>
        <a
          href={CLINIC.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-cream-100 py-2.5 text-pine-800 active:scale-95"
        >
          <Icon name="navigation" className="h-5 w-5" />
          <span className="text-[0.68rem] font-bold">Directions</span>
        </a>
        <a
          href="/#book"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-pine-700 py-2.5 text-cream-50 active:scale-95"
        >
          <Icon name="calendar" className="h-5 w-5" />
          <span className="text-[0.68rem] font-bold">Book visit</span>
        </a>
      </div>
    </nav>
  );
}
