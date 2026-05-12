import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { CtaSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface ProductDetailCtaSectionProps {
  data: CtaSectionData;
}

export function ProductDetailCtaSection({
  data,
}: ProductDetailCtaSectionProps) {
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
              "rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] xl:rounded-[36px]",
              "border border-[#d7efd2] bg-[#eaf7e8]",
              "px-5 py-8",
              "sm:px-7 sm:py-10",
              "md:px-8 md:py-11",
              "lg:px-[46px] lg:py-[50px]",
              "xl:px-[48px] xl:py-[54px]",
            )}
          >
            {/* Soft decorative shapes */}
            <div className="pointer-events-none absolute -right-[64px] -top-[72px] h-[150px] w-[150px] rounded-full bg-[#4cb748]/15 sm:h-[164px] sm:w-[164px]" />
            <div className="pointer-events-none absolute -bottom-[90px] -left-[90px] h-[190px] w-[190px] rounded-full bg-[#009fe3]/10 blur-xl" />

            <div
              className={cn(
                "relative z-10 grid",
                "gap-[30px]",
                "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-[36px]",
                "xl:gap-[44px]",
              )}
            >
              {/* Content */}
              <div className="max-w-[780px]">
                {data.eyebrow ? (
                  <span
                    className={cn(
                      "mb-[18px] inline-flex items-center rounded-full bg-white",
                      "h-[24px] px-[12px]",
                      "text-[11px] font-black uppercase leading-none tracking-[0.2em] text-[#2a8d33]",
                      "sm:mb-[20px] sm:px-[13px] sm:text-[12px] sm:tracking-[0.24em]",
                    )}
                  >
                    {data.eyebrow}
                  </span>
                ) : null}

                <h2
                  className={cn(
                    "max-w-[760px]",
                    "font-black leading-[1.04] tracking-[-0.055em] text-[#071329]",
                    "text-[32px]",
                    "sm:text-[38px]",
                    "md:text-[42px]",
                    "xl:text-[48px]",
                  )}
                >
                  {data.title}
                </h2>

                {data.description ? (
                  <p
                    className={cn(
                      "mt-[20px] max-w-[760px]",
                      "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#071329]",
                      "sm:text-[16px]",
                      "md:text-[17px] md:leading-[1.55]",
                      "xl:mt-[22px]",
                    )}
                  >
                    {data.description}
                  </p>
                ) : null}
              </div>

              {/* Actions */}
              {(data.primaryAction || data.secondaryAction) ? (
                <div
                  className={cn(
                    "flex",
                    "flex-col gap-3",
                    "sm:flex-row sm:flex-wrap",
                    "lg:justify-end rtl:sm:flex-row-reverse rtl:lg:justify-start",
                  )}
                >
                  {data.primaryAction ? (
                    <Link
                      href={data.primaryAction.href}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full",
                        "h-[46px] px-6",
                        "text-[14px] font-black leading-none tracking-[-0.01em]",
                        "bg-[#009fe3] text-white",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0092d3]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        "sm:h-[48px]",
                        "lg:min-w-[118px]",
                      )}
                    >
                      {data.primaryAction.label}
                    </Link>
                  ) : null}

                  {data.secondaryAction ? (
                    <Link
                      href={data.secondaryAction.href}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full",
                        "h-[46px] px-6",
                        "text-[14px] font-black leading-none tracking-[-0.01em]",
                        "border border-[#91caee] bg-white text-[#009fe3]",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8fbff]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        "sm:h-[48px]",
                        "lg:min-w-[184px]",
                      )}
                    >
                      {data.secondaryAction.label}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
