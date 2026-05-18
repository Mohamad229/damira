import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface ProductsHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function ProductsHeroSection({
  data,
  className,
}: ProductsHeroSectionProps) {
  const title =
    data.title || "Strategic Portfolio of Specialized Healthcare Products";

  const subtitle =
    data.subtitle ||
    "A carefully curated selection of pharmaceuticals, biologics, and medical devices addressing critical unmet needs in the Syrian healthcare system.";

  const eyebrow = data.eyebrow || "Product Catalog";

  const backgroundImageSrc = data.backgroundImage?.src;

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/products-hero relative isolate overflow-hidden bg-white",
          "min-h-[500px] sm:min-h-[540px] lg:min-h-[570px] xl:min-h-[600px]",
          className,
        )}
      >
        {/* Background image from admin dashboard */}
        {backgroundImageSrc ? (
          <CmsImage
            src={backgroundImageSrc}
            alt={data.backgroundImage?.alt || title}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="z-0 object-cover transition-transform duration-[1200ms] ease-out group-hover/products-hero:scale-[1.025]"
          />
        ) : (
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]" />
        )}

        {/* Softer overlays so the image stays visible */}
        {/* <div className="absolute inset-0 z-[1] bg-white/55 sm:bg-white/50 lg:bg-white/46" /> */}

        <div
          className={cn(
            "absolute inset-0 z-[2]",
            "bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.68)_24%,rgba(255,255,255,0.42)_50%,rgba(255,255,255,0.68)_76%,#ffffff_100%)]",
          )}
        />

        <div
          className={cn(
            "absolute inset-0 z-[3]",
            "bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.22)_34%,rgba(255,255,255,0.76)_100%)]",
          )}
        />

        {/* Soft decoration for small screens */}
        <div className="pointer-events-none absolute -right-[90px] top-[80px] z-[4] h-[220px] w-[220px] rounded-full bg-[#e2f4ff]/55 blur-2xl transition-transform duration-700 ease-out group-hover/products-hero:scale-110 sm:h-[280px] sm:w-[280px] lg:hidden" />
        <div className="pointer-events-none absolute -left-[100px] bottom-[-80px] z-[4] h-[240px] w-[240px] rounded-full bg-[#daecd4]/40 blur-2xl transition-transform duration-700 ease-out group-hover/products-hero:scale-110 sm:h-[300px] sm:w-[300px]" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex w-full items-center justify-center",
            "min-h-[500px] sm:min-h-[540px] lg:min-h-[570px] xl:min-h-[600px]",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
            "py-[72px] sm:py-[82px] lg:py-[92px] xl:py-[96px]",
          )}
        >
          <div className="mx-auto max-w-[760px] text-center">
            {/* Eyebrow */}
            <div
              className={cn(
                "mb-[22px] inline-flex items-center justify-center rounded-full",
                "border border-[#9ed8f8] bg-[#eaf7ff]/95",
                "h-[29px] px-[12px]",
                "text-[13px] font-semibold leading-none tracking-[-0.01em] text-[#009fe3]",
                "shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#009fe3]/45 hover:bg-white hover:shadow-[0_12px_28px_-24px_rgba(15,23,42,0.45)]",
                "sm:mb-[24px] sm:h-[30px] sm:px-[13px]",
                "xl:mb-[27px] xl:h-[31px] xl:text-[14px]",
              )}
            >
              {eyebrow}
            </div>

            {/* Title */}
            <h1
              className={cn(
                "mx-auto max-w-[760px]",
                "font-black leading-[1.02] tracking-[-0.055em]",
                "text-[#11182d]",
                "text-[38px]",
                "sm:text-[46px]",
                "md:text-[52px]",
                "lg:text-[56px]",
                "xl:text-[62px] xl:leading-[0.99]",
              )}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle ? (
              <p
                className={cn(
                  "mx-auto max-w-[640px]",
                  "mt-[24px]",
                  "text-[16px] font-medium leading-[1.55] tracking-[-0.01em]",
                  "text-[#263b59]",
                  "sm:text-[18px]",
                  "md:text-[19px]",
                  "lg:mt-[28px] lg:text-[20px] lg:leading-[1.48]",
                  "xl:mt-[30px]",
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {/* Optional actions from dashboard */}
            {data.actions?.length ? (
              <div className="mt-[34px] flex flex-col items-center justify-center gap-3 sm:mt-[38px] sm:flex-row sm:flex-wrap rtl:sm:flex-row-reverse">
                {data.actions.map((action, index) => {
                  const isPrimary = index === 0;

                  return (
                    <a
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full",
                        "h-[48px] px-7",
                        "text-[14px] font-extrabold leading-none tracking-[-0.01em]",
                        "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        "sm:h-[52px] sm:px-8 sm:text-[15px]",
                        "lg:h-[54px] lg:text-[16px]",
                        isPrimary
                          ? "min-w-[190px] bg-[#009fe3] text-white shadow-[0_18px_35px_-20px_rgba(0,159,227,0.9)] hover:-translate-y-1 hover:bg-[#0092d3] hover:shadow-[0_24px_46px_-24px_rgba(0,159,227,0.95)] sm:min-w-[210px]"
                          : "min-w-[170px] border border-[#d8e3ec] bg-white/85 text-[#31405a] hover:-translate-y-1 hover:border-[#009fe3]/45 hover:text-[#009fe3] hover:shadow-[0_16px_34px_-26px_rgba(15,23,42,0.55)] sm:min-w-[180px]",
                      )}
                    >
                      {action.label}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
