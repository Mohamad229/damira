import Image from "next/image";
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
  const siteSettings = await getPublicSiteSettings();

  const currentYear = new Date().getFullYear();
  const direction = localeDirection[locale];

  const siteName = siteSettings.siteName || "Damira Pharma";
  const contactEmail = siteSettings.contactEmail || "info@damirapharma.sy";
  const contactAddress =
    siteSettings.contactAddress || "Erbin, Damascus Countryside, Syria";

  const companyLinks: FooterLink[] = [
    { href: "/about", label: "About Us" },
    { href: "/quality", label: "Quality & Compliance" },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/contact", label: "Contact Us" },
  ];

  const solutionLinks: FooterLink[] = [
    { href: "/services#services-logistics", label: "Distribution Services" },
    { href: "/services#services-regulatory", label: "Regulatory Affairs" },
    { href: "/products", label: "Product Portfolio" },
    { href: "/services#services-market-access", label: "Market Access" },
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
              The trusted bridge between global life science innovators and
              Syrian healthcare infrastructure. Part of Al Ahlam Group,
              established 1974.
            </p>
          </section>

          {/* Company */}
          <FooterLinksColumn title="Company" links={companyLinks} />

          {/* Solutions */}
          <FooterLinksColumn title="Solutions" links={solutionLinks} />

          {/* Contact Info */}
          <section>
            <h3 className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white sm:mb-5 sm:text-[14px]">
              Contact Info
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span className="text-[14px] font-medium leading-[1.6] text-[#94a3b8] sm:text-[15px]">
                  {contactAddress}
                </span>
              </div>

              <a
                href="tel:+963935222202"
                className="flex items-center gap-3 text-[14px] font-medium text-[#94a3b8] transition-colors hover:text-[#00a9e8] sm:text-[15px]"
              >
                <Phone className="h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span dir="ltr">+963 935 222 202</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 text-[14px] font-medium text-[#94a3b8] transition-colors hover:text-[#00a9e8] sm:text-[15px]"
              >
                <Mail className="h-[17px] w-[17px] shrink-0 text-[#00a9e8]" />

                <span className="break-all">{contactEmail}</span>
              </a>
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-6 text-[13px] font-medium leading-[1.6] text-[#63718a] sm:pt-7 md:flex-row md:items-center md:justify-between md:gap-8">
          <p>
            © <span dir="ltr">{currentYear}</span> {siteName}. All rights
            reserved. ISO & FDA Certified Facility.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#00a9e8]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-[#00a9e8]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
