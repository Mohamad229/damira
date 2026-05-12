import type { Metadata } from "next";

import { ServicesHeroSection } from "@/components/public/sections/services/ServicesHeroSection";
import { InfrastructureSection } from "@/components/public/sections/services/InfrastructureSection";
import { RegulatoryServicesSection } from "@/components/public/sections/services/RegulatoryServicesSection";
import { SafetyVigilanceSection } from "@/components/public/sections/services/SafetyVigilanceSection";
import { LogisticsDistributionSection } from "@/components/public/sections/services/LogisticsDistributionSection";
import { MarketAccessSection } from "@/components/public/sections/services/MarketAccessSection";

import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("services", currentLocale);

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/services",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("services", currentLocale);

  return (
    <>
      <section id="services-overview" className="scroll-mt-32">
        <ServicesHeroSection data={pageData.hero} />
      </section>
      <section id="services-regulatory" className="scroll-mt-32">
        <RegulatoryServicesSection data={pageData.regulatory} />
      </section>
      <section id="services-infrastructure" className="scroll-mt-32">
        <InfrastructureSection data={pageData.infrastructure} />
      </section>
      <section id="services-market-access" className="scroll-mt-32">
        <MarketAccessSection data={pageData.marketAccess} />
      </section>
      <section id="services-logistics" className="scroll-mt-32">
        <LogisticsDistributionSection data={pageData.logisticsDistribution} />
      </section>
      <section id="services-safety" className="scroll-mt-32">
        <SafetyVigilanceSection data={pageData.safetyVigilance} />
      </section>
    </>
  );
}
