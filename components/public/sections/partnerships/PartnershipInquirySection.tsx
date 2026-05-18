import type { LucideIcon } from "lucide-react";
import { Handshake, MailCheck, ShieldCheck } from "lucide-react";

import { PublicInquiryForm } from "@/components/public/forms/public-inquiry-form";
import { SectionReveal } from "@/components/public/sections/base";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import type { SectionIcon } from "@/components/public/sections/base/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface InquiryTypeOption {
  value: string;
  label: string;
}

interface PartnershipInquiryFields {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  inquiryType?: string;
  inquiryTypePlaceholder?: string;
  inquiryTypeOptions?: InquiryTypeOption[];
  message?: string;
  submit?: string;
}

interface PartnershipInquiryFeature {
  id?: string | number;
  title?: string;
  label?: string;
  icon?: SectionIcon;
}

interface PartnershipInquirySectionData {
  title?: string;
  description?: string;
  eyebrow?: string;
  fields?: PartnershipInquiryFields;
  features?: PartnershipInquiryFeature[];
  cards?: PartnershipInquiryFeature[];
  items?: PartnershipInquiryFeature[];
}

interface PartnershipInquirySectionProps {
  data?: PartnershipInquirySectionData;
  locale: Locale;
  className?: string;
}

type ResolvedFeature = {
  id: string;
  title: string;
  Icon: LucideIcon;
  icon?: SectionIcon;
};

function getFallbackFields(locale: Locale): Required<PartnershipInquiryFields> {
  const isArabic = locale === "ar";

  return {
    fullName: isArabic ? "الاسم الكامل" : "Full name",
    email: isArabic ? "البريد الإلكتروني" : "Email address",
    phone: isArabic ? "رقم الهاتف" : "Phone number",
    company: isArabic ? "الشركة" : "Company",
    inquiryType: isArabic ? "نوع الاستفسار" : "Inquiry type",
    inquiryTypePlaceholder: isArabic
      ? "اختر نوع الاستفسار"
      : "Select inquiry type",
    inquiryTypeOptions: isArabic
      ? [
          { value: "DISTRIBUTION", label: "شراكة توزيع" },
          { value: "REGISTRATION", label: "تسجيل منتج" },
          { value: "COMMERCIAL", label: "تعاون تجاري" },
          { value: "OTHER", label: "أخرى" },
        ]
      : [
          { value: "DISTRIBUTION", label: "Distribution partnership" },
          { value: "REGISTRATION", label: "Product registration" },
          { value: "COMMERCIAL", label: "Commercial collaboration" },
          { value: "OTHER", label: "Other" },
        ],
    message: isArabic ? "رسالتك" : "Message",
    submit: isArabic ? "إرسال الاستفسار" : "Submit inquiry",
  };
}

function getFallbackFeatures(isArabic: boolean): ResolvedFeature[] {
  return [
    {
      id: "clear-collaboration",
      title: isArabic ? "تعاون واضح" : "Clear collaboration",
      Icon: Handshake,
    },
    {
      id: "compliance-first",
      title: isArabic ? "امتثال وتنظيم" : "Compliance-first",
      Icon: ShieldCheck,
    },
    {
      id: "structured-follow-up",
      title: isArabic ? "متابعة منظمة" : "Structured follow-up",
      Icon: MailCheck,
    },
  ];
}

function resolveFeatures(
  data: PartnershipInquirySectionData | undefined,
  isArabic: boolean,
): ResolvedFeature[] {
  const fallbackFeatures = getFallbackFeatures(isArabic);
  const sourceFeatures = data?.features || data?.cards || data?.items;

  if (!sourceFeatures?.length) {
    return fallbackFeatures;
  }

  return sourceFeatures.map((feature, index) => {
    const fallback = fallbackFeatures[index % fallbackFeatures.length];

    return {
      id: String(feature.id || fallback.id || `inquiry-feature-${index}`),
      title: feature.title || feature.label || fallback.title,
      Icon: typeof feature.icon === "function" ? feature.icon : fallback.Icon,
      icon: feature.icon,
    };
  });
}

