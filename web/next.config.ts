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
};

export default withNextIntl(nextConfig);
