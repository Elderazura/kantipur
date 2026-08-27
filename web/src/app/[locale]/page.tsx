import { setRequestLocale } from "next-intl/server";
import AtmosphereHero from "@/components/AtmosphereHero";
import HeritageChapter from "@/components/HeritageChapter";
import MaterialStrip from "@/components/MaterialStrip";
import FeaturedGrid from "@/components/FeaturedGrid";
import CustomInvite from "@/components/CustomInvite";
import ContactStrip from "@/components/ContactStrip";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <AtmosphereHero />
      <HeritageChapter />
      <MaterialStrip />
      <FeaturedGrid />
      <CustomInvite />
      <ContactStrip />
    </main>
  );
}
