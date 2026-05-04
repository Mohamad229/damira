# Public Website Component Architecture Analysis

This document analyzes `project_elements.zip` as uploaded. It focuses on the public website structure, page-to-component relationships, data flow, shared component dependencies, page-specific component opportunities, and files that appear used, unused, partially used, or commented out.

The admin area is intentionally treated as out of scope for styling work.

---

## 1. Purpose

The project already runs. The goal is not to make the uploaded ZIP build by itself. The goal is to document how the public-facing pages are wired today and how to safely move from shared `v2` components to page-specific components without breaking the existing project.

Main goals:

1. Identify public route files.
2. Identify which components each public page uses.
3. Identify shared `v2` components that create repeated visual styles.
4. Identify files that appear used, unused, partially used, or commented out.
5. Define a safe strategy for giving every page its own visual identity.
6. Keep admin, data contracts, page keys, and section keys untouched.

---

## 2. High-Level Project Structure

Major areas:

```text
app/
components/
lib/
```

Important subtrees:

```text
app/(admin)                       Admin routes. Out of scope.
app/(public)                      Public website routes.
app/api/admin                     Admin API routes. Out of scope.
app/api/media                     Public/media upload API area.
components/admin                  Admin UI components. Out of scope.
components/public                 Public website components.
components/public/sections        Public page sections.
components/public/sections/v2     Shared public section components currently used by many pages.
components/public/sections/base   Base section primitives and shared types.
components/public/products        Product catalog UI components.
components/ui                     Generic UI primitives.
lib/actions                       Server actions and data operations.
lib/content                       Content definitions, loaders, validators.
lib/content/public-ui             Public UI fallback and managed data layer.
```

Approximate uploaded file count from the ZIP listing:

```text
Total ZIP entries: 299
TypeScript / TSX files: 225+
TSX files: about 170+
TS files: about 50+
```

---

## 3. Admin Boundary: Do Not Modify in This Phase

Do not modify these areas while the goal is only public page styling:

```text
app/(admin)
components/admin
app/api/admin
```

Also avoid modifying these data/admin-related files unless the scope changes later:

```text
lib/actions/pages.ts
lib/actions/content.ts
lib/actions/products.ts
lib/actions/forms.ts
lib/actions/settings.ts
lib/actions/users.ts
lib/actions/media.ts
lib/content/page-definitions.ts
lib/content/loaders.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
```

Reason: these files are connected to admin editing, managed content, product management, page definitions, content loading, and fallback data. Changing them could affect the admin CMS or existing content contracts.

Reading them for understanding is fine. Editing them is not needed for the styling goal.

---

## 4. Public Routes

Public website routes live under:

```text
app/(public)/[locale]/
```

Current public pages:

```text
app/(public)/[locale]/page.tsx
app/(public)/[locale]/about/page.tsx
app/(public)/[locale]/services/page.tsx
app/(public)/[locale]/products/page.tsx
app/(public)/[locale]/products/[slug]/page.tsx
app/(public)/[locale]/quality/page.tsx
app/(public)/[locale]/compliance/page.tsx
app/(public)/[locale]/partnerships/page.tsx
app/(public)/[locale]/contact/page.tsx
```

Public support files:

```text
app/(public)/[locale]/layout.tsx
app/(public)/[locale]/loading.tsx
app/(public)/[locale]/error.tsx
app/(public)/[locale]/not-found.tsx
app/(public)/[locale]/not-found/page.tsx
```

Page-specific loading/error files:

```text
app/(public)/[locale]/about/loading.tsx
app/(public)/[locale]/services/loading.tsx
app/(public)/[locale]/products/loading.tsx
app/(public)/[locale]/products/[slug]/loading.tsx
app/(public)/[locale]/products/[slug]/error.tsx
app/(public)/[locale]/partnerships/loading.tsx
app/(public)/[locale]/contact/loading.tsx
app/(public)/[locale]/compliance/loading.tsx
```

---

## 5. Public Layout

Main file:

```text
app/(public)/[locale]/layout.tsx
```

It uses shared public layout components:

```text
components/public/v2/site-header-v2.tsx
components/public/v2/site-footer-v2.tsx
```

Relationship:

```text
PublicLayout
|-- NextIntlClientProvider
|-- SiteHeaderV2
|-- children
`-- SiteFooterV2
```

Implications:

```text
Header and footer are shared across all public pages.
Any change to site-header-v2.tsx or site-footer-v2.tsx affects the whole public website.
This is global layout work, not page-specific section work.
```

Related files:

```text
components/public/v2/site-header-v2.tsx
components/public/v2/site-header-client-v2.tsx
components/public/v2/site-footer-v2.tsx
```

---

## 6. Current Public Data Flow

Most public pages load content through:

```text
getManagedPublicPageData(pageKey, locale)
```

Main file:

```text
lib/content/public-ui/managed-data.ts
```

General flow:

```text
page.tsx
  -> getManagedPublicPageData(pageKey, locale)
  -> lib/content/public-ui/managed-data.ts
  -> getPageContent(pageKey, locale)
  -> lib/content/loaders.ts
  -> managed content from admin if available
  -> fallback data from mock-data.ts if no managed content exists
