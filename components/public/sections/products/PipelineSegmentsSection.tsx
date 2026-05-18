import type { CardGridData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface PipelineSegmentsSectionData extends CardGridData {
  items: Array<{
    id: string;
    title: string;
  }>;
}

interface PipelineSegmentsSectionProps {
  data: PipelineSegmentsSectionData;
}

export function PipelineSegmentsSection({
  data,
}: PipelineSegmentsSectionProps) {
  const items = data.items || [];

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/pipeline relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
        {/* Soft background depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,244,255,0.45),transparent_34%)] transition-transform duration-700 ease-out group-hover/pipeline:scale-[1.015]" />

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
          <div className="mx-auto max-w-[820px] text-center">
            <h2
              className={cn(
                "font-black leading-[1.12] tracking-[-0.04em] text-[#071329]",
                "text-[28px]",
                "sm:text-[30px]",
                "md:text-[32px]",
              )}
            >
              {data.title || "Pipeline Segments"}
            </h2>

            {data.description ? (
              <p
                className={cn(
                  "mx-auto mt-[17px] max-w-[760px]",
                  "text-[15px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                  "sm:mt-[19px] sm:text-[16px]",
                  "md:text-[17px] md:leading-[1.55]",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Pills */}
          <div
            className={cn(
              "mx-auto flex flex-wrap items-center justify-center",
              "max-w-[980px]",
              "mt-[42px] gap-x-[10px] gap-y-[10px]",
              "sm:mt-[50px] sm:gap-x-[12px] sm:gap-y-[12px]",
              "md:mt-[56px] md:gap-x-[14px] md:gap-y-[13px]",
              "xl:mt-[64px] xl:max-w-[1200px] xl:gap-x-[16px] xl:gap-y-[14px]",
            )}
          >
            {items.map((item, index) => (
              <div
                key={item.id || `${item.title}-${index}`}
                className={cn(
                  "inline-flex items-center justify-center rounded-full",
                  "border border-[#d9e4ef] bg-[#f8fbff]",
                  "shadow-none transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:scale-[1.015] hover:border-[#9ed8f8] hover:bg-white hover:text-[#009fe3] hover:shadow-[0_16px_34px_-28px_rgba(15,23,42,0.45)]",

                  // Mobile pill
                  "min-h-[42px] px-[17px]",
                  "text-[13px] font-semibold leading-none tracking-[-0.012em] text-[#071329]",

                  // Small / tablet
                  "sm:min-h-[44px] sm:px-[19px] sm:text-[14px]",
                  "md:min-h-[46px] md:px-[21px] md:text-[15px]",

                  // Desktop
                  "xl:min-h-[50px] xl:px-[24px] xl:text-[16px]",
                )}
              >
                <span className="max-w-[220px] truncate transition-colors duration-300 sm:max-w-[260px] md:max-w-none">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
