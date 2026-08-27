import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="flex flex-1 flex-col items-start justify-center px-8 py-24 sm:px-16">
      <h1 className="font-display text-5xl text-ink sm:text-6xl">Kantipur</h1>
      <p className="mt-4 max-w-md font-body text-lg text-ink-muted">
        {t("heroLine")}
      </p>
    </main>
  );
}