```

Key data files:

```text
lib/content/public-ui/index.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
lib/content/page-definitions.ts
lib/content/loaders.ts
```

Critical safety rule:

```text
Do not change pageKey names.
Do not change sectionKey names.
Do not change the data shape unless the admin/editor system is also updated.
```

Safe scope for this phase:

```text
Change component rendering.
Change layout.
Change CSS classes.
Change visual composition.
Change animation.
Create page-specific components that accept the same props.
```

---

## 7. Current Page Keys and Section Keys

These keys are part of the data/admin contract and should remain stable.

### Home

```text
pageKey: home
sections: hero, atAGlance, strategicFocus, keyStrengths, coverageReach, portfolioPreview, successHighlight, cta
```

### About

```text
pageKey: about
sections: hero, companyOverview, visionMission, coreValues, focusVerticals, legacySuccess
```

### Services

```text
pageKey: services
sections: hero, infrastructure, coldChain, regulatory, safetyVigilance, medicalSupport, logisticsDistribution, marketAccess
```

### Products

```text
pageKey: products
sections: hero, categories, currentPortfolio, pipelineSegments, catalog
```

### Quality

```text
pageKey: quality
sections: hero, certifications, complianceDetails, cta
```

### Partnerships

```text
pageKey: partnerships
sections: hero, whyPartner, partnershipForm, marketAccess, infrastructureStrength, commercialReach, provenSuccess, cta
```

### Contact

```text
pageKey: contact
sections: hero, contactInfo, contactForm, companyIdentity
```

---

## 8. Public Page Mapping: Home

Route file:

```text
app/(public)/[locale]/page.tsx
```

Data source:

```text
getManagedPublicPageData("home", currentLocale)
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/at-a-glance-section-v2.tsx
components/public/sections/v2/StrategicFocusSection-v2.tsx
components/public/sections/v2/KeyStrengthsSection-v2.tsx
components/public/sections/v2/CoverageReachSection-v2.tsx
components/public/sections/v2/ContentSection-v2.tsx
components/public/sections/v2/CtaSection-v2.tsx
```

Current route composition:

```text
HomePage
|-- section#home-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#home-at-a-glance
|   `-- AtAGlanceSectionV2 data={pageData.atAGlance}
|-- section#home-strategic-focus
|   `-- StrategicFocusSectionV2 data={pageData.strategicFocus}
|-- section#home-strengths
|   `-- KeyStrengthsSectionV2 data={pageData.keyStrengths}
|-- section#home-coverage
|   `-- CoverageReachSection data={pageData.coverageReach}
|-- section#home-portfolio
|   `-- PortfolioPreviewSection data={pageData.portfolioPreview}
|       Status: currently commented out
|-- section#home-success-highlight
|   `-- ContentSection data={pageData.successHighlight}
`-- section#home-cta
    `-- CtaSection data={pageData.cta}
```

Existing page-specific Home section files:

```text
components/public/sections/home/AtAGlanceSection.tsx
components/public/sections/home/CoverageReachSection.tsx
components/public/sections/home/KeyStrengthsSection.tsx
components/public/sections/home/PortfolioPreviewSection.tsx
components/public/sections/home/StrategicFocusSection.tsx
components/public/sections/home/index.ts
```

Status:

```text
These appear to be older or alternate page-specific files.
The current Home route imports shared v2 files directly instead of these Home-specific files.
Do not delete them until a full project-wide import search/build confirms they are unused.
```

Styling opportunity:

```text
Create or activate Home-specific components inside components/public/sections/home.
Start with HomeHeroSection, then gradually replace shared v2 imports.
```

---

## 9. Public Page Mapping: About

Route file:

```text
app/(public)/[locale]/about/page.tsx
```

Data source:

```text
getManagedPublicPageData("about", currentLocale)
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/vision-mission-section-v2.tsx
components/public/sections/about/CompanyOverviewSection.tsx
components/public/sections/about/CoreValuesSection.tsx
components/public/sections/about/LegacySuccessSection.tsx
```

Current route composition:

```text
AboutPage
|-- section#about-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#about-company-overview
|   `-- CompanyOverviewSection data={pageData.companyOverview}
|-- section#about-vision-mission
|   `-- VisionMissionSectionV2 data={pageData.visionMission}
|-- section#about-values
|   `-- CoreValuesSection data={pageData.coreValues}
|-- section#about-focus-verticals
|   `-- FocusVerticalsSection data={pageData.focusVerticals}
|       Status: currently commented out
`-- section#about-legacy-success
    `-- LegacySuccessSection data={pageData.legacySuccess}
```

About section files:

```text
components/public/sections/about/CompanyOverviewSection.tsx
components/public/sections/about/CoreValuesSection.tsx
components/public/sections/about/FocusVerticalsSection.tsx
components/public/sections/about/LegacySuccessSection.tsx
components/public/sections/about/VisionMissionSection.tsx
components/public/sections/about/index.ts
```

Detailed status:

```text
CompanyOverviewSection.tsx    Used by about/page.tsx
CoreValuesSection.tsx         Used by about/page.tsx
LegacySuccessSection.tsx      Used by about/page.tsx
FocusVerticalsSection.tsx     Exists and is exported, but the section is commented out in about/page.tsx
VisionMissionSection.tsx      Exists and is exported, but the route currently uses vision-mission-section-v2.tsx
```

Internal dependencies:

```text
CompanyOverviewSection.tsx  -> ContentSection-v2
CoreValuesSection.tsx       -> CardGrid-v2 + ServiceCard-v2
LegacySuccessSection.tsx    -> ContentSection-v2 + StatsSection-v2
FocusVerticalsSection.tsx   -> CardGrid-v2 + ServiceCard-v2
```

Styling opportunity:

```text
About already has page-specific wrapper files.
Replace their internal v2 usage with About-specific layouts/cards while keeping the same data props.
```

---

## 10. Public Page Mapping: Services

Route file:

```text
app/(public)/[locale]/services/page.tsx
```

Data source:

```text
getManagedPublicPageData("services", currentLocale)
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/services/InfrastructureSection.tsx
components/public/sections/services/ColdChainSection.tsx
components/public/sections/services/RegulatoryServicesSection.tsx
components/public/sections/services/SafetyVigilanceSection.tsx
components/public/sections/services/MedicalSupportSection.tsx
components/public/sections/services/LogisticsDistributionSection.tsx
components/public/sections/services/MarketAccessSection.tsx
```

Current route composition:

```text
ServicesPage
|-- section#services-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#services-infrastructure
|   `-- InfrastructureSection data={pageData.infrastructure}
|-- section#services-cold-chain
|   `-- ColdChainSection data={pageData.coldChain}
|-- section#services-regulatory
|   `-- RegulatoryServicesSection data={pageData.regulatory}
|-- section#services-safety
|   `-- SafetyVigilanceSection data={pageData.safetyVigilance}
|-- section#services-medical
|   `-- MedicalSupportSection data={pageData.medicalSupport}
|-- section#services-logistics
|   `-- LogisticsDistributionSection data={pageData.logisticsDistribution}
`-- section#services-market-access
    `-- MarketAccessSection data={pageData.marketAccess}
