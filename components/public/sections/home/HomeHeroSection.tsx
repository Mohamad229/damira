import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface HomeHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

function renderHeroTitle(title: string) {
  const highlightText = "Healthcare Distribution";
  const index = title.toLowerCase().indexOf(highlightText.toLowerCase());

  if (index === -1) {
    return title;
  }

  const before = title.slice(0, index);
  const highlighted = title.slice(index, index + highlightText.length);
  const after = title.slice(index + highlightText.length);

  return (
    <>
      {before}
      <span className="text-[#009fe3]">{highlighted}</span>
      {after}
    </>
  );
}

function containsArabic(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

export function HomeHeroSection({ data, className }: HomeHeroSectionProps) {
  const title =
    data.title || "Building Specialized Healthcare Distribution Ecosystem";

  const subtitle =
    data.subtitle ||
    "Trusted partner for global life science, nutrition, and medical technology innovators seeking resilient and compliant growth in Syria.";

  const eyebrow = data.eyebrow || "ISO & FDA Certified Distribution";

  const actions = data.actions || [];

  const isArabicContent = containsArabic(
    [title, subtitle, eyebrow, ...actions.map((action) => action.label)].join(" "),
  );

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#f7fbff]",
          "min-h-[560px] sm:min-h-[680px] lg:min-h-[754px]",
          className,
        )}
      >
        {/* Main soft background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f2f9ff_0%,#ffffff_100%)]" />

        {/* Right image area - visible on xl and larger screens */}
        <div className="group/hero-image absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden rtl:left-0 rtl:right-auto xl:block">
          {data.backgroundImage?.src ? (
            <CmsImage
              src={data.backgroundImage.src}
              alt={data.backgroundImage.alt || title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/hero-image:scale-[1.035]"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,#dceffb,#ffffff,#eef8f1)]" />
          )}

          {/* Same desktop filter */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.9)_12%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.72)_100%)] rtl:bg-[linear-gradient(270deg,#f7fbff_0%,rgba(247,251,255,0.9)_12%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[175px] bg-[linear-gradient(0deg,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* Mobile / tablet / smaller than xl background image */}
        <div className="group/hero-image-mobile absolute inset-0 overflow-hidden xl:hidden">
          {data.backgroundImage?.src ? (
            <CmsImage
              src={data.backgroundImage.src}
              alt={data.backgroundImage.alt || title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/hero-image-mobile:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,#dceffb,#ffffff,#eef8f1)]" />
          )}

          {/* Same filter applied on smaller screens */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.9)_12%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.72)_100%)] rtl:bg-[linear-gradient(270deg,#f7fbff_0%,rgba(247,251,255,0.9)_12%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[175px] bg-[linear-gradient(0deg,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8 lg:px-[210px]",
            "pb-[68px] pt-[92px] sm:pb-[96px] sm:pt-[140px] md:pt-[160px] lg:pb-0 lg:pt-[190px]",
          )}
        >
          <div
            dir={isArabicContent ? "rtl" : "ltr"}
            className={cn(
              "w-full",
              "max-w-[670px]",
              "mx-auto lg:mx-0",
              "rtl:text-right rtl:lg:ms-0 rtl:lg:me-auto",
              isArabicContent && "text-right",
            )}
          >
            {/* Eyebrow */}
            <div
              className={cn(
                "mb-[34px] inline-flex h-[31px] items-center gap-2 rounded-full",
                "border border-[#9ed8f8] bg-[#eaf7ff]/95",
                "px-[13px]",
                "text-[14px] font-semibold leading-none text-[#009fe3]",
                "shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md",
              )}
            >
              <span className="h-2 w-2 rounded-full bg-[#009fe3]" />
              <span>{eyebrow}</span>
            </div>

            {/* Title */}
            <h1
              className={cn(
                "max-w-[670px]",
                "text-[#11182d]",
                "text-[44px] font-black leading-[1.16]",
                "sm:text-[54px]",
                "md:text-[60px]",
                "lg:text-[62px]",
              )}
            >
              {renderHeroTitle(title)}
            </h1>

            {/* Subtitle */}
            {subtitle ? (
              <p
                className={cn(
                  "mt-[28px]",
                  "max-w-[665px]",
                  "text-[20px] font-medium leading-[1.62]",
                  "text-[#475672]",
                  "sm:text-[21px]",
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {/* Buttons */}
            {actions.length ? (
              <div
                dir="ltr"
                className={cn(
                  "mt-[40px] flex w-full flex-col gap-4",
                  "sm:items-center",
                  isArabicContent
                    ? "items-end sm:flex-row-reverse sm:justify-start"
                    : "items-start sm:flex-row sm:justify-start",
                )}
              >
                {actions.map((action, index) => {
                  const isPrimary = index === 0;

                  return (
                    <Link
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      dir={isArabicContent ? "rtl" : "ltr"}
                      className={cn(
                        "group inline-flex h-[56px] items-center justify-center rounded-full",
                        "text-[16px] font-bold transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        isArabicContent && "self-end sm:self-auto",
                        isPrimary
                          ? cn(
                              "min-w-[228px] gap-[32px] px-8",
                              "bg-[#009fe3] text-white",
                              "shadow-[0_18px_35px_-18px_rgba(0,159,227,0.9)]",
                              "hover:-translate-y-1 hover:scale-[1.01] hover:bg-[#0092d3] active:scale-[0.99]",
                            )
                          : cn(
                              "min-w-[203px] px-8",
                              "border border-[#d8e3ec] bg-white/85 text-[#31405a]",
                              "shadow-[0_8px_22px_-18px_rgba(15,23,42,0.35)]",
                              "hover:-translate-y-1 hover:scale-[1.01] hover:border-[#009fe3]/45 hover:text-[#009fe3] active:scale-[0.99]",
                            ),
                      )}
                    >
                      <span>{action.label}</span>

                      {isPrimary ? (
                        <>
                          <ArrowRight
                            className="h-4 w-4 stroke-[2.5] transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:hidden"
                            style={{ transform: "none" }}
                          />
                          <ArrowLeft
                            className="hidden h-4 w-4 stroke-[2.5] transition-transform duration-300 ease-out group-hover:-translate-x-1 rtl:block"
                            style={{ transform: "none" }}
                          />
                        </>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
