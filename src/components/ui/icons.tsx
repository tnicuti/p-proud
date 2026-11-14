import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.900 12 21 12 21Z" />
    <circle cx="12" cy="9.500" r="2.500" />
  </Svg>
);

export const SchoolIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 10 12 4l9 6" />
    <path d="M5 9.500V20h14V9.500" />
    <path d="M10 20v-5h4v5" />
  </Svg>
);

export const PeopleIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.300 2.700-6 6-6s6 2.700 6 6" />
    <circle cx="17" cy="9" r="2.300" />
    <path d="M16.500 14.200c2.600.300 4.500 2.600 4.500 5.800" />
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.500" y="5" width="17" height="15" rx="3" />
    <path d="M3.500 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const ExternalIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </Svg>
);

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.500s-8-4.900-8-10.700A4.600 4.600 0 0 1 12 7a4.600 4.600 0 0 1 8 2.800c0 5.800-8 10.700-8 10.700Z" />
  </Svg>
);

export const CommentIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12a7.500 7.500 0 0 1-11 6.600L4 20l1.400-4.400A7.500 7.500 0 1 1 20 12Z" />
  </Svg>
);

export const LinkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.500" />
    <path d="M12 7.500V12l3 2" />
  </Svg>
);
