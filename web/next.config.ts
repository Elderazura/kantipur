import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/assets/**",
      },
    ],
    // Carpet photography is dense in texture, where AVIF pays off most. Next
    // picks the first format the browser accepts, so AVIF leads and WebP
    // covers the rest. Default here is WebP alone.
    formats: ["image/avif", "image/webp"],
    // The default ladder jumps 1200 -> 1920, so a 620-680px column at 2x DPR
    // (1240-1360 needed) pulls a 1920 frame. The two extra rungs close that gap.
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1600, 1920, 2048, 3840],
    // The frames are immutable — a new piece means a new filename — so the
    // default four hours only throws away work.
    minimumCacheTTL: 2678400, // 31 days
  },

  // The IA collapsed from seven content pages to four: Bespoke absorbed
  // Designers and Hospitality, The House absorbed Craft. These keep the old
  // URLs — and whatever rank they carry — pointing at the merged pages.
  async redirects() {
    const MERGED: Record<string, string> = {
      custom: "bespoke",
      designers: "bespoke",
      hospitality: "bespoke",
      heritage: "house",
      about: "house",
    };
    return Object.entries(MERGED).flatMap(([from, to]) => [
      { source: `/:locale(en|de|fr|ar)/${from}`, destination: `/:locale/${to}`, permanent: true },
      { source: `/${from}`, destination: `/${to}`, permanent: true },
    ]);
  },
};

export default withNextIntl(nextConfig);
