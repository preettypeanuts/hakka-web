import { AboutService } from "@/components/about-services";
import { AboutUs } from "@/components/about-us";
import { PageHero } from "@/components/page-hero";
import { ValuesSection } from "@/components/value";
import { VisionMissionSection } from "@/components/vision-mission";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about_banner");
  const tAboutUs = await getTranslations("about_us");
  const tServices = await getTranslations("about_services");

  const aboutUsData = {
    eyebrow: tAboutUs("eyebrow"),
    title: tAboutUs("title"),
    paragraph: tAboutUs("paragraph"),
    cta: tAboutUs("cta"),
  };

  const servicesData = {
    title: tServices("title"),
    view_more: tServices("view_more"),
    cta: tServices("cta"),
    items: tServices.raw("items") as {
      title: string;
      desc: string;
      benefit: string;
      image: string;
    }[],
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />
      <AboutUs/>
      <VisionMissionSection />
      <AboutService data={servicesData} />
      <ValuesSection />
    </>
  );
}