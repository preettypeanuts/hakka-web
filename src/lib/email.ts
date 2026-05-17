import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const CONTACT_TO = "general@hakkahydrotirta.com";

// ─── Brand tokens (selaras dengan website) ───────────────────────────────────
const BRAND = {
  navy: "#1e3a5f",
  navyDark: "#152b47",
  navyLight: "#2a4d7a",
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  text: "#1e293b",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  border: "#e2e8f0",
  bg: "#f8fafc",
  white: "#ffffff",
  success: "#059669",
  successLight: "#ecfdf5",
};

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

// ─── SMTP ─────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function logoSvg(): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="vertical-align:middle;padding-right:10px">
          <span style="display:inline-block;background:#fff;border-radius:8px;padding:3px 6px;border:1px solid #eee;box-shadow:0 1px 3px rgba(0,0,0,0.03);vertical-align:middle;">
            <img
              src="https://www.hakkahydrotirta.com/logo.png"
              alt="PT Hakka Hydro Tirta"
              width="28"
              height="28"
              style="display:block;border:0;filter:brightness(0) invert(1);vertical-align:middle;"
            />
          </span>
        </td>
        <td style="vertical-align:middle">
          <span style="font-size:15px;font-weight:700;color:${BRAND.white};letter-spacing:-0.3px">PT Hakka Hydro Tirta</span>
        </td>
      </tr>
    </table>`;
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>PT Hakka Hydro Tirta</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:'Segoe UI',system-ui,-apple-system,sans-serif;-webkit-text-size-adjust:100%">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};padding:32px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.navyDark} 0%,${BRAND.navyLight} 100%);border-radius:12px 12px 0 0;padding:28px 32px;border:1px solid ${BRAND.border};border-bottom:none">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>${logoSvg()}</td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1.5px">Integrated Logistics</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:${BRAND.white};border-left:1px solid ${BRAND.border};border-right:1px solid ${BRAND.border};padding:0">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:${BRAND.navyDark};border-radius:0 0 12px 12px;padding:20px 32px;border:1px solid ${BRAND.border};border-top:none">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.7);font-weight:600">PT Hakka Hydro Tirta</p>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4)">
                      Jl. Pantai Indah Kapuk, Jakarta Utara &nbsp;·&nbsp;
                      <a href="mailto:general@hakkahydrotirta.com" style="color:rgba(255,255,255,0.4);text-decoration:none">general@hakkahydrotirta.com</a>
                    </p>
                  </td>
                  <td align="right">
                    <a href="https://www.hakkahydrotirta.com" style="font-size:11px;color:rgba(255,255,255,0.4);text-decoration:none">hakkahydrotirta.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─── Inquiry email (ke internal) ──────────────────────────────────────────────

function buildFieldRows(fields: ContactField[]): string {
  return fields
    .map(
      (f, i) => `
      <tr style="background:${i % 2 === 0 ? BRAND.white : BRAND.bg}">
        <td style="padding:12px 16px;font-size:13px;font-weight:600;color:${BRAND.textMuted};white-space:nowrap;width:160px;border-bottom:1px solid ${BRAND.border}">
          ${escapeHtml(f.label)}
        </td>
        <td style="padding:12px 16px;font-size:13px;color:${BRAND.text};border-bottom:1px solid ${BRAND.border}">
          ${escapeHtml(f.value).replace(/\n/g, "<br>")}
        </td>
      </tr>`,
    )
    .join("");
}

function inquirySubject(payload: ContactPayload): string {
  const company = payload.fields.find((f) => f.key === "company")?.value ?? "—";
  return `[Website Contact] ${payload.senderName} — ${company}`;
}

function inquiryHtml(payload: ContactPayload): string {
  const submittedAt = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "long",
    timeStyle: "short",
  });

  const body = `
    <!-- Hero strip -->
    <div style="background:linear-gradient(135deg,${BRAND.navyDark} 0%,${BRAND.navyLight} 100%);padding:32px 32px 28px;border-bottom:3px solid ${BRAND.accent}">
      <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.5);font-weight:600">New Submission</p>
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.white};line-height:1.3">
        Contact Form Inquiry
      </h1>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6)">
        From <strong style="color:${BRAND.white}">${escapeHtml(payload.senderName)}</strong>
        &nbsp;·&nbsp; ${submittedAt} WIB
        &nbsp;·&nbsp; ${payload.locale.toUpperCase()}
      </p>
    </div>

    <!-- Fields table -->
    <div style="padding:24px 32px 0">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND.textLight}">
        Submission Details
      </p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${BRAND.border}">
      ${buildFieldRows(payload.fields)}
    </table>

    <!-- Reply CTA -->
    <div style="padding:24px 32px 32px">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:${BRAND.accentLight};border-radius:8px;border:1px solid #bfdbfe;padding:14px 18px">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:${BRAND.accent}">Reply to sender</p>
            <a href="mailto:${escapeHtml(payload.senderEmail)}" style="font-size:13px;color:${BRAND.text};text-decoration:none;font-weight:500">
              ${escapeHtml(payload.senderEmail)}
            </a>
          </td>
        </tr>
      </table>
    </div>`;

  return emailWrapper(body);
}

// ─── Confirmation email (ke pengirim) ─────────────────────────────────────────

function confirmationContent(
  locale: string,
  name: string,
  fields: ContactField[],
) {
  const safeName = escapeHtml(name);
  const isId = locale === "id";

  const copy = {
    greeting: isId ? `Terima kasih, ${safeName}!` : `Thank you, ${safeName}!`,
    intro: isId
      ? "Kami telah menerima pesan Anda melalui formulir kontak di website PT Hakka Hydro Tirta."
      : "We've received your message via the contact form on the PT Hakka Hydro Tirta website.",
    body: isId
      ? "Tim kami akan meninjau kebutuhan Anda dan menghubungi Anda kembali dalam waktu <strong>1×24 jam kerja</strong>."
      : "Our team will review your inquiry and get back to you within <strong>1 business day</strong>.",
    urgentLabel: isId
      ? "Butuh respons lebih cepat?"
      : "Need a faster response?",
    urgentText: isId
      ? "Hubungi kami langsung via WhatsApp."
      : "Reach us directly via WhatsApp.",
    whatsapp: "Chat via WhatsApp",
    summaryLabel: isId ? "Ringkasan pengiriman" : "Submission summary",
    subject: isId
      ? "Pesan Anda telah kami terima — PT Hakka Hydro Tirta"
      : "We received your message — PT Hakka Hydro Tirta",
  };

  const summaryRows = fields
    .slice(0, 4) // max 4 baris di konfirmasi, biar ringkas
    .map(
      (f) => `
      <tr>
        <td style="padding:8px 12px;font-size:12px;color:${BRAND.textMuted};font-weight:600;white-space:nowrap;width:120px">
          ${escapeHtml(f.label)}
        </td>
        <td style="padding:8px 12px;font-size:12px;color:${BRAND.text}">
          ${escapeHtml(f.value).replace(/\n/g, "<br>")}
        </td>
      </tr>`,
    )
    .join("");

  const body = `
    <!-- Hero -->
    <div style="background:linear-gradient(135deg,${BRAND.navyDark} 0%,${BRAND.navyLight} 100%);padding:32px;border-bottom:3px solid ${BRAND.accent}">
      <div style="width:48px;height:48px;background:rgba(255,255,255,0.12);border-radius:12px;margin-bottom:16px;text-align:center;line-height:48px">
        <span style="font-size:22px">✓</span>
      </div>
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.white};line-height:1.3">
        ${copy.greeting}
      </h1>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6">
        ${copy.intro}
      </p>
    </div>

    <!-- Message -->
    <div style="padding:28px 32px 0">
      <p style="margin:0 0 20px;font-size:14px;color:${BRAND.text};line-height:1.7">
        ${copy.body}
      </p>

      <!-- Summary box -->
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND.textLight}">
        ${copy.summaryLabel}
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;margin-bottom:24px;font-size:13px">
        ${summaryRows}
      </table>

      <!-- WhatsApp CTA -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px">
        <tr>
          <td style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:8px;padding:14px 18px">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:${BRAND.text}">${copy.urgentLabel}</p>
            <p style="margin:0 0 10px;font-size:12px;color:${BRAND.textMuted}">${copy.urgentText}</p>
            <a href="https://wa.me/6282211116875"
              style="display:inline-block;background:#25d366;color:${BRAND.white};font-size:12px;font-weight:600;padding:8px 16px;border-radius:6px;text-decoration:none">
              ${copy.whatsapp}
            </a>
          </td>
        </tr>
      </table>
    </div>`;

  return { subject: copy.subject, html: emailWrapper(body) };
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function sendContactEmails(
  payload: ContactPayload,
): Promise<void> {
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

  const confirmation = confirmationContent(
    payload.locale,
    payload.senderName,
    payload.fields,
  );

  await transport.sendMail({
    from,
    to: payload.senderEmail,
    subject: confirmation.subject,
    html: confirmation.html,
  });
}
