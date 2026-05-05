import { ServiceCTA } from "@/components/service-cta";
import { Link } from "@/i18n/navitagion";
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
    slug: string;
};

type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const t = await getTranslations("all_services");

    const items = t.raw("items") as ServiceItem[];

    // ✅ match langsung pakai slug
    const service = items.find((item) => item.slug === slug);

    if (!service) notFound();

    // ✅ related juga pakai slug
    const related = items
        .filter((item) => item.slug !== slug)
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
                <div className="absolute top-20 md:top-18 w-fit left-0 right-0 margin px-3 py-1.5 bg-darkColor/50 border border-lightColor/40 rounded-full truncate backdrop-blur-xl">
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

                        <div>
                            <h2 className="text-xl font-semibold mb-3">Overview</h2>
                            <p className="text-neutral-600 leading-relaxed text-base">
                                {service.desc}
                            </p>
                        </div>

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

                    {/* Right — sidebar */}
                    <div className="space-y-5">
                        <div className="sticky top-28 space-y-5">

                            <div className="rounded-2xl bg-mainColor p-6 text-white">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
                                    Key Benefit
                                </p>
                                <p className="text-lg font-semibold leading-snug">
                                    {service.benefit}
                                </p>
                            </div>

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
                                    Chat via WhatsApp
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED */}
            {related.length > 0 && (
                <section className="left-padding right-padding spacing border-t pt-12 bg-mainColor">
                    <h2 className="text-2xl font-semibold mb-8 text-white">Other Services</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {related.map((item, i) => (
                            <Link
                                key={i}
                                href={`/service/${item.slug}`}
                                className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
                            >
                                <div className="relative h-80 overflow-hidden shrink-0">
                                    <Image
                                        src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className="object-cover group-hover:scale-105 transition duration-500 w-full h-full"
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

            <ServiceCTA />
        </>
    );
}