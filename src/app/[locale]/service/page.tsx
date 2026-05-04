import { PageHero } from "@/components/page-hero";
import { ServiceCTA } from "@/components/service-cta";
import { ServiceGrid } from "@/components/service-grid";
import { getTranslations } from "next-intl/server";

type ServiceItem = {
  title: string;
  desc: string;
  benefit: string;
  image: string;
  details: string[];
};

export default async function ServicePage() {
  const t = await getTranslations("services_banner");
  const tService = await getTranslations("all_services");

  const dataService = {
    title: tService("title"),
    subtitle: tService("subtitle"),
    items: tService.raw("items") as ServiceItem[],
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />
      <ServiceGrid {...dataService} />
      <ServiceCTA />
    </>
  );
}