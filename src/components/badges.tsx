import { useTranslations } from "next-intl";

type BadgeCardProps = {
    title: string;
    description: string;
    number: string;
    className?: string;
};

function BadgeCard({ title, description, number, className }: BadgeCardProps) {
    return (
        <div className={className}>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-mainColor">
                {number}<span>+</span>
            </h3>
            <h3 className="text-xl md:text-2xl font-semibold text-mainColor mb-2">
                {title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export const Badges = () => {
    const t = useTranslations("badges");

    const items = t.raw("items") as {
        number: string;
        title: string;
        description: string;
    }[];

    return (
        <section className="margin spacing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                {items.map((item, i) => (
                    <BadgeCard
                        key={i}
                        number={item.number}
                        title={item.title}
                        description={item.description}
                        className={`
                            ${i !== items.length - 1 ? "border-b pb-8 md:border-b-0 md:pb-0" : ""}
                            ${i !== 0 && i !== items.length - 1 ? "md:border-x md:border-darkColor/20 md:px-5" : ""}
                        `}
                    />
                ))}
            </div>
        </section>
    );
};