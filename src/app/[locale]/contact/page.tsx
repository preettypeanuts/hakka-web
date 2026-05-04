import { ContactList } from "@/components/contact-list";
import { PageHero } from "@/components/page-hero";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("contact_banner");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />
      <ContactList />
    </>
  );
}