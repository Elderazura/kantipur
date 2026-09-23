import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * Serif display + contemporary sans, per the brand direction.
 *
 * Canela / Editorial New / Neue Haas Grotesk are commercially licensed and
 * would need to be bought and self-hosted. Cormorant Garamond and Inter are
 * the open faces from the same brief and carry the identical register:
 * a high-contrast old-style for headlines, a neutral grotesque for text.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Navigation and labels share the body face, set uppercase with tracking. */
export const interUi = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});
