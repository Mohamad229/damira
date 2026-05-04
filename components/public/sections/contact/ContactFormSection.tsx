import { PublicInquiryForm } from "@/components/public/forms/public-inquiry-form";
import type { Locale } from "@/i18n/config";

interface ContactFormSectionData {
  title: string;
  description: string;
  fields: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    inquiryType: string;
    inquiryTypePlaceholder: string;
    inquiryTypeOptions: Array<{ value: string; label: string }>;
    message: string;
    submit: string;
  };
}

export function ContactFormSection({
  data,
  locale,
}: {
  data: ContactFormSectionData;
  locale: Locale;
}) {
  return (
    <section className="relative overflow-hidden border-y border-[#e8eff7] bg-[#f8fbff] py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(254,226,205,0.70),transparent_30%),radial-gradient(circle_at_90%_82%,rgba(197,225,245,0.70),transparent_28%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {data.description}
          </p>
        </div>
        <div className="rounded-[1.6rem] border border-[#dce9f6] bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.65)] sm:p-7 lg:p-8">
          <PublicInquiryForm
            locale={locale}
            type="CONTACT"
            labels={{
              fullName: data.fields.fullName,
              email: data.fields.email,
              phone: data.fields.phone,
              company: data.fields.company,
              inquiryType: data.fields.inquiryType,
              inquiryTypePlaceholder: data.fields.inquiryTypePlaceholder,
              message: data.fields.message,
              submit: data.fields.submit,
              submitting: locale === "ar" ? "جاري الإرسال..." : "Submitting...",
              privacyNote:
                locale === "ar"
                  ? "نحترم خصوصية بياناتك وسنستخدمها للرد على طلبك فقط."
                  : "We respect your privacy and will only use your details to respond to your inquiry.",
              genericError:
                locale === "ar"
                  ? "تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى."
                  : "Unable to submit your inquiry right now. Please try again.",
              successTitle:
                locale === "ar"
                  ? "تم إرسال الطلب بنجاح"
                  : "Inquiry submitted successfully",
              errorTitle: locale === "ar" ? "فشل الإرسال" : "Submission failed",
            }}
            inquiryTypeOptions={data.fields.inquiryTypeOptions}
          />
        </div>
      </div>
    </section>
  );
}
