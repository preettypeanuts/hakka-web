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
  const contact = (await import(`../../messages/${currentLocale}/contact.json`))
    .default;

  console.log("=== DEBUG messages keys ===");
  console.log("home keys:", Object.keys(home));
  console.log("common keys:", Object.keys(common));
  console.log("about keys:", Object.keys(about));
  console.log("contact keys:", Object.keys(contact));
  console.log("currentLocale:", currentLocale);

  console.log("about keys:", Object.keys(about));
  console.log("about_services exists:", "about_services" in about); // tambah ini

  return {
    locale: currentLocale,
    messages: {
      ...home,
      ...common,
      ...banner,
      ...about,
      ...contact,
    },
  };
});
