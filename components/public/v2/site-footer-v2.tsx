import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";

import { localeDirection, type Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { getPublicSiteSettings } from "@/lib/site-settings";

interface SiteFooterV2Props {
  locale: Locale;
}

type FooterLink = {
  href: string;
  label: string;
};

function FooterLinksColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <section>
      <h3 className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white sm:mb-5 sm:text-[14px]">
        {title}
      </h3>

      <ul className="space-y-3 sm:space-y-3.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[14px] font-medium leading-[1.45] text-[#94a3b8] transition-colors hover:text-[#00a9e8] sm:text-[15px]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function SiteFooterV2({ locale }: SiteFooterV2Props) {
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tFooter = await getTranslations({ locale, namespace: "footerV2" });

  const siteSettings = await getPublicSiteSettings();

  const currentYear = new Date().getFullYear();
  const direction = localeDirection[locale];

  const siteName = siteSettings.siteName || tFooter("siteName");
  const contactEmail = siteSettings.contactEmail || "info@damirapharma.sy";
  const contactPhone = siteSettings.contactPhone || "+963 935 222 202";
  const contactPhoneHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;
  const footerDescription =
    locale === "ar"
      ? siteSettings.footerDescriptionAr || tFooter("description")
      : siteSettings.footerDescriptionEn || tFooter("description");

  const contactAddress =
    locale === "ar"
      ? siteSettings.contactAddressAr || tFooter("contactAddress")
      : siteSettings.contactAddressEn || tFooter("contactAddress");

  const companyLinks: FooterLink[] = [
    { href: "/about", label: tCommon("about") },
    { href: "/quality", label: tCommon("compliance") },
    { href: "/partnerships", label: tCommon("partnerships") },
    { href: "/contact", label: tCommon("contact") },
  ];

  const solutionLinks: FooterLink[] = [
    { href: "/services#services-regulatory", label: tFooter("regulatoryAffairs") },
    { href: "/services#services-market-access", label: tFooter("marketAccess") },
    { href: "/services#services-logistics", label: tFooter("distributionServices") },
    { href: "/products", label: tFooter("productPortfolio") },
  ];

  return (
    <footer dir={direction} className="bg-[#10182b] text-[#94a3b8]">
      <div className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div
          className="
            grid grid-cols-1 gap-x-10 gap-y-9 border-b border-white/10 pb-9
            md:grid-cols-2 md:gap-y-10 md:pb-10
            lg:grid-cols-[1.15fr_0.75fr_0.85fr_1fr] lg:gap-x-12 lg:pb-12
          "
        >
          {/* Brand */}
          <section className="md:max-w-[420px] lg:max-w-none">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/Damira_Logo_SVG.svg"
                alt="Damira Pharma"
                width={170}
                height={74}
                priority={false}
                className="h-7 w-auto object-contain sm:h-8 lg:h-9"
              />
            </Link>

            <p className="mt-4 max-w-[340px] text-[14px] font-medium leading-[1.7] text-[#9aa8bc] sm:mt-5 sm:text-[15px]">
              {footerDescription}
            </p>
          </section>

          {/* Company */}
          <FooterLinksColumn title={tFooter("company")} links={companyLinks} />

          {/* Solutions */}
          <FooterLinksColumn title={tFooter("solutions")} links={solutionLinks} />

          {/* Contact Info */}
          <section>
            <h3 className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white sm:mb-5 sm:text-[14px]">
              {tFooter("contactInfo")}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span className="text-[14px] font-medium leading-[1.6] text-[#94a3b8] sm:text-[15px]">
                  {contactAddress}
                </span>
              </div>

              <a
                href={contactPhoneHref}
                className="flex items-center gap-3 text-[14px] font-medium text-[#94a3b8] transition-colors hover:text-[#00a9e8] sm:text-[15px]"
              >
                <Phone className="h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span dir="ltr">{contactPhone}</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 text-[14px] font-medium text-[#94a3b8] transition-colors hover:text-[#00a9e8] sm:text-[15px]"
              >
                <Mail className="h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span className="break-all" dir="ltr">
                  {contactEmail}
                </span>
              </a>
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-6 text-[13px] font-medium leading-[1.6] text-[#63718a] sm:pt-7 md:flex-row md:items-center md:justify-between md:gap-8">
          <p>
            © <span dir="ltr">{currentYear}</span> {siteName}.{" "}
            {tFooter("rightsSuffix")}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="transition-colors hover:text-[#00a9e8]">
              {tFooter("privacyPolicy")}
            </span>

            <span className="transition-colors hover:text-[#00a9e8]">
              {tFooter("termsOfService")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
