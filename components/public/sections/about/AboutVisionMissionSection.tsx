import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface VisionMissionBlock {
  title: string;
  description: string;
}

interface AboutVisionMissionSectionProps {
  data: {
    title: string;
    description?: string;
    vision: VisionMissionBlock;
    mission: VisionMissionBlock;
  };
}

export function AboutVisionMissionSection({
  data,
}: AboutVisionMissionSectionProps) {
  const blocks = [data.vision, data.mission];

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-[#f8fbff]",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
        {/* Soft center divider */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#91caee]/70 to-transparent md:block" />

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
          {/* Section header */}
          {(data.title || data.description) ? (
            <div
              className={cn(
                "mx-auto text-center",
                "mb-[42px] max-w-[760px]",
                "sm:mb-[50px]",
                "lg:mb-[56px]",
                "xl:mb-[58px] xl:max-w-[820px]",
              )}
            >
              {data.title ? (
                <h2
                  className={cn(
                    "font-black leading-[1.12] tracking-[-0.04em] text-[#11182d]",
                    "text-[32px]",
                    "sm:text-[38px]",
                    "lg:text-[42px]",
                    "xl:text-[46px]",
                  )}
                >
                  {data.title}
                </h2>
              ) : null}

              {data.description ? (
                <p
                  className={cn(
                    "mx-auto mt-[16px] max-w-[680px]",
                    "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#52627a]",
                    "sm:text-[16px]",
                    "lg:text-[17px]",
                    "xl:mt-[18px]",
                  )}
                >
                  {data.description}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Cards */}
          <div
            className={cn(
              "grid",
              "gap-[28px]",
              "md:gap-[32px]",
              "lg:grid-cols-2 lg:gap-[36px]",
              "xl:gap-[48px]",
            )}
          >
            {blocks.map((block, index) => {
              const isMission = index === 1;

              return (
                <article
                  key={block.title}
                  className={cn(
                    "group relative overflow-hidden",
                    "border border-[#dfeaf6]",
                    isMission
                      ? "bg-[#009fe3] text-white"
                      : "bg-white text-[#11182d]",
                    "min-h-[280px]",
                    "rounded-[44px]",
                    "px-[28px] py-[34px]",
                    "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.55)]",
                    "transition-all duration-300 hover:-translate-y-1",
                    "sm:min-h-[300px] sm:rounded-[56px] sm:px-[36px] sm:py-[40px]",
                    "md:min-h-[315px] md:rounded-[72px] md:px-[42px] md:py-[44px]",
                    "lg:min-h-[330px] lg:rounded-[82px] lg:px-[42px] lg:py-[46px]",
                    "xl:rounded-[96px] xl:px-[56px] xl:py-[48px]",
                  )}
                >
                  {/* Large subtle number */}
                  <span
                    className={cn(
                      "pointer-events-none absolute font-black leading-none",
                      "-right-5 -top-7 text-[86px] rtl:-left-5 rtl:right-auto",
                      "sm:-right-6 sm:-top-8 sm:text-[100px] rtl:sm:-left-6 rtl:sm:right-auto",
                      "lg:-right-8 lg:-top-10 lg:text-[120px] rtl:lg:-left-8 rtl:lg:right-auto",
                      isMission ? "text-white/10" : "text-[#eaf7ff]",
                    )}
                  >
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    {/* Icon placeholder */}
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        "mb-[26px] h-[50px] w-[50px] rounded-[15px]",
                        "sm:mb-[30px] sm:h-[54px] sm:w-[54px] sm:rounded-[16px]",
                        "xl:mb-[36px] xl:h-[56px] xl:w-[56px]",
                        isMission
                          ? "bg-white/18 text-white"
                          : "bg-[#e2f4ff] text-[#009fe3]",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full border",
                          "h-[24px] w-[24px]",
                          "sm:h-[26px] sm:w-[26px]",
                          "xl:h-[28px] xl:w-[28px]",
                          isMission
                            ? "border-white/80"
                            : "border-[#009fe3]/70",
                        )}
                      />
                    </div>

                    <h3
                      className={cn(
                        "font-black leading-[1.15] tracking-[-0.035em]",
                        "text-[24px]",
                        "sm:text-[25px]",
                        "xl:text-[26px]",
                        isMission ? "text-white" : "text-[#11182d]",
                      )}
                    >
                      {block.title}
                    </h3>

                    <p
                      className={cn(
                        "max-w-[610px] font-medium tracking-[-0.018em]",
                        "mt-[18px] text-[17px] leading-[1.55]",
                        "sm:mt-[20px] sm:text-[19px] sm:leading-[1.52]",
                        "lg:text-[20px]",
                        "xl:mt-[22px] xl:text-[21px] xl:leading-[1.5]",
                        isMission ? "text-white/95" : "text-[#33445f]",
                      )}
                    >
                      {block.description}
                    </p>

                    <div
                      className={cn(
                        "rounded-full transition-all duration-500 group-hover:w-[130px]",
                        "mt-[28px] h-[4px] w-[56px]",
                        "sm:mt-[30px] sm:w-[60px]",
                        "xl:mt-[34px] xl:w-[64px]",
                        isMission ? "bg-white/75" : "bg-[#f58238]",
                      )}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
