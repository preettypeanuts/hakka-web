"use client";

import { useActionState } from "react";
import {
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/actions/contact";

export type FormFieldItem = {
  key: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
};

type FormDataType = {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  field_items: FormFieldItem[];
  placeholders?: Record<string, string>;
  helper?: Record<string, string>;
  cta: string;
  sending: string;
  bottom_note: string;
  status: {
    success: string;
    error: string;
    required: string;
    invalid_email: string;
  };
};

const initialState: ContactFormState = { ok: false, message: "" };

export const ContactForm = ({ data }: { data: FormDataType }) => {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  const getIcon = (field: FormFieldItem) => {
    const key = field.key.toLowerCase();
    if (key.includes("name")) return <User size={18} />;
    if (key.includes("company")) return <Building2 size={18} />;
    if (key === "email") return <Mail size={18} />;
    if (key.includes("whatsapp") || key.includes("phone"))
      return <Phone size={18} />;
    return <MessageSquare size={18} />;
  };

  const placeholders = data.placeholders ?? {};
  const helper = data.helper ?? {};

  const statusMessage = (() => {
    if (!state.message) return null;
    if (state.ok) return data.status.success;
    switch (state.message) {
      case "required":
        return data.status.required;
      case "invalid_email":
        return data.status.invalid_email;
      default:
        return data.status.error;
    }
  })();

  return (
    <section className="margin spacing">
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        <div className="relative rounded-main overflow-hidden bg-neutral-900 text-white p-8 flex flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
            alt="logistics"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 space-y-5">
            <p className="text-sm uppercase tracking-widest text-white/70">
              {data.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold leading-snug">{data.title}</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>
          <p className="relative z-10 text-sm text-white/60">{data.bottom_note}</p>
        </div>

        <form
          action={formAction}
          suppressHydrationWarning
          className="bg-white border border-neutral-200 rounded-main p-8 shadow-sm"
        >
          <input type="hidden" name="locale" value={data.locale} />
          <input
            type="hidden"
            name="fields"
            value={JSON.stringify(data.field_items)}
          />

          <div className="space-y-6">
            {data.field_items.map((field) => {
              const isTextarea = field.type === "textarea";

              return (
                <div key={field.key} className="space-y-2">
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium text-neutral-700"
                  >
                    {field.label}
                  </label>
                  <div className="flex items-start gap-3 border border-neutral-200 rounded-main px-4 py-3 focus-within:ring-2 focus-within:ring-mainColor transition">
                    <div className="text-neutral-400 mt-1">{getIcon(field)}</div>
                    {isTextarea ? (
                      <textarea
                        id={field.key}
                        name={field.key}
                        required
                        rows={4}
                        disabled={isPending}
                        placeholder={
                          placeholders[field.key] ??
                          `Enter ${field.label.toLowerCase()}`
                        }
                        className="w-full outline-none text-sm resize-none disabled:opacity-60"
                      />
                    ) : (
                      <input
                        id={field.key}
                        name={field.key}
                        required
                        disabled={isPending}
                        type={field.type}
                        placeholder={
                          placeholders[field.key] ??
                          `Enter ${field.label.toLowerCase()}`
                        }
                        className="w-full outline-none text-sm disabled:opacity-60"
                      />
                    )}
                  </div>
                  {helper[field.key] && (
                    <p className="text-xs text-neutral-400">{helper[field.key]}</p>
                  )}
                </div>
              );
            })}

            {statusMessage && (
              <div
                role="alert"
                className={`flex items-start gap-2 rounded-main px-4 py-3 text-sm ${
                  state.ok
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {state.ok ? (
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-main bg-mainColor text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {data.sending}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {data.cta}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
