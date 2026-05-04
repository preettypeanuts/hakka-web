import { PageHero } from "@/components/page-hero";
import { getTranslations } from "next-intl/server";

export default async function ServicePage() {
  const t = await getTranslations("services_banner");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />
    </>
  );
}