```

Services section files:

```text
components/public/sections/services/ColdChainSection.tsx
components/public/sections/services/InfrastructureSection.tsx
components/public/sections/services/LogisticsDistributionSection.tsx
components/public/sections/services/MarketAccessSection.tsx
components/public/sections/services/MedicalSupportSection.tsx
components/public/sections/services/RegulatoryServicesSection.tsx
components/public/sections/services/SafetyVigilanceSection.tsx
components/public/sections/services/index.ts
```

Status:

```text
All main Services section files appear to be used by services/page.tsx.
```

Internal dependency pattern:

```text
InfrastructureSection.tsx          -> ContentSection-v2
ColdChainSection.tsx               -> ContentSection-v2
RegulatoryServicesSection.tsx      -> ContentSection-v2
SafetyVigilanceSection.tsx         -> ContentSection-v2
MedicalSupportSection.tsx          -> ContentSection-v2
LogisticsDistributionSection.tsx   -> ContentSection-v2
MarketAccessSection.tsx            -> ContentSection-v2
```

Styling opportunity:

```text
Services is one of the safest and best places to start.
The route already uses Services-specific files, but each file wraps ContentSection-v2.
Replace the internals of each Services file with a unique section design while keeping the same data prop.
```

---

## 11. Public Page Mapping: Products

Route file:

```text
app/(public)/[locale]/products/page.tsx
```

Data sources:

```text
getManagedPublicPageData("products", currentLocale)
getPublicProducts(currentLocale, { page: 1, pageSize: 24 })
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/products/CategoriesSection.tsx
components/public/sections/products/PipelineSegmentsSection.tsx
components/public/products/product-catalog-filter-section-v2.tsx
```

Current route composition:

```text
ProductsPage
|-- section#products-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#products-categories
|   `-- CategoriesSection data={pageData.categories}
|-- CurrentPortfolioSection data={pageData.currentPortfolio}
|   Status: currently commented out
|-- section#products-pipeline
|   `-- PipelineSegmentsSection data={pageData.pipelineSegments}
`-- section#products-catalog
    `-- ProductCatalogFilterSectionV2
        |-- locale={currentLocale}
        |-- title={pageData.catalog.title}
        |-- description={pageData.catalog.description}
        |-- items={catalogItems}
        |-- columns={pageData.catalog.columns}
        `-- categoryOptions={categoryOptions}
```

Product section files:

```text
components/public/sections/products/CategoriesSection.tsx
components/public/sections/products/CurrentPortfolioSection.tsx
components/public/sections/products/PipelineSegmentsSection.tsx
components/public/sections/products/index.ts
```

Detailed status:

```text
CategoriesSection.tsx          Used by products/page.tsx
PipelineSegmentsSection.tsx    Used by products/page.tsx
CurrentPortfolioSection.tsx    Exists and is exported, but the route section is commented out
```

Internal dependencies:

```text
CategoriesSection.tsx          -> CardGrid-v2 + ServiceCard-v2
PipelineSegmentsSection.tsx    -> CardGrid-v2 + ServiceCard-v2
CurrentPortfolioSection.tsx    -> CardGrid-v2 + ProductCard-v2
```

Product catalog component:

```text
components/public/products/product-catalog-filter-section-v2.tsx
```

Catalog dependencies:

```text
components/public/sections/v2/ProductCard-v2.tsx
components/public/sections/base/types
```

Older or alternate product UI files:

```text
components/public/products/product-catalog-filter-section.tsx
components/public/products/product-card.tsx
components/public/products/catalog-controls.tsx
components/public/products/product-pagination.tsx
```

Status:

```text
These do not appear to be the active files used by products/page.tsx.
Do not delete them before a full import search/build in the real project.
```

Styling opportunity:

```text
Create ProductsHeroSection first.
Then make CategoriesSection and PipelineSegmentsSection use Product-specific cards instead of ServiceCard-v2.
Finally create a custom ProductCatalogCard if the catalog should look different from related products or other product cards.
```

---

## 12. Public Page Mapping: Product Detail

Route file:

```text
app/(public)/[locale]/products/[slug]/page.tsx
```

This page is different from the managed public pages. It builds a product-specific view model instead of using `getManagedPublicPageData`.

Data functions:

```text
getPublicProductBySlug(currentLocale, slug)
getPublishedProductSlugs()
buildProductDetailViewModel(product, currentLocale)
```

