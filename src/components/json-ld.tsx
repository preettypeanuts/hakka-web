import { branchLocations } from "@/components/branch-locations-data";
import { getSiteUrl, siteName } from "@/lib/site";
import { getWhatsAppNumber } from "@/lib/whatsapp";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const headOffice = branchLocations.find((b) => b.type === "Head Office");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${getWhatsAppNumber()}`,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    ...(headOffice && {
      address: {
        "@type": "PostalAddress",
        streetAddress: headOffice.address.street,
        addressLocality: headOffice.address.city,
        addressRegion: headOffice.address.province,
        postalCode: headOffice.address.postalCode,
        addressCountry: headOffice.address.country,
      },
    }),
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
