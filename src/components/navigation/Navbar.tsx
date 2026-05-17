"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { NavbarBackdrop } from "./NavbarBackdrop";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useNavbarScroll } from "./useNavbarScroll";
import { useMegaMenu } from "./useMegaMenu";
import { useMobileMenu } from "./useMobileMenu";
import { NavbarBar } from "./NavbarBar";

export const Navbar = () => {
    const t = useTranslations("navbar");
    const pathname = usePathname();

    const { activeMega, openMega, closeMega, forceClose: forceCloseMega } = useMegaMenu();
    const { isOpen, toggle: toggleMobile, close: closeMobile } = useMobileMenu();
    const { visible, isScrolled } = useNavbarScroll(activeMega);

    // Tutup mega menu & mobile menu setiap pindah halaman
    useEffect(() => {
        forceCloseMega();
        closeMobile();
    }, [pathname]);

    const serviceGroups = t.raw("menu.services.groups") as {
        title: string;
        items: {
            name: string; 
            desc: string; 
            href?: string;
            slug: string; 
        
        }[];
    }[];

    const megaCta = t.raw("cta_mega") as {
        title: string;
        desc: string;
        button: string;
        href: string;
    };

    const handleBackdropClick = () => {
        forceCloseMega();
        closeMobile();
    };

    return (
        <>
            <NavbarBackdrop
                visible={isOpen || activeMega}
                onClick={handleBackdropClick}
            />

            <NavbarBar
                visible={visible}
                isScrolled={isScrolled}
                activeMega={activeMega}
                onMegaEnter={openMega}
                onMegaLeave={closeMega}
                onMobileToggle={toggleMobile}
            />

            <MegaMenu
                active={activeMega}
                serviceGroups={serviceGroups}
                megaCta={megaCta}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
            />

            <MobileMenu
                isOpen={isOpen}
                serviceGroups={serviceGroups}
                onClose={closeMobile}
            />
        </>
    );
};