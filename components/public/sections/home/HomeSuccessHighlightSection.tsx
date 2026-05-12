"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface HomeSuccessHighlightSectionProps {
  data: DashboardSuccessHighlightData;
}

type SuccessHighlightMetric = {
  label: string;
  value: string;
  progress?: number;
  color?: "blue" | "green" | "orange";
};

type SuccessHighlightSlide = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string[];
  bullets?: string[];
  metrics?: SuccessHighlightMetric[];
};

type DashboardSuccessHighlightData = Omit<Partial<ContentSectionData>, "items"> & {
  items?: SuccessHighlightSlide[];
  highlights?: SuccessHighlightSlide[];
  slides?: SuccessHighlightSlide[];
  stats?: SuccessHighlightMetric[];
  metricsTitle?: string;
  metricsBadge?: string;
  emptyMetricsText?: string;
};

const exampleSlides: SuccessHighlightSlide[] = [
  {
    eyebrow: "Success Highlight",
    title: "Proven Brand Scaling",
    subtitle:
      "Damira Pharma provides an integrated commercialization model for specialized healthcare brands entering complex markets.",
    body: [
      "Our team supports partners from regulatory preparation through market access, institutional engagement, and long-term distribution execution.",
    ],
    bullets: [
      "Accelerated access to hospitals, pharmacies, and healthcare institutions",
      "Audit-ready logistics with traceable distribution workflows",
      "Commercial execution supported by market intelligence and field teams",
    ],
    metrics: [
      {
        label: "Market Penetration Speed",
        value: "Accelerated",
        progress: 85,
        color: "blue",
      },
      {
        label: "Formulary Success Rate",
        value: "High",
        progress: 92,
        color: "blue",
      },
      {
        label: "Compliance & Traceability",
        value: "100%",
        progress: 100,
        color: "green",
      },
    ],
  },
  {
    eyebrow: "Success Highlight",
    title: "Specialized Market Access",
    subtitle:
      "We help global healthcare innovators navigate regulatory, commercial, and logistical barriers with a structured launch model.",
    body: [
      "From product registration support to stakeholder mapping, Damira Pharma builds the operational bridge between manufacturers and local healthcare demand.",
    ],
    bullets: [
      "Regulatory pathway coordination for complex healthcare products",
      "Targeted engagement with key opinion leaders and institutions",
      "Launch planning aligned with supply chain and demand realities",
    ],
    metrics: [
      {
        label: "Launch Readiness",
        value: "Structured",
        progress: 88,
        color: "blue",
      },
      {
        label: "Partner Visibility",
        value: "High",
        progress: 90,
        color: "orange",
      },
      {
        label: "Risk Control",
        value: "Strong",
        progress: 94,
        color: "green",
      },
    ],
  },
  {
    eyebrow: "Success Highlight",
    title: "Reliable Distribution Execution",
    subtitle:
      "Our infrastructure is designed for high-sensitivity healthcare products that require disciplined storage, handling, and delivery.",
    body: [
      "We combine quality systems, cold-chain controls, and data-backed reporting to protect product integrity and partner confidence.",
    ],
    bullets: [
      "Temperature-sensitive handling and documented storage processes",
      "Traceable inventory movement from warehouse to healthcare channel",
      "Operational reporting for partners and internal quality review",
    ],
    metrics: [
      {
        label: "Cold Chain Control",
        value: "Monitored",
        progress: 96,
        color: "green",
      },
      {
        label: "Distribution Coverage",
        value: "National",
        progress: 82,
        color: "blue",
      },
      {
        label: "Reporting Quality",
        value: "Transparent",
        progress: 91,
        color: "blue",
      },
    ],
  },
];

function clampProgress(value?: number) {
  if (typeof value !== "number") return 80;

  return Math.max(0, Math.min(100, value));
}

function getProgressColor(color?: SuccessHighlightMetric["color"]) {
  if (color === "green") return "bg-[#2f8f54]";
  if (color === "orange") return "bg-[#f58238]";

  return "bg-[#009fe3]";
}

function getMetricTextColor(color?: SuccessHighlightMetric["color"]) {
  if (color === "green") return "text-[#2f8f54]";
  if (color === "orange") return "text-[#f58238]";

  return "text-[#009fe3]";
}

