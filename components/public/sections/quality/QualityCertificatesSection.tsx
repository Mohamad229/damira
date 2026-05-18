"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileCheck2,
} from "lucide-react";

import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import type { Locale } from "@/i18n/config";

type CertificateMedia = {
  src?: string;
  alt?: string;
};

export type QualityCertificateItem = {
  id?: string;
  isVisible?: boolean;
  title?: string;
  subtitle?: string;
  issuer?: string;
  date?: string;
  icon?: CertificateMedia;
  image?: CertificateMedia;
  fileUrl?: string;
  openUrl?: string;
  order?: number;
};

export type QualityCertificatesData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: QualityCertificateItem[];
};

interface QualityCertificatesSectionProps {
  data?: QualityCertificatesData;
  locale?: Locale;
}

function getVisibleCertificates(
  items: QualityCertificateItem[] | undefined,
): QualityCertificateItem[] {
  return (items ?? [])
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.isVisible !== false)
    .sort((a, b) => {
      const orderA = typeof a.item.order === "number" ? a.item.order : a.index;
      const orderB = typeof b.item.order === "number" ? b.item.order : b.index;
      return orderA - orderB;
    })
    .map(({ item }) => item);
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function getItemKey(item: QualityCertificateItem, index: number) {
  return item.id || `${item.title || "certificate"}-${index}`;
}

