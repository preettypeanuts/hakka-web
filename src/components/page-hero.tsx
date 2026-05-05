import { Button } from "./ui/button";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <section
      className="w-full h-[70vh] relative overflow-hidden bg-cover bg-center md:bg-fixed"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="margin mb-12 md:mb-20 flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-0">

          <div>
            {/* Accent line */}
            <div className="w-12 h-0.5 bg-white mb-6" />

            {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight md:max-w-3xl mb-4">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="md:justify-self-end md:flex md:flex-col md:justify-end">
            <Button
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