"use client";

import Image from "next/image";
import { Link } from "@/i18n/navitagion";
import { useTranslations } from "next-intl";
import { MegaMenuServiceCard } from "./MegaMenuServiceCard";

interface ServiceGroup {
    title: string;
    items: { name: string; desc: string; href?: string }[];
}

interface MobileMenuProps {
    isOpen: boolean;
    serviceGroups: ServiceGroup[];
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, serviceGroups, onClose }: MobileMenuProps) => {
    const t = useTranslations("navbar");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-18 border-b">
                <Image
                    src="/logobnw.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="h-10 w-22 object-cover"
                />
                <button
                    onClick={onClose}
                    className="p-2 rounded-full border hover:bg-neutral-100 transition"
                >
                    ✕
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {/* Main Links */}
                <div className="space-y-4">
                    <Link href="/" onClick={onClose} className="block text-lg font-semibold">
                        {t("menu.home")}
                    </Link>
                    <Link href="/about" onClick={onClose} className="block text-lg font-semibold">
                        {t("menu.about")}
                    </Link>
                </div>

                {/* Services */}
                <div>
                    <p className="text-sm text-neutral-400 uppercase mb-3">
                        {t("menu.services.label")}
                    </p>

                    <div className="space-y-6">
                        {serviceGroups.map((group, i) => (
                            <div key={i}>
                                <p className="text-xs text-neutral-400 mb-2">{group.title}</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {group.items.map((item, j) => (
                                        <MegaMenuServiceCard
                                            key={j}
                                            item={item}
                                            compact
                                            onClick={onClose}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Link */}
                <Link href="/contact" onClick={onClose} className="block text-lg font-semibold">
                    {t("menu.contact")}
                </Link>
            </div>

            {/* CTA Fixed Bottom */}
            <div className="p-4 border-t bg-white">
                <Link
                    href="/contact"
                    onClick={onClose}
                    className="block w-full text-center bg-mainColor text-white py-3 rounded-full font-medium hover:opacity-90 transition"
                >
                    {t("cta.contact")}
                </Link>
            </div>
        </div>
    );
};
