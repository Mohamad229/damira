import { SectionReveal } from "@/components/public/sections/base";
import type { HeroSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface ServicesHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

function renderServicesTitle(title: string) {
  const highlightText = "Distribution Services";
  const index = title.toLowerCase().indexOf(highlightText.toLowerCase());

  if (index === -1) {
    return title;
  }

  const before = title.slice(0, index);
  const highlighted = title.slice(index, index + highlightText.length);
  const after = title.slice(index + highlightText.length);

  return (
    <>
      {before}
      <span className="text-[#009fe3]">{highlighted}</span>
      {after}
    </>
  );
}

export function ServicesHeroSection({
  data,
  className,
}: ServicesHeroSectionProps) {
  const title =
    data.title || "Comprehensive Healthcare Distribution Services";

  const subtitle =
    data.subtitle ||
    "An end-to-end commercialization ecosystem designed to manage the complexities of specialized pharmaceutical supply chains.";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#f8fbff]",
          "min-h-[390px] sm:min-h-[410px] lg:min-h-[430px]",
          className,
        )}
      >
        {/* Base soft background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]" />

        {/* Mobile/tablet soft decoration */}
        <div className="pointer-events-none absolute -right-[90px] top-0 h-[230px] w-[230px] rounded-bl-[72px] rounded-tl-[72px] bg-[#eaf6fd] rtl:-left-[90px] rtl:right-auto rtl:rounded-br-[72px] rtl:rounded-tl-none rtl:rounded-tr-[72px] sm:-right-[70px] sm:h-[280px] sm:w-[280px] rtl:sm:-left-[70px] md:-right-[40px] md:h-[330px] md:w-[330px] rtl:md:-left-[40px] lg:hidden" />

        {/* Desktop rounded block */}
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 hidden h-full bg-[#eaf6fd] rtl:left-0 rtl:right-auto",
            "lg:block lg:w-[30vw] lg:rounded-bl-[76px] rtl:lg:rounded-bl-none rtl:lg:rounded-br-[76px]",
            "xl:w-[33.5vw] xl:rounded-bl-[96px] rtl:xl:rounded-bl-none rtl:xl:rounded-br-[96px]",
          )}
        />

        {/* Subtle accent circle */}
        <div className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-[220px] w-[220px] rounded-full bg-[#daecd4]/45 blur-2xl" />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex w-full items-center",
            "min-h-[390px] sm:min-h-[410px] lg:min-h-[430px]",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
            "py-[70px] sm:py-[78px] lg:py-[82px]",
          )}
        >
          <div
            className={cn(
              "w-full max-w-[780px]",
              "rtl:ms-0 rtl:me-auto rtl:text-right",
            )}
          >
            {data.eyebrow ? (
              <div
                className={cn(
                  "mb-[20px] inline-flex items-center rounded-full",
                  "border border-[#9ed8f8] bg-[#eaf7ff]/90",
                  "h-[28px] px-[12px]",
                  "text-[12px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#009fe3]",
                  "sm:h-[30px] sm:px-[13px] sm:text-[13px]",
                  "lg:mb-[22px]",
                )}
              >
                {data.eyebrow}
              </div>
            ) : null}

            <h1
              className={cn(
                "max-w-[780px]",
                "font-black leading-[0.98] tracking-[-0.055em]",
                "text-[#11182d]",
                "text-[38px]",
                "sm:text-[46px]",
                "md:text-[52px]",
                "lg:text-[56px]",
                "xl:text-[62px]",
              )}
            >
              {renderServicesTitle(title)}
            </h1>

            {subtitle ? (
              <p
                className={cn(
                  "max-w-[700px]",
                  "mt-[24px]",
                  "text-[16px] font-medium leading-[1.6] tracking-[-0.015em]",
                  "text-[#263b59]",
                  "sm:text-[18px]",
                  "md:text-[19px]",
                  "lg:mt-[28px] lg:text-[20px] lg:leading-[1.55]",
                  "xl:mt-[30px] xl:text-[21px]",
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {data.actions?.length ? (
              <div
                className={cn(
                  "mt-[32px] flex w-full flex-col gap-3",
                  "items-start",
                  "sm:mt-[36px] sm:flex-row sm:flex-wrap sm:items-center sm:justify-start",
                  "rtl:items-end rtl:sm:items-center",
                  "lg:mt-[38px]",
                )}
              >
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
                        "transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                        "sm:h-[52px] sm:px-8 sm:text-[15px]",
                        "lg:h-[54px] lg:text-[16px]",
                        isPrimary
                          ? "min-w-[190px] bg-[#009fe3] text-white shadow-[0_18px_35px_-20px_rgba(0,159,227,0.9)] hover:-translate-y-0.5 hover:bg-[#0092d3] sm:min-w-[210px] lg:min-w-[220px]"
                          : "min-w-[170px] border border-[#d8e3ec] bg-white/85 text-[#31405a] hover:-translate-y-0.5 hover:border-[#009fe3]/45 hover:text-[#009fe3] sm:min-w-[180px] lg:min-w-[190px]",
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
