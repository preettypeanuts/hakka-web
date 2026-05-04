import { AboutUs } from "@/components/about-us";
import { PageHero } from "@/components/page-hero";
import { VisionMissionSection } from "@/components/vision-mission";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about_banner");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />
      <AboutUs />
      <VisionMissionSection />
    </>
  );
}