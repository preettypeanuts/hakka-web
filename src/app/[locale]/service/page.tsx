import { Reveal } from "@/components/animate-reveal";
import { PageHero } from "@/components/page-hero";
import { ServiceCTA } from "@/components/service-cta";
import { ServiceGrid } from "@/components/service-grid";
import { WorkflowSection } from "@/components/workflow";
import { createPageMetadata } from "@/lib/metadata";
import type { ServiceItem } from "@/lib/services";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta_service" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/service",
  });
}

export default async function ServicePage() {
  const t = await getTranslations("services_banner");
  const tService = await getTranslations("all_services");
  const tWorkflow = await getTranslations("workflow");

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
      <Reveal variant="fade-up" delay={200}>
        <ServiceGrid {...dataService} />
      </Reveal>

      <Reveal variant="fade-up" delay={200}>
        <WorkflowSection
          title={tWorkflow("title")}
          steps={tWorkflow.raw("steps")}
        />
      </Reveal>
      
      <Reveal variant="fade-up" delay={200}>
        <ServiceCTA />
      </Reveal>
    </>
  );
}