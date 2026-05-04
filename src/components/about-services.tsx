import Image from "next/image";
import { SectionTitle } from "./section-title";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navitagion";

type ServiceItem = {
    title: string;
    desc: string;
    benefit: string;
    image: string;
};

type AboutServiceData = {
    title: string;
    view_more: string;
    cta: string;
    items: ServiceItem[];
};

export const AboutService = ({ data }: { data: AboutServiceData }) => {
    return (
        <section className="spacing">
            <div className="flex items-center justify-between mb-8 margin">
                <SectionTitle>{data.title}</SectionTitle>
                <Link
                    href="/services"
                    className=""
                >
                    <Button
                        variant={"outline"}
                    >
                        {data.view_more}
                    </Button>
                </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {data.items.map((item, i) => (
                    <div
                        key={i}
                        className={`min-w-80 flex flex-col group
                            ${i === 0 && "left-margin"}
                            ${i === data.items.length - 1 && "right-margin"}
                            `}
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-main">
                            <Image
                                src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                                alt={item.title}
                                width={500}
                                height={500}
                                className="object-cover group-hover:scale-105 transition duration-300 h-full"
                            />
                            <div className="absolute bottom-5 left-5 text-4xl font-light text-white z-20">
                                0{i + 1}
                            </div>
                            <div className="absolute -left-15 -bottom-15 w-40 h-40 bg-radial from-mainColor/60 to-transparent rounded-full blur-sm"></div>
                        </div>

                        <div className="px-5 pb-5 pt-10 -mt-5 rounded-b-main flex flex-col justify-between min-h-45 bg-white grow">
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="bg-lightColor/80 mt-5 p-4 rounded-third">
                                <p className="text-sm font-medium text-mainColor ">
                                    {item.benefit}
                                </p>
                                <Button className="bg-mainColor mt-4">
                                    {data.cta} <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    );
};