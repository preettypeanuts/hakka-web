import { getTranslations } from "next-intl/server";

type ClientCategory = {
  name: string;
  items: string[];
};

export async function PortfolioContent() {
  const t = await getTranslations("clients");
  const tCase = await getTranslations("case_study");

  const categories = t.raw("categories") as ClientCategory[];
  const results = tCase.raw("result") as string[];

  return (
    <div className="margin spacing space-y-16">
      <section>
        <h2 className="text-2xl font-semibold mb-8">{t("title")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-mainColor mb-4">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-neutral-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-mainColor text-white p-8 md:p-12">
        <h2 className="text-2xl font-semibold mb-6">{tCase("title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
              {tCase("challenge_label")}
            </p>
            <p className="text-sm leading-relaxed text-white/90">
              {tCase("challenge")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
              {tCase("solution_label")}
            </p>
            <p className="text-sm leading-relaxed text-white/90">
              {tCase("solution")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
              {tCase("result_label")}
            </p>
            <ul className="space-y-2">
              {results.map((item) => (
                <li key={item} className="text-sm text-white/90 flex gap-2">
                  <span className="text-otherColor">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
