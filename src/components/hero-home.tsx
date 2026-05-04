import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export const HeroHome = () => {
    const t = useTranslations("hero");

    return (
        <section className="w-full h-[85lvh] md:h-screen relative">
            <Image fill src="/pc.webp" alt="Hero Background" className="object-cover md:block hidden" />
            <Image fill src="/HHP.jpg" alt="Hero Background" className="object-cover md:hidden block" />

            <div className="absolute inset-0 md:bg-black/10 bg-black/40" />

            <div className="absolute inset-0 flex">
                <div className="
                    mt-24 md:mt-30
                    mb-8 md:mb-10
                    mx-5 md:mx-15
                    flex flex-col items-start gap-8 md:gap-10 justify-between
                ">
                    <div className="space-y-6 md:space-y-10">
                        <h1 className="
                            text-[36px] leading-10
                            md:text-[48px] md:leading-14
                            lg:text-[58px] lg:leading-16
                            font-semibold text-white
                            max-w-xs md:max-w-xl lg:max-w-3xl
                            tracking-tight
                        ">
                            {t("title")}
                        </h1>

                        <div className="flex flex-row gap-2 md:gap-3">
                            <Button
                                size="sm"
                                className="bg-white text-primary hover:bg-neutral-100 md:text-base md:px-6 md:py-5"
                            >
                                {t("cta_primary")}
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-white md:text-base md:px-6 md:py-5"
                            >
                                {t("cta_secondary")}
                            </Button>
                        </div>
                    </div>

                    <h2 className="
                        text-white
                        text-sm md:text-lg
                        tracking-wide font-medium
                        max-w-sm md:max-w-2xl
                    ">
                        {t("desc")}
                    </h2>
                </div>
            </div>
        </section>
    );
};