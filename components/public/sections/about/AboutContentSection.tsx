"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDot,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

type AboutContentSlide = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string[];
  bullets?: string[];
  actions?: Array<{
    label: string;
    href: string;
  }>;
};

type AboutContentCarouselData = ContentSectionData & {
  slides?: AboutContentSlide[];
  items?: AboutContentSlide[];
  highlights?: AboutContentSlide[];
};

export function AboutContentSection({
  data,
  variant = "story",
}: {
  data: ContentSectionData;
  variant?: "story" | "legacy";
}) {
  const accent = variant === "legacy" ? "#4cb748" : "#f58238";
  const accentClass =
    variant === "legacy" ? "text-[#4cb748]" : "text-[#f58238]";
  const accentSoftBgClass =
    variant === "legacy" ? "bg-[#eaf7e8]" : "bg-[#fff0e4]";

  const slides = useMemo(() => {
    return getSlides(data as AboutContentCarouselData);
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  function goToPreviousSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  }

  function goToNextSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-[#e8eff7] bg-white",
        "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
      )}
    >
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(197,225,245,0.45),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(218,236,212,0.38),transparent_28%)]" />

      <div
        className={cn(
          "relative z-10 w-full",
          "px-4 sm:px-6 md:px-8",
          "lg:px-[80px]",
          "xl:px-[120px]",
          "2xl:px-[210px]",
        )}
      >
        <div className="relative mx-auto max-w-[1280px]">
          {/* Side arrows - desktop/tablet */}
          {hasMultipleSlides ? (
            <>
              <button
                type="button"
                onClick={goToPreviousSlide}
                aria-label="Previous content"
                className={cn(
                  "absolute top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full",
                  "border border-[#c8d9e8] bg-white text-[#11182d]",
                  "shadow-[0_18px_35px_-26px_rgba(15,23,42,0.55)]",
                  "transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:border-[#009fe3] hover:text-[#009fe3]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                  "md:flex md:h-[46px] md:w-[46px]",
                  "xl:-left-[72px]",
                  "md:-left-[18px] lg:-left-[24px]",
                )}
              >
                <ArrowLeft className="h-[19px] w-[19px] stroke-[2.4]" />
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next content"
                className={cn(
                  "absolute top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full",
                  "border border-[#c8d9e8] bg-white text-[#11182d]",
                  "shadow-[0_18px_35px_-26px_rgba(15,23,42,0.55)]",
                  "transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:border-[#009fe3] hover:text-[#009fe3]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                  "md:flex md:h-[46px] md:w-[46px]",
                  "xl:-right-[72px]",
                  "md:-right-[18px] lg:-right-[24px]",
                )}
              >
                <ArrowRight className="h-[19px] w-[19px] stroke-[2.4]" />
              </button>
            </>
          ) : null}

          {/* Main card */}
          <article
            className={cn(
              "relative overflow-hidden rounded-[24px] border border-[#dce9f6] bg-[#f8fbff]",
              "px-5 py-8",
              "sm:rounded-[28px] sm:px-8 sm:py-10",
              "md:px-10 md:py-12",
              "lg:px-[64px] lg:py-[58px]",
              "xl:rounded-[34px] xl:px-[78px] xl:py-[68px]",
              "shadow-[0_26px_60px_-50px_rgba(15,23,42,0.55)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_34px_75px_-52px_rgba(15,23,42,0.65)]",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-[78px] -top-[90px] rounded-full opacity-80",
                "h-[190px] w-[190px]",
                "sm:h-[230px] sm:w-[230px]",
                accentSoftBgClass,
              )}
            />

            <div className="relative z-10">
              {/* Top meta row */}
              <div className="mb-[22px] flex flex-wrap items-center gap-[14px] sm:mb-[26px]">
                <span
                  className={cn(
                    "inline-flex h-[31px] items-center gap-2 rounded-full bg-white px-[14px]",
                    "text-[12px] font-black uppercase leading-none tracking-[0.16em]",
                    "shadow-[0_10px_24px_-20px_rgba(15,23,42,0.55)]",
                    accentClass,
                  )}
                >
                  <CircleDot className="h-[13px] w-[13px] stroke-[2.6]" />
                  {activeSlide.eyebrow || "Company Story"}
                </span>

                {hasMultipleSlides ? (
                  <span className="text-[13px] font-extrabold leading-none tracking-[-0.01em] text-[#64748b]">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                ) : null}
              </div>

              {/* Content */}
              <div className="grid gap-[34px] lg:grid-cols-[0.82fr_1fr] lg:gap-[54px] xl:gap-[72px]">
                <div>
                  <h2
                    className={cn(
                      "font-black leading-[1.06] tracking-[-0.055em] text-[#071329]",
                      "text-[36px]",
                      "sm:text-[44px]",
                      "lg:text-[50px]",
                      "xl:text-[58px]",
                    )}
                  >
                    {activeSlide.title}
                  </h2>

                  {activeSlide.subtitle ? (
                    <p
                      className={cn(
                        "mt-[22px] border-l-[4px] pl-[18px] rtl:border-l-0 rtl:border-r-[4px] rtl:pl-0 rtl:pr-[18px] rtl:text-right",
                        "text-[17px] font-semibold leading-[1.55] tracking-[-0.012em] text-[#071329]",
                        "sm:text-[18px]",
                        "lg:text-[19px]",
                      )}
                      style={{ borderColor: accent }}
                    >
                      {activeSlide.subtitle}
                    </p>
                  ) : null}

                  {activeSlide.actions?.length ? (
                    <div className="mt-[32px] flex flex-wrap gap-3">
                      {activeSlide.actions.map((action, index) => (
                        <Link
                          key={`${action.href}-${action.label}`}
                          href={action.href}
                          className={cn(
                            "inline-flex h-[48px] items-center justify-center rounded-full px-6",
                            "text-[14px] font-black leading-none tracking-[-0.01em]",
                            "transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]",
                            index === 0
                              ? "bg-[#009fe3] text-white shadow-[0_18px_35px_-24px_rgba(0,159,227,0.85)] hover:bg-[#0092d3]"
                              : "border border-[#91caee] bg-white text-[#009fe3] hover:bg-[#f7fbff]",
                          )}
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div>
                  {activeSlide.body?.length ? (
                    <div
                      className={cn(
                        "space-y-[18px]",
                        "text-[16px] font-medium leading-[1.72] tracking-[-0.01em] text-[#263b59]",
                        "sm:text-[17px]",
                        "lg:text-[18px] lg:leading-[1.68]",
                      )}
                    >
                      {activeSlide.body.map((paragraph, index) => (
                        <p key={`${paragraph}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {activeSlide.bullets?.length ? (
                    <ul className="mt-[28px] grid gap-[14px] sm:grid-cols-2">
                      {activeSlide.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="group/item flex items-start gap-[11px] rounded-[12px] text-[14px] font-bold leading-[1.45] tracking-[-0.01em] text-[#33445f] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/65 hover:px-2 hover:py-1 hover:shadow-[0_12px_26px_-24px_rgba(15,23,42,0.45)] sm:text-[15px]"
                        >
                          <CheckCircle2
                            className={cn(
                              "mt-[1px] h-[18px] w-[18px] shrink-0 stroke-[2.4] transition-transform duration-300 group-hover/item:scale-110",
                              accentClass,
                            )}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </article>

          {/* Mobile controls */}
          {hasMultipleSlides ? (
            <div className="mt-[24px] flex flex-wrap items-center justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={goToPreviousSlide}
                aria-label="Previous content"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#c8d9e8] bg-white text-[#11182d] transition-all duration-300 hover:border-[#009fe3] hover:text-[#009fe3]"
              >
                <ArrowLeft className="h-[18px] w-[18px] stroke-[2.4]" />
              </button>

              <div className="flex items-center gap-[8px]">
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.title}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show content ${index + 1}`}
                    className={cn(
                      "h-[8px] rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-[30px] bg-[#009fe3]"
                        : "w-[8px] bg-[#c8d9e8] hover:bg-[#91caee]",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next content"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#c8d9e8] bg-white text-[#11182d] transition-all duration-300 hover:border-[#009fe3] hover:text-[#009fe3]"
              >
                <ArrowRight className="h-[18px] w-[18px] stroke-[2.4]" />
              </button>
            </div>
          ) : null}

          {/* Desktop dots */}
          {hasMultipleSlides ? (
            <div className="mt-[28px] hidden items-center justify-center gap-[8px] md:flex">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.title}-${index}-dot`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show content ${index + 1}`}
                  className={cn(
                    "h-[8px] rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-[30px] bg-[#009fe3]"
                      : "w-[8px] bg-[#c8d9e8] hover:bg-[#91caee]",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function getSlides(data: AboutContentCarouselData): AboutContentSlide[] {
  const dashboardSlides = data.slides || data.items || data.highlights;

  if (dashboardSlides?.length) {
    return dashboardSlides.map((slide, index) => ({
      id: slide.id,
      eyebrow: slide.eyebrow || data.eyebrow || exampleSlides[index]?.eyebrow,
      title: slide.title || exampleSlides[index]?.title || "About Damira",
      subtitle: slide.subtitle || exampleSlides[index]?.subtitle,
      body: slide.body || exampleSlides[index]?.body || [],
      bullets: slide.bullets || exampleSlides[index]?.bullets || [],
      actions: slide.actions || exampleSlides[index]?.actions || [],
    }));
  }

  const hasOldSingleContent =
    data.title || data.subtitle || data.body?.length || data.bullets?.length;

  if (hasOldSingleContent) {
    return [
      {
        eyebrow: data.eyebrow || "Company Story",
        title: data.title || exampleSlides[0].title,
        subtitle: data.subtitle || exampleSlides[0].subtitle,
        body: data.body || exampleSlides[0].body,
        bullets: data.bullets || exampleSlides[0].bullets,
        actions: data.actions || exampleSlides[0].actions,
      },
      exampleSlides[1],
      exampleSlides[2],
    ];
  }

  return exampleSlides;
}

const exampleSlides: AboutContentSlide[] = [
  {
    eyebrow: "Company Story",
    title: "Built for Specialized Healthcare Growth",
    subtitle:
      "Damira Pharma bridges global healthcare innovation with reliable local execution.",
    body: [
      "Damira Pharma was created as a specialized healthcare distribution and commercialization platform designed to serve high-value pharmaceutical, nutrition, and medical technology partners.",
      "With operational discipline, quality systems, and a focused market-access approach, we help partners navigate complex healthcare environments with confidence.",
    ],
    bullets: [
      "Specialized healthcare distribution",
      "Quality-driven operations",
      "Market-access execution",
      "Partner-focused growth",
    ],
    actions: [
      {
        label: "Explore Services",
        href: "/services",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
    ],
  },
  {
    eyebrow: "Operational Foundation",
    title: "Backed by Deep Regional Experience",
    subtitle:
      "Our model is strengthened by the long-standing operational foundation of Al Ahlam Group.",
    body: [
      "Damira Pharma benefits from decades of business, logistics, and market knowledge while focusing specifically on the needs of advanced healthcare partners.",
      "This foundation allows us to combine agility with structure, giving international innovators a compliant and dependable path into the Syrian healthcare market.",
    ],
    bullets: [
      "Established operational roots",
      "Local healthcare understanding",
      "Structured partner onboarding",
      "Reliable commercial execution",
    ],
    actions: [
      {
        label: "Learn About Us",
        href: "/about",
      },
    ],
  },
  {
    eyebrow: "Partner Promise",
    title: "A Compliant Gateway to Healthcare Access",
    subtitle:
      "We protect product integrity while helping therapies reach the patients who need them.",
    body: [
      "Our approach aligns distribution, regulatory coordination, documentation, and partner reporting into one integrated operating model.",
      "For partners, this means stronger visibility, lower execution risk, and a more resilient route to sustainable healthcare growth.",
    ],
    bullets: [
      "Audit-ready workflows",
      "Traceable distribution",
      "Transparent reporting",
      "Patient-centered delivery",
    ],
    actions: [
      {
        label: "Start Partnership",
        href: "/partnerships",
      },
    ],
  },
];
