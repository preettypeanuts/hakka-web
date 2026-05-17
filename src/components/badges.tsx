"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1400, started: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [started, target, duration]);

    return count;
}

// ─── BadgeCard ────────────────────────────────────────────────────────────────

type BadgeCardProps = {
    title: string;
    description: string;
    number: string;
    className?: string;
};

function BadgeCard({ title, description, number, className }: BadgeCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    // Parse angka dari string, misal "200" → 200, "15" → 15
    const numeric = parseInt(number.replace(/\D/g, ""), 10) || 0;
    const suffix = number.replace(/[\d]/g, ""); // sisa karakter non-angka (misal "K", "%", dll)

    const count = useCountUp(numeric, 1400, started);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-mainColor">
                {started ? count : 0}
                {suffix && <span>{suffix}</span>}
                <span>+</span>
            </h3>
            <h3 className="text-xl md:text-2xl font-semibold text-mainColor mb-2">
                {title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}

// ─── Badges ───────────────────────────────────────────────────────────────────

export const Badges = () => {
    const t = useTranslations("badges");

    const items = t.raw("items") as {
        number: string;
        title: string;
        description: string;
    }[];

    return (
        <section className="margin spacing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                {items.map((item, i) => (
                    <BadgeCard
                        key={i}
                        number={item.number}
                        title={item.title}
                        description={item.description}
                        className={`
                            ${i !== items.length - 1 ? "border-b pb-8 md:border-b-0 md:pb-0" : ""}
                            ${i !== 0 && i !== items.length - 1 ? "md:border-x md:border-darkColor/20 md:px-5" : ""}
                        `}
                    />
                ))}
            </div>
        </section>
    );
};