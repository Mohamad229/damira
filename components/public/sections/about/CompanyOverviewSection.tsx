import Image from "next/image";

import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface CompanyOverviewSectionProps {
  data: ContentSectionData;
}

function getImage(
  data: ContentSectionData,
  index: number,
  fallbackSrc: string,
  fallbackAlt: string,
) {
  const image = data.images?.[index];

  return {
    src: image?.src || fallbackSrc,
    alt: image?.alt || fallbackAlt,
  };
}

export function CompanyOverviewSection({ data }: CompanyOverviewSectionProps) {
  const firstImage = getImage(
    data,
    0,
    "/images/about/company-lab.jpg",
    "Healthcare laboratory operations",
  );

  const secondImage = getImage(
    data,
    1,
    "/images/about/company-facility.jpg",
    "Healthcare distribution facility",
  );

  const thirdImage = getImage(
    data,
    2,
    "/images/about/company-medical.jpg",
    "Medical healthcare equipment",
  );

  const title =
    data.title || "A New Healthcare Platform with Deep Operational Roots";

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
              "grid items-center",
              "gap-[48px] md:gap-[58px]",
              "lg:grid-cols-[0.92fr_1fr] lg:gap-[56px]",
              "xl:grid-cols-[0.9fr_1fr] xl:gap-[72px]",
            )}
          >
            {/* Left content */}
            <div className="max-w-[710px]">
              {data.eyebrow ? (
                <p
                  className={cn(
                    "mb-[15px] text-[12px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#009fe3]",
                    "sm:text-[13px]",
                    "xl:mb-[17px] xl:text-[14px]",
                  )}
                >
                  {data.eyebrow}
                </p>
              ) : null}

              <h2
                className={cn(
                  "font-black leading-[1.1] tracking-[-0.045em] text-[#071329]",
                  "text-[30px]",
                  "sm:text-[34px]",
                  "md:text-[36px]",
                  "xl:text-[38px]",
                )}
              >
                {title}
              </h2>

              {data.subtitle ? (
                <p
                  className={cn(
                    "mt-[22px] max-w-[690px]",
                    "text-[16px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                    "sm:text-[17px]",
                    "md:text-[18px]",
                    "xl:mt-[27px] xl:text-[19px] xl:leading-[1.55]",
                  )}
                >
                  {data.subtitle}
                </p>
              ) : null}

              {data.body?.length ? (
                <div
                  className={cn(
                    "mt-[22px] max-w-[690px] space-y-[20px]",
                    "text-[16px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                    "sm:text-[17px]",
                    "md:text-[18px] md:space-y-[22px]",
                    "xl:mt-[27px] xl:space-y-[25px] xl:text-[19px] xl:leading-[1.55]",
                  )}
                >
                  {data.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {data.bullets?.length ? (
                <ul
                  className={cn(
                    "mt-[28px] grid gap-3",
                    "sm:grid-cols-2",
                    "xl:mt-[31px]",
                  )}
                >
                  {data.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "rounded-[14px] bg-[#f3faff]",
                        "px-4 py-3",
                        "text-[13px] font-bold leading-5 tracking-[-0.01em] text-[#263b59]",
                        "sm:text-[14px]",
                        "xl:rounded-[16px]",
                      )}
                    >
                      <span className="me-2 inline-block h-2 w-2 rounded-full bg-[#4cb748]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Right image collage */}
            <div
              className={cn(
                "grid grid-cols-2",
                "gap-[12px] sm:gap-[14px] xl:gap-[16px]",
                "min-h-[360px]",
                "sm:min-h-[460px]",
                "md:min-h-[500px]",
                "lg:min-h-[470px]",
                "xl:min-h-[512px]",
              )}
            >
              {/* Left stack */}
              <div className="flex flex-col gap-[12px] sm:gap-[14px] xl:gap-[16px]">
                <div
                  className={cn(
                    "relative overflow-hidden bg-[#eef6fb]",
                    "h-[145px] rounded-[12px]",
                    "sm:h-[178px] sm:rounded-[14px]",
                    "md:h-[195px]",
                    "lg:h-[178px]",
                    "xl:h-[192px]",
                    "shadow-[0_20px_35px_-30px_rgba(15,23,42,0.65)]",
                  )}
                >
                  <Image
                    src={firstImage.src}
                    alt={firstImage.alt}
                    fill
                    sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={cn(
                    "relative overflow-hidden bg-[#eef6fb]",
                    "h-[194px] rounded-[12px]",
                    "sm:h-[250px] sm:rounded-[14px]",
                    "md:h-[270px]",
                    "lg:h-[238px]",
                    "xl:h-[257px]",
                    "shadow-[0_20px_35px_-30px_rgba(15,23,42,0.65)]",
                  )}
                >
                  <Image
                    src={secondImage.src}
                    alt={secondImage.alt}
                    fill
                    sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right stack */}
              <div
                className={cn(
                  "flex flex-col gap-[12px] sm:gap-[14px] xl:gap-[16px]",
                  "pt-[34px]",
                  "sm:pt-[44px]",
                  "md:pt-[48px]",
                  "lg:pt-[42px]",
                  "xl:pt-[49px]",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-[#eef6fb]",
                    "h-[194px] rounded-[12px]",
                    "sm:h-[250px] sm:rounded-[14px]",
                    "md:h-[270px]",
                    "lg:h-[238px]",
                    "xl:h-[257px]",
                    "shadow-[0_20px_35px_-30px_rgba(15,23,42,0.65)]",
                  )}
                >
                  <Image
                    src={thirdImage.src}
                    alt={thirdImage.alt}
                    fill
                    sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Optional badge/card if you want to enable it later */}
                {/* 
                <div
                  className={cn(
                    "flex flex-col justify-center rounded-[12px] bg-[#009fe3]",
                    "h-[145px] px-[18px]",
                    "sm:h-[178px] sm:rounded-[14px] sm:px-[22px]",
                    "md:h-[195px]",
                    "lg:h-[178px]",
                    "xl:h-[193px] xl:px-[24px]",
                    "shadow-[0_20px_35px_-30px_rgba(15,23,42,0.8)]",
                  )}
                >
                  <p className="text-[28px] font-black leading-none tracking-[-0.04em] text-white sm:text-[32px] xl:text-[37px]">
                    ISO &amp; FDA
                  </p>

                  <p className="mt-[12px] text-[13px] font-extrabold leading-none tracking-[-0.01em] text-white/90 sm:text-[15px] xl:mt-[17px] xl:text-[16px]">
                    Certified Operations
                  </p>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}