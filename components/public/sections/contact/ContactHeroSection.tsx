import type { HeroSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface ContactHeroSectionProps {
  data?: HeroSectionData;
  className?: string;
}

export function ContactHeroSection({
  data,
  className,
}: ContactHeroSectionProps) {
  const eyebrow = data?.eyebrow || "Contact Us";

  const title = data?.title || "Get in Touch";

  const subtitle =
    data?.subtitle ||
    "Connect with our team to discuss partnerships, services, or product availability.";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-white",
          "border-b border-[#eef3f8]",
          "py-[72px] sm:py-[84px] lg:py-[96px] xl:py-[108px]",
          className,
        )}
      >
        {/* Background accents */}
        <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-[#e2f4ff] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-210px] right-[-170px] h-[430px] w-[430px] rounded-full bg-[#edfbee] blur-3xl" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,159,227,0.08),transparent_42%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[72px] xl:px-[120px] 2xl:px-[210px]">
          <div className="mx-auto w-full max-w-[920px] text-center">
            {eyebrow ? (
              <span className="inline-flex rounded-full bg-[#e2f4ff] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#009fe3] sm:text-[12px]">
                {eyebrow}
              </span>
            ) : null}

            <h1
              className={cn(
                "mx-auto mt-[18px] max-w-[980px] text-balance font-black text-[#071329]",
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
                  "text-[16px] font-medium leading-[1.65] tracking-[-0.012em]",
                  "text-[#263b59]",
                  "sm:mt-[24px] sm:text-[18px]",
                  "lg:text-[20px]",
                )}
              >
                {subtitle}
              </p>
            ) : null}

            <div className="mx-auto mt-[30px] h-[4px] w-[70px] rounded-full bg-[#4cb748] sm:mt-[36px]" />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}