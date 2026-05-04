import { PublicInquiryForm } from "@/components/public/forms/public-inquiry-form";
import { SectionReveal } from "@/components/public/sections/base";
import type { Locale } from "@/i18n/config";

interface InquiryTypeOption {
  value: string;
  label: string;
}

interface PartnershipInquirySectionData {
  title: string;
  description: string;
  fields: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    inquiryType: string;
    inquiryTypePlaceholder: string;
    inquiryTypeOptions: InquiryTypeOption[];
    message: string;
    submit: string;
  };
}

interface PartnershipInquirySectionProps {
  data: PartnershipInquirySectionData;
  locale: Locale;
}

export function PartnershipInquirySection({
  data,
  locale,
}: PartnershipInquirySectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#fffaf6] py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(254,226,205,0.85),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(197,225,245,0.65),transparent_28%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <div className="flex flex-col justify-center rounded-[2.25rem] border border-[#f9d7bf] bg-white/70 p-7 backdrop-blur sm:p-9">
              <span className="mb-4 inline-flex w-fit rounded-full bg-[#fff5ee] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#f58238]">
                Partnership inquiry
              </span>
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
                {data.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                {data.description}
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-[#e4edf8] bg-white p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.45)] sm:p-7 md:p-8">
              <PublicInquiryForm
                locale={locale}
                type="PARTNERSHIP"
                labels={{
                  ...data.fields,
                  submitting:
                    locale === "ar" ? "جاري الإرسال..." : "Submitting...",
                  privacyNote:
                    locale === "ar"
                      ? "نحترم خصوصية بياناتك وسنستخدمها فقط للرد على استفسارك."
                      : "We respect your privacy and only use your details to respond to your inquiry.",
                  genericError:
                    locale === "ar"
                      ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
                      : "Something went wrong. Please try again.",
                  successTitle:
                    locale === "ar" ? "تم الإرسال بنجاح" : "Success",
                  errorTitle: locale === "ar" ? "فشل الإرسال" : "Error",
                }}
                inquiryTypeOptions={data.fields.inquiryTypeOptions}
              />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
