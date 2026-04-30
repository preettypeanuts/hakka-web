import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const currentLocale = locale && locales.includes(locale) ? locale : defaultLocale;

  const home = (await import(`../../messages/${currentLocale}/home.json`))
    .default;
  const common = (await import(`../../messages/${currentLocale}/common.json`))
    .default;

console.log("=== DEBUG messages keys ===");
console.log("home keys:", Object.keys(home));
console.log("common keys:", Object.keys(common));
console.log("common full:", JSON.stringify(common, null, 2)); // tambah ini
  return {
    locale: currentLocale,
    messages: {
      ...home,
      ...common,
    },
  };
});
