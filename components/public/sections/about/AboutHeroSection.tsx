import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface AboutHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function AboutHeroSection({ data, className }: AboutHeroSectionProps) {
  const title = data.title || "About Damira Pharma";

  const subtitle =
    data.subtitle || "Specialized Healthcare Division of Al Ahlam Group";

  const eyebrow = data.eyebrow || "Who We Are";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#10182b] text-white",
          "min-h-[380px] sm:min-h-[410px] lg:min-h-[455px]",
          className,
        )}
      >
        {/* Background image from admin dashboard */}
        {data.backgroundImage?.src ? (
          <CmsImage
            src={data.backgroundImage.src}
            alt={data.backgroundImage.alt || title}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover "
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#10182b_0%,#18233a_52%,#10182b_100%)]" />
        )}

        {/* Dark overlays to match the screenshot */}
        {/* <div className="absolute inset-0 bg-[#10182b]/82" /> */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#10182b_0%,rgba(16,24,43,0.94)_34%,rgba(16,24,43,0.84)_70%,rgba(16,24,43,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(255,255,255,0.06),transparent_34%)]" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex min-h-[380px] w-full items-center",
            "px-4 sm:px-6 md:px-8",
            "sm:min-h-[410px] lg:min-h-[455px]",
            "lg:px-[210px]",
          )}
        >
          <div className="max-w-[780px] pt-[18px]">
            {/* Eyebrow */}
            <div
              className={cn(
                "mb-[31px] inline-flex h-[30px] items-center rounded-full",
                "border border-white/18 bg-white/12 px-[13px]",
                "text-[14px] font-extrabold leading-none text-white",
                "shadow-[0_10px_28px_-20px_rgba(0,0,0,0.75)]",
                "backdrop-blur-sm",
              )}
            >
              {eyebrow}
            </div>

            {/* Title */}
            <h1
              className={cn(
                "text-[42px] font-medium leading-[1.05]",
                "text-white",
                "sm:text-[54px]",
                "lg:text-[62px]",
              )}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle ? (
              <p
                className={cn(
                  "mt-[29px] max-w-[820px]",
                  "text-[22px] font-medium leading-[1.35]",
                  "text-white/92",
                  "sm:text-[25px]",
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
