import { Link } from "@/i18n/navitagion";
import { useTranslations } from "next-intl";

export const ServiceCTA = () => {
    const t = useTranslations("cta_service");

    return (
        <section className="margin spacing">
            <div className="relative overflow-hidden rounded-2xl bg-mainColor px-8 py-16 md:px-16 md:py-20">

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-white" />
                    <div className="absolute -bottom-16 -left-10 h-96 w-96 rounded-full bg-white" />
                </div>

                <div className="relative z-10 max-w-2xl">

                    {/* Eyebrow */}
                    <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        {t("eyebrow")}
                    </span>

                    {/* Heading */}
                    <h2 className="mb-4 text-3xl font-semibold leading-snug text-white md:text-4xl">
                        {t("heading")}
                    </h2>

                    {/* Subtext */}
                    <p className="mb-8 max-w-lg text-base leading-relaxed text-white/70">
                        {t("description")}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-mainColor transition hover:bg-neutral-100"
                        >
                            {t("primaryButton")}
                            <span>→</span>
                        </Link>

                        <Link
                            href="https://wa.me/62XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.5l5.797-1.452A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.67-.52-5.187-1.424l-.371-.22-3.844.962.998-3.742-.242-.385A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                            </svg>

                            {t("secondaryButton")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};