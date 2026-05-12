import type { Metadata } from "next";

// import { HeroSectionV2 } from "@/components/public/sections/v2/hero-section-v2";
// import { CtaSection as CtaSectionV2 } from "@/components/public/sections/v2/CtaSection-v2";
// import {
//   ComplianceDetailsSection,
// } from "@/components/public/sections/quality";

import { QualityHeroSection } from "@/components/public/sections/quality/QualityHeroSection";
import { ComplianceDetailsSection } from "@/components/public/sections/quality/ComplianceDetailsSection";
import { EthicsComplianceSection } from "@/components/public/sections/quality/EthicsComplianceSection";
import { QmsArchitectureSection } from "@/components/public/sections/quality/QmsArchitectureSection";

import type { Locale } from "@/i18n/config";
import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";

type QualityPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: QualityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("quality", currentLocale);

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/quality",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function QualityPage({ params }: QualityPageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("quality", currentLocale);

  return (
    <>
      <section id="quality-overview" className="scroll-mt-32">
        <QualityHeroSection data={pageData.hero} />
      </section>
      <section id="quality-compliance" className="scroll-mt-32">
        <ComplianceDetailsSection data={pageData.complianceDetails} />
      </section>
      <section id="quality-qms" className="scroll-mt-32">
        <QmsArchitectureSection data={pageData.qmsArchitecture} />
      </section>
      <section id="quality-ethics" className="scroll-mt-32">
        <EthicsComplianceSection data={pageData.ethicsCompliance} />
      </section>
    </>
  );
}
