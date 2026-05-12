"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/public/sections/base";
import type { StatsSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface HomeStatsSectionProps {
  data: StatsSectionData;
}

function renderStatValue(value: string) {
  const normalizedValue = String(value);

  if (normalizedValue.includes("m²") || normalizedValue.includes("m2")) {
    const number = normalizedValue.replace("m²", "").replace("m2", "").trim();

    return (
      <>
        {number}{" "}
        <span className="align-super text-[18px] font-extrabold leading-none tracking-[-0.02em] text-[#8da0bd] sm:text-[19px]">
          m²
        </span>
      </>
    );
  }

  return normalizedValue;
}

function getVisibleStatsCount() {
  if (typeof window === "undefined") return 4;

  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;

  return 1;
}

export function HomeStatsSection({ data }: HomeStatsSectionProps) {
  const items = data.items || [];
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleStatsCount, setVisibleStatsCount] = useState(4);

  useEffect(() => {
    function handleResize() {
      const nextVisibleStatsCount = getVisibleStatsCount();

      setVisibleStatsCount(nextVisibleStatsCount);

      setActiveIndex((currentIndex) =>
        Math.min(
          currentIndex,
          Math.max(0, items.length - nextVisibleStatsCount),
        ),
      );
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const maxStartIndex = Math.max(0, items.length - visibleStatsCount);
  const hasMultipleSlides = items.length > visibleStatsCount;

  const visibleStatsLabel = useMemo(() => {
    if (!items.length) return "00 / 00";

    return `${String(activeIndex + 1).padStart(2, "0")} / ${String(
      items.length,
    ).padStart(2, "0")}`;
  }, [activeIndex, items.length]);

  function scrollToStat(index: number) {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const safeIndex = Math.max(0, Math.min(index, maxStartIndex));
    const item = carousel.children[safeIndex] as HTMLElement | undefined;

    if (!item) return;

    carousel.scrollTo({
      left: item.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  }

  function goToPreviousStat() {
    if (!hasMultipleSlides) return;

    const nextIndex = activeIndex === 0 ? maxStartIndex : activeIndex - 1;

    scrollToStat(nextIndex);
  }

  function goToNextStat() {
    if (!hasMultipleSlides) return;

    const nextIndex = activeIndex >= maxStartIndex ? 0 : activeIndex + 1;

    scrollToStat(nextIndex);
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
      <section className="relative overflow-hidden bg-white py-[42px] sm:py-[46px] lg:py-[50px]">
        {/* Top divider */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#eef3f8]" />

        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          {/* Title */}
          {data.title ? (
            <div className="mb-[36px] text-center sm:mb-[40px] lg:mb-[42px]">
              <h2 className="text-[13px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#009fe3] sm:text-[14px]">
                {data.title}
              </h2>

              {data.description ? (
                <p className="mx-auto mt-4 max-w-2xl text-[14px] font-medium leading-7 tracking-[-0.01em] text-[#64748b] sm:text-[15px]">
                  {data.description}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Carousel viewport */}
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className={cn(
                "flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
                "gap-[18px] md:gap-[22px] xl:gap-[24px]",
                "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {items.map((item, index) => (
                <article
                  key={item.id || index}
                  className={cn(
                    "relative flex shrink-0 snap-start flex-col items-center justify-start text-center",
                    "w-full",
                    "md:w-[calc((100%-22px)/2)]",
                    "lg:w-[calc((100%-44px)/3)]",
                    "xl:w-[calc((100%-72px)/4)]",
                    "min-h-[82px]",
                    "px-4",
                  )}
                >
                  {/* Vertical divider only between visible desktop stats */}
                  {index > 0 ? (
                    <div className="absolute left-0 top-0 hidden h-[68px] w-px bg-[#edf2f7] rtl:left-auto rtl:right-0 xl:block" />
                  ) : null}

                  <p className="text-[34px] font-black leading-none tracking-[-0.045em] text-[#11182d] sm:text-[38px] lg:text-[40px]">
                    {renderStatValue(item.value)}
                  </p>

                  <h3 className="mt-[12px] text-[14px] font-bold leading-none tracking-[-0.01em] text-[#64748b]">
                    {item.label}
                  </h3>

                  {item.description ? (
                    <p className="mt-2 max-w-[210px] text-[13px] font-medium leading-5 tracking-[-0.01em] text-[#7c8da6]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          {/* Bottom controls only if admin adds extra stats */}
          {items.length > 1 ? (
            <div className="mt-[26px] flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                {hasMultipleSlides ? (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goToPreviousStat}
                      aria-label="Previous stat"
                      className={cn(
                        "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                        "border border-[#c8d9e8] bg-white text-[#11182d]",
                        "shadow-[0_12px_26px_-22px_rgba(15,23,42,0.55)]",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#009fe3] hover:text-[#009fe3]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                      )}
                    >
                      <ArrowLeft className="h-[17px] w-[17px] stroke-[2.4]" />
                    </button>

                    <button
                      type="button"
                      onClick={goToNextStat}
                      aria-label="Next stat"
                      className={cn(
                        "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                        "border border-[#c8d9e8] bg-white text-[#11182d]",
                        "shadow-[0_12px_26px_-22px_rgba(15,23,42,0.55)]",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#009fe3] hover:text-[#009fe3]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                      )}
                    >
                      <ArrowRight className="h-[17px] w-[17px] stroke-[2.4]" />
                    </button>
                  </div>
                ) : null}

                {hasMultipleSlides ? (
                  <>
                    <div className="flex items-center gap-[8px]">
                      {items.map((item, index) => {
                        const isDisabledDot = index > maxStartIndex;
                        const isActive = index === activeIndex;

                        return (
                          <button
                            key={item.id || `${item.label}-dot-${index}`}
                            type="button"
                            onClick={() => scrollToStat(index)}
                            disabled={isDisabledDot}
                            aria-label={`Show stat ${index + 1}`}
                            className={cn(
                              "h-[8px] rounded-full transition-all duration-300",
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
                      {visibleStatsLabel}
                    </span>
                  </>
                ) : null}
              </div>

              {hasMultipleSlides ? (
                <p className="text-[12px] font-semibold leading-none tracking-[-0.01em] text-[#64748b] sm:text-[13px]">
                  Swipe or use arrows to explore all stats
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </SectionReveal>
  );
}
