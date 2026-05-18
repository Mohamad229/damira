import type { LucideIcon } from "lucide-react";
import { MailCheck, MessageCircle, ShieldCheck } from "lucide-react";

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

interface ContactFormFields {
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

interface ContactFeatureItem {
  id?: string | number;
  title?: string;
  label?: string;
  icon?: SectionIcon;
}

interface ContactFormSectionData {
  eyebrow?: string;
  title?: string;
  description?: string;
  fields?: ContactFormFields;
  features?: ContactFeatureItem[];
  cards?: ContactFeatureItem[];
  items?: ContactFeatureItem[];
}

interface ContactFormSectionProps {
  data?: ContactFormSectionData;
  locale: Locale;
  className?: string;
}

type ResolvedFeature = {
  id: string;
  title: string;
  Icon: LucideIcon;
  icon?: SectionIcon;
};

function getFallbackFields(locale: Locale): Required<ContactFormFields> {
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
          { value: "GENERAL", label: "استفسار عام" },
          { value: "PRODUCT", label: "توفر المنتجات" },
          { value: "PARTNERSHIP", label: "شراكة" },
          { value: "PHARMACOVIGILANCE", label: "التيقظ الدوائي" },
          { value: "OTHER", label: "أخرى" },
        ]
      : [
          { value: "GENERAL", label: "General inquiry" },
          { value: "PRODUCT", label: "Product availability" },
          { value: "PARTNERSHIP", label: "Partnership" },
          { value: "PHARMACOVIGILANCE", label: "Pharmacovigilance" },
          { value: "OTHER", label: "Other" },
        ],
    message: isArabic ? "رسالتك" : "Message",
    submit: isArabic ? "إرسال الرسالة" : "Submit message",
  };
}

function getFallbackFeatures(isArabic: boolean): ResolvedFeature[] {
  return [
    {
      id: "clear-response",
      title: isArabic ? "رد واضح" : "Clear response",
      Icon: MessageCircle,
    },
    {
      id: "privacy-protected",
      title: isArabic ? "خصوصية محفوظة" : "Privacy protected",
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
  data: ContactFormSectionData | undefined,
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
      id: String(feature.id || fallback.id || `contact-feature-${index}`),
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

export function ContactFormSection({
  data,
  locale,
  className,
}: ContactFormSectionProps) {
  const isArabic = locale === "ar";
  const fallbackFields = getFallbackFields(locale);
  const features = resolveFeatures(data, isArabic);

  const fields = {
    fullName: data?.fields?.fullName ?? fallbackFields.fullName,
    email: data?.fields?.email ?? fallbackFields.email,
    phone: data?.fields?.phone ?? fallbackFields.phone,
    company: data?.fields?.company ?? fallbackFields.company,
    inquiryType: data?.fields?.inquiryType ?? fallbackFields.inquiryType,
    inquiryTypePlaceholder:
      data?.fields?.inquiryTypePlaceholder ??
      fallbackFields.inquiryTypePlaceholder,
    inquiryTypeOptions: data?.fields?.inquiryTypeOptions?.length
      ? data.fields.inquiryTypeOptions
      : fallbackFields.inquiryTypeOptions,
    message: data?.fields?.message ?? fallbackFields.message,
    submit: data?.fields?.submit ?? fallbackFields.submit,
  };

  const eyebrow = data?.eyebrow || (isArabic ? "تواصل معنا" : "Contact Form");

  const title =
    data?.title ||
    (isArabic ? "أرسل لنا استفسارك" : "Send Us Your Inquiry");

  const description =
    data?.description ||
    (isArabic
      ? "املأ النموذج وسيتواصل فريق داميرا فارما معك لمساعدتك في أقرب وقت ممكن."
      : "Fill out the form and the Damira Pharma team will get back to you as soon as possible.");

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/contact-form-section relative overflow-hidden border-y border-[#e8eff7] bg-[#f8fbff]",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
          className,
        )}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(254,226,205,0.58),transparent_30%),radial-gradient(circle_at_90%_82%,rgba(197,225,245,0.62),transparent_32%)] transition-transform duration-700 ease-out group-hover/contact-form-section:scale-[1.02]" />
        <div className="pointer-events-none absolute left-[-190px] top-[-180px] h-[380px] w-[380px] rounded-full bg-[#fff0e4] blur-3xl transition-transform duration-700 ease-out group-hover/contact-form-section:scale-110" />
        <div className="pointer-events-none absolute bottom-[-220px] right-[-180px] h-[440px] w-[440px] rounded-full bg-[#e2f4ff] blur-3xl transition-transform duration-700 ease-out group-hover/contact-form-section:scale-110" />

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
                "border border-[#e5edf6] bg-white/85 backdrop-blur",
                "px-[24px] py-[30px]",
                "sm:px-[28px] sm:py-[34px]",
                "lg:px-[32px] lg:py-[38px]",
                "xl:flex xl:min-h-[620px] xl:flex-col xl:justify-center",
                "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)]",
                "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_72px_-50px_rgba(15,23,42,0.56)]",
              )}
            >
              <div className="pointer-events-none absolute right-[-95px] top-[-95px] h-[230px] w-[230px] rounded-full bg-[#e2f4ff] blur-2xl transition-transform duration-700 ease-out group-hover/contact-form-section:scale-110" />
              <div className="pointer-events-none absolute bottom-[-130px] left-[-130px] h-[280px] w-[280px] rounded-full bg-[#edfbee] blur-3xl transition-transform duration-700 ease-out group-hover/contact-form-section:scale-110" />

              <div
                className={cn(
                  "relative z-10 mx-auto max-w-[680px]",
                  "text-center xl:mx-0",
                  isArabic ? "xl:text-right" : "xl:text-left",
                )}
              >
                {eyebrow ? (
                  <span className="mb-[18px] inline-flex rounded-full bg-[#e2f4ff] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#009fe3] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#d6efff] sm:text-[12px]">
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
                          "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[#c7e7fb] hover:shadow-[0_16px_36px_-32px_rgba(15,23,42,0.5)]",
                          "sm:flex-col sm:text-center",
                          "xl:flex-row",
                          isArabic ? "xl:text-right" : "xl:text-left",
                        )}
                      >
                        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#edfbee] text-[#2f8f54] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
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

                        <p className="text-[14px] font-black leading-[1.25] tracking-[-0.02em] text-[#071329] transition-colors duration-300 group-hover:text-[#009fe3] sm:text-[15px]">
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
                "border border-[#dce9f6] bg-white",
                "p-[16px]",
                "sm:p-[22px]",
                "md:p-[26px]",
                "lg:p-[30px]",
                "xl:p-[32px]",
                "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)]",
                "transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#c5e1f5] hover:shadow-[0_32px_72px_-50px_rgba(15,23,42,0.56)]",
              )}
            >
              <PublicInquiryForm
                locale={locale}
                type="CONTACT"
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
                    ? "نحترم خصوصية بياناتك وسنستخدمها للرد على طلبك فقط."
                    : "We respect your privacy and will only use your details to respond to your inquiry.",
                  genericError: isArabic
                    ? "تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى."
                    : "Unable to submit your inquiry right now. Please try again.",
                  successTitle: isArabic
                    ? "تم إرسال الطلب بنجاح"
                    : "Inquiry submitted successfully",
                  errorTitle: isArabic ? "فشل الإرسال" : "Submission failed",
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
