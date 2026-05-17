import { locales } from "@/i18n/config";

export type ServiceItem = {
  title: string;
  slug: string;
  description: string;
  benefit: string;
  image: string;
  details?: string[];
  featured?: boolean;
};

export async function getServiceItems(
  locale: string,
): Promise<ServiceItem[]> {
  const messages = (await import(`../../messages/${locale}/service.json`))
    .default as { all_services: { items: ServiceItem[] } };
  return messages.all_services.items;
}

export async function getAllServiceSlugs(): Promise<
  { locale: string; slug: string }[]
> {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const items = await getServiceItems(locale);
    for (const item of items) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}
