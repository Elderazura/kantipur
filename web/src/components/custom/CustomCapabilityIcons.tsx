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

export function IconSize(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="8" y="16" width="32" height="20" rx="1" />
      <path d="M8 24h32" opacity={0.35} />
      <path d="M14 10v6M34 10v6" />
      <path d="M12 10h24" />
      <path d="M16 36v4M32 36v4" />
    </IconShell>
  );
}

export function IconMaterial(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M24 8c-6 4-10 10-10 16 0 6 4 12 10 16 6-4 10-10 10-16S30 12 24 8z" />
      <path d="M24 8v32" opacity={0.35} />
      <path d="M14 20c4 2 8 2 10 0s6-2 10 0" />
      <path d="M14 28c4-2 8-2 10 0s6 2 10 0" />
    </IconShell>
  );
}

export function IconTexture(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M6 14c6 4 12 4 18 0s12-4 18 0" />
      <path d="M6 24c6-4 12-4 18 0s12 4 18 0" />
      <path d="M6 34c6 4 12 4 18 0s12-4 18 0" />
      <path d="M10 10v28M38 10v28" opacity={0.25} />
    </IconShell>
  );
}

export function IconColour(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="18" cy="20" r="6" />
      <circle cx="30" cy="16" r="5" />
      <circle cx="32" cy="30" r="5" />
      <path d="M12 38h24" opacity={0.35} />
      <path d="M16 42h16" opacity={0.25} />
    </IconShell>
  );
}

export function IconKnot(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M10 10h28v28H10z" opacity={0.35} />
      <path d="M10 18h28M10 26h28M10 34h28M18 10v28M26 10v28M34 10v28" opacity={0.45} />
      <circle cx="18" cy="18" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="26" cy="18" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="34" cy="18" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="18" cy="26" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="26" cy="26" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="34" cy="26" r="1.75" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

export const CUSTOM_CAPABILITY_ICONS = {
  size: IconSize,
  material: IconMaterial,
  texture: IconTexture,
  colour: IconColour,
  knot: IconKnot,
} as const;

export type CustomCapabilityKey = keyof typeof CUSTOM_CAPABILITY_ICONS;