Primary data source:

```text
lib/actions/public-products.ts
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/CtaSection-v2.tsx
components/public/sections/product-detail/ProductInfoSection.tsx
components/public/sections/product-detail/SpecificationsSection.tsx
components/public/sections/product-detail/RelatedProductsSection.tsx
```

Current route composition:

```text
ProductDetailPage
|-- HeroSectionV2 data={pageData.hero}
|-- incomplete product message
|   Status: displayed only when product data is incomplete
|-- ProductInfoSection data={pageData.productInfo}
|-- SpecificationsSection data={pageData.specifications}
|-- RelatedProductsSection data={pageData.relatedProducts}
`-- CtaSection data={pageData.cta}
```

Product detail section files:

```text
components/public/sections/product-detail/ProductInfoSection.tsx
components/public/sections/product-detail/SpecificationsSection.tsx
components/public/sections/product-detail/RelatedProductsSection.tsx
components/public/sections/product-detail/index.ts
```

Status:

```text
All listed product-detail section files appear to be used by the product detail route.
```

Internal dependencies:

```text
ProductInfoSection.tsx        -> ContentSection-v2
RelatedProductsSection.tsx    -> ProductCard-v2
SpecificationsSection.tsx     -> SectionReveal from base
```

Styling opportunity:

```text
Create ProductDetailHeroSection.
Replace ProductInfoSection internals instead of using ContentSection-v2.
Create a RelatedProductCard if related products should differ from catalog cards.
```

---

## 13. Public Page Mapping: Quality

Route file:

```text
app/(public)/[locale]/quality/page.tsx
```

Data source:

```text
getManagedPublicPageData("quality", currentLocale)
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/quality/ComplianceDetailsSection.tsx
components/public/sections/v2/CtaSection-v2.tsx
```

Current route composition:

```text
QualityPage
|-- section#quality-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#quality-certs
|   `-- CertificationsSection data={pageData.certifications}
|       Status: currently commented out in quality/page.tsx
|-- section#quality-compliance
|   `-- ComplianceDetailsSection data={pageData.complianceDetails}
`-- section#quality-cta
    `-- CtaSectionV2 data={pageData.cta}
```

Quality section files:

```text
components/public/sections/quality/CertificationsSection.tsx
components/public/sections/quality/ComplianceDetailsSection.tsx
components/public/sections/quality/index.ts
```

Detailed status:

```text
ComplianceDetailsSection.tsx   Used by quality/page.tsx
CertificationsSection.tsx      Commented out in quality/page.tsx, but used by compliance/page.tsx
```

Internal dependencies:

```text
ComplianceDetailsSection.tsx   -> ContentSection-v2
CertificationsSection.tsx      -> CardGrid-v2 + ServiceCard-v2
```

Styling opportunity:

```text
Create QualityHeroSection.
Replace ComplianceDetailsSection internals instead of wrapping ContentSection-v2.
Give certifications a Quality-specific card design if that section is re-enabled on /quality.
```

---

## 14. Public Page Mapping: Compliance

Route file:

```text
app/(public)/[locale]/compliance/page.tsx
```

Important note:

```text
This route currently uses getManagedPublicPageData("quality", currentLocale).
```

That means `/compliance` currently displays content from the `quality` page key. It does not have a separate managed page key called `compliance`.

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/quality/CertificationsSection.tsx
components/public/sections/quality/ComplianceDetailsSection.tsx
components/public/sections/v2/CtaSection-v2.tsx
```

Current route composition:

```text
CompliancePage
|-- HeroSectionV2 data={pageData.hero}
|-- CertificationsSection data={pageData.certifications}
|-- ComplianceDetailsSection data={pageData.complianceDetails}
`-- CtaSectionV2 data={pageData.cta}
```

Important future decision:

```text
If Compliance only needs a different visual style, create Compliance-specific components while keeping pageKey = "quality".
If Compliance needs separate admin-managed content, a new pageKey = "compliance" must be added later.
That would require editing page definitions/admin-related content wiring, which is outside the current scope.
```

---

## 15. Public Page Mapping: Partnerships

Route file:

```text
app/(public)/[locale]/partnerships/page.tsx
```

Data source:

```text
getManagedPublicPageData("partnerships", currentLocale)
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/why-partner-section-v2.tsx
components/public/sections/v2/partnership-inquiry-section-v2.tsx
```

Current route composition:

```text
PartnershipsPage
|-- section#partners-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#partners-why
|   `-- WhyPartnerSectionV2 data={pageData.whyPartner}
|-- section#partners-inquiry
|   `-- PartnershipInquirySectionV2
|       |-- data={pageData.partnershipForm}
|       `-- locale={currentLocale}
|-- section#partners-market-access
|   `-- ContentSectionV2 data={pageData.marketAccess}
|       Status: currently commented out
|-- section#partners-infrastructure
|   `-- ContentSectionV2 data={pageData.infrastructureStrength}
|       Status: currently commented out
|-- section#partners-reach
|   `-- StatsSectionV2 data={pageData.commercialReach}
|       Status: currently commented out
|-- section#partners-proven-success
|   `-- ContentSectionV2 data={pageData.provenSuccess}
|       Status: currently commented out
`-- section#partners-cta
    `-- CtaSectionV2 data={pageData.cta}
        Status: currently commented out
```

Existing Partnerships page-specific files:

```text
components/public/sections/partnerships/WhyPartnerSection.tsx
components/public/sections/partnerships/PartnershipInquirySection.tsx
components/public/sections/partnerships/index.ts
```

