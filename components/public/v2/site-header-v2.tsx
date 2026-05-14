import { getTranslations } from "next-intl/server";

import { SiteHeaderClientV2, type HeaderNavItem } from "./site-header-client-v2";

export async function SiteHeaderV2() {
  const tCommon = await getTranslations("common");
  const tHeader = await getTranslations("header");

  const navItems: HeaderNavItem[] = [
    {
      href: "/",
      label: tCommon("home"),
      subItems: [
        { href: "/#home-at-a-glance", label: tHeader("subnav.home.atAGlance") },
        { href: "/#home-strategic-focus", label: tHeader("subnav.home.strategicFocus") },
        { href: "/#home-strengths", label: tHeader("subnav.home.keyStrengths") },
        { href: "/#home-coverage", label: tHeader("subnav.home.coverageReach") },
        { href: "/#home-success-highlight", label: tHeader("subnav.home.successHighlight") },
      ],
    },
    {
      href: "/about",
      label: tCommon("about"),
      subItems: [
        { href: "/about#about-company-overview", label: tHeader("subnav.about.companyOverview") },
        { href: "/about#about-vision-mission", label: tHeader("subnav.about.visionMission") },
        { href: "/about#about-values", label: tHeader("subnav.about.coreValues") },
        { href: "/about#about-legacy-success", label: tHeader("subnav.about.legacySuccess") },
      ],
    },
    {
      href: "/services",
      label: tCommon("services"),
      subItems: [
        { href: "/services#services-regulatory", label: tHeader("subnav.services.regulatoryServices") },
        { href: "/services#services-infrastructure", label: tHeader("subnav.services.infrastructure") },
        { href: "/services#services-market-access", label: tHeader("subnav.services.marketAccess") },
        { href: "/services#services-logistics", label: tHeader("subnav.services.logisticsDistribution") },
        { href: "/services#services-safety", label: tHeader("subnav.services.safetyVigilance") },
      ],
    },
    {
      href: "/products",
      label: tCommon("products"),
      subItems: [
        { href: "/products#products-pipeline", label: tHeader("subnav.products.pipelineSegments") },
        { href: "/products#products-catalog", label: tHeader("subnav.products.productCatalog") },
      ],
    },
    {
      href: "/quality",
      label: tCommon("compliance"),
      subItems: [
        { href: "/quality#quality-compliance", label: tHeader("subnav.quality.qualityManagementSystem") },
        { href: "/quality#quality-ethics", label: tHeader("subnav.quality.ethicsCompliance") },
      ],
    },
    {
      href: "/partnerships",
      label: tCommon("partnerships"),
      subItems: [
        { href: "/partnerships#partners-why", label: tHeader("subnav.partnerships.whyPartner") },
        { href: "/partnerships#partners-advantage", label: tHeader("subnav.partnerships.damiraAdvantage") },
        { href: "/partnerships#partners-inquiry", label: tHeader("subnav.partnerships.inquiryForm") },
      ],
    },
    {
      href: "/contact",
      label: tCommon("contact"),
      subItems: [
        { href: "/contact#contact-info", label: tHeader("subnav.contact.contactInfo") },
        { href: "/contact#contact-form", label: tHeader("subnav.contact.contactForm") },
      ],
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