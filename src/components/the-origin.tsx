import { useTranslations } from "next-intl";

const CITIES = ["Jakarta", "Surabaya", "Semarang", "Makassar", "Batam"] as const;

export const OriginSection = () => {
    const t = useTranslations("origin");

    return (
        <section className="margin spacing">
            <div>
                <h2 className="text-sm uppercase tracking-6 text-primary font-semibold mb-10">
                    {t("label")}
                </h2>

                <div className="text-3xl">
                    <p className="text-neutral-600 indent-15">
                        {t("paragraph_start")}{" "}
                        {CITIES.map((city, i) => (
                            <span key={city}>
                                <span className="font-semibold text-primary">{city}</span>
                                {i < CITIES.length - 2 && ", "}
                                {i === CITIES.length - 2 && " hingga "}
                            </span>
                        ))},{" "}
                        {t("paragraph_end")}
                    </p>
                </div>
            </div>
        </section>
    );
};