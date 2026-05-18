import type { StatsSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface AboutStatsSectionProps {
  data: StatsSectionData;
}

export function AboutStatsSection({ data }: AboutStatsSectionProps) {
  const items = data.items || [];

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#10182b] text-white",
        "py-[68px] sm:py-[76px] lg:py-[82px] xl:py-[84px]",
      )}
    >
      {/* Subtle dark background depth */}
      <div className="pointer-events-none absolute inset-0 bg-[#10182b]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_38%)]" />

      {/* Responsive page-edge spacing */}
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
            "grid grid-cols-1",
            "gap-y-12",
            "sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14",
            "lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0",
            "xl:gap-x-10",
          )}
        >
          {items.map((item, index) => (
            <article
              key={item.id || `${item.label}-${index}`}
              className="group relative flex min-h-[168px] flex-col items-center rounded-[28px] px-4 py-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.035] hover:shadow-[0_24px_55px_-42px_rgba(0,159,227,0.75)] lg:px-3 lg:py-3"
            >
              {/* Desktop divider */}
              {index > 0 ? (
                <div className="absolute left-0 top-[6px] hidden h-[86px] w-px bg-white/7 rtl:left-auto rtl:right-0 xl:block" />
              ) : null}

              <p
                className={cn(
                  "font-black leading-none tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#91d8ff]",
                  "text-[42px]",
                  "sm:text-[46px]",
                  "lg:text-[46px]",
                  "xl:text-[50px]",
                )}
              >
                {item.value}
              </p>

              <span className="mt-[14px] block h-[4px] w-[44px] rounded-full bg-[#009fe3] transition-all duration-300 group-hover:w-[62px] group-hover:bg-[#4cb748] sm:w-[48px]" />

              <h3
                className={cn(
                  "mt-[19px] font-extrabold leading-[1.25] tracking-[-0.01em] text-[#8b9ab1] transition-colors duration-300 group-hover:text-white",
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
          ))}
        </div>
      </div>
    </section>
  );
}
