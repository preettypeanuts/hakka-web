import type { Metadata } from "next";
import { getSiteUrl, siteName } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  locale: string;
  path?: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  locale,
  path = "",
  image = "/pc.webp",
}: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${normalizedPath === "/" ? "" : normalizedPath}`,
        id: `${siteUrl}/id${normalizedPath === "/" ? "" : normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url,
      siteName,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
