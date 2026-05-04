import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";
import { Mail, Phone } from "lucide-react";

export const ContactList = () => {
    const t = useTranslations("contact");

    const cities = t.raw("cities") as string[];

    return (
        <section className="margin spacing">

            {/* Title */}
            <div className="mb-10">
                <SectionTitle>
                    {t("title")}
                </SectionTitle>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">

                {/* LEFT - Info */}
                <div className="space-y-6">

                    {/* Office */}
                    <div>
                        <p className="text-sm text-neutral-400 uppercase mb-1">
                            Head Office
                        </p>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            {t("head_office")}
                        </h3>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                        <div
                            className="text-neutral-700 flex flex-col gap-3 p-4 border border-neutral-200 rounded-third w-fit bg-white">
                            <p className="flex items-center gap-2 uppercase text-xs">
                                <Mail size={13} />
                                {t("email_label")}
                            </p>
                            <p>
                                {t("email")}
                            </p>
                        </div>
                        <div
                            className="text-neutral-700 flex flex-col gap-3 p-4 border border-neutral-200 rounded-third w-fit bg-white">
                            <p className="flex items-center gap-2 uppercase text-xs">
                                <Phone size={13} />
                                {t("phone_label")}
                            </p>
                            <p>
                                {t("phone")}
                            </p>
                        </div>
                    </div>

                    {/* Cities */}
                    <div>
                        <p className="text-sm text-neutral-400 uppercase mb-2">
                            Coverage Area
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {cities.map((city, i) => (
                                <span
                                    key={i}
                                    className="text-sm px-3 py-1 bg-white rounded-full"
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT - Map */}
                <div className="w-full h-87.5 rounded-main overflow-hidden border border-neutral-200">
                    <iframe
                        src={'https://www.google.com/maps?q=PIK+Jakarta&output=embed'}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

            </div>
        </section>
    );
};