import Image from "next/image";
import {
  Building2,
  FileText,
  ShieldCheck,
  Snowflake,
  Truck,
} from "lucide-react";

import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import { cn } from "@/lib/utils";

interface HomeKeyStrengthsSectionData extends CardGridData {
  items: ServiceCardData[];
  image?: {
    src?: string;
    alt?: string;
  };
  backgroundImage?: {
    src?: string;
    alt?: string;
  };
}

interface HomeKeyStrengthsSectionProps {
  data: HomeKeyStrengthsSectionData;
}

function getFallbackIcon(index: number) {
  const icons = [ShieldCheck, Snowflake, FileText, Truck, Building2];

  return icons[index] || ShieldCheck;
}

export function HomeKeyStrengthsSection({
  data,
}: HomeKeyStrengthsSectionProps) {
  const items = data.items || [];

  const sectionImage =
    data.image?.src ||
    data.backgroundImage?.src ||
    "/images/home/key-strengths-warehouse.jpg";

  const sectionImageAlt =
    data.image?.alt ||
    data.backgroundImage?.alt ||
    "Aerial view of healthcare logistics and pharmaceutical distribution facility";

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
              "grid",
              "gap-[32px] sm:gap-[38px] md:gap-[44px]",
              "lg:grid-cols-[minmax(0,0.96fr)_minmax(390px,0.92fr)] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-[54px] lg:gap-y-0",
              "xl:grid-cols-[minmax(0,1.03fr)_minmax(420px,0.92fr)] xl:gap-x-[64px]",
            )}
          >
            {/* Header content - first on small screens, right column on large screens */}
            <div className="order-1 lg:col-start-2 lg:row-start-1 rtl:lg:col-start-1 rtl:text-right">
              {/* Header meta */}
              <div className="mb-[16px] flex items-center gap-[15px] xl:mb-[18px] xl:gap-[17px]">
                <span className="text-[13px] font-extrabold leading-none tracking-[0.03em] text-[#009fe3] sm:text-[14px]">
                  02
                </span>

                <span className="h-px w-[44px] bg-[#c8d9e8] xl:w-[48px]" />

                <span className="text-[12px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#65748d] sm:text-[14px]">
                  Operational Excellence
                </span>
              </div>

              <h2
                className={cn(
                  "font-black leading-[1.12] tracking-[-0.04em] text-[#11182d]",
                  "text-[32px] sm:text-[36px] lg:text-[37px] xl:text-[38px]",
                )}
              >
                {data.title || "Key Strengths"}
              </h2>

              {data.description ? (
                <p
                  className={cn(
                    "mt-4 max-w-[640px]",
                    "text-[15px] font-medium leading-7 tracking-[-0.01em] text-[#52627a]",
                    "sm:text-[16px]",
                  )}
                >
                  {data.description}
                </p>
              ) : null}
            </div>

            {/* Image - under title on small screens, left side on large screens */}
            <div className="order-2 lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center rtl:lg:col-start-2">
              <div className="relative">
                <div
                  className={cn(
                    "relative overflow-hidden bg-[#eef6fb]",
                    "rounded-[18px] sm:rounded-[20px]",
                    "h-[250px] sm:h-[360px] md:h-[430px]",
                    "lg:h-[520px] xl:h-[600px]",
                    "shadow-[0_28px_55px_-38px_rgba(15,23,42,0.65)]",
                  )}
                >
                  <Image
                    src={sectionImage}
                    alt={sectionImageAlt}
                    fill
                    sizes="(min-width: 1536px) 42vw, (min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Soft blue offset shadow under image */}
                <div
                  className={cn(
                    "pointer-events-none absolute -z-10 rounded-[24px] bg-[#d7f0fb]",
                    "-bottom-[12px] right-[-10px] h-[42px] w-[68%] rtl:left-[-10px] rtl:right-auto",
                    "sm:-bottom-[16px] sm:right-[-14px] sm:h-[54px] rtl:sm:left-[-14px] rtl:sm:right-auto",
                    "xl:-bottom-[18px] xl:right-[-16px] xl:h-[64px] xl:w-[72%] rtl:xl:left-[-16px] rtl:xl:right-auto",
                  )}
                />
              </div>
            </div>

            {/* Strength list - under image on small screens, right column on large screens */}
            <div
              className={cn(
                "order-3",
                "lg:col-start-2 lg:row-start-2",
                "lg:pt-[30px] xl:pt-[33px]",
                "rtl:lg:col-start-1 rtl:text-right",
              )}
            >
              <div
                className={cn(
                  "space-y-[24px]",
                  "sm:space-y-[26px]",
                  "xl:space-y-[27px]",
                )}
              >
                {items.map((item, index) => {
                  const Icon =
                    typeof item.icon === "function"
                      ? item.icon
                      : getFallbackIcon(index);

                  return (
                    <article
                      key={item.id || `${item.title}-${index}`}
                      className={cn(
                        "grid items-start",
                        "grid-cols-[38px_1fr] gap-[14px]",
                        "sm:grid-cols-[40px_1fr] sm:gap-[16px]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex shrink-0 items-center justify-center rounded-full",
                          "border border-[#e4edf6] bg-[#f8fbff] text-[#8ca4c2]",
                          "h-[38px] w-[38px]",
                          "sm:h-[40px] sm:w-[40px]",
                        )}
                      >
                        {isSectionMediaIcon(item.icon) ? (
                          <SectionIconImage
                            icon={item.icon}
                            width={20}
                            height={20}
                            className="h-[17px] w-[17px] object-contain sm:h-[18px] sm:w-[18px]"
                          />
                        ) : (
                          <Icon className="h-[17px] w-[17px] stroke-[2.1] sm:h-[18px] sm:w-[18px]" />
                        )}
                      </div>

                      <div className="pt-[1px]">
                        <h3
                          className={cn(
                            "font-black leading-[1.2] tracking-[-0.02em] text-[#11182d]",
                            "text-[17px] sm:text-[18px]",
                          )}
                        >
                          {item.title}
                        </h3>

                        {item.description ? (
                          <p
                            className={cn(
                              "mt-[7px] max-w-[670px]",
                              "text-[15px] font-medium leading-[1.5] tracking-[-0.006em] text-[#475672]",
                              "sm:mt-[8px] sm:text-[16px] sm:leading-[1.48]",
                            )}
                          >
                            {item.description}
                          </p>
                        ) : null}

                        {item.features?.length ? (
                          <ul className="mt-3 space-y-2 text-[14px] font-medium leading-6 tracking-[-0.01em] text-[#52627a]">
                            {item.features.slice(0, 3).map((feature) => (
                              <li key={feature} className="flex gap-2">
                                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#009fe3]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