export function QualityCertificatesSection({
  data,
  locale = "en",
}: QualityCertificatesSectionProps) {
  const activeLocale = useLocale();
  const currentLocale: Locale = activeLocale === "ar" ? "ar" : locale;
  const certificates = useMemo(
    () => getVisibleCertificates(data?.items),
    [data?.items],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isRtl = currentLocale === "ar";

  if (certificates.length === 0) {
    return null;
  }

  const currentIndex = Math.min(activeIndex, certificates.length - 1);
  const activeCertificate = certificates[currentIndex] || certificates[0];
  const hasMultipleCertificates = certificates.length > 1;
  const canViewCertificate = Boolean(
    activeCertificate.fileUrl || activeCertificate.image?.src,
  );
  const externalUrl = activeCertificate.openUrl || activeCertificate.fileUrl;

  const labels =
    currentLocale === "ar"
      ? {
          view: "عرض الشهادة",
          unavailable: "الشهادة غير متاحة",
          previous: "الشهادة السابقة",
          next: "الشهادة التالية",
          open: "فتح في تبويب جديد",
          preview: "معاينة الشهادة",
          certificatePreview: "معاينة صورة الشهادة",
          noPreview: "لا توجد صورة معاينة متاحة",
          issuer: "الجهة المصدرة",
          date: "الصلاحية",
        }
      : {
          view: "View Certificate",
          unavailable: "Certificate unavailable",
          previous: "Previous certificate",
          next: "Next certificate",
          open: "Open in new tab",
          preview: "Certificate preview",
          certificatePreview: "Certificate image preview",
          noPreview: "No preview image available",
          issuer: "Issuer",
          date: "Validity",
        };

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? certificates.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === certificates.length - 1 ? 0 : current + 1,
    );
  }

  const handleLeftControl = isRtl ? goToNext : goToPrevious;
  const handleRightControl = isRtl ? goToPrevious : goToNext;
  const leftControlLabel = isRtl ? labels.next : labels.previous;
  const rightControlLabel = isRtl ? labels.previous : labels.next;

  return (
    <SectionReveal>
      <section
        className="group/certificates relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_56%,#f6fbf7_100%)] py-[84px] sm:py-[96px] lg:py-[108px]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1420px] px-4 sm:px-6 md:px-8 lg:px-[96px] 2xl:px-[150px]">
          <div className="mx-auto max-w-[850px] text-center">
            <span className="inline-flex rounded-full border border-[#bfe8c7] bg-[#edfbee] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#2f8f54] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#e4f7e7] sm:text-[12px]">
              {data?.eyebrow || "Certifications"}
            </span>

            <h2 className="mt-[18px] text-[31px] font-black leading-[1.1] tracking-[0] text-[#071329] sm:text-[38px] lg:text-[44px]">
              {data?.title || "Certifications & Compliance Records"}
            </h2>

            {data?.description ? (
              <p className="mx-auto mt-[20px] max-w-[780px] text-[16px] font-medium leading-[1.65] tracking-[0] text-[#263b59] sm:text-[18px]">
                {data.description}
              </p>
            ) : null}
          </div>

          <div className="mx-auto mt-[46px] max-w-[1040px] sm:mt-[58px]">
            <div className="group/certificate-card relative rounded-[30px] border border-[#dcebf6] bg-white p-3 shadow-[0_34px_92px_-68px_rgba(15,35,70,0.85)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_42px_104px_-70px_rgba(15,35,70,0.95)] sm:rounded-[34px] sm:p-4 lg:p-5">
              <div className="relative overflow-hidden rounded-[24px] border border-[#e5eef8] bg-[#f8fbff] sm:rounded-[28px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,159,227,0.12),transparent_42%)] transition-transform duration-700 ease-out group-hover/certificate-card:scale-[1.025]" />
                <div className="relative mx-auto flex min-h-[360px] max-w-[760px] items-center justify-center px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[570px]">
                  {activeCertificate.image?.src ? (
                    <CmsImage
                      src={activeCertificate.image.src}
                      alt={
                        activeCertificate.image.alt ||
                        activeCertificate.title ||
                        labels.certificatePreview
                      }
                      className="max-h-[300px] w-auto max-w-full rounded-[12px] border border-[#d7e5f2] bg-white object-contain shadow-[0_24px_72px_-48px_rgba(15,23,42,0.75)] transition-transform duration-700 ease-out group-hover/certificate-card:scale-[1.015] sm:max-h-[430px] lg:max-h-[500px]"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] w-full max-w-[430px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[#bdd4e8] bg-white px-8 text-center shadow-inner">
                      <FileCheck2 className="h-14 w-14 text-[#009fe3]" />
                      <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-[#58708d]">
                        {labels.noPreview}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mx-auto -mt-6 w-[calc(100%-18px)] rounded-[24px] border border-[#dcebf6] bg-white p-4 shadow-[0_26px_74px_-52px_rgba(15,23,42,0.9)] transition-all duration-300 ease-out group-hover/certificate-card:-translate-y-0.5 group-hover/certificate-card:shadow-[0_30px_84px_-54px_rgba(15,23,42,0.95)] sm:-mt-8 sm:w-[calc(100%-48px)] sm:p-5 lg:flex lg:items-center lg:justify-between lg:gap-6 lg:rounded-[28px] lg:px-6 lg:py-5">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edfbee] text-[#2f8f54] ring-1 ring-[#bfe8c7] transition-transform duration-300 ease-out group-hover/certificate-card:scale-110">
                    {activeCertificate.icon?.src ? (
                      <CmsImage
                        src={activeCertificate.icon.src}
                        alt={activeCertificate.icon.alt || ""}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Award className="h-7 w-7 stroke-[2.25]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[18px] font-black leading-[1.25] tracking-[0] text-[#071329] sm:text-[22px]">
                      {activeCertificate.title || "Certificate"}
                    </p>
                    {activeCertificate.subtitle ? (
                      <p className="mt-1 text-[14px] font-semibold leading-6 text-[#58708d] sm:text-[15px]">
                        {activeCertificate.subtitle}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeCertificate.issuer ? (
                        <span className="rounded-full border border-[#dcebf6] bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#263b59]">
                          {labels.issuer}: {activeCertificate.issuer}
                        </span>
                      ) : null}
                      {activeCertificate.date ? (
                        <span className="rounded-full border border-[#dcebf6] bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#263b59]">
                          {labels.date}: {activeCertificate.date}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-0 lg:justify-end">
                  <span className="rounded-full bg-[#e2f4ff] px-3 py-1 text-xs font-black text-[#0878ad]">
                    {formatCounter(currentIndex + 1)} /{" "}
                    {formatCounter(certificates.length)}
                  </span>

                  {hasMultipleCertificates ? (
                    <div className="flex items-center gap-2" dir="ltr">
                      <button
                        type="button"
                        onClick={handleLeftControl}
                        aria-label={leftControlLabel}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9eadf] bg-white text-[#263b59] shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-[#4cb748] hover:text-[#2f8f54] hover:shadow-[0_12px_28px_-22px_rgba(47,143,84,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4cb748]/40"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleRightControl}
                        aria-label={rightControlLabel}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9eadf] bg-white text-[#263b59] shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-[#4cb748] hover:text-[#2f8f54] hover:shadow-[0_12px_28px_-22px_rgba(47,143,84,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4cb748]/40"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    disabled={!canViewCertificate}
                    onClick={() => setIsPreviewOpen(true)}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm font-black transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3]/35",
                      canViewCertificate
                        ? "bg-[#009fe3] text-white shadow-[0_16px_30px_-20px_rgba(0,159,227,0.9)] hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#0878ad] hover:shadow-[0_18px_36px_-22px_rgba(0,159,227,0.95)]"
                        : "cursor-not-allowed bg-[#e8eef6] text-[#7a8da4]",
                    )}
                  >
                    {canViewCertificate ? labels.view : labels.unavailable}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {hasMultipleCertificates ? (
            <div className="mx-auto mt-5 flex max-w-[1040px] justify-center gap-2">
              {certificates.map((item, index) => (
                <button
                  key={getItemKey(item, index)}
                  type="button"
                  aria-label={`${labels.preview} ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3]/35",
                    index === currentIndex
                      ? "w-9 bg-[#009fe3]"
                      : "w-2.5 bg-[#c7d9e8] hover:bg-[#91caee]",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="w-[calc(100vw-24px)] max-w-[1060px] rounded-[28px] border-[#dcebf6] bg-white p-4 shadow-[0_34px_110px_-58px_rgba(15,23,42,0.9)] sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-[22px] font-black leading-tight text-[#071329] sm:text-[26px]">
                {activeCertificate.title || labels.preview}
              </DialogTitle>
              {activeCertificate.subtitle ? (
                <DialogDescription className="text-[15px] font-medium leading-6 text-[#58708d]">
                  {activeCertificate.subtitle}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <div className="mt-5 overflow-hidden rounded-[22px] border border-[#e5eef8] bg-[#f8fbff]">
              <div className="flex max-h-[64vh] min-h-[320px] items-center justify-center overflow-auto p-4 sm:p-6">
                {activeCertificate.image?.src ? (
                  <CmsImage
                    src={activeCertificate.image.src}
                    alt={
                      activeCertificate.image.alt ||
                      activeCertificate.title ||
                      labels.certificatePreview
                    }
                    className="max-h-[58vh] w-auto max-w-full rounded-[12px] border border-[#d7e5f2] bg-white object-contain shadow-[0_22px_70px_-50px_rgba(15,23,42,0.85)] transition-transform duration-500 ease-out hover:scale-[1.01]"
                  />
                ) : (
                  <div className="text-center">
                    <FileCheck2 className="mx-auto h-14 w-14 text-[#009fe3]" />
                    <p className="mt-4 text-sm font-bold text-[#58708d]">
                      {labels.noPreview}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {externalUrl ? (
              <DialogFooter>
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#009fe3] px-5 text-sm font-black text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#0878ad] hover:shadow-[0_18px_36px_-24px_rgba(0,159,227,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3]/35"
                >
                  {labels.open}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </DialogFooter>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>
    </SectionReveal>
  );
}
