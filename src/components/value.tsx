import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";

type ValueItem = {
    title: string;
    desc: string;
};

export const ValuesSection = () => {
    const t = useTranslations("values");
    const items = t.raw("items") as ValueItem[];

    return (
        <section className="margin spacing">

            {/* Title */}
            <div className="mb-10">
                <SectionTitle>
                    {t("title")}
                </SectionTitle>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`
                            group relative p-6 rounded-main border border-neutral-200 aspect-square
                            bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden
                        `}
                    >
                        {/* Number (ghost style) */}
                        <p className="
                            text-5xl font-bold text-mainColor group-hover:text-white z-20
                            absolute top-4 right-4 transition-all
                        ">
                            {String(i + 1).padStart(2, "0")}
                        </p>

                        {/* Content */}
                        <div className="relative z-20 mt-auto ">
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 uppercase group-hover:text-white duration-200">
                                {item.title}
                            </h3>

                            <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-white duration-200">
                                {item.desc}
                            </p>
                        </div>

                        {/* Accent line */}
                        <div className="absolute bottom-0 left-0 w-full h-full bg-mainColor z-10 scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 rounded-main" />
                    </div>
                ))}
            </div>
        </section>
    );
};