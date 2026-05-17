import { Reveal } from "@/components/animate-reveal";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { PageHero } from "@/components/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import type { FormFieldItem } from "@/components/contact-form";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta_contact" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
    locale,
    eyebrow: tForm("eyebrow"),
    title: tForm("title"),
    description: tForm("description"),
    field_items: tForm.raw("field_items") as FormFieldItem[],
    placeholders: tForm.raw("placeholders") as Record<string, string>,
    helper: tForm.raw("helper") as Record<string, string>,
    cta: tForm("cta"),
    sending: tForm("sending"),
    bottom_note: tForm("bottom_note"),
    status: {
      success: tForm("status.success"),
      error: tForm("status.error"),
      required: tForm("status.required"),
      invalid_email: tForm("status.invalid_email"),
    },
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image={t("image")}
      />

      <Reveal variant="fade-up" delay={200}>
        <ContactList />
      </Reveal>

      <Reveal variant="fade-up" delay={200}>
        <ContactForm data={formData} />
      </Reveal>
    </>
  );
}