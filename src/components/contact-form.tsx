"use client";

import { useState } from "react";
import {
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Send
} from "lucide-react";

type FormDataType = {
  eyebrow: string;
  title: string;
  description: string;
  fields: string[];
  placeholders?: Record<string, string>;
  helper?: Record<string, string>;
  cta: string;
  bottom_note: string;
};

export const ContactForm = ({ data }: { data: FormDataType }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = Object.entries(formState)
      .map(([key, val]) => `${key}: ${val}`)
      .join("%0A");

    window.open(`https://wa.me/628xxxxxxxxxx?text=${message}`, "_blank");
  };

  // 🔥 icon mapping bilingual
  const getIcon = (field: string) => {
    const f = field.toLowerCase();

    if (f.includes("name") || f.includes("nama")) return <User size={18} />;
    if (f.includes("company") || f.includes("perusahaan")) return <Building2 size={18} />;
    if (f.includes("email")) return <Mail size={18} />;
    if (f.includes("whatsapp")) return <Phone size={18} />;
    return <MessageSquare size={18} />;
  };

  const placeholders = data.placeholders || {};
  const helper = data.helper || {};

  return (
    <section className="margin spacing">
      <div className="grid md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT - VISUAL */}
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

            <h2 className="text-3xl font-semibold leading-snug">
              {data.title}
            </h2>

            <p className="text-white/80 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/60">
            {data.bottom_note}
          </p>
        </div>

        {/* RIGHT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-neutral-200 rounded-main p-8 shadow-sm"
        >
          <div className="space-y-6">

            {data.fields.map((field, i) => {
              const isTextarea = field.toLowerCase().includes("description") || field.toLowerCase().includes("deskripsi");

              return (
                <div key={i} className="space-y-2">

                  {/* Label */}
                  <label className="text-sm font-medium text-neutral-700">
                    {field}
                  </label>

                  {/* Input wrapper */}
                  <div className="flex items-start gap-3 border border-neutral-200 rounded-main px-4 py-3 focus-within:ring-2 focus-within:ring-mainColor transition">

                    <div className="text-neutral-400 mt-1">
                      {getIcon(field)}
                    </div>

                    {isTextarea ? (
                      <textarea
                        rows={4}
                        placeholder={
                          placeholders[field] ||
                          `Enter ${field.toLowerCase()}`
                        }
                        className="w-full outline-none text-sm resize-none"
                        onChange={(e) =>
                          handleChange(field, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type={
                          field.toLowerCase().includes("email")
                            ? "email"
                            : field.toLowerCase().includes("phone") ||
                              field.toLowerCase().includes("whatsapp")
                            ? "tel"
                            : "text"
                        }
                        placeholder={
                          placeholders[field] ||
                          `Enter ${field.toLowerCase()}`
                        }
                        className="w-full outline-none text-sm"
                        onChange={(e) =>
                          handleChange(field, e.target.value)
                        }
                      />
                    )}
                  </div>

                  {/* Helper text */}
                  {helper[field] && (
                    <p className="text-xs text-neutral-400">
                      {helper[field]}
                    </p>
                  )}
                </div>
              );
            })}

            {/* CTA */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-main 
                bg-mainColor text-white font-medium
                hover:opacity-90 transition-all
                flex items-center justify-center gap-2
              "
            >
              <Send className="size-4"/>{data.cta}
            </button>

          </div>
        </form>

      </div>
    </section>
  );
};