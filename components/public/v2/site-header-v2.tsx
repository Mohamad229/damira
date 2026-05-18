import { getLocale, getTranslations } from "next-intl/server";

import { getVisibleServiceItems } from "@/components/public/sections/services/ServicesListSection";
import { getManagedPublicPageData } from "@/lib/content/public-ui";
import type { Locale } from "@/i18n/config";

import { SiteHeaderClientV2, type HeaderNavItem } from "./site-header-client-v2";

export async function SiteHeaderV2() {
  const locale = (await getLocale()) as Locale;
  const tCommon = await getTranslations("common");
  const tHeader = await getTranslations("header");
  const [
    homeData,
    aboutData,
    servicesData,
    productsData,
    qualityData,
    partnershipsData,
    contactData,
  ] = await Promise.all([
    getManagedPublicPageData("home", locale),
    getManagedPublicPageData("about", locale),
    getManagedPublicPageData("services", locale),
    getManagedPublicPageData("products", locale),
    getManagedPublicPageData("quality", locale),
    getManagedPublicPageData("partnerships", locale),
    getManagedPublicPageData("contact", locale),
  ]);

  function sectionItem(
    pageData: {
      visibility: Record<string, boolean>;
      navigationLabels: Record<string, string>;
    },
    sectionKey: string,
    href: string,
    fallbackLabel: string,
  ) {
    if (pageData.visibility[sectionKey] === false) {
      return null;
    }

    return {
      href,
      label: pageData.navigationLabels[sectionKey] || fallbackLabel,
    };
  }

  function visibleSubItems(
    items: Array<{ href: string; label: string } | null>,
  ) {
    const visible = items.filter((item): item is { href: string; label: string } =>
      Boolean(item),
    );

    return visible.length > 0 ? visible : undefined;
  }

  function visibleServiceSubItems() {
    if (servicesData.visibility.serviceItems === false) {
      return undefined;
    }

    return visibleSubItems(
      getVisibleServiceItems(servicesData.serviceItems.items).map((item) => ({
        href: item.href,
        label: item.headerLabel || item.title,
      })),
    );
  }

  const navItems: HeaderNavItem[] = [
    {
      href: "/",
      label: tCommon("home"),
      subItems: visibleSubItems([
        sectionItem(homeData, "atAGlance", "/#home-at-a-glance", tHeader("subnav.home.atAGlance")),
        sectionItem(homeData, "strategicFocus", "/#home-strategic-focus", tHeader("subnav.home.strategicFocus")),
        sectionItem(homeData, "keyStrengths", "/#home-strengths", tHeader("subnav.home.keyStrengths")),
        sectionItem(homeData, "coverageReach", "/#home-coverage", tHeader("subnav.home.coverageReach")),
        sectionItem(homeData, "successHighlight", "/#home-success-highlight", tHeader("subnav.home.successHighlight")),
      ]),
    },
    {
      href: "/about",
      label: tCommon("about"),
      subItems: visibleSubItems([
        sectionItem(aboutData, "companyOverview", "/about#about-company-overview", tHeader("subnav.about.companyOverview")),
        sectionItem(aboutData, "visionMission", "/about#about-vision-mission", tHeader("subnav.about.visionMission")),
        sectionItem(aboutData, "coreValues", "/about#about-values", tHeader("subnav.about.coreValues")),
        sectionItem(aboutData, "legacySuccess", "/about#about-legacy-success", tHeader("subnav.about.legacySuccess")),
      ]),
    },
    {
      href: "/services",
      label: tCommon("services"),
      subItems: visibleServiceSubItems(),
    },
    {
      href: "/products",
      label: tCommon("products"),
      subItems: visibleSubItems([
        sectionItem(productsData, "pipelineSegments", "/products#products-pipeline", tHeader("subnav.products.pipelineSegments")),
        sectionItem(productsData, "catalog", "/products#products-catalog", tHeader("subnav.products.productCatalog")),
      ]),
    },
    {
      href: "/quality",
      label: tCommon("compliance"),
      subItems: visibleSubItems([
        sectionItem(qualityData, "complianceDetails", "/quality#quality-compliance", tHeader("subnav.quality.qualityManagementSystem")),
        sectionItem(qualityData, "qmsArchitecture", "/quality#quality-qms", tHeader("subnav.quality.qmsArchitecture")),
        sectionItem(qualityData, "certificates", "/quality#quality-certificates", tHeader("subnav.quality.certifications")),
        sectionItem(qualityData, "ethicsCompliance", "/quality#quality-ethics", tHeader("subnav.quality.ethicsCompliance")),
      ]),
    },
    {
      href: "/partnerships",
      label: tCommon("partnerships"),
      subItems: visibleSubItems([
        sectionItem(partnershipsData, "whyPartner", "/partnerships#partners-why", tHeader("subnav.partnerships.whyPartner")),
        sectionItem(partnershipsData, "advantage", "/partnerships#partners-advantage", tHeader("subnav.partnerships.damiraAdvantage")),
        sectionItem(partnershipsData, "partnershipForm", "/partnerships#partners-inquiry", tHeader("subnav.partnerships.inquiryForm")),
      ]),
    },
    {
      href: "/contact",
      label: tCommon("contact"),
      subItems: visibleSubItems([
        sectionItem(contactData, "contactInfo", "/contact#contact-info", tHeader("subnav.contact.contactInfo")),
        sectionItem(contactData, "contactForm", "/contact#contact-form", tHeader("subnav.contact.contactForm")),
      ]),
    },
  ];

  return (
    <SiteHeaderClientV2
      navItems={navItems}
      mainNavLabel={tHeader("mainNav")}
      toggleNavLabel={tHeader("toggleNavigation")}
      switchLanguageLabel={tHeader("switchLanguage")}
    />
  );
}
