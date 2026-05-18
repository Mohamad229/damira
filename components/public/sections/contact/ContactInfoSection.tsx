import { Building2, Mail, PhoneCall } from "lucide-react";

import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base";
import { cn } from "@/lib/utils";

interface ContactIcon {
  src?: string;
  alt?: string;
}

interface ContactDepartment {
  title: string;
  emailLabel?: string;
  email: string;
  emailHref?: string;
  phoneLabel?: string;
  phone: string;
  phoneHref?: string;
  icon?: ContactIcon;
  emailIcon?: ContactIcon;
  phoneIcon?: ContactIcon;
}

interface ContactInfoSectionProps {
  data?: {
    title?: string;
    description?: string;
    departments?: ContactDepartment[];
  };
  className?: string;
}

const fallbackDepartments: ContactDepartment[] = [
  {
    title: "General Inquiries",
    emailLabel: "Email",
    email: "info@damirapharma.sy",
    phoneLabel: "Mobile Number",
    phone: "+963 989 004 767",
  },
  {
    title: "Customer Service",
    emailLabel: "Email",
    email: "cs@damirapharma.sy",
    phoneLabel: "Mobile Number",
    phone: "+963 989 004 767",
  },
  {
    title: "Business Development & Partnerships",
    emailLabel: "Email",
    email: "bd@damirapharma.sy",
    phoneLabel: "Mobile Number",
    phone: "+963 930 078 366",
  },
  {
    title: "Pharmacovigilance",
    emailLabel: "Email",
    email: "pv@damirapharma.sy",
    phoneLabel: "Mobile Number",
    phone: "+963 989 004 767",
  },
];

function getDepartments(data?: ContactInfoSectionProps["data"]) {
  if (data?.departments?.length) {
    return data.departments;
  }

  return fallbackDepartments;
}

function cleanPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function getAutoHref(value: string, href?: string) {
  if (href) return href;

  if (value.includes("@")) {
    return `mailto:${value}`;
  }

  if (/^[+\d\s().-]+$/.test(value)) {
    return cleanPhoneHref(value);
  }

  return undefined;
}

function ContactLinkRow({
  icon,
  iconImage,
  label,
  value,
  href,
  isPhone = false,
}: {
  icon: React.ReactNode;
  iconImage?: ContactIcon;
  label: string;
  value: string;
  href?: string;
  isPhone?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#e2f4ff] text-[#009fe3] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:bg-[#009fe3] group-hover:text-white sm:h-[46px] sm:w-[46px]">
        {iconImage?.src ? (
          <CmsImage
            src={iconImage.src}
            alt={iconImage.alt || ""}
            width={24}
            height={24}
            className="h-[21px] w-[21px] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          icon
        )}
      </span>

      <span className="min-w-0">
        <span className="block text-[15px] font-black leading-[1.2] tracking-[-0.025em] text-[#071329] transition-colors duration-300 group-hover:text-[#009fe3] sm:text-[16px] lg:text-[17px]">
          {label}
        </span>

        <span
          dir={isPhone ? "ltr" : undefined}
          className={cn(
            "mt-[7px] block break-words text-[14px] font-medium leading-[1.45] tracking-[-0.01em]",
            "text-[#263b59] transition-colors group-hover:text-[#009fe3]",
            "sm:text-[15px] lg:text-[16px]",
            isPhone && "rtl:text-right",
          )}
        >
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="grid grid-cols-[42px_1fr] items-start gap-[14px] sm:grid-cols-[46px_1fr] sm:gap-[16px]">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="group grid grid-cols-[42px_1fr] items-start gap-[14px] rounded-[18px] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] sm:grid-cols-[46px_1fr] sm:gap-[16px]"
    >
      {content}
    </a>
  );
}

export function ContactInfoSection({
  data,
  className,
}: ContactInfoSectionProps) {
  const departments = getDepartments(data);
  const title = data?.title;
  const description = data?.description;

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/contact-info relative overflow-hidden bg-[#f8fbff] py-[72px]",
          "sm:py-[84px] lg:py-[96px] xl:py-[104px]",
          className,
        )}
      >
        <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-[#e2f4ff] blur-3xl transition-transform duration-700 ease-out group-hover/contact-info:scale-110" />
        <div className="pointer-events-none absolute bottom-[-210px] right-[-170px] h-[430px] w-[430px] rounded-full bg-[#edfbee] blur-3xl transition-transform duration-700 ease-out group-hover/contact-info:scale-110" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-[72px] xl:px-[120px] 2xl:px-[210px]">
          {title || description ? (
            <div className="mx-auto mb-[44px] max-w-[820px] text-center sm:mb-[54px] lg:mb-[62px]">
              {title ? (
                <h2 className="text-[30px] font-black leading-[1.1] tracking-[-0.045em] text-[#071329] transition-colors duration-300 group-hover/contact-info:text-[#06172f] sm:text-[38px] lg:text-[44px]">
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p className="mx-auto mt-[18px] max-w-[720px] text-[16px] font-medium leading-[1.65] tracking-[-0.012em] text-[#263b59] sm:text-[18px]">
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {departments.map((department, index) => (
              <article
                key={`${department.title}-${index}`}
                className={cn(
                  "group relative overflow-hidden rounded-[26px] border border-[#e4ecf5] bg-white",
                  "px-5 py-6 shadow-[0_20px_54px_-44px_rgba(15,23,42,0.55)]",
                  "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[#009fe3]/35",
                  "hover:shadow-[0_32px_76px_-54px_rgba(15,23,42,0.78)]",
                  "sm:rounded-[30px] sm:px-6 sm:py-7",
                  "lg:px-8 lg:py-8",
                )}
              >
                <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-[170px] w-[170px] rounded-full bg-[#e2f4ff] opacity-70 blur-2xl transition-transform duration-700 ease-out group-hover:scale-110" />

                <div className="relative z-10 mb-[24px] flex items-start gap-4 sm:mb-[28px]">
                  <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#edfbee] text-[#2f8f54] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
                    {department.icon?.src ? (
                      <CmsImage
                        src={department.icon.src}
                        alt={department.icon.alt || ""}
                        width={28}
                        height={28}
                        className="h-[24px] w-[24px] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <Building2 className="h-[24px] w-[24px] stroke-[2.35] transition-transform duration-300 ease-out group-hover:scale-105" />
                    )}
                  </div>

                  <h3 className="pt-[3px] text-[21px] font-black leading-[1.18] tracking-[-0.035em] text-[#071329] transition-colors duration-300 group-hover:text-[#009fe3] sm:text-[22px] lg:text-[23px]">
                    {department.title}
                  </h3>
                </div>

                <div className="relative z-10 space-y-[22px]">
                  <ContactLinkRow
                    icon={<Mail className="h-[21px] w-[21px] stroke-[2.15]" />}
                    iconImage={department.emailIcon}
                    label={department.emailLabel || "Email"}
                    value={department.email}
                    href={getAutoHref(department.email, department.emailHref)}
                  />

                  <ContactLinkRow
                    icon={
                      <PhoneCall className="h-[21px] w-[21px] stroke-[2.15]" />
                    }
                    iconImage={department.phoneIcon}
                    label={department.phoneLabel || "Mobile Number"}
                    value={department.phone}
                    href={getAutoHref(department.phone, department.phoneHref)}
                    isPhone
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
