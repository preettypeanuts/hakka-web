import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Reveal } from "./animate-reveal";

export const CtaBottom = () => {
  const t = useTranslations("cta_bottom");

  return (
    <section className="relative overflow-hidden">

      {/* Parallax bg — tidak disentuh Reveal sama sekali */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1728919724905-f83d298593a0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="relative margin spacing text-white h-140 flex items-center justify-center">
        {/* Reveal hanya membungkus konten, bukan section/background */}
        <Reveal variant="fade-up" className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold leading-snug mb-4">
            {t("title")}
          </h2>
          <p className="text-white/80 mb-8">
            {t("desc")}
          </p>
          <div className="flex flex-wrap gap-3 w-full justify-center">
            <Button size="lg" className="bg-white text-mainColor hover:bg-neutral-100">
              {t("primary")}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-mainColor">
              {t("secondary")}
            </Button>
          </div>
        </Reveal>
      </div>

    </section>
  );
};