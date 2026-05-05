"use client";

import { Link } from "@/i18n/navitagion";
import { toSlug } from "@/lib/slugify";
import { getNavbarIcon } from "./getNavbarIcon";

interface ServiceItem {
    name: string;
    desc: string;
    href?: string;
}

interface MegaMenuServiceCardProps {
    item: ServiceItem;
    onClick?: () => void;
    compact?: boolean; // true = mobile style, false = desktop style
}

export const MegaMenuServiceCard = ({
    item,
    onClick,
    compact = false,
}: MegaMenuServiceCardProps) => {
    const href = item.href ?? `/service/${toSlug(item.name)}`;

    if (compact) {
        return (
            <Link
                href={`/service/${toSlug(item.name)}`}
                onClick={onClick}
                className="flex gap-3 items-start p-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-mainColor/5 transition"
            >
                <div className="text-mainColor mt-1">{getNavbarIcon(item.name)}</div>
                <div>
                    <p className="font-medium text-neutral-800">{item.name}</p>
                    <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/service/${toSlug(item.name)}`}
            className="
                group p-4 rounded-secondary border border-neutral-100 bg-neutral-100
                hover:border-mainColor hover:bg-mainColor/5
                transition-all duration-300
                hover:shadow-md hover:-translate-y-1
                flex gap-3 items-start
            "
        >
            <div className="text-mainColor flex items-center justify-center rounded-third bg-otherColorDark p-3">
                {getNavbarIcon(item.name)}
            </div>
            <div>
                <p className="font-medium text-neutral-800 group-hover:text-mainColor transition">
                    {item.name}
                </p>
                <p className="text-xs text-neutral-500 leading-snug">{item.desc}</p>
            </div>
        </Link>
    );
};
