import { CheckCircle2, Package } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface ServiceFeatureSectionProps {
  data: ContentSectionData;
  index: number;
  accent?: "blue" | "green" | "orange";
}

const accentMap = {
  blue: "#009fe3",
  green: "#2f9a5b",
  orange: "#f58238",
};

export function ServiceFeatureSection({
  data,
  index,
  accent = "blue",
}: ServiceFeatureSectionProps) {
  const image = data.images?.[0] || data.image;
  const reversed = index % 2 === 1;
  const accentColor = accentMap[accent];

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden",
          index % 2 === 0 ? "bg-white" : "bg-[#f8fbff]",
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
              "grid items-center",
              "gap-[42px]",
              "md:gap-[50px]",
              "lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:gap-[56px]",
              "xl:grid-cols-[minmax(0,0.98fr)_minmax(420px,0.98fr)] xl:gap-[70px]",
              "2xl:gap-[80px]",
            )}
          >
            {/* Content first on mobile/tablet */}
            <div
              className={cn(
                "relative order-1",
                reversed
                  ? "lg:order-1 rtl:lg:order-2"
                  : "lg:order-2 rtl:lg:order-1",
                "rtl:text-right",
              )}
            >
              {/* Number and divider */}
              <div className="mb-[24px] flex items-center gap-[15px] sm:mb-[27px] xl:mb-[31px] xl:gap-[17px]">
                <span
                  className="text-[19px] font-black leading-none tracking-[-0.025em] sm:text-[20px] xl:text-[22px]"
                  style={{ color: accentColor }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="h-px flex-1 bg-[#d8e3ee]" />
              </div>

              {data.eyebrow ? (
                <p className="mb-[16px] text-[12px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#65748d] sm:text-[13px]">
                  {data.eyebrow}
                </p>
              ) : null}

              <h2
                className={cn(
                  "max-w-[720px]",
                  "font-black leading-[1.12] tracking-[-0.045em]",
                  "text-[#071329]",
                  "text-[31px]",
                  "sm:text-[34px]",
                  "md:text-[36px]",
                  "xl:text-[38px]",
                )}
              >
                {data.title || "Advanced Infrastructure & Storage"}
              </h2>

              {data.subtitle ? (
                <p
                  className={cn(
                    "mt-[18px] max-w-[700px]",
                    "text-[16px] font-medium leading-[1.58] tracking-[-0.012em] text-[#263b59]",
                    "sm:text-[17px]",
                    "md:text-[18px]",
                    "xl:text-[20px] xl:leading-[1.45]",
                  )}
                >
                  {data.subtitle}
                </p>
              ) : null}

              {data.body?.length ? (
                <div
                  className={cn(
                    "mt-[20px] max-w-[700px] space-y-4",
                    "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                    "sm:text-[16px]",
                    "md:text-[17px]",
                    "xl:mt-[22px] xl:text-[18px] xl:leading-[1.55]",
                  )}
                >
                  {data.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {data.bullets?.length ? (
                <ul className="mt-[28px] space-y-[15px] sm:mt-[30px] sm:space-y-[17px] xl:mt-[34px] xl:space-y-[20px]">
                  {data.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "flex items-start gap-[12px]",
                        "text-[15px] font-medium leading-[1.45] tracking-[-0.012em] text-[#071329]",
                        "sm:text-[16px]",
                        "xl:gap-[13px] xl:text-[18px] xl:leading-[1.25]",
                      )}
                    >
                      <CheckCircle2
                        className="mt-[1px] h-[19px] w-[19px] shrink-0 stroke-[2.2] sm:h-[20px] sm:w-[20px] xl:mt-[-1px] xl:h-[22px] xl:w-[22px]"
                        style={{ color: accentColor }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {data.actions?.length ? (
                <div className="mt-[34px] flex flex-col gap-3 sm:flex-row sm:flex-wrap rtl:sm:flex-row-reverse rtl:sm:justify-end xl:mt-[42px]">
                  {data.actions.map((action, actionIndex) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "inline-flex h-[48px] items-center justify-center rounded-full px-7",
                        "text-[14px] font-extrabold leading-none tracking-[-0.01em]",
                        "transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        "sm:h-[52px] sm:px-8 sm:text-[15px]",
                        "xl:h-[54px] xl:text-[16px]",
                        actionIndex === 0
                          ? "bg-[#009fe3] text-white shadow-[0_18px_35px_-20px_rgba(0,159,227,0.9)] hover:-translate-y-0.5 hover:bg-[#0092d3]"
                          : "border border-[#d8e3ec] bg-white text-[#31405a] hover:-translate-y-0.5 hover:border-[#009fe3]/45 hover:text-[#009fe3]",
                      )}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Image second on mobile/tablet */}
            <div
              className={cn(
                "relative order-2",
                reversed
                  ? "lg:order-2 rtl:lg:order-1"
                  : "lg:order-1 rtl:lg:order-2",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  "rounded-[18px] sm:rounded-[20px] xl:rounded-[24px]",
                  "bg-[#edf8ff]",
                  "h-[300px]",
                  "sm:h-[390px]",
                  "md:h-[460px]",
                  "lg:h-[480px]",
                  "xl:h-[500px]",
                  "shadow-[0_28px_55px_-38px_rgba(15,23,42,0.75)]",
                )}
              >
                {image ? (
                  <CmsImage
                    src={image.src}
                    alt={image.alt || data.title || "Service feature image"}
                    fill
                    sizes="(min-width: 1536px) 38vw, (min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(135deg,#dceffb,#ffffff,#eef8f1)]" />
                )}

                {/* Small floating icon box */}
                <div
                  className={cn(
                    "absolute flex items-center justify-center bg-white shadow-[0_16px_35px_-28px_rgba(15,23,42,0.75)]",
                    "left-[20px] top-[20px] h-[52px] w-[52px] rounded-[14px] rtl:left-auto rtl:right-[20px]",
                    "sm:left-[24px] sm:top-[24px] sm:h-[58px] sm:w-[58px] rtl:sm:left-auto rtl:sm:right-[24px]",
                    "xl:left-[32px] xl:top-[32px] xl:h-[64px] xl:w-[64px] xl:rounded-[16px] rtl:xl:left-auto rtl:xl:right-[32px]",
                  )}
                  style={{ color: accentColor }}
                >
                  {isSectionMediaIcon(data.icon) ? (
                    <SectionIconImage
                      icon={data.icon}
                      width={34}
                      height={34}
                      className="h-[25px] w-[25px] object-contain sm:h-[29px] sm:w-[29px] xl:h-[32px] xl:w-[32px]"
                    />
                  ) : (
                    <Package className="h-[25px] w-[25px] stroke-[2.2] sm:h-[29px] sm:w-[29px] xl:h-[32px] xl:w-[32px]" />
                  )}
                </div>

                {/* Soft accent overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}22 0%, transparent 46%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
