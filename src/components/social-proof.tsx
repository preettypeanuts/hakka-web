import Image from "next/image";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionTitle } from "./section-title";

type Client = {
    name: string;
    logo: string | null;
};

type Testimonial = {
    name: string;
    company: string;
    text: string;
};

export const SocialProof = () => {
    const t = useTranslations("client");

    const clients = (t.raw("items") as Client[]).filter((c) => c.logo);
    const testimonials = t.raw("testimonials") as Testimonial[];

    // Duplicate untuk infinite loop seamless
    const doubled = [...clients, ...clients];

    return (
        <section className="spacing">

            {/* Title */}
            <div className="margin">
                <SectionTitle>{t("title")}</SectionTitle>
            </div>

            {/* CLIENT LOGOS — 2 layer infinite marquee */}
            <div className="relative mb-16 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

                {/* Row 1 — scroll kiri */}
                <div className="flex gap-4 py-4 w-max animate-marquee">
                    {doubled.map((client, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 gap-3 items-center bg-white rounded-full px-5 py-3 shadow-sm"
                            title={client.name}
                        >
                            <Image
                                src={client.logo!}
                                alt={client.name}
                                width={80}
                                height={40}
                                className="object-contain h-25 rounded-full w-auto"
                            />
                            <p className="text-lg font-medium text-neutral-700 whitespace-nowrap">
                                {client.name}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Row 2 — scroll kanan (berlawanan) */}
                <div className="flex gap-4 py-4 w-max animate-marquee-reverse">
                    {doubled.map((client, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 gap-3 items-center bg-white rounded-full px-5 py-3 shadow-sm"
                            title={client.name}
                        >
                            <Image
                                src={client.logo!}
                                alt={client.name}
                                width={80}
                                height={40}
                                className="object-contain h-25 rounded-full w-auto"
                            />
                            <p className="text-lg font-medium text-neutral-700 whitespace-nowrap">
                                {client.name}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            <section className="margin">

                <SectionTitle>{t("description")}</SectionTitle>

                {/* TESTIMONIALS */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((item, i) => (
                        <div
                            key={i}
                            className="p-6 border bg-otherColor border-neutral-200 hover:shadow-md transition flex flex-col min-h-80 rounded-main"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <p className="text-xl font-semibold text-mainColor">
                                    {item.name}
                                </p>
                                <Quote className="text-mainColor fill-mainColor" />
                            </div>
                            <p className="text-neutral-600 text-xl leading-relaxed mb-4">
                                "{item.text}"
                            </p>
                            <div className="text-sm mt-auto">
                                <p className="text-neutral-500">{item.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </section>
    );
};