Status:

```text
These exist and are exported, but the current route uses the shared v2 files directly.
```

Styling opportunity:

```text
Partnerships already has page-specific section files that can become the active styling layer.
Switch the route from v2 imports to the page-specific files only after confirming matching props.
```

---

## 16. Public Page Mapping: Contact

Route file:

```text
app/(public)/[locale]/contact/page.tsx
```

Data sources:

```text
getManagedPublicPageData("contact", currentLocale)
getPublicSiteSettings()
```

Additional related file:

```text
lib/site-settings.ts
```

Currently used components:

```text
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/contact-info-section-v2.tsx
components/public/sections/v2/contact-form-section-v2.tsx
```

Current route composition:

```text
ContactPage
|-- section#contact-overview
|   `-- HeroSectionV2 data={pageData.hero}
|-- section#contact-info
|   `-- ContactInfoSectionV2 data={contactInfo}
|-- section#contact-form
|   `-- ContactFormSectionV2
|       |-- data={pageData.contactForm}
|       `-- locale={currentLocale}
`-- section#contact-identity
    `-- ContentSectionV2 data={pageData.companyIdentity}
        Status: currently commented out
```

Existing Contact page-specific files:

```text
components/public/sections/contact/CompanyIdentitySection.tsx
components/public/sections/contact/ContactFormSection.tsx
components/public/sections/contact/ContactInfoSection.tsx
components/public/sections/contact/index.ts
```

Status:

```text
These exist and are exported, but the current route uses shared v2 files directly.
```

Styling opportunity:

```text
Create ContactHeroSection.
Use ContactInfoSection and ContactFormSection as Contact-specific styling points instead of v2 direct imports.
```

---

## 17. Shared v2 Section Components

Directory:

```text
components/public/sections/v2
```

Files:

```text
components/public/sections/v2/CardGrid-v2.tsx
components/public/sections/v2/ContentSection-v2.tsx
components/public/sections/v2/CoverageReachSection-v2.tsx
components/public/sections/v2/CtaSection-v2.tsx
components/public/sections/v2/KeyStrengthsSection-v2.tsx
components/public/sections/v2/PortfolioPreviewSection-v2.tsx
components/public/sections/v2/ProductCard-v2.tsx
components/public/sections/v2/ServiceCard-v2.tsx
components/public/sections/v2/StrategicFocusSection-v2.tsx
components/public/sections/v2/at-a-glance-section-v2.tsx
components/public/sections/v2/contact-form-section-v2.tsx
components/public/sections/v2/contact-info-section-v2.tsx
components/public/sections/v2/hero-section-v2.tsx
components/public/sections/v2/partnership-inquiry-section-v2.tsx
components/public/sections/v2/stats-section-v2.tsx
components/public/sections/v2/vision-mission-section-v2.tsx
components/public/sections/v2/why-partner-section-v2.tsx
```

This directory is the main reason many pages share the same visual style.

Most impactful shared files:

```text
hero-section-v2.tsx        Used by almost every public page.
ContentSection-v2.tsx      Used directly or indirectly in Home, About, Services, Product Detail, Quality, Partnerships, and Contact.
CardGrid-v2.tsx            Used for card layouts across About, Products, Quality, Partnerships, and v2 sections.
ServiceCard-v2.tsx         Used with CardGrid-v2 for many non-service card contexts.
ProductCard-v2.tsx         Used in product catalog and related product UI.
CtaSection-v2.tsx          Used across Home, Product Detail, Quality, Compliance, and potentially Partnerships.
stats-section-v2.tsx       Used in Home, About, Partnerships, and related content blocks.
```

Important rule:

```text
Do not directly restyle shared v2 files if the goal is page-specific visual variety.
```

Better approach:

```text
Keep v2 as a fallback/reference layer.
Create or activate page-specific components.
Move styling into page-specific section files.
```

---

## 18. Base Public Section Components

Directory:

```text
components/public/sections/base
```

Files:

```text
CardGrid.tsx
ContentSection.tsx
CtaSection.tsx
HeroSection.tsx
ProductCard.tsx
SectionReveal.tsx
ServiceCard.tsx
StatsSection.tsx
types.ts
index.ts
```

Current role:

```text
SectionReveal.tsx   Used by many v2 and page-specific section files.
types.ts            Used for public section data type definitions.
index.ts            Exports base components/types.
```

Some base components appear to be older or alternate versions of v2 components:

```text
HeroSection.tsx
ContentSection.tsx
CtaSection.tsx
CardGrid.tsx
ServiceCard.tsx
ProductCard.tsx
StatsSection.tsx
```

Recommended handling:

```text
Do not delete these now.
Keep using SectionReveal and types as safe shared primitives.
Use base components only if they help, but do not make them the new all-purpose style layer.
```

---

## 19. Used, Partially Used, and Not Directly Used Files

This section is based on static route/component reading. It is not a deletion list. Before deleting anything, run a full project search and build in the real repository.

### Home page-specific files

```text
components/public/sections/home/AtAGlanceSection.tsx
components/public/sections/home/CoverageReachSection.tsx
components/public/sections/home/KeyStrengthsSection.tsx
components/public/sections/home/PortfolioPreviewSection.tsx
components/public/sections/home/StrategicFocusSection.tsx
components/public/sections/home/index.ts
```

Status:

```text
Not directly used by the current app/(public)/[locale]/page.tsx route.
The current Home route imports from components/public/sections/v2 directly.
Possible older or alternate Home-specific layer.
```

### Contact page-specific files

