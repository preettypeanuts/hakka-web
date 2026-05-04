import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";
import Image from "next/image";

export const AboutUs = () => {
    const t = useTranslations("about_us");

    return (
        <section className="margin spacing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-130">

                {/* Image Side */}
                <div className="relative overflow-hidden rounded-2xl lg:rounded-r-none lg:rounded-l-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={t("title")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
                </div>

                {/* Content Side */}
                <div className="
                    flex flex-col justify-center
                    bg-neutral-50
                    rounded-2xl lg:rounded-l-none lg:rounded-r-2xl
                    px-8 py-12
                    lg:px-14 lg:py-16
                    border border-neutral-100
                    lg:border-l-0
                ">
                    {/* Eyebrow label */}
                    <span className="
                        text-xs tracking-[0.2em] uppercase
                        text-neutral-400 font-medium
                        mb-4 block
                    ">
                        {t("eyebrow")}
                    </span>

                    {/* Title */}
                    <div className="mb-6">
                        <SectionTitle>
                            {t("title")}
                        </SectionTitle>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-px bg-neutral-300 mb-6" />

                    {/* Paragraph */}
                    <p className="
                        text-neutral-600
                        text-base md:text-lg
                        leading-relaxed
                        text-justify
                        max-w-prose
                    ">
                        {t("paragraph")}
                    </p>
                </div>

            </div>
        </section>
    );
};