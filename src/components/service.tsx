'use client';

import { ArrowRight } from "lucide-react";
import { useState } from "react";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
};

export const FeaturedService = ({ data }: {
  data: {
    title: string;
    subtitle: string;
    cta: string;
    wa_template: string;
    items: ServiceItem[];
  };
}) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = data.items[activeIndex].image;

  return (
    <section className="relative bg-thirdColor overflow-hidden">

      <div
        className="absolute inset-0 opacity-90 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${activeImage})`,
           backgroundAttachment: "fixed",}}

      />

      <div className="relative margin spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {data.title}
            </h2>
            <p className="text-neutral-500 mt-2">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {data.items.map((item, i) => {
              const message = encodeURIComponent(
                data.wa_template.replace("{title}", item.title)
              );

              return (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-main group aspect-square flex flex-col justify-between p-6 border cursor-pointer duration-300 ${i === activeIndex ? "bg-mainColor text-white hover:bg-secondaryDark" : "bg-white hover:bg-lightColor"
                    }`}
                >
                  <h3 className="text-2xl font-medium">{item.title}</h3>
                  <p>{item.description}</p>

                  <a
                    href={`https://wa.me/6281292749915?text=${message}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:underline cursor-pointer ${i === activeIndex ? "text-white" : "text-mainColor group-hover:text-secondaryDark"
                      }`}
                  >
                    {data.cta} <ArrowRight className="size-5 group-hover:translate-x-2 duration-200"/>
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};