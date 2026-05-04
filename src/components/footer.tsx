import { Link } from "@/i18n/navitagion";
import { useTranslations } from "next-intl";

import Image from "next/image";

export const Footer = () => {
    const t = useTranslations("footer");

    const navLinks = [
        { href: "/", label: t("navigation.home") },
        { href: "/about", label: t("navigation.about") },
        { href: "/services", label: t("navigation.services") },
        { href: "/contact", label: t("navigation.contact") },
    ];
    

    return (
        <footer className="bg-white border-t border-neutral-200 text-neutral-800 overflow-hidden">

            {/* Top bar — nav links */}
            <div className="margin border-b border-neutral-100 py-5 flex flex-wrap gap-6 md:gap-10">
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 tracking-wide"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* Main content */}
            <div className="margin py-14 flex flex-col md:flex-row justify-between gap-10">

                {/* Left */}
                <div className="max-w-xs">
                    <Image
                        src="/logobnw.png"
                        alt="Logo"
                        width={90}
                        height={30}
                        className="mb-5 opacity-80"
                    />
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        {t("tagline")}
                    </p>
                </div>

                {/* Right — Contact */}
                <div>
                    <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-5">
                        {t("contact.title")}
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-neutral-500">
                        <span className="max-w-56 leading-relaxed">{t("contact.address")}</span>
                        <a href={`mailto:${t("contact.email")}`} className="hover:text-neutral-900 transition-colors duration-200">
                            {t("contact.email")}
                        </a>
                        <a href={`tel:${t("contact.phone")}`} className="hover:text-neutral-900 transition-colors duration-200">
                            {t("contact.phone")}
                        </a>
                    </div>
                </div>

            </div>

            {/* Ghost brand name */}
            <div className="margin">
                <p className="text-[clamp(60px,12vw,140px)] truncate font-bold leading-none tracking-tighter bg-linear-to-b from-neutral-300 to-transparent text-transparent bg-clip-text select-none -mb-3">
                    HAKKA HYDRO TIRTA
                </p>
            </div>

            {/* Bottom bar */}
            <div className="margin pb-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-neutral-100">
                <p className="text-xs text-neutral-400">
                    {t("legal.copyright")}
                </p>
                <p className="text-xs text-neutral-300 uppercase tracking-widest">
                    Logistics · Jakarta
                </p>
            </div>

        </footer>
    );
};