import {
  HeartHandshake,
  Microscope,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface CoreValuesSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface CoreValuesSectionProps {
  data: CoreValuesSectionData;
}

function getFallbackIcon(index: number) {
  const icons = [
    ShieldCheck,
    Microscope,
    HeartHandshake,
    UsersRound,
    ShieldCheck,
  ];

  return icons[index % icons.length] || ShieldCheck;
}

function getCardPlacementClass(index: number, total: number) {
  /*
    Desktop layout uses 12 columns.
    Normal card = 4 columns, so each row has 3 cards.

    Balanced examples:
    1 card  => centered
    2 cards => centered
    4 cards => 3 + 1 centered
    5 cards => 3 + 2 centered
    7 cards => 3 + 3 + 1 centered
    8 cards => 3 + 3 + 2 centered
  */

  if (total === 1) {
    return cn(
      "md:col-span-2 md:mx-auto md:w-full md:max-w-[430px]",
      "xl:col-span-4 xl:col-start-5 xl:mx-0 xl:max-w-none",
    );
  }

  if (total === 2) {
    return cn(
      "md:col-span-1",
      index === 0 && "xl:col-span-4 xl:col-start-3",
      index === 1 && "xl:col-span-4 xl:col-start-7",
    );
  }

  const remainder = total % 3;
  const lastRowStartIndex = total - remainder;

  const isTabletOddLast = total % 2 === 1 && index === total - 1;

  const tabletClass = isTabletOddLast
    ? "md:col-span-2 md:mx-auto md:w-[calc((100%_-_24px)/2)] xl:mx-0 xl:w-full"
    : "md:col-span-1";

  if (remainder === 1 && index === lastRowStartIndex) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-5");
  }

  if (remainder === 2 && index === lastRowStartIndex) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-3");
  }

  if (remainder === 2 && index === lastRowStartIndex + 1) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-7");
  }

  return cn(tabletClass, "xl:col-span-4");
}

export function CoreValuesSection({ data }: CoreValuesSectionProps) {
  const items = data.items || [];

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
          {/* Header */}
          <div
            className={cn(
              "mx-auto text-center",
              "mb-[42px] max-w-[760px]",
              "sm:mb-[50px]",
              "lg:mb-[58px]",
              "xl:mb-[66px] xl:max-w-[860px]",
            )}
          >
            <h2
              className={cn(
                "font-black leading-[1.12] tracking-[-0.04em] text-[#071329]",
                "text-[32px]",
                "sm:text-[36px]",
                "xl:text-[38px]",
              )}
            >
              {data.title || "Our Core Values"}
            </h2>

            {data.description ? (
              <p
                className={cn(
                  "mx-auto mt-[18px] max-w-[760px]",
                  "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                  "sm:text-[16px]",
                  "lg:text-[17px]",
                  "xl:mt-[22px] xl:text-[18px] xl:leading-[1.55]",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Balanced responsive grid */}
          <div
            className={cn(
              "mx-auto grid",
              "grid-cols-1",
              "gap-[20px]",
              "sm:gap-[24px]",
              "md:grid-cols-2",
              "lg:gap-[28px]",
              "xl:grid-cols-12 xl:gap-[32px]",
            )}
          >
            {items.map((item, index) => {
              const Icon = typeof item.icon === "function" ? item.icon : getFallbackIcon(index);

              return (
                <article
                  key={item.id || `${item.title}-${index}`}
                  className={cn(
                    getCardPlacementClass(index, items.length),
                    "group relative overflow-hidden",
                    "rounded-[18px] sm:rounded-[20px]",
                    "border border-[#e8eef6] bg-[#f8fbff]",
                    "min-h-[220px]",
                    "px-[24px] py-[26px]",
                    "sm:min-h-[232px] sm:px-[28px] sm:py-[30px]",
                    "xl:min-h-[246px] xl:px-[32px] xl:pb-[32px] xl:pt-[31px]",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:border-[#dce8f4] hover:bg-white",
                    "hover:shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)]",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-[22px] flex items-center justify-center rounded-full",
                      "border border-[#edf2f7] bg-white text-[#009fe3]",
                      "h-[42px] w-[42px]",
                      "sm:mb-[24px] sm:h-[44px] sm:w-[44px]",
                      "xl:mb-[27px] xl:h-[46px] xl:w-[46px]",
                      "shadow-[0_8px_18px_-16px_rgba(15,23,42,0.65)]",
                      "transition-all duration-300 group-hover:border-[#9ed8f8]",
                    )}
                  >
                    {isSectionMediaIcon(item.icon) ? (
                      <SectionIconImage
                        icon={item.icon}
                        width={22}
                        height={22}
                        className="h-[19px] w-[19px] object-contain sm:h-[20px] sm:w-[20px] xl:h-[21px] xl:w-[21px]"
                      />
                    ) : (
                      <Icon className="h-[19px] w-[19px] stroke-[2.25] sm:h-[20px] sm:w-[20px] xl:h-[21px] xl:w-[21px]" />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-black leading-[1.2] tracking-[-0.025em] text-[#071329]",
                      "text-[18px]",
                      "sm:text-[19px]",
                      "xl:text-[20px]",
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description ? (
                    <p
                      className={cn(
                        "mt-[13px] max-w-[390px]",
                        "text-[14px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                        "sm:mt-[15px] sm:text-[15px]",
                        "xl:mt-[16px] xl:text-[16px] xl:leading-[1.55]",
                      )}
                    >
                      {item.description}
                    </p>
                  ) : null}

                  {item.features?.length ? (
                    <ul className="mt-4 space-y-2 text-[14px] font-medium leading-6 tracking-[-0.01em] text-[#52627a]">
                      {item.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#009fe3]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