function getFeaturePlacementClass(index: number, total: number) {
  if (total === 1) {
    return "sm:col-span-3 xl:col-span-1";
  }

  if (total === 2) {
    return cn(
      "sm:col-span-1",
      index === 0 && "sm:col-start-1",
      index === 1 && "sm:col-start-3",
      "xl:col-start-auto",
    );
  }

  if (total % 3 === 1 && index === total - 1) {
    return "sm:col-span-3 sm:mx-auto sm:w-full sm:max-w-[360px] xl:col-span-1 xl:max-w-none";
  }

  if (total % 3 === 2 && index === total - 2) {
    return "sm:col-start-1 xl:col-start-auto";
  }

  if (total % 3 === 2 && index === total - 1) {
    return "sm:col-start-3 xl:col-start-auto";
  }

  return "";
}

export function PartnershipInquirySection({
  data,
  locale,
  className,
}: PartnershipInquirySectionProps) {
  const isArabic = locale === "ar";
  const fallbackFields = getFallbackFields(locale);
  const features = resolveFeatures(data, isArabic);

  const fields = {
    ...fallbackFields,
    ...data?.fields,
    inquiryTypeOptions: data?.fields?.inquiryTypeOptions?.length
      ? data.fields.inquiryTypeOptions
      : fallbackFields.inquiryTypeOptions,
  };

  const eyebrow =
    data?.eyebrow || (isArabic ? "استفسار شراكة" : "Partnership Inquiry");

  const title =
    data?.title ||
    (isArabic
      ? "ابدأ محادثة شراكة مع داميرا فارما"
      : "Start a Partnership Conversation with Damira Pharma");

  const description =
    data?.description ||
    (isArabic
      ? "شاركنا تفاصيل شركتك وفرصة التعاون، وسيتواصل فريقنا معك لمناقشة الخطوات التالية بطريقة واضحة ومنظمة."
      : "Share your company details and partnership opportunity. Our team will review your inquiry and follow up with a clear path for the next steps.");

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/inquiry-section relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
          className,
        )}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="pointer-events-none absolute left-[-190px] top-[-180px] h-[380px] w-[380px] rounded-full bg-[#fff0e4] blur-3xl transition-transform duration-700 ease-out group-hover/inquiry-section:scale-110" />
        <div className="pointer-events-none absolute bottom-[-220px] right-[-180px] h-[440px] w-[440px] rounded-full bg-[#e2f4ff] blur-3xl transition-transform duration-700 ease-out group-hover/inquiry-section:scale-110" />

        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          <div
            className={cn(
              "mx-auto grid max-w-[1180px] grid-cols-1",
              "gap-[24px]",
              "lg:gap-[28px]",
              "xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[32px]",
            )}
          >
            {/* Intro card */}
            <div
              className={cn(
                "relative overflow-hidden",
                "rounded-[18px] sm:rounded-[20px]",
                "border border-[#f3dfcf] bg-[#fffaf6]",
                "px-[24px] py-[30px]",
                "sm:px-[28px] sm:py-[34px]",
                "lg:px-[32px] lg:py-[38px]",
                "xl:flex xl:min-h-[620px] xl:flex-col xl:justify-center",
                "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_-46px_rgba(15,23,42,0.55)]",
              )}
            >
              <div className="pointer-events-none absolute right-[-95px] top-[-95px] h-[230px] w-[230px] rounded-full bg-[#fff0e4] blur-2xl transition-transform duration-700 ease-out group-hover/inquiry-section:scale-110" />
              <div className="pointer-events-none absolute bottom-[-130px] left-[-130px] h-[280px] w-[280px] rounded-full bg-[#edfbee] blur-3xl transition-transform duration-700 ease-out group-hover/inquiry-section:scale-110" />

              <div
                className={cn(
                  "relative z-10 mx-auto max-w-[680px]",
                  "text-center xl:mx-0",
                  isArabic ? "xl:text-right" : "xl:text-left",
                )}
              >
                {eyebrow ? (
                  <span className="mb-[18px] inline-flex rounded-full bg-[#fff0e4] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#f58238] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ffe8d6] sm:text-[12px]">
                    {eyebrow}
                  </span>
                ) : null}

                <h2
                  className={cn(
                    "font-black leading-[1.12] tracking-[-0.04em] text-[#071329]",
                    "text-[32px]",
                    "sm:text-[36px]",
                    "xl:text-[38px]",
                  )}
                >
                  {title}
                </h2>

                {description ? (
                  <p
                    className={cn(
                      "mx-auto mt-[18px] max-w-[620px]",
                      "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                      "sm:text-[16px]",
                      "lg:text-[17px]",
                      "xl:mx-0 xl:mt-[22px] xl:text-[18px] xl:leading-[1.55]",
                    )}
                  >
                    {description}
                  </p>
                ) : null}

                <div
                  className={cn(
                    "mt-[30px] grid grid-cols-1 gap-[14px]",
                    "sm:grid-cols-3 sm:gap-[16px]",
                    "xl:grid-cols-1 xl:gap-[16px]",
                  )}
                >
                  {features.map((feature, index) => {
                    const Icon = feature.Icon;

                    return (
                      <div
                        key={feature.id}
                        className={cn(
                          getFeaturePlacementClass(index, features.length),
                          "group flex items-center gap-[14px]",
                          "rounded-[16px] border border-[#edf2f7] bg-white",
                          "px-[18px] py-[16px]",
                          "shadow-[0_18px_40px_-36px_rgba(15,23,42,0.45)]",
                          "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[#f9d7bf] hover:shadow-[0_18px_40px_-34px_rgba(15,23,42,0.5)]",
                          "sm:flex-col sm:text-center",
                          "xl:flex-row",
                          isArabic ? "xl:text-right" : "xl:text-left",
                        )}
                      >
                        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#fff0e4] text-[#f58238] transition-transform duration-300 ease-out group-hover:scale-110">
                          {isSectionMediaIcon(feature.icon) ? (
                            <SectionIconImage
                              icon={feature.icon}
                              width={24}
                              height={24}
                              className="h-[22px] w-[22px] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <Icon className="h-[22px] w-[22px] stroke-[2.35] transition-transform duration-300 ease-out group-hover:scale-105" />
                          )}
                        </div>

                        <p className="text-[14px] font-black leading-[1.25] tracking-[-0.02em] text-[#071329] transition-colors duration-300 group-hover:text-[#f58238] sm:text-[15px]">
                          {feature.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form card */}
            <div
              className={cn(
                "rounded-[18px] sm:rounded-[20px]",
                "border border-[#e8eef6] bg-white",
                "p-[16px]",
                "sm:p-[22px]",
                "md:p-[26px]",
                "lg:p-[30px]",
                "xl:p-[32px]",
                "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_-46px_rgba(15,23,42,0.55)]",
              )}
            >
              <PublicInquiryForm
                locale={locale}
                type="PARTNERSHIP"
                labels={{
                  fullName: fields.fullName,
                  email: fields.email,
                  phone: fields.phone,
                  company: fields.company,
                  inquiryType: fields.inquiryType,
                  inquiryTypePlaceholder: fields.inquiryTypePlaceholder,
                  message: fields.message,
                  submit: fields.submit,
                  submitting: isArabic ? "جاري الإرسال..." : "Submitting...",
                  privacyNote: isArabic
                    ? "نحترم خصوصية بياناتك وسنستخدمها فقط للرد على استفسارك."
                    : "We respect your privacy and only use your details to respond to your inquiry.",
                  genericError: isArabic
                    ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
                    : "Something went wrong. Please try again.",
                  successTitle: isArabic ? "تم الإرسال بنجاح" : "Success",
                  errorTitle: isArabic ? "فشل الإرسال" : "Error",
                }}
                inquiryTypeOptions={fields.inquiryTypeOptions}
              />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
