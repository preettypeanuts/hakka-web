import { ServiceCTA } from "@/components/service-cta";
import { Link } from "@/i18n/navitagion";
import { toSlug } from "@/lib/slugify";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

type ServiceItem = {
    title: string;
    desc: string;
    benefit: string;
    image: string;
    details?: string[];
    featured?: boolean;
};


type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const t = await getTranslations("all_services");

    const items = t.raw("items") as ServiceItem[];
    const service = items.find((item) => toSlug(item.title) === slug);

    if (!service) notFound();

    const related = items
        .filter((item) => toSlug(item.title) !== slug)
        .slice(0, 3);

    return (
        <>
            {/* HERO */}
            <div className="relative h-[50vh] min-h-100 w-full">
                <Image
                    src={`${service.image}?auto=format&fit=crop&w=1600&q=80`}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-20 md:top-8 left-0 right-0 margin px-3 py-1.5 bg-darkColor/50 rounded-full truncate backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>/</span>
                        <Link href="/service" className="hover:text-white transition">Services</Link>
                        <span>/</span>
                        <span className="text-white">{service.title}</span>
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 margin pb-10">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-3">
                        Our Service
                    </span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white">
                        {service.title}
                    </h1>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <section className="margin spacing">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left — main info */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Overview</h2>
                            <p className="text-neutral-600 leading-relaxed text-base">
                                {service.desc}
                            </p>
                        </div>

                        {/* Details */}
                        {service.details && service.details.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-5">What's Included</h2>
                                <ul className="space-y-3">
                                    {service.details.map((d, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                                        >
                                            <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-mainColor/10 text-mainColor text-xs font-bold shrink-0">
                                                ✓
                                            </span>
                                            <span className="text-sm text-neutral-700 leading-relaxed">
                                                {d}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right — sticky sidebar */}
                    <div className="space-y-5">
                        <div className="sticky top-28 space-y-5">

                            {/* Benefit card */}
                            <div className="rounded-2xl bg-mainColor p-6 text-white">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
                                    Key Benefit
                                </p>
                                <p className="text-lg font-semibold leading-snug">
                                    {service.benefit}
                                </p>
                            </div>

                            {/* CTA card */}
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
                                <p className="text-sm font-semibold text-neutral-900">
                                    Interested in this service?
                                </p>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    Contact our team for a free consultation tailored to your logistics needs.
                                </p>
                                <Link
                                    href="/contact"
                                    className="block text-center bg-mainColor text-white text-sm font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition"
                                >
                                    Get a Free Quote
                                </Link>
                                <a
                                    href="https://wa.me/62XXXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 text-sm font-medium px-5 py-3 rounded-xl hover:bg-neutral-50 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.5l5.797-1.452A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.67-.52-5.187-1.424l-.371-.22-3.844.962.998-3.742-.242-.385A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                    </svg>
                                    Chat via WhatsApp
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED SERVICES */}
            {related.length > 0 && (
                <section className="left-padding right-padding spacing border-t pt-12 bg-mainColor">
                    <h2 className="text-2xl font-semibold mb-8 text-white">Other Services</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {related.map((item, i) => (
                            <Link
                                key={i}
                                href={`/service/${toSlug(item.title)}`}
                                className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
                            >
                                <div className="relative h-40 overflow-hidden shrink-0">
                                    <Image
                                        src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-base font-semibold mb-1 group-hover:text-mainColor transition">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                                        {item.desc}
                                    </p>
                                    <span className="mt-4 text-xs font-medium text-mainColor">
                                        Explore →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA BOTTOM */}
            <ServiceCTA />
        </>
    );
}