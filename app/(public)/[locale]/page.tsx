import type { Metadata } from "next";

// import { ContentSection } from "@/components/public/sections/v2/ContentSection-v2";
// import { CtaSection } from "@/components/public/sections/v2/CtaSection-v2";
// import { HeroSectionV2 } from "@/components/public/sections/v2/hero-section-v2";
// import { AtAGlanceSectionV2 } from "@/components/public/sections/v2/at-a-glance-section-v2";
// import { CoverageReachSection } from "@/components/public/sections/v2/CoverageReachSection-v2";
// import { KeyStrengthsSectionV2 } from "@/components/public/sections/v2/KeyStrengthsSection-v2";
// import { PortfolioPreviewSection } from "@/components/public/sections/v2/PortfolioPreviewSection-v2";
// import { StrategicFocusSectionV2 } from "@/components/public/sections/v2/StrategicFocusSection-v2";

import { HomeHeroSection } from "@/components/public/sections/home/HomeHeroSection";
import { HomeStatsSection } from "@/components/public/sections/home/HomeStatsSection";
import { HomeStrategicFocusSection } from "@/components/public/sections/home/HomeStrategicFocusSection";
import { HomeKeyStrengthsSection } from "@/components/public/sections/home/HomeKeyStrengthsSection";
import { HomeCoverageReachSection } from "@/components/public/sections/home/HomeCoverageReachSection";
import { HomeSuccessHighlightSection } from "@/components/public/sections/home/HomeSuccessHighlightSection";
import { HomeCtaSection } from "@/components/public/sections/home/HomeCtaSection";

import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("home", currentLocale);

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("home", currentLocale);

  return (
    <main className="bg-white text-slate-900">
      <section id="home-overview" className="scroll-mt-28 md:scroll-mt-32">
        <HomeHeroSection data={pageData.hero} />
      </section>

      <section id="home-at-a-glance" className="scroll-mt-28 md:scroll-mt-32">
        <HomeStatsSection data={pageData.atAGlance} />
      </section>

      <section
        id="home-strategic-focus"
        className="scroll-mt-28 md:scroll-mt-32"
      >
        <HomeStrategicFocusSection data={pageData.strategicFocus} />
      </section>

      <section id="home-strengths" className="scroll-mt-28 md:scroll-mt-32">
        <HomeKeyStrengthsSection data={pageData.keyStrengths} />
      </section>

      <section id="home-coverage" className="scroll-mt-28 md:scroll-mt-32">
        <HomeCoverageReachSection data={pageData.coverageReach} />
      </section>

      {/* <section id="home-portfolio" className="scroll-mt-28 md:scroll-mt-32">
        <PortfolioPreviewSection data={pageData.portfolioPreview} />
      </section> */}

      <section
        id="home-success-highlight"
        className="scroll-mt-28 md:scroll-mt-32"
      >
        <HomeSuccessHighlightSection data={pageData.successHighlight} />
      </section>

      <section id="home-cta" className="scroll-mt-28 md:scroll-mt-32">
        <HomeCtaSection data={pageData.cta} />
      </section>
    </main>
  );
}
