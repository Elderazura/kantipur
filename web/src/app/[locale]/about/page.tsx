import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

/** About content now lives on the heritage page — keep the route for old links. */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/heritage", locale });
}
