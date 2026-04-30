import Image from "next/image";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionTitle } from "./section-title";

type Client = {
    name: string;
    logo: string;
};

type Testimonial = {
    name: string;
    company: string;
    text: string;
};

export const SocialProof = () => {
    const t = useTranslations("social_proof");

    const clients = t.raw("clients") as Client[];
    const testimonials = t.raw("testimonials") as Testimonial[];

    return (
        <section className="margin spacing">

            {/* Title */}
            <SectionTitle>
                {t("title")}
            </SectionTitle>

            {/* CLIENT LOGOS */}
            <div className="flex flex-wrap gap-6 items-center mb-16">
                {clients.map((client, i) => (
                    <div
                        key={i}
                        className="flex gap-5 items-center hover:grayscale-0 transition bg-white rounded-full p-6"
                        title={client.name}
                    >
                        <Image
                            src={client.logo}
                            alt={client.name}
                            width={100}
                            height={60}
                            className="object-contain h-10 w-auto"
                        />
                        <p className="truncate">
                            {client.name}
                        </p>
                    </div>
                ))}
            </div>

            <SectionTitle>
                {t("title_testimonials")}
            </SectionTitle>

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
                        <p className="text-neutral-600 text-xl  leading-relaxed mb-4">
                            “{item.text}”
                        </p>

                        <div className="text-sm mt-auto">
                            <p className="text-neutral-500">
                                {item.company}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};