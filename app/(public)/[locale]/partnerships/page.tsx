import type { Metadata } from "next";

import { PartnershipsHeroSection } from "@/components/public/sections/partnerships/PartnershipsHeroSection";
import { WhyPartnerSection } from "@/components/public/sections/partnerships/WhyPartnerSection";
import { PartnershipAdvantageSection } from "@/components/public/sections/partnerships/PartnershipAdvantageSection";
import { PartnershipInquirySection } from "@/components/public/sections/partnerships/PartnershipInquirySection";

import type { Locale } from "@/i18n/config";
import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";

type PartnershipsPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: PartnershipsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";

  const pageData = await getManagedPublicPageData(
    "partnerships",
    currentLocale,
  );

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/partnerships",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function PartnershipsPage({
  params,
}: PartnershipsPageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";

  const pageData = await getManagedPublicPageData(
    "partnerships",
    currentLocale,
  );

  return (
    <>
      {pageData.visibility.hero !== false && (
        <section id="partners-overview" className="scroll-mt-32">
          <PartnershipsHeroSection data={pageData.hero} />
        </section>
      )}

      {pageData.visibility.whyPartner !== false && (
        <section id="partners-why" className="scroll-mt-32">
          <WhyPartnerSection data={pageData.whyPartner} />
        </section>
      )}

      {pageData.visibility.advantage !== false && (
        <section id="partners-advantage" className="scroll-mt-32">
          <PartnershipAdvantageSection data={pageData.advantage} />
        </section>
      )}

      {pageData.visibility.partnershipForm !== false && (
        <section id="partners-inquiry" className="scroll-mt-32">
          <PartnershipInquirySection
            data={pageData.partnershipForm}
            locale={currentLocale}
          />
        </section>
      )}
    </>
  );
}
