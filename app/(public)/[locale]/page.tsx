import type { Metadata } from "next";

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
      {pageData.visibility.hero !== false && (
        <section id="home-overview" className="scroll-mt-28 md:scroll-mt-32">
          <HomeHeroSection data={pageData.hero} />
        </section>
      )}

      {pageData.visibility.atAGlance !== false && (
        <section id="home-at-a-glance" className="scroll-mt-28 md:scroll-mt-32">
          <HomeStatsSection data={pageData.atAGlance} />
        </section>
      )}

      {pageData.visibility.strategicFocus !== false && (
        <section
          id="home-strategic-focus"
          className="scroll-mt-28 md:scroll-mt-32"
        >
          <HomeStrategicFocusSection data={pageData.strategicFocus} />
        </section>
      )}

      {pageData.visibility.keyStrengths !== false && (
        <section id="home-strengths" className="scroll-mt-28 md:scroll-mt-32">
          <HomeKeyStrengthsSection data={pageData.keyStrengths} />
        </section>
      )}

      {pageData.visibility.coverageReach !== false && (
        <section id="home-coverage" className="scroll-mt-28 md:scroll-mt-32">
          <HomeCoverageReachSection data={pageData.coverageReach} />
        </section>
      )}

      {pageData.visibility.successHighlight !== false && (
        <section
          id="home-success-highlight"
          className="scroll-mt-28 md:scroll-mt-32"
        >
          <HomeSuccessHighlightSection data={pageData.successHighlight} />
        </section>
      )}

      {pageData.visibility.cta !== false && (
        <section id="home-cta" className="scroll-mt-28 md:scroll-mt-32">
          <HomeCtaSection data={pageData.cta} />
        </section>
      )}
    </main>
  );
}
