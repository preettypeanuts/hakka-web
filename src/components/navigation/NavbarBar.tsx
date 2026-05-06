"use client";

import Image from "next/image";
import { Link } from "@/i18n/navitagion";
import { Button } from "../ui/button";
import LanguageSwitcher from "../language-switcher";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { toWhatsApp } from "@/lib/actions";

interface NavbarBarProps {
    visible: boolean;
    isScrolled: boolean;
    activeMega: boolean;
    onMegaEnter: () => void;
    onMegaLeave: () => void;
    onMobileToggle: () => void;
}

export const NavbarBar = ({
    visible,
    isScrolled,
    activeMega,
    onMegaEnter,
    onMegaLeave,
    onMobileToggle,
}: NavbarBarProps) => {
    const t = useTranslations("navbar");

    return (
        <nav
            className={`w-full fixed top-0 left-0 z-50 transition-all duration-300
                ${visible ? "translate-y-0" : "-translate-y-full"}
                ${isScrolled || activeMega
                    ? "bg-mainColor/90 backdrop-blur-md shadow-md"
                    : "bg-transparent"
                }`}
        >
            <div className="margin h-18 grid grid-cols-2 md:grid-cols-3 items-center">
                {/* Logo */}
                <Link href="/" className="justify-self-start">
                    <Image
                        width={50}
                        height={50}
                        src="/logobnw.png"
                        alt="Logo"
                        className="h-10 w-22 object-cover invert"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-[15px] font-medium text-white justify-self-center">
                    <Link href="/">{t("menu.home")}</Link>

                    {/* Services trigger */}
                    <div
                        onMouseEnter={onMegaEnter}
                        onMouseLeave={onMegaLeave}
                        className="flex items-center gap-1 cursor-pointer"
                    >
                        <span>{t("menu.services.label")}</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${activeMega ? "rotate-180" : ""}`}
                        />
                    </div>

                    <Link href="/about">{t("menu.about")}</Link>
                    <Link href="/contact">{t("menu.contact")}</Link>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex gap-2 justify-self-end">
                    <LanguageSwitcher />
                    <Link href={toWhatsApp}>
                        <Button
                            className={`${isScrolled || activeMega
                                ? "bg-white text-primary hover:bg-gray-100"
                                : "bg-mainColor"
                                }`}
                        >
                            {t("cta.contact")}
                        </Button>
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button className="md:hidden justify-self-end" onClick={onMobileToggle}>
                    <div className="text-white">
                        <Menu />
                    </div>
                </button>
            </div>
        </nav>
    );
};
