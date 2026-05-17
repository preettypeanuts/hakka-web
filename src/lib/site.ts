export const siteName = "PT Hakka Hydro Tirta";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (url || "https://hht-logistics.com").replace(/\/$/, "");
}
