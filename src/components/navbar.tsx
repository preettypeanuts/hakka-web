"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";

export const Navbar = () => {
    const t = useTranslations("navbar");

    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
        setIsScrolled(currentScrollPos > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible]);

    return (
        <nav className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 
            ${visible ? "translate-y-0" : "-translate-y-full"}
            ${isScrolled ? "bg-mainColor/80 backdrop-blur-sm shadow-md" : "bg-transparent"}
        `}>
            <div className="margin h-18 flex items-center justify-between">

                {/* Logo */}
                <Image
                    width={50}
                    height={50}
                    src="/logobnw.png"
                    alt="Logo"
                    className="h-10 w-22 object-cover invert"
                />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-[16px] font-medium text-white">
                    <a href="#">{t("menu.home")}</a>
                    <a href="#">{t("menu.about")}</a>
                    <a href="#">{t("menu.services")}</a>
                    <a href="#">{t("menu.contact")}</a>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex gap-2">
                    <LanguageSwitcher />
                    <Button className={`${isScrolled ? "bg-white text-primary hover:bg-gray-100" : "bg-mainColor"}`}>
                        {t("cta.contact")}
                    </Button>
                </div>

                {/* Mobile Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <div className="space-y-1">
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow-md">
                    <a className="py-2 border-b">{t("menu.home")}</a>
                    <a className="py-2 border-b">{t("menu.about")}</a>
                    <a className="py-2 border-b">{t("menu.services")}</a>
                    <a className="py-2 border-b">{t("menu.contact")}</a>

                    <a className="mt-2 text-center px-4 py-2 bg-blue-600 text-white rounded-lg">
                        {t("cta.contact")}
                    </a>
                </div>
            )}
        </nav>
    );
};