function getCarouselSlides(data: DashboardSuccessHighlightData) {
  const dashboardSlides = data.slides || data.highlights || data.items;

  if (dashboardSlides?.length) {
    return dashboardSlides.map((slide, index) => ({
      eyebrow: slide.eyebrow || data.eyebrow || "Success Highlight",
      id: slide.id,
      title: slide.title || exampleSlides[index]?.title || "Success Highlight",
      subtitle: slide.subtitle || "",
      body: slide.body || [],
      bullets: slide.bullets || [],
      metrics: slide.metrics || [],
    }));
  }

  const hasDashboardContent =
    data.title || data.subtitle || data.body?.length || data.bullets?.length;

  if (hasDashboardContent) {
    return [
      {
        eyebrow: data.eyebrow || "Success Highlight",
        title: data.title || exampleSlides[0].title,
        subtitle: data.subtitle || exampleSlides[0].subtitle,
        body: data.body || exampleSlides[0].body,
        bullets: data.bullets || exampleSlides[0].bullets,
        metrics:
          (data as DashboardSuccessHighlightData).stats ||
          exampleSlides[0].metrics,
      },
      exampleSlides[1],
      exampleSlides[2],
    ];
  }

  return exampleSlides;
}

export function HomeSuccessHighlightSection({
  data,
}: HomeSuccessHighlightSectionProps) {
  const slides = useMemo(
    () => getCarouselSlides(data as DashboardSuccessHighlightData),
    [data],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const metricsTitle = data.metricsTitle || "Impact Snapshot";
  const metricsBadge = data.metricsBadge || "Live Model";
  const emptyMetricsText =
    data.emptyMetricsText ||
    "Add metrics from the dashboard to show commercial impact indicators for this success highlight.";

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
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
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
              "relative overflow-hidden",
              "rounded-[20px] sm:rounded-[22px] xl:rounded-[24px]",
              "border border-[#cfe8f7] bg-[#f3faff]",
              "px-5 py-8",
              "sm:px-7 sm:py-10",
              "md:px-8 md:py-11",
              "lg:px-[46px] lg:py-[52px]",
              "xl:px-[64px] xl:py-[64px]",
              "shadow-[0_24px_60px_-52px_rgba(15,23,42,0.55)]",
            )}
          >
            {/* Soft decoration */}
            <div className="pointer-events-none absolute -right-[100px] -top-[100px] h-[230px] w-[230px] rounded-full bg-[#009fe3]/10 sm:h-[260px] sm:w-[260px] xl:h-[280px] xl:w-[280px]" />
            <div className="pointer-events-none absolute -bottom-[120px] -left-[120px] h-[250px] w-[250px] rounded-full bg-[#4cb748]/10 sm:h-[280px] sm:w-[280px] xl:h-[300px] xl:w-[300px]" />

            <div
              className={cn(
                "relative z-10 grid items-center",
                "gap-[40px]",
                "md:gap-[46px]",
                "lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.78fr)] lg:gap-[52px]",
                "xl:grid-cols-[0.95fr_0.82fr] xl:gap-[86px]",
              )}
            >
              {/* Left content */}
              <div className="max-w-[720px]">
                <div
                  className={cn(
                    "mb-[22px] inline-flex items-center gap-2 rounded-full bg-white",
                    "h-[30px] px-[12px]",
                    "text-[13px] font-bold leading-none tracking-[-0.01em] text-[#009fe3]",
                    "shadow-[0_7px_18px_-14px_rgba(15,23,42,0.5)]",
                    "sm:mb-[24px] sm:text-[14px]",
                    "xl:mb-[27px]",
                  )}
                >
                  <TrendingUp className="h-[15px] w-[15px] stroke-[2.3]" />
                  <span>{activeSlide.eyebrow || "Success Highlight"}</span>
                </div>

                <h2
                  className={cn(
                    "font-black leading-[1.12] tracking-[-0.04em] text-[#11182d]",
                    "text-[30px]",
                    "sm:text-[34px]",
                    "md:text-[36px]",
                    "xl:text-[42px]",
                  )}
                >
                  {activeSlide.title}
                </h2>

                {activeSlide.subtitle ? (
                  <p
                    className={cn(
                      "mt-[20px] max-w-[700px]",
                      "text-[16px] font-medium leading-[1.55] tracking-[-0.01em] text-[#475672]",
                      "sm:text-[17px]",
                      "md:text-[18px]",
                      "xl:mt-[25px] xl:text-[19px] xl:leading-[1.5]",
                    )}
                  >
                    {activeSlide.subtitle}
                  </p>
                ) : null}

                {activeSlide.body?.length ? (
                  <div
                    className={cn(
                      "mt-[20px] max-w-[700px] space-y-4",
                      "text-[15px] font-medium leading-[1.6] tracking-[-0.01em] text-[#475672]",
                      "sm:text-[16px]",
                      "md:text-[17px]",
                      "xl:mt-[24px] xl:text-[18px] xl:leading-[1.55]",
                    )}
                  >
                    {activeSlide.body.map((paragraph, index) => (
                      <p key={`${paragraph}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {activeSlide.bullets?.length ? (
                  <ul className="mt-[28px] space-y-[14px] sm:mt-[30px] sm:space-y-[16px] xl:mt-[34px] xl:space-y-[18px]">
                    {activeSlide.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={cn(
                          "flex items-start",
                          "gap-[12px] sm:gap-[14px]",
                          "text-[14px] font-bold leading-[1.45] tracking-[-0.01em] text-[#33445f]",
                          "sm:text-[15px]",
                          "xl:text-[16px] xl:leading-[1.35]",
                        )}
                      >
                        <CheckCircle2 className="mt-[1px] h-[18px] w-[18px] shrink-0 text-[#009fe3] stroke-[2.4] xl:h-[19px] xl:w-[19px]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Carousel controls */}
                {hasMultipleSlides ? (
                  <div className="mt-[34px] flex flex-wrap items-center gap-4 xl:mt-[42px]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={goToPreviousSlide}
                        aria-label="Previous success highlight"
                        className={cn(
                          "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                          "border border-[#c8d9e8] bg-white text-[#11182d]",
                          "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#009fe3] hover:text-[#009fe3]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                          "xl:h-[42px] xl:w-[42px]",
                        )}
                      >
                        <ArrowLeft className="h-[17px] w-[17px] stroke-[2.4] xl:h-[18px] xl:w-[18px]" />
                      </button>

                      <button
                        type="button"
                        onClick={goToNextSlide}
                        aria-label="Next success highlight"
                        className={cn(
                          "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                          "border border-[#c8d9e8] bg-white text-[#11182d]",
                          "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#009fe3] hover:text-[#009fe3]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                          "xl:h-[42px] xl:w-[42px]",
                        )}
                      >
                        <ArrowRight className="h-[17px] w-[17px] stroke-[2.4] xl:h-[18px] xl:w-[18px]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-[8px]">
                      {slides.map((slide, index) => (
                        <button
                          key={`${slide.title}-${index}`}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Show success highlight ${index + 1}`}
                          className={cn(
                            "h-[8px] rounded-full transition-all duration-300",
                            index === activeIndex
                              ? "w-[30px] bg-[#009fe3]"
                              : "w-[8px] bg-[#c8d9e8] hover:bg-[#91caee]",
                          )}
                        />
                      ))}
                    </div>

                    <span className="text-[13px] font-extrabold leading-none tracking-[-0.01em] text-[#64748b]">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(slides.length).padStart(2, "0")}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Right metrics card */}
              <div className="flex justify-center lg:justify-end rtl:lg:justify-start">
                <div
                  className={cn(
                    "w-full rounded-[18px] bg-white",
                    "max-w-[520px]",
                    "px-[22px] py-[24px]",
                    "sm:px-[28px] sm:py-[30px]",
                    "md:px-[30px] md:py-[32px]",
                    "xl:px-[34px] xl:py-[34px]",
                    "shadow-[0_22px_40px_-28px_rgba(15,23,42,0.65)]",
                  )}
                >
                  <div className="mb-[26px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:mb-[30px]">
                    <h3 className="text-[19px] font-black leading-none tracking-[-0.03em] text-[#11182d] sm:text-[20px] xl:text-[21px]">
                      {metricsTitle}
                    </h3>

                    <span className="w-fit rounded-full bg-[#eaf7ff] px-[12px] py-[6px] text-[12px] font-black leading-none tracking-[-0.01em] text-[#009fe3]">
                      {metricsBadge}
                    </span>
                  </div>

                  {activeSlide.metrics?.length ? (
                    <div className="space-y-[23px] xl:space-y-[27px]">
                      {activeSlide.metrics.map((metric, index) => (
                        <div key={`${metric.label}-${index}`}>
                          <div className="mb-[10px] flex items-center justify-between gap-4">
                            <span className="text-[13px] font-extrabold leading-none tracking-[-0.01em] text-[#52627a] sm:text-[14px]">
                              {metric.label}
                            </span>

                            <span
                              className={cn(
                                "shrink-0 text-[13px] font-extrabold leading-none tracking-[-0.01em] sm:text-[14px]",
                                getMetricTextColor(metric.color),
                              )}
                            >
                              {metric.value}
                            </span>
                          </div>

                          <div className="h-[8px] overflow-hidden rounded-full bg-[#edf2f7]">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                getProgressColor(metric.color),
                              )}
                              style={{
                                width: `${clampProgress(metric.progress)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[14px] font-medium leading-6 tracking-[-0.01em] text-[#52627a] sm:text-[15px]">
                      {emptyMetricsText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
