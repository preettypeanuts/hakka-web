"use client";

import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";
import { Mail, Phone, MapPin, Building2, Warehouse } from "lucide-react";
import { useState } from "react";
import {
    branchLocations,
    type BranchLocation,
} from "@/components/branch-locations-data";
import { locales } from "@/i18n/config";

// ─── Branch type config (selaras dengan branch-locations.tsx) ─────────────────

const typeConfig = {
    "Head Office": {
        color: "#f59e0b",
        colorLight: "#fef3c7",
        colorBorder: "#fcd34d",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-400",
        label: "Head Office",
        Icon: Building2,
    },
    "Operational Office": {
        color: "#0ea5e9",
        colorLight: "#e0f2fe",
        colorBorder: "#7dd3fc",
        badge: "bg-sky-50 text-sky-700 border-sky-200",
        dot: "bg-sky-500",
        label: "Operational",
        Icon: MapPin,
    },
    Warehouse: {
        color: "#10b981",
        colorLight: "#d1fae5",
        colorBorder: "#6ee7b7",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Warehouse",
        Icon: Warehouse,
    },
} as const;

// ─── Helper: build Google Maps embed URL from branch ─────────────────────────

function mapUrl(branch: BranchLocation): string {
    const q = encodeURIComponent(
        [branch.address.building, branch.address.street, branch.address.city]
            .filter(Boolean)
            .join(", ")
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactList = () => {
    const t = useTranslations("contact");

    // Head office data dari branchLocations
    const headOffice = branchLocations.find((b) => b.type === "Head Office");

    // Semua branch, head office duluan lalu alphabetical
    const sorted = [...branchLocations].sort((a, b) => {
        if (a.type === "Head Office") return -1;
        if (b.type === "Head Office") return 1;
        return a.city.localeCompare(b.city);
    });

    // Branch yang sedang aktif di map (default: head office)
    const [activeBranch, setActiveBranch] = useState<BranchLocation>(
        headOffice ?? branchLocations[0]
    );

    return (
        <section className="margin spacing">

            {/* Title */}
            <div className="mb-10">
                <SectionTitle>
                    {t("title")}
                </SectionTitle>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">

                {/* LEFT - Info */}
                <div className="space-y-6">

                    {/* Office */}
                    <div>
                        <p className="text-sm text-neutral-400 uppercase mb-1">
                            Head Office
                        </p>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            {headOffice
                                ? [headOffice.address.building, headOffice.address.city]
                                    .filter(Boolean)
                                    .join(" — ")
                                : t("head_office")}
                        </h3>
                        {headOffice && (
                            <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                                {headOffice.address.street}
                                {headOffice.address.district && headOffice.address.district !== "-"
                                    ? `, ${headOffice.address.district}`
                                    : ""}
                            </p>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                        <div className="text-neutral-700 flex flex-col gap-3 p-4 border border-neutral-200 rounded-third w-fit bg-white">
                            <p className="flex items-center gap-2 uppercase text-xs">
                                <Mail size={13} />
                                {t("email_label")}
                            </p>
                            <p>{t("email")}</p>
                        </div>
                        <div className="text-neutral-700 flex flex-col gap-3 p-4 border border-neutral-200 rounded-third w-fit bg-white">
                            <p className="flex items-center gap-2 uppercase text-xs">
                                <Phone size={13} />
                                {t("phone_label")}
                            </p>
                            <p>{t("phone")}</p>
                        </div>
                    </div>

                    {/* Branch list — menggantikan coverage area pills statis */}
                    <div>
                        <p className="text-sm text-neutral-400 uppercase mb-3">
                            Coverage Area
                        </p>

                        <div className="flex flex-col gap-1.5">
                            {sorted.map((branch) => {
                                const cfg = typeConfig[branch.type];
                                const isActive = activeBranch.city === branch.city;
                                const Icon = cfg.Icon;

                                return (
                                    <button
                                        key={branch.city}
                                        onClick={() => setActiveBranch(branch)}
                                        className={`
                                            w-full text-left flex items-center gap-3 px-3 py-2.5
                                            rounded-xl border transition-all duration-150
                                            ${isActive
                                                ? "bg-white border-neutral-200 shadow-sm"
                                                : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-neutral-100"
                                            }
                                        `}
                                    >
                                        {/* Icon */}
                                        <span
                                            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ background: isActive ? cfg.colorLight : "#f5f5f5" }}
                                        >
                                            <Icon
                                                size={13}
                                                style={{ color: isActive ? cfg.color : "#a3a3a3" }}
                                            />
                                        </span>

                                        {/* Text */}
                                        <div className="min-w-0 flex-1">
                                            <p className={`text-[13px] font-semibold leading-tight truncate ${isActive ? "text-neutral-900" : "text-neutral-600"}`}>
                                                {branch.city}
                                            </p>
                                            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                                                {[branch.address.city, branch.address.province]
                                                    .filter((p) => p && p !== "-")
                                                    .join(", ")}
                                            </p>
                                        </div>

                                        {/* Badge */}
                                        <span
                                            className={`
                                                shrink-0 text-[9px] font-bold px-2 py-0.5
                                                rounded-full border uppercase tracking-wide
                                                ${cfg.badge}
                                            `}
                                        >
                                            {cfg.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* RIGHT - Map (berubah sesuai branch yang dipilih) */}
                <div className="sticky top-24 space-y-3">
                    <div className="w-full h-87.5 rounded-main overflow-hidden border border-neutral-200 transition-all duration-300">
                        <iframe
                            key={activeBranch.city} // re-mount on branch change
                            src={mapUrl(activeBranch)}
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Map of ${activeBranch.city}`}
                        />
                    </div>

                    {/* Active branch info pill di bawah map */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-200 rounded-xl w-fit">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: typeConfig[activeBranch.type].color }}
                        />
                        <span className="text-xs text-neutral-600 font-medium">
                            {activeBranch.city}
                        </span>
                        {activeBranch.address.building && (
                            <>
                                <span className="text-neutral-300 text-xs">·</span>
                                <span className="text-xs text-neutral-400 truncate max-w-48">
                                    {activeBranch.address.building}
                                </span>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};