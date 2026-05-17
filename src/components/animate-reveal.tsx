"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
  type ElementType,
} from "react";

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
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
};

const VARIANTS: Record<
  AnimationVariant,
  { from: CSSProperties; to: CSSProperties }
> = {
  "fade-up": {
    from: { opacity: 0, transform: "translateY(24px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    from: { opacity: 0, transform: "translateY(-24px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    from: { opacity: 0, transform: "translateX(24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    from: { opacity: 0, transform: "translateX(-24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  "zoom-in": {
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      Object.assign(el.style, to);
      return;
    }

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
            setTimeout(() => {
              el.style.willChange = "auto";
            }, duration + delay + 50);
          }
        } else if (!once) {
          Object.assign(el.style, from);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, from, once, threshold, to]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
};
