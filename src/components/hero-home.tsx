import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export const HeroHome = () => {
    const t = useTranslations("hero");

    return (
        <section className="w-full h-screen relative">
            <Image fill src="/pc.webp" alt="Hero Background" className="object-cover" />

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute inset-0 flex">
                <div className="mt-30 mb-10 mx-15 flex flex-col items-start gap-10 justify-between">

                    <div className="space-y-10">
                        <h1 className="text-[58px] leading-16 font-semibold text-white max-w-3xl tracking-tight">
                            {t("title")}
                        </h1>

                        <div className="space-x-3">
                            <Button
                                size="xl"
                                className="bg-white text-primary hover:bg-neutral-100"
                            >
                                {t("cta_primary")}
                            </Button>

                            <Button
                                variant="outline"
                                size="xl"
                                className="text-white border-white"
                            >
                                {t("cta_secondary")}
                            </Button>
                        </div>
                    </div>

                    <h2 className="max-w-2xl text-white text-lg tracking-wide font-medium">
                        {t("desc")}
                    </h2>
                </div>
            </div>
        </section>
    );
};