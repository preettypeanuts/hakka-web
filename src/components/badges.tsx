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
            <h3 className="text-8xl font-semibold text-mainColor">
                {number}<span>+</span>
            </h3>
            <h3 className="text-2xl font-semibold text-mainColor mb-2">
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

    // ambil array dari JSON
    const items = t.raw("items") as {
        number: string;
        title: string;
        description: string;
    }[];

    return (
        <section className="margin spacing">
            <div className="grid md:grid-cols-3 gap-5">
                {items.map((item, i) => (
                    <BadgeCard
                        key={i}
                        number={item.number}
                        title={item.title}
                        description={item.description}
                        className={`
                            
                            ${i !== 0 && i !== items.length - 1 ? "border-x border-darkColor/20" : ""}
                            ${i === 1 ? "pl-5" : ""}
                        `}
                    />
                ))}
            </div>
        </section>
    );
};