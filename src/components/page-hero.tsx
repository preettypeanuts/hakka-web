import { scrollToContent } from "@/lib/actions";
import { Button } from "./ui/button";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <section className="w-full h-[70vh] relative">

      {/* Parallax bg — di luar overflow-hidden, tidak dibungkus apapun */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed -z-10"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="margin mb-12 md:mb-20 flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-0">

          <div>
            <div className="w-12 h-0.5 bg-white mb-6 opacity-0 animate-fade-up-in" />

            <h1 className="
              text-4xl md:text-6xl font-black text-white
              leading-tight tracking-tight md:max-w-3xl mb-4
              opacity-0 animate-fade-up-in-200
            ">
              {title}
            </h1>

            <p className="
              text-white/60 text-base md:text-lg max-w-lg leading-relaxed
              opacity-0 animate-fade-up-in-400
            ">
              {subtitle}
            </p>
          </div>

          <div className="md:justify-self-end md:flex md:flex-col md:justify-end opacity-0 animate-fade-up-in-400">
            <Button
              onClick={scrollToContent}
              size={"xl"}
              className="bg-white/40 text-white border-white/50 backdrop-blur-sm hover:bg-mainColor w-fit"
            >
              Explore
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
};