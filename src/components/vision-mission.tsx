import { useTranslations } from "next-intl";
import { SectionTitle } from "./section-title";

export const VisionMissionSection = () => {
    const t = useTranslations("vision_mission");

    const mission = t.raw("mission") as string[];

    return (
        <section className="margin spacing">

            {/* Title */}
            <div className="mb-10">
                <SectionTitle>
                    {t("vision_title")} & {t("mission_title")}
                </SectionTitle>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

                {/* Vision */}
                <div className="
                    relative p-8 rounded-main border border-neutral-200 
                    bg-linear-to-br from-white to-neutral-50
                    hover:shadow-md transition-all duration-300
                ">
                    <p className="text-sm uppercase tracking-widest text-neutral-400 mb-3">
                        {t("vision_title")}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 leading-snug">
                        {t("vision")}
                    </h3>

                    <div className="absolute top-0 left-0 w-1 h-full bg-mainColor rounded-l-main" />
                </div>

                {/* Mission */}
                <div className="
                    relative p-8 rounded-main border border-neutral-200 
                    bg-linear-to-br from-neutral-50 to-white
                    hover:shadow-md transition-all duration-300
                ">
                    <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
                        {t("mission_title")}
                    </p>

                    <div className="space-y-4">
                        {mission.map((item, i) => (
                            <div key={i} className="flex gap-4">

                                {/* Number */}
                                <span className="text-lg font-semibold text-mainColor">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                {/* Text */}
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 left-0 w-1 h-full bg-secondaryColor rounded-l-main" />
                </div>

            </div>
        </section>
    );
};