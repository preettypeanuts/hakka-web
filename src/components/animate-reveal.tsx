"use client";

import { useEffect, useRef, ReactNode, CSSProperties, ElementType } from "react";

type AnimationVariant =
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade"
    | "zoom-in";

type RevealProps = {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;        // ms, default 0
    duration?: number;     // ms, default 500
    threshold?: number;    // 0–1, default 0.15
    once?: boolean;        // default true
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
};

const VARIANTS: Record<AnimationVariant, { from: CSSProperties; to: CSSProperties }> = {
    "fade-up": { from: { opacity: 0, transform: "translateY(24px)" }, to: { opacity: 1, transform: "translateY(0)" } },
    "fade-down": { from: { opacity: 0, transform: "translateY(-24px)" }, to: { opacity: 1, transform: "translateY(0)" } },
    "fade-left": { from: { opacity: 0, transform: "translateX(24px)" }, to: { opacity: 1, transform: "translateX(0)" } },
    "fade-right": { from: { opacity: 0, transform: "translateX(-24px)" }, to: { opacity: 1, transform: "translateX(0)" } },
    "fade": { from: { opacity: 0 }, to: { opacity: 1 } },
    "zoom-in": { from: { opacity: 0, transform: "scale(0.95)" }, to: { opacity: 1, transform: "scale(1)" } },
};

export const Reveal = ({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 500,
    threshold = 0.15,
    once = true,
    className,
    style,
    as: Tag = "div",
}: RevealProps) => {
    const ref = useRef<HTMLElement>(null);
    const { from, to } = VARIANTS[variant];

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        Object.assign(el.style, {
            ...from,
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
            transitionDelay: `${delay}ms`,
            willChange: "opacity, transform",
        });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    Object.assign(el.style, to);
                    if (once) {
                        observer.disconnect();
                        // bersihkan will-change setelah animasi selesai
                        setTimeout(() => { el.style.willChange = "auto"; }, duration + delay + 50);
                    }
                } else if (!once) {
                    Object.assign(el.style, from);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Tag ref={ref as never} className={className} style={style}>
            {children}
        </Tag>
    );
};