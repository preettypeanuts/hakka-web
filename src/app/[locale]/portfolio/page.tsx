import { Reveal } from "@/components/animate-reveal";
import { PageHero } from "@/components/page-hero";
import { PortfolioContent } from "@/components/portfolio-content";
import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta_portfolio" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio_banner");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} image={t("image")} />
      <Reveal variant="fade-up" delay={200}>
        <PortfolioContent />
      </Reveal>
    </>
  );
}
