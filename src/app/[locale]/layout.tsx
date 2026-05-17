import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navigation/Navbar";
import { FloatingButtons } from "@/components/floating-buttons";
import { OrganizationJsonLd } from "@/components/json-ld";
import { Analytics } from "@/components/analytics";
import { createPageMetadata } from "@/lib/metadata";
import { siteName } from "@/lib/site";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    ...createPageMetadata({
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale,
    }),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hht-logistics.com"),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        <Analytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <FloatingButtons />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
