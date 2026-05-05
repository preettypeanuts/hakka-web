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
  const service = (await import(`../../messages/${currentLocale}/service.json`))
    .default;

    
  return {
    locale: currentLocale,
    messages: {
      ...home,
      ...common,
      ...banner,
      ...about,
      ...contact,
      ...service,
    },
  };
});
