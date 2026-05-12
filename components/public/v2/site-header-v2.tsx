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
        { href: "/#home-at-a-glance", label: "At a Glance" },
        { href: "/#home-strategic-focus", label: "Strategic Focus" },
        { href: "/#home-strengths", label: "Key Strengths" },
        { href: "/#home-coverage", label: "Coverage & Reach" },
        { href: "/#home-success-highlight", label: "Success Highlight" },
      ]
    },
    { 
      href: "/about", 
      label: tCommon("about"),
      subItems: [
        { href: "/about#about-company-overview", label: "Company Overview" },
        { href: "/about#about-vision-mission", label: "Vision & Mission" },
        { href: "/about#about-values", label: "Core Values" },
        { href: "/about#about-legacy-success", label: "Legacy & Success" },
      ]
    },
    { 
      href: "/services", 
      label: tCommon("services"),
      subItems: [
        { href: "/services#services-regulatory", label: "Regulatory Services" },
        { href: "/services#services-infrastructure", label: "Infrastructure" },
        { href: "/services#services-market-access", label: "Market Access" },
        { href: "/services#services-logistics", label: "Logistics & Distribution" },
        { href: "/services#services-safety", label: "Safety & Vigilance" },
      ]
    },
    { 
      href: "/products", 
      label: tCommon("products"),
      subItems: [
        { href: "/products#products-pipeline", label: "Pipeline Segments" },
        { href: "/products#products-catalog", label: "Product Catalog" },
      ]
    },
    { 
      href: "/quality", 
      label: tCommon("compliance"),
      subItems: [
        { href: "/quality#quality-compliance", label: "Quality Management System" },
        { href: "/quality#quality-ethics", label: "Ethics & Compliance" },
      ]
    },
    { 
      href: "/partnerships", 
      label: tCommon("partnerships"),
      subItems: [
        { href: "/partnerships#partners-why", label: "Why Partner" },
        { href: "/partnerships#partners-advantage", label: "Damira Advantage" },
        { href: "/partnerships#partners-inquiry", label: "Inquiry Form" },
      ]
    },
    { 
      href: "/contact", 
      label: tCommon("contact"),
      subItems: [
        { href: "/contact#contact-info", label: "Contact Info" },
        { href: "/contact#contact-form", label: "Contact Form" },
      ]
    },
  ];

  return <SiteHeaderClientV2 navItems={navItems} mainNavLabel={tHeader("mainNav")} />;
}