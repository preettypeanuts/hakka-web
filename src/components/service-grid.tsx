"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navitagion";

type ServiceItem = {
    title: string;
    desc: string;
    benefit: string;
    image: string;
    details?: string[];
    featured?: boolean;
    slug: string;
};

type Props = {
    title?: string;
    subtitle?: string;
    items: ServiceItem[];
};

export const ServiceGrid = ({ title, subtitle, items }: Props) => {
    const featured = items.filter(item => item.featured);
    const rest = items.filter(item => !item.featured);


    return (
        <section className="margin spacing">

            {/* HEADER */}
            {title && (
                <div className="mb-12 max-w-2xl">
                    <h2 className="text-4xl font-semibold mb-3">{title}</h2>
                    <p className="text-neutral-500 text-base leading-relaxed">
                        {subtitle ?? "Comprehensive logistics services designed to support your business operations with efficiency, reliability, and scalability."}
                    </p>
                </div>
            )}

            {/* FEATURED CARD — first item, full width */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
                {featured.map((item, i) => (
                    <Link
                        key={i}
                        href={`/service/${item.slug}`}
                        className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        <div className="relative h-64 overflow-hidden shrink-0">
                            <Image
                                src={`${item.image}?auto=format&fit=crop&w=1200&q=80`}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-white bg-mainColor px-3 py-1 rounded-full">
                                Featured
                            </span>
                        </div>

                        <div className="p-7 flex flex-col flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-mainColor transition">
                                {item.title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed mb-4 flex-1">
                                {item.desc}
                            </p>

                            {item.details && (
                                <ul className="space-y-2 mb-5">
                                    {item.details.map((d, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                                            <span className="text-mainColor font-bold mt-0.5">✓</span>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="flex items-center justify-between border-t pt-4 mt-auto">
                                <span className="text-sm font-semibold text-mainColor">✓ {item.benefit}</span>
                                <Button
                                    size={"lg"}
                                    variant={"secondary"}
                                    className="font-medium text-neutral-700 group-hover:text-mainColor transition hover:bg-mainColor hover:text-white">
                                    Explore →
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* GRID — remaining items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((item, i) => (
                    <Link
                        key={i}
                        href={`/service/${item.slug}`}
                        className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden shrink-0">
                            <Image
                                src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-mainColor transition">
                                {item.title}
                            </h3>

                            <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-1">
                                {item.desc}
                            </p>

                            {/* Details — show first 3 only */}
                            {item.details && (
                                <ul className="space-y-1.5 mb-4">
                                    {item.details.slice(0, 3).map((d, j) => (
                                        <li key={j} className="flex items-start gap-2 text-xs text-neutral-500">
                                            <span className="text-mainColor font-bold mt-0.5">✓</span>
                                            {d}
                                        </li>
                                    ))}
                                    {item.details.length > 3 && (
                                        <li className="text-xs text-neutral-400 pl-4">
                                            +{item.details.length - 3} more
                                        </li>
                                    )}
                                </ul>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between gap-10 border-t pt-4 mt-auto">
                                <span className="text-xs font-semibold text-mainColor">
                                    ✓ {item.benefit}
                                </span>
                                <Button
                                    variant={"secondary"}
                                    className="text-xs font-medium text-neutral-700 group-hover:text-mainColor transition hover:bg-mainColor hover:text-white">
                                    Explore →
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
};