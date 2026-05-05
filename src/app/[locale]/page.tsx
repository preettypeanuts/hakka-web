import { Badges } from "@/components/badges";
import { CtaBottom } from "@/components/cta-bottom";
import { HeroHome } from "@/components/hero-home";
import { FeaturedService } from "@/components/service";
import { SocialProof } from "@/components/social-proof";
import { OriginSection } from "@/components/the-origin";
import { WhyChooseUs } from "@/components/why-choose-us";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("all_services");
  const tLabel = await getTranslations("service_label");

  const items = t.raw("items");

  const data = {
    title: tLabel("title"),
    subtitle: tLabel("subtitle"),
    cta: tLabel("cta"),
    wa_template: tLabel.raw("wa_template") as string,
    items,
    cta_details: tLabel("cta_details"),
  };

  return (
    <>
      <HeroHome />
      <OriginSection />
      <Badges />
      <FeaturedService data={data} />
      <WhyChooseUs />
      <SocialProof />
      <CtaBottom />
    </>
  );
}
