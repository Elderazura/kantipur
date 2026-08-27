import { Fraunces, Source_Serif_4, DM_Sans } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
});
