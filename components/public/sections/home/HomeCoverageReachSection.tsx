import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { StatsSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface HomeCoverageReachSectionProps {
  data: StatsSectionData;
}

function getSectionLabel(title?: string) {
  const normalized = title?.trim();

  if (!normalized) {
    return "Coverage & Reach";
  }

  return normalized;
}

export function HomeCoverageReachSection({
  data,
}: HomeCoverageReachSectionProps) {
  const items = data.items || [];

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-[#10182b] text-white",
          "py-[72px] sm:py-[82px] lg:py-[88px] xl:py-[94px]",
        )}
      >
        {/* Clean dark background */}
        <div className="pointer-events-none absolute inset-0 bg-[#10182b]" />

        {/* Very subtle depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_38%)]" />

        {/* Responsive page padding */}
        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          {/* Header */}
          <div className="mx-auto max-w-[790px] text-center">
            <div className="mb-[18px] flex items-center justify-center gap-[14px] sm:gap-[17px] xl:mb-[20px]">
              <span className="text-[13px] font-extrabold leading-none tracking-[0.03em] text-[#009fe3] sm:text-[14px]">
                03
              </span>

              <span className="h-px w-[42px] bg-[#1f9ed4] sm:w-[48px]" />

              <span className="text-[12px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#8b9ab1] sm:text-[14px]">
                Market Access
              </span>
            </div>

            <h2
              className={cn(
                "font-black leading-[1.12] tracking-[-0.04em] text-white",
                "text-[32px] sm:text-[36px] lg:text-[37px] xl:text-[38px]",
              )}
            >
              {getSectionLabel(data.title)}
            </h2>

            {data.description ? (
              <p
                className={cn(
                  "mx-auto mt-[20px] max-w-[780px]",
                  "text-[16px] font-semibold leading-[1.5] tracking-[-0.01em] text-[#94a3b8]",
                  "sm:text-[17px]",
                  "lg:text-[18px]",
                  "xl:mt-[24px] xl:text-[19px] xl:leading-[1.45]",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Stats */}
          <div
            className={cn(
              "mt-[52px] grid grid-cols-1",
              "gap-y-12",
              "sm:mt-[58px] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14",
              "lg:mt-[64px] lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0",
              "xl:mt-[70px] xl:gap-x-8",
            )}
          >
            {items.map((item, index) => {
              return (
                <article
                  key={item.id || `${item.label}-${index}`}
                  className={cn(
                    "group relative flex flex-col items-center text-center",
                    "rounded-[28px] px-4 py-5",
                    "transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.035] hover:shadow-[0_20px_46px_-34px_rgba(0,0,0,0.55)]",
                  )}
                >
                  {/* Optional divider on larger desktop only */}
                  {index > 0 ? (
                    <div className="absolute left-0 top-[6px] hidden h-[86px] w-px bg-white/7 rtl:left-auto rtl:right-0 xl:block" />
                  ) : null}

                  <p
                    className={cn(
                      "font-black leading-none tracking-[-0.055em] text-white transition-colors duration-300 group-hover:text-[#7bd6ff]",
                      "text-[42px]",
                      "sm:text-[46px]",
                      "lg:text-[46px]",
                      "xl:text-[50px]",
                    )}
                  >
                    {item.value}
                  </p>

                  <span className="mt-[14px] block h-[4px] w-[44px] rounded-full bg-[#009fe3] transition-all duration-300 group-hover:w-[58px] group-hover:bg-[#4cb748] sm:w-[48px]" />

                  <h3
                    className={cn(
                      "mt-[19px] font-extrabold leading-[1.2] tracking-[-0.015em] text-[#8b9ab1]",
                      "text-[15px]",
                      "sm:text-[16px]",
                      "xl:mt-[21px]",
                    )}
                  >
                    {item.label}
                  </h3>

                  {item.description ? (
                    <p className="mt-3 max-w-[250px] text-[14px] font-medium leading-6 tracking-[-0.01em] text-[#94a3b8]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