```text
components/public/sections/contact/CompanyIdentitySection.tsx
components/public/sections/contact/ContactFormSection.tsx
components/public/sections/contact/ContactInfoSection.tsx
components/public/sections/contact/index.ts
```

Status:

```text
Not directly used by contact/page.tsx at the moment.
The current Contact route imports shared v2 contact sections directly.
Good candidates for Contact-specific styling.
```

### Partnerships page-specific files

```text
components/public/sections/partnerships/WhyPartnerSection.tsx
components/public/sections/partnerships/PartnershipInquirySection.tsx
components/public/sections/partnerships/index.ts
```

Status:

```text
Not directly used by partnerships/page.tsx at the moment.
The route imports shared v2 partnership sections directly.
Good candidates for Partnerships-specific styling.
```

### About files partially unused or commented out

```text
components/public/sections/about/FocusVerticalsSection.tsx
components/public/sections/about/VisionMissionSection.tsx
```

Status:

```text
FocusVerticalsSection.tsx    Section exists but is commented out in about/page.tsx.
VisionMissionSection.tsx     Exists, but about/page.tsx currently uses vision-mission-section-v2.tsx.
```

### Product files partially unused or alternate

```text
components/public/sections/products/CurrentPortfolioSection.tsx
components/public/products/product-catalog-filter-section.tsx
components/public/products/product-card.tsx
components/public/products/catalog-controls.tsx
components/public/products/product-pagination.tsx
```

Status:

```text
CurrentPortfolioSection.tsx          Exists but is commented out in products/page.tsx.
product-catalog-filter-section.tsx   Likely an older/alternate version of product-catalog-filter-section-v2.tsx.
product-card.tsx                     Likely an older/alternate product card.
catalog-controls.tsx                 Not clearly used by the current active route.
product-pagination.tsx               Not clearly used by the current active route.
```

### Public dynamic/legacy files

```text
components/public/page-content.tsx
components/public/section-renderer.tsx
components/public/scroll-reveal.tsx
```

Status:

```text
These appear related to a dynamic or older page-rendering path.
The active public routes currently use getManagedPublicPageData directly.
Do not delete before checking for imports or route dependencies elsewhere.
```

---

## 20. Commented-Out Sections in Public Routes

These sections appear present in data/contracts but are currently commented out in route composition.

### Home

```text
PortfolioPreviewSection data={pageData.portfolioPreview}
```

Location:

```text
app/(public)/[locale]/page.tsx
```

Status:

```text
Currently commented out.
```

### About

```text
FocusVerticalsSection data={pageData.focusVerticals}
```

Location:

```text
app/(public)/[locale]/about/page.tsx
```

Status:

```text
Currently commented out.
```

### Products

```text
CurrentPortfolioSection data={pageData.currentPortfolio}
```

Location:

```text
app/(public)/[locale]/products/page.tsx
```

Status:

```text
Currently commented out.
```

### Quality

```text
CertificationsSection data={pageData.certifications}
```

Location:

```text
app/(public)/[locale]/quality/page.tsx
```

Status:

```text
Commented out in /quality, but used in /compliance.
```

### Partnerships

```text
ContentSectionV2 data={pageData.marketAccess}
ContentSectionV2 data={pageData.infrastructureStrength}
StatsSectionV2 data={pageData.commercialReach}
ContentSectionV2 data={pageData.provenSuccess}
CtaSectionV2 data={pageData.cta}
```

Location:

```text
app/(public)/[locale]/partnerships/page.tsx
```

Status:

```text
Currently commented out.
```

### Contact

```text
ContentSectionV2 data={pageData.companyIdentity}
```

Location:

```text
app/(public)/[locale]/contact/page.tsx
```

Status:

```text
Currently commented out.
```

---

## 21. Current Repetition Pattern

The current visual repetition comes from these shared components:

```text
HeroSectionV2
ContentSection-v2
CardGrid-v2
ServiceCard-v2
ProductCard-v2
CtaSection-v2
StatsSectionV2
```

This is not always bad. The issue is that these shared components currently define the same visual language across many different pages.

The goal is not to remove all repetition. The goal is to convert accidental repetition into intentional page-specific components.

Recommended future naming pattern:

```text
HomeHeroSection
AboutHeroSection
ServicesHeroSection
ProductsHeroSection
ProductDetailHeroSection
QualityHeroSection
ComplianceHeroSection
PartnershipsHeroSection
ContactHeroSection
```

For cards/content blocks:

```text
HomeStrengthCard
AboutValueCard
ProductCategoryCard
ProductPipelineCard
QualityCertificationCard
PartnershipBenefitCard
ServiceFeatureBlock
ContactInfoCard
RelatedProductCard
ProductCatalogCard
```

---

## 22. Safe Modification Strategy

### Rule 1: Do Not Touch Admin/Data Contracts

Do not modify:

```text
app/(admin)
components/admin
app/api/admin
lib/content/page-definitions.ts
lib/content/loaders.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
```

### Rule 2: Change Presentation Only

Safe target areas:

```text
components/public/sections/*
components/public/products/*
```

Route files can be changed carefully only to switch imports from shared components to page-specific components:

```text
app/(public)/[locale]/page.tsx
app/(public)/[locale]/about/page.tsx
app/(public)/[locale]/services/page.tsx
app/(public)/[locale]/products/page.tsx
app/(public)/[locale]/products/[slug]/page.tsx
app/(public)/[locale]/quality/page.tsx
app/(public)/[locale]/compliance/page.tsx
app/(public)/[locale]/partnerships/page.tsx
app/(public)/[locale]/contact/page.tsx
```

