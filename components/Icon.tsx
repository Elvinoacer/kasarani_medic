import type { SVGProps } from "react";

export type IconName =
  | "phone"
  | "map-pin"
  | "calendar"
  | "clock"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "x"
  | "menu"
  | "shield"
  | "lock"
  | "badge"
  | "stethoscope"
  | "cash"
  | "alert"
  | "pulse"
  | "star"
  | "whatsapp"
  | "navigation"
  | "user"
  | "info"
  | "accessible"
  | "bus";

const PATHS: Record<IconName, React.ReactNode> = {
  phone: (
    <path d="M2.5 5.5C2.5 3.8 3.8 2.5 5.5 2.5h1.6c.7 0 1.3.5 1.5 1.2l.8 3a1.5 1.5 0 0 1-.4 1.5l-1.3 1.2a12.5 12.5 0 0 0 5.9 5.9l1.2-1.3a1.5 1.5 0 0 1 1.5-.4l3 .8c.7.2 1.2.8 1.2 1.5v1.6c0 1.7-1.3 3-3 3C9.9 20.5 2.5 13.1 2.5 5.5Z" />
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 2.5V7m8-4.5V7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H4" />
      <path d="m11 5-7 7 7 7" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: (
    <>
      <path d="m5 5 14 14" />
      <path d="M19 5 5 19" />
    </>
  ),
  menu: (
    <>
      <path d="M3.5 6.5h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17.5h17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.6v6.1c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V5.6L12 2.8Z" />
      <path d="m8.8 11.8 2.3 2.3 4.1-4.6" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <circle cx="12" cy="15.8" r="1.4" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.8 13.9-1.5 7 4.7-2.6 4.7 2.6-1.5-7" />
      <path d="m10 9.5 1.6 1.6 2.9-3" />
    </>
  ),
  stethoscope: (
    <path d="M5 3.5v5a4.5 4.5 0 0 0 9 0v-5M5 3.5H3.2M14 3.5h-1.8M9.5 13v2.8a5 5 0 0 0 5 5 5 5 0 0 0 5-5v-1.6M19.5 12.4a1.7 1.7 0 1 0 0 .01" />
  ),
  cash: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11.5" rx="2" />
      <circle cx="12" cy="12.2" r="2.7" />
      <path d="M6 9.8v.01M18 14.5v.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 2.8 19.5h18.4L12 3.5Z" />
      <path d="M12 10v4.2M12 17.1v.01" />
    </>
  ),
  pulse: <path d="M2.5 12h4l2.5-6.5 5 13L16.5 12h5" />,
  star: (
    <path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.2L12 17.1l-5.6 3 1.2-6.2L3 9.6l6.3-.8L12 3Z" />
  ),
  whatsapp: (
    <path d="M12 3a8.6 8.6 0 0 0-7.4 13L3.4 20.6l4.8-1.2A8.6 8.6 0 1 0 12 3Zm-3 4.8c.2 0 .5 0 .7.4l1 2c.1.3 0 .6-.2.8l-.6.7c.5 1.2 1.6 2.3 2.8 2.8l.7-.6c.2-.2.5-.3.8-.2l2 1c.3.2.4.4.4.7 0 1-.9 1.9-1.9 1.9-3.9 0-7.6-3.7-7.6-7.6 0-1 .9-1.9 1.9-1.9Z" />
  ),
  navigation: <path d="m3.5 10.5 17-7-7 17-2.3-7.7-7.7-2.3Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.2-3.4 4-5 7.5-5s6.3 1.6 7.5 5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.8v.01" />
    </>
  ),
  accessible: (
    <>
      <circle cx="12" cy="4.8" r="1.9" />
      <path d="M8 8.5h8M12 8.5v5h4l2.5 6M12 13.5H9.5A4.5 4.5 0 1 0 14 19.4" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3.5" width="16" height="14" rx="2.5" />
      <path d="M4 11h16M8 3.5V11m8-7.5V11" />
      <path d="M7.5 21v-3.5m9 3.5v-3.5M7 17.5v.01M17 17.5v.01" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  filled?: boolean;
};

export function Icon({ name, filled, ...props }: IconProps) {
  const solid = name === "whatsapp" || name === "navigation" || name === "pulse";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={solid || filled ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Brand mark — medical cross fused with community arch */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <rect width="44" height="44" rx="13" fill="url(#kmc-g)" />
      <path
        d="M22 10.5v23M10.5 22h23"
        stroke="#FBF9F4"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="35" cy="9.5" r="4.2" fill="#EFc058" stroke="#FBF9F4" strokeWidth="1.6" />
      <defs>
        <linearGradient id="kmc-g" x1="0" y1="0" x2="44" y2="44">
          <stop stopColor="#186F5C" />
          <stop offset="1" stopColor="#0D3A32" />
        </linearGradient>
      </defs>
    </svg>
  );
}
