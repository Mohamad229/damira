import type { Metadata } from "next";

import { ServicesHeroSection } from "@/components/public/sections/services/ServicesHeroSection";
import {
  getVisibleServiceItems,
  ServicesListSection,
} from "@/components/public/sections/services/ServicesListSection";

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
  const visibleServiceItems = getVisibleServiceItems(pageData.serviceItems.items);

  return (
    <>
      {pageData.visibility.hero !== false && (
        <section id="services-overview" className="scroll-mt-32">
          <ServicesHeroSection data={pageData.hero} />
        </section>
      )}
      {pageData.visibility.serviceItems !== false &&
      visibleServiceItems.length > 0 ? (
        <section id="services-list" className="scroll-mt-32">
          <ServicesListSection
            data={{ ...pageData.serviceItems, items: visibleServiceItems }}
          />
        </section>
      ) : null}
    </>
  );
}
