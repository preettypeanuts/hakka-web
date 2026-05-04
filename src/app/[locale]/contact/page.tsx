import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { PageHero } from "@/components/page-hero";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("contact_banner");
  const tContact = await getTranslations("contact");
  const tForm = await getTranslations("form");

  // 🔹 Contact List Data
  const contactData = {
    title: tContact("title"),
    head_office: tContact("head_office"),
    email: tContact("email"),
    phone: tContact("phone"),
    map_embed: tContact("map_embed"),
    cities: tContact.raw("cities") as string[],
  };

  // 🔹 Form Data (FULL)
  const formData = {
    eyebrow: tForm("eyebrow"),
    title: tForm("title"),
    description: tForm("description"),
    fields: tForm.raw("fields") as string[],
    placeholders: tForm.raw("placeholders") as Record<string, string>,
    helper: tForm.raw("helper") as Record<string, string>,
    cta: tForm("cta"),
    bottom_note: tForm("bottom_note"),
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />

      <ContactList />
      <ContactForm data={formData} />
    </>
  );
}