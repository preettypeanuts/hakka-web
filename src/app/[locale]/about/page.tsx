import { AboutService } from "@/components/about-services";
import { AboutUs } from "@/components/about-us";
import { Reveal } from "@/components/animate-reveal";
import BranchLocations from "@/components/branch-locations";
import { PageHero } from "@/components/page-hero";
import { ValuesSection } from "@/components/value";
import { VisionMissionSection } from "@/components/vision-mission";
import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta_about" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/about",
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about_banner");
  const tServicesLabel = await getTranslations("about_services");
  const tServices = await getTranslations("all_services");

  const servicesData = {
    title: tServicesLabel("title"),
    view_more: tServicesLabel("view_more"),
    cta: tServicesLabel("cta"),
    items: tServices.raw("items") as {
      title: string;
      description: string;
      benefit: string;
      image: string;
      slug: string;
    }[],
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />

      <Reveal variant="fade-up" delay={200}>
        <AboutUs />
      </Reveal>

      <Reveal variant="fade-up" delay={200}>
        <VisionMissionSection />
      </Reveal>

      <Reveal variant="fade-up" delay={200}>
        <AboutService data={servicesData} />
      </Reveal>

      <Reveal variant="fade-up" delay={300}>
        <BranchLocations />
      </Reveal>

      <Reveal variant="fade-up" delay={200}>
        <ValuesSection />
      </Reveal>

    </>
  );
}