### Rule 3: Keep Props Stable at First

Conceptual example:

```text
Before:
HeroSectionV2 data={pageData.hero}

After:
AboutHeroSection data={pageData.hero}
```

The data key remains unchanged:

```text
pageData.hero
```

This keeps the admin/content system unaffected.

---

## 23. Recommended Hero Separation Plan

Current shared Hero:

```text
components/public/sections/v2/hero-section-v2.tsx
```

Recommended page-specific Hero files:

```text
components/public/sections/home/HomeHeroSection.tsx
components/public/sections/about/AboutHeroSection.tsx
components/public/sections/services/ServicesHeroSection.tsx
components/public/sections/products/ProductsHeroSection.tsx
components/public/sections/product-detail/ProductDetailHeroSection.tsx
components/public/sections/quality/QualityHeroSection.tsx
components/public/sections/quality/ComplianceHeroSection.tsx
components/public/sections/partnerships/PartnershipsHeroSection.tsx
components/public/sections/contact/ContactHeroSection.tsx
```

Routes to update gradually:

```text
app/(public)/[locale]/page.tsx
app/(public)/[locale]/about/page.tsx
app/(public)/[locale]/services/page.tsx
app/(public)/[locale]/products/page.tsx
app/(public)/[locale]/products/[slug]/page.tsx
app/(public)/[locale]/quality/page.tsx
app/(public)/[locale]/compliance/page.tsx
app/(public)/[locale]/partnerships/page.tsx
app/(public)/[locale]/contact/page.tsx
```

Suggested order:

```text
1. HomeHeroSection
2. AboutHeroSection
3. ServicesHeroSection
4. ProductsHeroSection
5. ProductDetailHeroSection
6. QualityHeroSection
7. ComplianceHeroSection
8. PartnershipsHeroSection
9. ContactHeroSection
```

---

## 24. Recommended Content Section Separation Plan

The best starting point after Hero is Services, because it already has individual files for each service section.

Current Services files:

```text
components/public/sections/services/InfrastructureSection.tsx
components/public/sections/services/ColdChainSection.tsx
components/public/sections/services/RegulatoryServicesSection.tsx
components/public/sections/services/SafetyVigilanceSection.tsx
components/public/sections/services/MedicalSupportSection.tsx
components/public/sections/services/LogisticsDistributionSection.tsx
components/public/sections/services/MarketAccessSection.tsx
```

Current issue:

```text
Each file mostly delegates to ContentSection-v2.
```

Target:

```text
Each service section keeps the same prop contract but renders its own layout and style.
```

Important constraint:

```text
Keep the same data prop type and section data usage.
Do not change the services page data keys.
```

---

## 25. Recommended Card Separation Plan

Current shared card components:

```text
components/public/sections/v2/CardGrid-v2.tsx
components/public/sections/v2/ServiceCard-v2.tsx
components/public/sections/v2/ProductCard-v2.tsx
```

Places they influence:

```text
About/CoreValuesSection.tsx
About/FocusVerticalsSection.tsx
Products/CategoriesSection.tsx
Products/PipelineSegmentsSection.tsx
Products/CurrentPortfolioSection.tsx
Quality/CertificationsSection.tsx
Partnerships/why-partner-section-v2.tsx
Product catalog filter
Related products
```

Recommended page/context-specific card names:

```text
AboutValueCard
AboutFocusVerticalCard
ProductCategoryCard
ProductPipelineCard
ProductCatalogCard
RelatedProductCard
QualityCertificationCard
PartnershipBenefitCard
HomeStrengthCard
```

Avoid overusing variants like:

```text
<ServiceCard variant="about" />
<ServiceCard variant="product" />
<ServiceCard variant="quality" />
```

Reason:

```text
A single component with many visual variants can become harder to maintain than clear page-specific components.
```

---

## 26. Relatively Safe Files/Folders to Modify

Main public presentation areas:

```text
components/public/sections/about
components/public/sections/services
components/public/sections/products
components/public/sections/product-detail
components/public/sections/quality
components/public/sections/contact
components/public/sections/partnerships
components/public/sections/home
components/public/products
```

Public route files can be modified carefully for import switching:

```text
app/(public)/[locale]/page.tsx
app/(public)/[locale]/about/page.tsx
app/(public)/[locale]/services/page.tsx
app/(public)/[locale]/products/page.tsx
app/(public)/[locale]/products/[slug]/page.tsx
app/(public)/[locale]/quality/page.tsx
app/(public)/[locale]/compliance/page.tsx
app/(public)/[locale]/partnerships/page.tsx
app/(public)/[locale]/contact/page.tsx
```

Shared utilities/components that are generally safe to use:

```text
components/public/sections/base/SectionReveal.tsx
components/public/sections/base/types.ts
components/ui/*
lib/utils.ts
```

Important note:

```text
Safe to use does not always mean safe to edit.
Edit shared utilities only if you intentionally want a global effect.
```

---

## 27. Files/Folders to Avoid in This Phase

Avoid editing:

```text
app/(admin)
components/admin
app/api/admin
lib/actions/pages.ts
lib/actions/content.ts
lib/actions/products.ts
lib/actions/forms.ts
lib/actions/settings.ts
lib/actions/users.ts
lib/actions/media.ts
lib/content/page-definitions.ts
lib/content/loaders.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
```

Reason:

```text
These are connected to admin, managed content, page definitions, loaders, server actions, and fallback content.
They are not needed for the page-specific styling goal.
```

---

## 28. Quality vs Compliance Note

Current routes:

```text
app/(public)/[locale]/quality/page.tsx
app/(public)/[locale]/compliance/page.tsx
```

