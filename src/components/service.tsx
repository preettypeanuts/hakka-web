'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";
import { whatsAppUrl } from "@/lib/whatsapp";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

export const FeaturedService = ({ data }: {
  data: {
    title: string;
    subtitle: string;
    cta: string;
    wa_template: string;
    items: ServiceItem[];
    cta_details: string;
  };
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect active card saat scroll manual via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveIndex(i);
          }
        },
        {
          root: scrollRef.current,
          threshold: 0.5,
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [data.items.length]);

  const scroll = (dir: "left" | "right") => {
    const next = dir === "right"
      ? Math.min(activeIndex + 1, data.items.length - 1)
      : Math.max(activeIndex - 1, 0);
    setActiveIndex(next);
    cardRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section className="bg-[#f0f2f5] spacing overflow-hidden">
      <div className="margin">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">

          {/* Left — text + nav */}
          <div className="flex flex-col justify-between h-full gap-16">
            <div>
              <h2 className="text-[clamp(32px,4vw,56px)] font-bold text-neutral-900 leading-tight mb-6">
                {data.title}
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                {data.subtitle}
              </p>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll("left")}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all disabled:opacity-30"
              >
                <ArrowLeft className="size-4" />
              </button>

              {/* Progress bar */}
              <div className="flex-1 h-0.5 bg-neutral-200 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-neutral-800 transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / data.items.length) * 100}%` }}
                />
              </div>

              <button
                onClick={() => scroll("right")}
                disabled={activeIndex === data.items.length - 1}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all disabled:opacity-30"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Right — cards scroll */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide rounded-third"
          >
            {data.items.map((item, i) => {
              const message = encodeURIComponent(
                data.wa_template.replace("{title}", item.title)
              );
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => {
                    setActiveIndex(i);
                    cardRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                  className={`snap-start shrink-0 w-95 md:w-75 cursor-pointer group transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
                >
                  {/* Image */}
                  <div className="relative h-115 w-full overflow-hidden rounded-2xl mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                    />

                    <div className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      {item.description.split("\n").map((line, idx) => (
                        <p key={idx} className="text-white">{line}</p>
                      ))}
                      <Link href={`/service/${item.slug}`} onClick={(e) => e.stopPropagation()}>
                        <Button
                          className="bg-mainColor mt-2 hover:bg-mainColor/90 text-white"
                          size={"sm"}
                        >
                          {data.cta_details}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Title + CTA */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-800">
                      {item.title}
                    </h3>
                    <a
                      href={whatsAppUrl(message)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {data.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};