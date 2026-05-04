import Image from "next/image";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <section className="w-full h-screen relative overflow-hidden">

      {/* Background */}
      <Image
        fill
        src={image}
        alt={title}
        className="object-cover object-center scale-105"
        priority
      />

      {/* Gradient overlay — lebih dramatis dari flat black */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

      {/* Content — posisi di bawah kiri */}
      <div className="absolute inset-0 flex flex-col justify-end">
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
      </div>

    </section>
  );
};