Both currently rely on:

```text
getManagedPublicPageData("quality", currentLocale)
```

Meaning:

```text
/quality and /compliance currently share the same managed content source.
```

If only styling should differ:

```text
Create Quality-specific and Compliance-specific components while keeping pageKey = "quality".
```

If content should differ too:

```text
A new pageKey = "compliance" would need to be added later.
That requires admin/content definition work and is outside the current no-admin-touch scope.
```

---

## 29. Header Anchor Note

A potential mismatch was observed between a header anchor and a Home section ID.

Possible header target:

```text
#home-success
```

Home section ID:

```text
#home-success-highlight
```

Related files:

```text
components/public/v2/site-header-v2.tsx
components/public/v2/site-header-client-v2.tsx
app/(public)/[locale]/page.tsx
```

Impact:

```text
If this mismatch still exists, clicking the header link may not scroll to the intended section.
```

This is a small global navigation fix, but it affects the shared header, so it should be handled separately from page-specific styling.

---

## 30. Recommended Implementation Order

### Phase 1: Keep This Document as the Baseline

```text
No code changes yet.
Use this document to decide the first page/component to separate.
```

### Phase 2: Separate Hero Components

```text
HomeHeroSection
AboutHeroSection
ServicesHeroSection
ProductsHeroSection
ProductDetailHeroSection
QualityHeroSection
ComplianceHeroSection
PartnershipsHeroSection
ContactHeroSection
```

### Phase 3: Separate Services Content Sections

```text
InfrastructureSection
ColdChainSection
RegulatoryServicesSection
SafetyVigilanceSection
MedicalSupportSection
LogisticsDistributionSection
MarketAccessSection
```

Goal:

```text
Stop delegating all Services sections to ContentSection-v2.
Give each Services section a distinct layout while keeping the same data prop.
```

### Phase 4: Separate Cards

```text
About cards
Products cards
Quality cards
Partnerships cards
Product catalog cards
Related product cards
```

### Phase 5: Activate Contact and Partnerships Page-Specific Files

```text
components/public/sections/contact/*
components/public/sections/partnerships/*
```

Current issue:

```text
The route files currently use v2 direct imports instead of these page-specific files.
```

### Phase 6: Clean Up Only After Verification

Do not delete files until:

```text
A full import search confirms no references.
A production build passes.
Dynamic route behavior is checked.
Admin editing is verified unaffected.
```

---

## 31. Practical Decision Matrix

| Area                                                | Current State                          | Recommended Action                             |
| --------------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `app/(admin)`                                       | Admin system                           | Do not touch                                   |
| `components/admin`                                  | Admin UI                               | Do not touch                                   |
| `lib/content/page-definitions.ts`                   | Page/section definitions               | Do not touch in styling phase                  |
| `lib/content/public-ui/managed-data.ts`             | Managed public data loader             | Do not touch                                   |
| `components/public/sections/v2`                     | Shared visual layer                    | Do not restyle directly for page-specific work |
| `components/public/sections/base/types.ts`          | Shared types                           | Safe to use                                    |
| `components/public/sections/base/SectionReveal.tsx` | Shared reveal primitive                | Safe to use                                    |
| `components/public/sections/services/*`             | Active page-specific wrappers          | Good first styling target                      |
| `components/public/sections/about/*`                | Partially active wrappers              | Good target after Hero                         |
| `components/public/sections/products/*`             | Active wrappers plus commented section | Good target for card separation                |
| `components/public/sections/contact/*`              | Exists but route uses v2               | Candidate to activate                          |
| `components/public/sections/partnerships/*`         | Exists but route uses v2               | Candidate to activate                          |
| `components/public/products/*`                      | Mixed active and older product UI      | Modify carefully after confirming imports      |

---

## 32. Main Architectural Conclusion

The project structure is already suitable for the goal.

You already have page-specific folders:

```text
components/public/sections/about
components/public/sections/services
components/public/sections/products
components/public/sections/product-detail
components/public/sections/quality
components/public/sections/contact
components/public/sections/partnerships
components/public/sections/home
```

The main issue is that many files are either:

```text
1. Not currently used because routes import v2 directly.
2. Used but only as thin wrappers around shared v2 components.
```

So the correct strategy is not a full rewrite. The correct strategy is a gradual migration:

```text
from shared v2 components
into page-specific section components
```

Without changing:

```text
data shape
admin system
pageKey
sectionKey
server actions
loaders
mock-data
managed-data
```

This will allow the website to keep one overall brand spirit while giving every page its own layout, rhythm, visual emphasis, and style.

---

## 33. Best First Work Items

Recommended first practical targets:

```text
1. HomeHeroSection
2. AboutHeroSection
3. ServicesHeroSection
4. ProductsHeroSection
5. Services content sections
6. Products cards
7. About cards
8. Contact page-specific sections
9. Partnerships page-specific sections
```

Best starting folders:

```text
components/public/sections/home
components/public/sections/about
components/public/sections/services
```

Best folders/files to avoid initially:

```text
app/(admin)
components/admin
app/api/admin
lib/content/page-definitions.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
```

---

## 34. Final Notes

Use this document as a planning reference before writing code.

The safest implementation approach is page-by-page and component-by-component:

```text
1. Pick one route.
2. Create or activate a page-specific component.
3. Keep the same data prop.
4. Change only the import or internal rendering.
5. Run the project.
6. Confirm the page still works.
7. Continue to the next section.
```

This avoids breaking the working project while still reaching the target architecture: each page has its own components and its own visual personality.
