"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navitagion";
import {
    Menu,
    ChevronDown,
    Ship,
    Plane,
    Truck,
    Warehouse,
    Globe,
    Package
} from "lucide-react";

export const Navbar = () => {
    const t = useTranslations("navbar");

    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState(false);

    let timeout: any;

    const handleScroll = () => {
        if (activeMega) return; // 🔥 freeze scroll behavior saat mega aktif

        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
        setIsScrolled(currentScrollPos > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, activeMega]);

    const openMega = () => {
        clearTimeout(timeout);
        setActiveMega(true);
    };

    const closeMega = () => {
        timeout = setTimeout(() => {
            setActiveMega(false);
        }, 120);
    };

    const megaCta = t.raw("cta_mega") as {
        title: string;
        desc: string;
        button: string;
        href: string;
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    // 🔥 icon mapping (clean & scalable)
    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("sea")) return <Ship size={20} />;
        if (n.includes("air")) return <Plane size={20} />;
        if (n.includes("truck")) return <Truck size={20} />;
        if (n.includes("warehouse")) return <Warehouse size={20} />;
        if (n.includes("export") || n.includes("import")) return <Globe size={20} />;
        return <Package size={20} />;
    };

    const serviceGroups = t.raw("menu.services.groups") as {
        title: string;
        items: { name: string; desc: string; href: string }[];
    }[];

    return (
        <>
            {(isOpen || activeMega) && (
                <div
                    onClick={() => {
                        setIsOpen(false);
                        setActiveMega(false);
                    }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30"
                />
            )}
            {/* NAVBAR */}
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

                        {/* SERVICES */}
                        <div
                            onMouseEnter={openMega}
                            onMouseLeave={closeMega}
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            <span>{t("menu.services.label")}</span>

                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${activeMega ? "rotate-180" : ""
                                    }`}
                            />
                        </div>

                        <Link href="/about">{t("menu.about")}</Link>

                        <Link href="/contact">{t("menu.contact")}</Link>
                    </div>

                    {/* Right */}
                    <div className="hidden md:flex gap-2 justify-self-end">
                        <LanguageSwitcher />
                        <Button
                            className={`${isScrolled || activeMega
                                ? "bg-white text-primary hover:bg-gray-100"
                                : "bg-mainColor"
                                }`}
                        >
                            {t("cta.contact")}
                        </Button>
                    </div>

                    {/* Mobile */}
                    <button
                        className="md:hidden justify-self-end"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="text-white">
                            <Menu />
                        </div>
                    </button>
                </div>
            </nav>

            {/* 🔥 MEGA MENU */}
            <div
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                className={`
        fixed left-0 top-0 w-full z-40 transition-all duration-300
        ${activeMega
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }
      `}
            >

                {/* content */}
                <div className="relative mt-18 bg-white rounded-b-3xl shadow-xl">
                    <div className="margin py-12 grid grid-cols-3 gap-8">

                        {serviceGroups.map((group, i) => (
                            <div key={i}>
                                <p className="text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wide">
                                    {group.title}
                                </p>

                                <div className="grid gap-3">
                                    {group.items.map((item, j) => (
                                        <Link
                                            key={j}
                                            href={item.href}
                                            className="
                        group p-4 rounded-secondary border border-neutral-100 bg-neutral-100
                        hover:border-mainColor hover:bg-mainColor/5
                        transition-all duration-300
                        hover:shadow-md hover:-translate-y-1
                        flex gap-3 items-start
                      "
                                        >
                                            {/* ICON */}
                                            <div className="text-mainColor flex itemcenter justify-center rounded-third bg-otherColorDark p-3">
                                                {getIcon(item.name)}
                                            </div>

                                            {/* TEXT */}
                                            <div>
                                                <p className="font-medium text-neutral-800 group-hover:text-mainColor transition">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-neutral-500 leading-snug">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* 🔥 CTA BAR */}
                    <div className="border-t border-neutral-200 bg-neutral-50 rounded-b-main">
                        <div className="margin py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                            <div>
                                <p className="font-semibold text-neutral-800">
                                    {megaCta.title}
                                </p>
                                <p className="text-sm text-neutral-500">
                                    {megaCta.desc}
                                </p>
                            </div>

                            <Link href={megaCta.href}>
                                <button className=" px-6 py-2 rounded-full bg-mainColor text-white text-sm font-medium hover:opacity-90 transition">
                                    {megaCta.button} →
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 h-18 border-b">
                        <Image
                            src="/logobnw.png"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="h-10 w-22 object-cover"
                        />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-full border hover:bg-neutral-100 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

                        {/* MAIN MENU */}
                        <div className="space-y-4">
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="block text-lg font-semibold"
                            >
                                {t("menu.home")}
                            </Link>

                            <Link
                                href="/about"
                                onClick={() => setIsOpen(false)}
                                className="block text-lg font-semibold"
                            >
                                {t("menu.about")}
                            </Link>
                        </div>

                        {/* SERVICES */}
                        <div>
                            <p className="text-sm text-neutral-400 uppercase mb-3">
                                {t("menu.services.label")}
                            </p>

                            <div className="space-y-6">
                                {serviceGroups.map((group, i) => (
                                    <div key={i}>
                                        <p className="text-xs text-neutral-400 mb-2">
                                            {group.title}
                                        </p>

                                        {/* tiles */}
                                        <div className="grid grid-cols-1 gap-3">
                                            {group.items.map((item, j) => (
                                                <Link
                                                    key={j}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="
                      flex gap-3 items-start
                      p-4 rounded-xl border border-neutral-200
                      bg-neutral-50
                      hover:bg-mainColor/5
                      transition
                    "
                                                >
                                                    {/* ICON */}
                                                    <div className="text-mainColor mt-1">
                                                        {getIcon(item.name)}
                                                    </div>

                                                    {/* TEXT */}
                                                    <div>
                                                        <p className="font-medium text-neutral-800">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CONTACT */}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-semibold"
                        >
                            {t("menu.contact")}
                        </Link>
                    </div>

                    {/* CTA FIXED BOTTOM */}
                    <div className="p-4 border-t bg-white">
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="
          block w-full text-center
          bg-mainColor text-white
          py-3 rounded-full font-medium
          hover:opacity-90 transition
        "
                        >
                            {t("cta.contact")}
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};