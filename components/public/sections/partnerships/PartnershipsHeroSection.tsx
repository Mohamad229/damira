import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface PartnershipsHeroSectionProps {
  data?: HeroSectionData;
  className?: string;
}

export function PartnershipsHeroSection({
  data,
  className,
}: PartnershipsHeroSectionProps) {
  const title = data?.title || "Partner with Damira Pharma";

  const subtitle =
    data?.subtitle ||
    "Accelerate market entry in Syria through a specialized, compliant, and financially stable healthcare platform.";

  const eyebrow = data?.eyebrow || "Partnerships";

  const primaryAction = data?.actions?.[0] || {
    label: "Explore Opportunities",
    href: "#partners-who",
  };

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/partnerships-hero relative isolate overflow-hidden bg-[#009fe3] text-white",
          "min-h-[390px] sm:min-h-[430px] md:min-h-[470px] lg:min-h-[520px]",
          className,
        )}
      >
        {/* Base background */}
        <div className="pointer-events-none absolute inset-0 bg-[#009fe3]" />

        {/* Brand geometric overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-[linear-gradient(78deg,rgba(0,132,197,0)_0%,rgba(0,132,197,0)_42%,rgba(0,126,190,0.2)_42.1%,rgba(0,126,190,0.2)_48%,rgba(255,255,255,0.07)_48.1%,rgba(255,255,255,0.07)_54%,rgba(0,132,197,0)_54.1%,rgba(0,132,197,0)_100%)]",
            "transition-transform duration-700 ease-out group-hover/partnerships-hero:scale-[1.015]",
          )}
        />

        {/* Soft light glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-18%,rgba(255,255,255,0.18),transparent_38%)] transition-transform duration-700 ease-out group-hover/partnerships-hero:scale-[1.025]" />

        <div className="pointer-events-none absolute left-[-160px] top-[-160px] h-[340px] w-[340px] rounded-full bg-white/10 blur-3xl transition-transform duration-700 ease-out group-hover/partnerships-hero:scale-110 sm:h-[420px] sm:w-[420px]" />

        <div className="pointer-events-none absolute bottom-[-200px] right-[-160px] h-[390px] w-[390px] rounded-full bg-[#4cb748]/20 blur-3xl transition-transform duration-700 ease-out group-hover/partnerships-hero:scale-110 sm:h-[500px] sm:w-[500px]" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center",
            "min-h-[390px] px-4 py-[72px]",
            "sm:min-h-[430px] sm:px-6 sm:py-[84px]",
            "md:min-h-[470px] md:px-8 md:py-[94px]",
            "lg:min-h-[520px] lg:px-[72px] lg:py-[110px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          <div className="mx-auto w-full max-w-[980px] text-center">
            {eyebrow ? (
              <p
                className={cn(
                  "mb-[20px] text-[11px] font-black uppercase leading-none tracking-[0.18em]",
                  "text-white/80",
                  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white",
                  "sm:mb-[24px] sm:text-[12px]",
                  "lg:mb-[27px] lg:text-[13px]",
                )}
              >
                {eyebrow}
              </p>
            ) : null}

            <h1
              className={cn(
                "mx-auto max-w-[980px] text-balance font-black text-white",
                "text-[34px] leading-[1.08] tracking-[-0.05em]",
                "sm:text-[44px] sm:leading-[1.06]",
                "md:text-[52px]",
                "lg:text-[60px]",
                "xl:text-[64px]",
              )}
            >
              {title}
            </h1>

            {subtitle ? (
              <p
                className={cn(
                  "mx-auto mt-[20px] max-w-[760px] text-balance",
                  "text-[16px] font-bold leading-[1.55] tracking-[-0.015em]",
                  "text-white/90",
                  "sm:mt-[24px] sm:text-[19px] sm:leading-[1.5]",
                  "lg:mt-[26px] lg:text-[22px] lg:leading-[1.38]",
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {primaryAction?.href && primaryAction?.label ? (
              <div className="mt-[34px] flex justify-center sm:mt-[40px] lg:mt-[48px]">
                <Link
                  href={primaryAction.href}
                  className={cn(
                    "inline-flex h-[46px] w-full max-w-[290px] items-center justify-center rounded-full",
                    "bg-white px-7 text-center",
                    "text-[14px] font-black leading-none tracking-[-0.015em] text-[#009fe3]",
                    "shadow-[0_20px_38px_-28px_rgba(15,23,42,0.7)]",
                    "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]",
                    "hover:bg-[#f7fbff] hover:shadow-[0_24px_45px_-30px_rgba(15,23,42,0.85)] active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#009fe3]",
                    "sm:h-[48px] sm:max-w-none sm:w-auto sm:min-w-[268px]",
                  )}
                >
                  {primaryAction.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}