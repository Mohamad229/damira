"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  UsersRound,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";

interface HomeStrategicFocusSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface HomeStrategicFocusSectionProps {
  data: HomeStrategicFocusSectionData;
}

function getFallbackIcon(index: number) {
  if (index === 2) {
    return UsersRound;
  }

  return Activity;
}

function getVisibleCardsCount() {
  if (typeof window === "undefined") return 4;

  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;

  return 1;
}

export function HomeStrategicFocusSection({
  data,
}: HomeStrategicFocusSectionProps) {
  const items = data.items || [];
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);

  useEffect(() => {
    function handleResize() {
      const nextVisibleCardsCount = getVisibleCardsCount();

      setVisibleCardsCount(nextVisibleCardsCount);

      setActiveIndex((currentIndex) =>
        Math.min(
          currentIndex,
          Math.max(0, items.length - nextVisibleCardsCount),
        ),
      );
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const maxStartIndex = Math.max(0, items.length - visibleCardsCount);
  const hasMultipleSlides = items.length > visibleCardsCount;

  const visibleCardsLabel = useMemo(() => {
    if (!items.length) return "00 / 00";

    return `${String(activeIndex + 1).padStart(2, "0")} / ${String(
      items.length,
    ).padStart(2, "0")}`;
  }, [activeIndex, items.length]);

  function scrollToCard(index: number) {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const safeIndex = Math.max(0, Math.min(index, maxStartIndex));
    const card = carousel.children[safeIndex] as HTMLElement | undefined;

    if (!card) return;

    carousel.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  }

  function goToPreviousCard() {
    if (!hasMultipleSlides) return;

    const nextIndex = activeIndex === 0 ? maxStartIndex : activeIndex - 1;

    scrollToCard(nextIndex);
  }

  function goToNextCard() {
    if (!hasMultipleSlides) return;

    const nextIndex = activeIndex >= maxStartIndex ? 0 : activeIndex + 1;

    scrollToCard(nextIndex);
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const cards = Array.from(carousel.children) as HTMLElement[];

    if (!cards.length) return;

    const currentScrollLeft = carousel.scrollLeft;

    const nearestIndex = cards.reduce((nearest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - currentScrollLeft);
      const nearestDistance = Math.abs(
        cards[nearest].offsetLeft - currentScrollLeft,
      );

      return currentDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveIndex(Math.min(nearestIndex, maxStartIndex));
  }

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]">
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
          <div className="mb-[42px] flex flex-col gap-7 md:mb-[48px] lg:mb-[56px] lg:flex-row lg:items-end lg:justify-between xl:mb-[64px]">
            <div className="max-w-[720px]">
              <div className="mb-[16px] flex items-center gap-[15px] md:mb-[18px]">
                <span className="text-[13px] font-extrabold leading-none tracking-[0.03em] text-[#009fe3] md:text-[14px]">
                  01
                </span>

                <span className="h-px w-[44px] bg-[#c8d9e8] md:w-[48px]" />

                <span className="text-[12px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#65748d] md:text-[14px]">
                  Therapeutic Focus
                </span>
              </div>

              <h2 className="text-[31px] font-black leading-[1.12] tracking-[-0.04em] text-[#11182d] sm:text-[34px] md:text-[36px]">
                {data.title || "Strategic Focus Areas"}
              </h2>

              {data.description ? (
                <p className="mt-4 max-w-[620px] text-[15px] font-medium leading-7 tracking-[-0.01em] text-[#52627a] md:text-[16px]">
                  {data.description}
                </p>
              ) : null}
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-4 text-[14px] font-semibold leading-none tracking-[-0.01em] text-[#009fe3] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#008ccc] md:gap-5 md:text-[15px]"
            >
              <span>View full portfolio</span>
              <ArrowRight className="h-4 w-4 stroke-[2.4] transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Carousel viewport */}
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className={cn(
                "flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-[10px]",
                "gap-[18px] md:gap-[22px] xl:gap-[24px]",
                "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {items.map((item, index) => {
                const Icon = typeof item.icon === "function" ? item.icon : getFallbackIcon(index);

                return (
                  <article
                    key={item.id || `${item.title}-${index}`}
                    className={cn(
                      "group relative flex shrink-0 snap-start flex-col overflow-hidden bg-white",
                      "w-full",
                      "md:w-[calc((100%-22px)/2)]",
                      "lg:w-[calc((100%-44px)/3)]",
                      "xl:w-[calc((100%-72px)/4)]",
                      "min-h-[230px] md:min-h-[238px] xl:min-h-[254px]",
                      "rounded-[34px] md:rounded-[38px] xl:rounded-[40px]",
                      "px-[24px] py-[28px]",
                      "md:px-[26px] md:py-[30px]",
                      "xl:px-[31px] xl:pb-[34px] xl:pt-[32px]",
                      "shadow-[0_22px_46px_-38px_rgba(15,23,42,0.55)]",
                      "transition-all duration-300 ease-out",
                      "hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_28px_60px_-36px_rgba(15,23,42,0.68)]",
                    )}
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-[22px] flex h-[44px] w-[44px] items-center justify-center rounded-[13px] bg-[#e2f4ff] text-[#009fe3] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d7f0fb] md:mb-[24px] md:h-[46px] md:w-[46px] xl:mb-[27px] xl:h-[48px] xl:w-[48px]">
                        {isSectionMediaIcon(item.icon) ? (
                          <SectionIconImage
                            icon={item.icon}
                            width={24}
                            height={24}
                            className="h-[22px] w-[22px] object-contain xl:h-[24px] xl:w-[24px]"
                          />
                        ) : (
                          <Icon className="h-[22px] w-[22px] stroke-[2.3] xl:h-[24px] xl:w-[24px]" />
                        )}
                      </div>

                      <h3 className="text-[18px] font-black leading-[1.25] tracking-[-0.018em] text-[#11182d] transition-colors duration-300 group-hover:text-[#009fe3] md:text-[19px] xl:text-[20px]">
                        {item.title}
                      </h3>

                      {item.description ? (
                        <p className="mt-[13px] max-w-[280px] text-[14px] font-medium leading-[1.55] tracking-[-0.005em] text-[#4b5b73] md:text-[14.5px] xl:mt-[15px] xl:text-[15px] xl:leading-[1.6]">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Bottom carousel controls */}
          <div className="mt-[28px] flex flex-col gap-5 md:flex-row md:items-center md:justify-between xl:mt-[30px]">
            <div className="flex flex-wrap items-center gap-4">
              {hasMultipleSlides ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPreviousCard}
                    aria-label="Previous focus area"
                    className={cn(
                      "flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[42px] md:w-[42px]",
                      "border border-[#c8d9e8] bg-white text-[#11182d]",
                      "shadow-[0_12px_26px_-22px_rgba(15,23,42,0.55)]",
                      "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:border-[#009fe3] hover:text-[#009fe3]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                    )}
                  >
                    <ArrowLeft className="h-[17px] w-[17px] stroke-[2.4] md:h-[18px] md:w-[18px]" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextCard}
                    aria-label="Next focus area"
                    className={cn(
                      "flex h-[40px] w-[40px] items-center justify-center rounded-full md:h-[42px] md:w-[42px]",
                      "border border-[#c8d9e8] bg-white text-[#11182d]",
                      "shadow-[0_12px_26px_-22px_rgba(15,23,42,0.55)]",
                      "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:border-[#009fe3] hover:text-[#009fe3]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                    )}
                  >
                    <ArrowRight className="h-[17px] w-[17px] stroke-[2.4] md:h-[18px] md:w-[18px]" />
                  </button>
                </div>
              ) : null}

              {items.length > 1 ? (
                <>
                  <div className="flex items-center gap-[8px]">
                    {items.map((item, index) => {
                      const isDisabledDot = index > maxStartIndex;
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={item.id || `${item.title}-dot-${index}`}
                          type="button"
                          onClick={() => scrollToCard(index)}
                          disabled={isDisabledDot}
                          aria-label={`Show focus area ${index + 1}`}
                          className={cn(
                            "h-[8px] rounded-full transition-all duration-300 hover:scale-110",
                            isActive
                              ? "w-[30px] bg-[#009fe3]"
                              : "w-[8px] bg-[#c8d9e8] hover:bg-[#91caee]",
                            isDisabledDot && "cursor-not-allowed opacity-35",
                          )}
                        />
                      );
                    })}
                  </div>

                  <span className="text-[13px] font-extrabold leading-none tracking-[-0.01em] text-[#64748b]">
                    {visibleCardsLabel}
                  </span>
                </>
              ) : null}
            </div>

            {hasMultipleSlides ? (
              <p className="text-[12px] font-semibold leading-none tracking-[-0.01em] text-[#64748b] md:text-[13px]">
                Swipe or use arrows to explore all focus areas
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
