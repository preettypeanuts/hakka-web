import { Badges } from "@/components/badges";
import { CtaBottom } from "@/components/cta-bottom";
import { HeroHome } from "@/components/hero-home";
import { FeaturedService } from "@/components/service";
import { SocialProof } from "@/components/social-proof";
import { OriginSection } from "@/components/the-origin";
import { WhyChooseUs } from "@/components/why-choose-us";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("services");

  const items = t.raw("items");

  const data = {
    title: t("title"),
    subtitle: t("subtitle"),
    cta: t("cta"),
    wa_template: t.raw("wa_template") as string,
    items
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
