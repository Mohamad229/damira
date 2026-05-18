import type { Metadata } from "next";

import { ContactHeroSection } from "@/components/public/sections/contact/ContactHeroSection";
import { ContactInfoSection } from "@/components/public/sections/contact/ContactInfoSection";
import { ContactFormSection } from "@/components/public/sections/contact/ContactFormSection";

import type { Locale } from "@/i18n/config";
import { getManagedPublicPageData } from "@/lib/content/public-ui";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 900;

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("contact", currentLocale);

  const title = pageData.metadata.title;
  const description = pageData.metadata.description;

  return createPublicMetadata({
    locale: currentLocale,
    pathname: "/contact",
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const currentLocale: Locale = locale === "ar" ? "ar" : "en";
  const pageData = await getManagedPublicPageData("contact", currentLocale);

  return (
    <>
      {pageData.visibility.hero !== false && (
        <section id="contact-overview" className="scroll-mt-32">
          <ContactHeroSection data={pageData.hero} />
        </section>
      )}
      {pageData.visibility.contactInfo !== false && (
        <section id="contact-info" className="scroll-mt-32">
          <ContactInfoSection data={pageData.contactInfo} />
        </section>
      )}
      {pageData.visibility.contactForm !== false && (
        <section id="contact-form" className="scroll-mt-32">
          <ContactFormSection
            data={pageData.contactForm}
            locale={currentLocale}
          />
        </section>
      )}
    </>
  );
}
