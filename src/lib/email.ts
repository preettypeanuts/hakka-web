import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const CONTACT_TO = "general@hakkahydrotirta.com";

export type ContactField = {
  key: string;
  label: string;
  value: string;
};

export type ContactPayload = {
  locale: string;
  fields: ContactField[];
  senderEmail: string;
  senderName: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !from) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    );
  }

  return { host, port, user, pass, from };
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    const { host, port, user, pass } = getSmtpConfig();
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildFieldsHtml(fields: ContactField[]): string {
  return fields
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#334155;vertical-align:top">${escapeHtml(f.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#475569">${escapeHtml(f.value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
}

function inquirySubject(payload: ContactPayload): string {
  const company =
    payload.fields.find((f) => f.key === "company")?.value ?? "—";
  return `[Website Contact] ${payload.senderName} — ${company}`;
}

function inquiryHtml(payload: ContactPayload): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#2a4166;margin:0 0 16px">New contact form submission</h2>
      <p style="color:#64748b;margin:0 0 20px">Submitted from the website (${escapeHtml(payload.locale.toUpperCase())}).</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${buildFieldsHtml(payload.fields)}</table>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">Reply directly to ${escapeHtml(payload.senderEmail)}</p>
    </div>
  `;
}

function confirmationContent(locale: string, name: string) {
  const safeName = escapeHtml(name);

  if (locale === "id") {
    return {
      subject: "Pesan Anda telah kami terima — PT Hakka Hydro Tirta",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#334155">
          <h2 style="color:#2a4166">Terima kasih, ${safeName}!</h2>
          <p>Kami telah menerima pesan Anda melalui formulir kontak di website PT Hakka Hydro Tirta.</p>
          <p>Tim kami akan meninjau kebutuhan Anda dan menghubungi Anda kembali dalam waktu <strong>1×24 jam kerja</strong>.</p>
          <p style="color:#64748b;font-size:14px">Jika urgent, Anda juga dapat menghubungi kami melalui WhatsApp di website kami.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
          <p style="font-size:12px;color:#94a3b8">PT Hakka Hydro Tirta<br/>general@hakkahydrotirta.com</p>
        </div>
      `,
    };
  }

  return {
    subject: "We received your message — PT Hakka Hydro Tirta",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#334155">
        <h2 style="color:#2a4166">Thank you, ${safeName}!</h2>
        <p>We have received your message via the contact form on the PT Hakka Hydro Tirta website.</p>
        <p>Our team will review your request and get back to you within <strong>1 business day</strong>.</p>
        <p style="color:#64748b;font-size:14px">For urgent matters, you can also reach us via WhatsApp on our website.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
        <p style="font-size:12px;color:#94a3b8">PT Hakka Hydro Tirta<br/>general@hakkahydrotirta.com</p>
      </div>
    `,
  };
}


export async function sendContactEmails(payload: ContactPayload): Promise<void> {
  const { from } = getSmtpConfig();
  const transport = getTransporter();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_TO;

  const inquiryText = payload.fields
    .map((f) => `${f.label}: ${f.value}`)
    .join("\n");

  await transport.sendMail({
    from,
    to,
    replyTo: payload.senderEmail,
    subject: inquirySubject(payload),
    text: `New contact form submission (${payload.locale})\n\n${inquiryText}`,
    html: inquiryHtml(payload),
  });

  const confirmation = confirmationContent(payload.locale, payload.senderName);

  await transport.sendMail({
    from,
    to: payload.senderEmail,
    subject: confirmation.subject,
    html: confirmation.html,
  });
}
