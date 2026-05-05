import { Button } from "./ui/button";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <section
      className="w-full h-[70vh] relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Gradient overlay — lebih dramatis dari flat black */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

      {/* Content — posisi di bawah kiri */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="grid grid-cols-2">
          <div className="margin mb-20">

            {/* Accent line */}
            <div className="w-12 h-0.5 bg-white mb-6" />

            {/* Title */}
            <h1 className="text-[clamp(40px,6vw,72px)] font-black text-white leading-tight tracking-tight max-w-3xl mb-4">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="justify-self-end margin flex flex-col justify-end mb-20">
            <Button
              size={"xl"}
              className="bg-white/40 text-white border-white/50 backdrop-blur-sm hover:bg-mainColor"
            >
              Explore
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
};