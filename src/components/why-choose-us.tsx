import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";

type WhyItem = {
    title: string;
    desc: string;
};

export const WhyChooseUs = () => {
    const t = useTranslations("why_choose_us");

    const items = t.raw("items") as WhyItem[];

    return (
        <section className="margin spacing">
            <div className="mb-10">
                <SectionTitle>
                    {t("title")}
                </SectionTitle>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`flex flex-col justify-between  min-h-80 p-6 border border-neutral-200 hover:shadow-md transition-all duration-300 rounded-main
                            ${i === 0 && "bg-mainColor text-white"}
                            ${i === 1 && "bg-secondaryColor"}
                            ${i === 2 && "bg-thirdColor"}
                            ${i === 3 && "bg-otherColor"}
                            `}
                    >
                        <p className="text-3xl font-semibold mb-2 uppercase">
                            {i + 1}#
                        </p>
                        <div>

                            <h3 className="text-3xl font-semibold mb-2 uppercase">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};