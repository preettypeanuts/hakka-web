import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const currentLocale =
    locale && locales.includes(locale) ? locale : defaultLocale;

  const home = (await import(`../../messages/${currentLocale}/home.json`))
    .default;
  const common = (await import(`../../messages/${currentLocale}/common.json`))
    .default;
  const banner = (await import(`../../messages/${currentLocale}/banner.json`))
    .default;
  const about = (await import(`../../messages/${currentLocale}/about.json`))
    .default;

  console.log("=== DEBUG messages keys ===");
  console.log("home keys:", Object.keys(home));
  console.log("common keys:", Object.keys(common));
  console.log("about keys:", Object.keys(about));
  console.log("currentLocale:", currentLocale);

  return {
    locale: currentLocale,
    messages: {
      ...home,
      ...common,
      ...banner,
      ...about,
    },
  };
});
