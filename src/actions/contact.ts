"use server";

import { sendContactEmails, type ContactField } from "@/lib/email";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldDefinition = {
  key: string;
  label: string;
  type: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = String(formData.get("locale") ?? "en");
  const fieldsJson = formData.get("fields");

  if (typeof fieldsJson !== "string") {
    return { ok: false, message: "invalid_payload" };
  }

  let fieldDefs: FieldDefinition[];

  try {
    fieldDefs = JSON.parse(fieldsJson) as FieldDefinition[];
  } catch {
    return { ok: false, message: "invalid_payload" };
  }

  const contactFields: ContactField[] = fieldDefs.map((def) => ({
    key: def.key,
    label: def.label,
    value: String(formData.get(def.key) ?? "").trim(),
  }));

  for (const field of contactFields) {
    if (!field.value) {
      return { ok: false, message: "required" };
    }
  }

  const senderEmail =
    contactFields.find((f) => f.key === "email")?.value ?? "";
  if (!EMAIL_RE.test(senderEmail)) {
    return { ok: false, message: "invalid_email" };
  }

  const senderName =
    contactFields.find((f) => f.key === "fullName")?.value || senderEmail;

  try {
    await sendContactEmails({
      locale,
      fields: contactFields,
      senderEmail,
      senderName,
    });
    return { ok: true, message: "success" };
  } catch (error) {
    console.error("[contact-form]", error);
    return { ok: false, message: "send_failed" };
  }
}
