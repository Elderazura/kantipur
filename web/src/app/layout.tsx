import type { Metadata } from "next";
import { dmSans, fraunces, sourceSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kantipur",
  description: "Editorial house of handwoven carpets",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
