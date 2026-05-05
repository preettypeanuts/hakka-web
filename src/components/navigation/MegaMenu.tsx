"use client";

import { Link } from "@/i18n/navitagion";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { MegaMenuServiceCard } from "./MegaMenuServiceCard";

interface ServiceGroup {
    title: string;
    items: { name: string; desc: string; href?: string }[];
}

interface MegaCta {
    title: string;
    desc: string;
    button: string;
    href: string;
}

interface MegaMenuProps {
    active: boolean;
    serviceGroups: ServiceGroup[];
    megaCta: MegaCta;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const MegaMenu = ({
    active,
    serviceGroups,
    megaCta,
    onMouseEnter,
    onMouseLeave,
}: MegaMenuProps) => {
    const t = useTranslations("navbar");

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`fixed left-0 top-0 w-full z-40 transition-all duration-300
                ${active
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
        >
            <div className="relative mt-18 bg-white rounded-b-3xl shadow-xl">
                {/* Service Groups Grid */}
                <div className="margin py-12 grid grid-cols-3 gap-8">
                    {serviceGroups.map((group, i) => (
                        <div key={i}>
                            <p className="text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wide">
                                {group.title}
                            </p>
                            <div className="grid gap-3">
                                {group.items.map((item, j) => (
                                    <MegaMenuServiceCard key={j} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Bar */}
                <div className="border-t border-neutral-200 bg-neutral-50 rounded-b-main">
                    <div className="margin py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-neutral-800">{megaCta.title}</p>
                            <p className="text-sm text-neutral-500">{megaCta.desc}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <Link href="/service">
                                <button className="px-6 py-2 bg-otherColor rounded-full border border-neutral-200 text-neutral-800 text-sm font-medium hover:bg-neutral-100 transition">
                                    {t("menu.label_service")}
                                </button>
                            </Link>
                            <Link href={megaCta.href}>
                                <button className="px-6 py-2 flex items-center gap-2 rounded-full bg-mainColor text-white text-sm font-medium hover:opacity-90 transition">
                                    {megaCta.button} <Phone className="size-3 fill-white" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
