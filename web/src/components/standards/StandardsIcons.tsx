import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function IconShell({ title, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconAdult(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="16" cy="14" r="4.5" />
      <circle cx="32" cy="14" r="4.5" />
      <path d="M8 38c2.5-6 6-9 8-9s5.5 3 8 9" />
      <path d="M24 38c2.5-6 6-9 8-9s5.5 3 8 9" />
      <path d="M16 22v6M32 22v6" />
    </IconShell>
  );
}

export function IconChildFree(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M24 6L8 12v12c0 9.5 6.8 18.4 16 20 9.2-1.6 16-10.5 16-20V12L24 6z" />
      <path d="M17 24l5 5 10-11" strokeWidth={1.5} />
    </IconShell>
  );
}

export function IconHandKnotted(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M6 10h36M6 38h36" />
      <path d="M12 10v28M24 10v28M36 10v28" strokeDasharray="2 3" opacity={0.45} />
      <path d="M14 20c4-3 8-3 10 0s6 3 10 0" />
      <path d="M14 28c4 3 8 3 10 0s6-3 10 0" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

export function IconNatural(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M24 42V18" />
      <path d="M24 28c-8-2-14-8-14-14 6 0 11 4 14 8" />
      <path d="M24 22c8-2 14-8 14-14-6 0-11 4-14 8" />
      <path d="M24 34c-5-1-9-4-11-8 4 0 7 2 11 5" />
      <path d="M24 30c5-1 9-4 11-8-4 0-7 2-11 5" />
    </IconShell>
  );
}

export function IconTraceable(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M24 6c-7 0-12 5-12 11 0 8 12 19 12 19s12-11 12-19c0-6-5-11-12-11z" />
      <circle cx="24" cy="17" r="4" />
      <path d="M12 38h24" opacity={0.5} />
      <path d="M16 42h16" opacity={0.35} />
    </IconShell>
  );
}

export function IconCompliance(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="10" y="8" width="28" height="34" rx="2" />
      <path d="M16 16h16M16 22h16M16 28h10" opacity={0.55} />
      <circle cx="32" cy="32" r="7" />
      <path d="M29 32l2 2 4-5" strokeWidth={1.5} />
    </IconShell>
  );
}

export const STANDARD_ICONS = {
  adult: IconAdult,
  childFree: IconChildFree,
  handKnotted: IconHandKnotted,
  natural: IconNatural,
  traceable: IconTraceable,
  compliance: IconCompliance,
} as const;
