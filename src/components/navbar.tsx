"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navitagion";
import { Menu } from "lucide-react";


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
        <>
            <nav className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 
            ${visible ? "translate-y-0" : "-translate-y-full"}
            ${isScrolled ? "bg-mainColor/80 backdrop-blur-sm shadow-md" : "bg-transparent"}
        `}>
                <div className="margin h-18 grid grid-cols-2 md:grid-cols-3 items-center">

                    <Link href="/"
                        className="justify-self-start"
                    >
                        <Image
                            width={50}
                            height={50}
                            src="/logobnw.png"
                            alt="Logo"
                            className="h-10 w-22 object-cover invert"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 text-[16px] font-medium text-white justify-self-center">
                        <Link href="/">{t("menu.home")}</Link>
                        <Link href="/about">{t("menu.about")}</Link>
                        <Link href="/services">{t("menu.services")}</Link>
                        <Link href="/contact">{t("menu.contact")}</Link>
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex gap-2 justify-self-end">
                        <LanguageSwitcher />
                        <Button className={`${isScrolled ? "bg-white text-primary hover:bg-gray-100" : "bg-mainColor"}`}>
                            {t("cta.contact")}
                        </Button>
                    </div>

                    {/* Mobile Button */}
                    <button className="md:hidden justify-self-end" onClick={() => setIsOpen(!isOpen)}>
                        <div className="text-white">
                            <Menu />
                        </div>
                    </button>
                </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow-md">
                    <Link href="/" className="py-2 border-b">{t("menu.home")}</Link>
                    <Link href="/about" className="py-2 border-b">{t("menu.about")}</Link>
                    <Link href="/services" className="py-2 border-b">{t("menu.services")}</Link>
                    <Link href="/contact" className="py-2 border-b">{t("menu.contact")}</Link>

                    <Link href="/contact" className="mt-2 text-center px-4 py-2 bg-primary text-white">
                        {t("cta.contact")}
                    </Link>
                </div>
            )}
            </nav>

        </>

    );
};