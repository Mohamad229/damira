import type { Metadata } from "next";

import { AboutHeroSection } from "@/components/public/sections/about/AboutHeroSection";
import { CompanyOverviewSection } from "@/components/public/sections/about/CompanyOverviewSection";
import { AboutVisionMissionSection } from "@/components/public/sections/about/AboutVisionMissionSection";
import { CoreValuesSection } from "@/components/public/sections/about/CoreValuesSection";
import { LegacySuccessSection } from "@/components/public/sections/about/LegacySuccessSection";

import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("about", currentLocale);

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/about",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("about", currentLocale);

  return (
    <>
      <section id="about-overview" className="scroll-mt-32">
        <AboutHeroSection data={pageData.hero} />
      </section>
      <section id="about-company-overview" className="scroll-mt-32">
        <CompanyOverviewSection data={pageData.companyOverview} />
      </section>
      <section id="about-vision-mission" className="scroll-mt-32">
        <AboutVisionMissionSection data={pageData.visionMission} />
      </section>
      <section id="about-values" className="scroll-mt-32">
        <CoreValuesSection data={pageData.coreValues} />
      </section>
      <section id="about-legacy-success" className="scroll-mt-32">
        <LegacySuccessSection data={pageData.legacySuccess} />
      </section>
    </>
  );
}
