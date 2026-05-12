import { ShieldCheck } from "lucide-react";

import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface QualityHeroSectionProps {
  data?: HeroSectionData;
  className?: string;
}

export function QualityHeroSection({
  data,
  className,
}: QualityHeroSectionProps) {
  const title =
    data?.title ||
    "Commitment to Quality, Safety, and Regulatory Excellence";

  const subtitle =
    data?.subtitle ||
    "Damira's quality architecture supports resilient healthcare delivery through compliance-by-design.";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#10182b] text-white",
          "min-h-[360px] sm:min-h-[410px] lg:min-h-[480px]",
          className,
        )}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[#10182b]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,159,227,0.14),transparent_38%)]" />

        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#009fe3]/10 blur-3xl sm:h-[460px] sm:w-[460px]" />

        <div className="pointer-events-none absolute bottom-[-220px] right-[-160px] h-[360px] w-[360px] rounded-full bg-[#4cb748]/10 blur-3xl sm:h-[460px] sm:w-[460px]" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center",
            "min-h-[360px] px-4 py-[72px]",
            "sm:min-h-[410px] sm:px-6 sm:py-[86px]",
            "md:px-8",
            "lg:min-h-[480px] lg:px-[72px] lg:py-[104px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          <div className="mx-auto w-full max-w-[980px] text-center">
            {/* Icon */}
            <div className="mb-[22px] flex justify-center sm:mb-[26px] lg:mb-[30px]">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#009fe3]/10 ring-1 ring-[#009fe3]/20 sm:h-[66px] sm:w-[66px]">
                <ShieldCheck className="h-[38px] w-[38px] text-[#009fe3] stroke-[2.35] sm:h-[44px] sm:w-[44px] lg:h-[48px] lg:w-[48px]" />
              </div>
            </div>

            {/* Title */}
            <h1
              className={cn(
                "mx-auto max-w-[1050px] text-balance font-black text-white",
                "text-[34px] leading-[1.08] tracking-[-0.045em]",
                "sm:text-[44px] sm:leading-[1.06]",
                "md:text-[52px]",
                "lg:text-[60px]",
                "xl:text-[64px]",
              )}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle ? (
              <p
                className={cn(
                  "mx-auto mt-[20px] max-w-[760px] text-balance",
                  "text-[16px] font-semibold leading-[1.55] tracking-[-0.012em]",
                  "text-white/88",
                  "sm:mt-[24px] sm:text-[19px] sm:leading-[1.5]",
                  "lg:text-[21px]",
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}