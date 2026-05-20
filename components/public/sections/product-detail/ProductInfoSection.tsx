"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface ProductInfoSectionProps {
  data: ContentSectionData;
}

type ProductImage = {
  src: string;
  alt?: string;
};

function getProductImages(data: ContentSectionData): ProductImage[] {
  const possibleImages = [
    ...(data.images || []),
    data.image,
  ].filter(Boolean) as ProductImage[];

  const uniqueImages = new Map<string, ProductImage>();

  possibleImages.forEach((image) => {
    if (image?.src && !uniqueImages.has(image.src)) {
      uniqueImages.set(image.src, {
        src: image.src,
        alt: image.alt || data.title || "Product image",
      });
    }
  });

  return Array.from(uniqueImages.values());
}

export function ProductInfoSection({ data }: ProductInfoSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const images = useMemo(() => getProductImages(data), [data]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeImage = images[activeImageIndex];
  const hasMultipleImages = images.length > 1;

  function goToPreviousImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }

  function goToNextImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  }

  const handleLeftControl = isRtl ? goToNextImage : goToPreviousImage;
  const handleRightControl = isRtl ? goToPreviousImage : goToNextImage;

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/product-info relative overflow-hidden bg-[#f8fbff]",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
        <div
          className={cn(
            "relative z-10 grid w-full items-center pt-16",
            "max-w-full overflow-hidden",
            "gap-[42px] md:gap-[50px]",
            "px-4 sm:px-6 md:px-8",
            "lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] lg:gap-[56px]",
            "lg:px-[80px]",
            "xl:gap-[64px] xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          {/* Product image carousel */}
          <div className="order-2 min-w-0 max-w-full space-y-[14px] overflow-hidden sm:space-y-[16px] xl:space-y-[18px]">
            <div
              className={cn(
                "group relative w-full max-w-full overflow-hidden",
                "rounded-[18px] sm:rounded-[22px] xl:rounded-[30px]",
                "border border-[#dce9f6] bg-white",
                "h-[300px]",
                "sm:h-[410px]",
                "md:h-[500px]",
                "lg:h-[520px]",
                "xl:h-[560px]",
                "shadow-[0_30px_70px_-52px_rgba(15,23,42,0.65)]",
                "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_36px_84px_-52px_rgba(15,23,42,0.78)]",
              )}
            >
              {activeImage?.src ? (
                <CmsImage
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt || data.title || "Product image"}
                  fill
                  loading={activeImageIndex === 0 ? "eager" : "lazy"}
                  fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                  sizes="(min-width: 1536px) 38vw, (min-width: 1024px) 42vw, 100vw"
                  className="public-image-hover object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
              )}

              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={handleLeftControl}
                    aria-label={isRtl ? "Next product image" : "Previous product image"}
                    className={cn(
                      "absolute left-[10px] top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full",
                      "h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] xl:h-[42px] xl:w-[42px]",
                      "border border-[#dce9f6] bg-white/90 text-[#071329]",
                      "shadow-[0_14px_28px_-22px_rgba(15,23,42,0.7)] backdrop-blur",
                      "transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-white hover:text-[#009fe3]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                      "sm:left-[16px] xl:left-[18px]",
                    )}
                  >
                    <ChevronLeft className="h-[19px] w-[19px] stroke-[2.5] xl:h-[21px] xl:w-[21px]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRightControl}
                    aria-label={isRtl ? "Previous product image" : "Next product image"}
                    className={cn(
                      "absolute right-[10px] top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full",
                      "h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] xl:h-[42px] xl:w-[42px]",
                      "border border-[#dce9f6] bg-white/90 text-[#071329]",
                      "shadow-[0_14px_28px_-22px_rgba(15,23,42,0.7)] backdrop-blur",
                      "transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-white hover:text-[#009fe3]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                      "sm:right-[16px] xl:right-[18px]",
                    )}
                  >
                    <ChevronRight className="h-[19px] w-[19px] stroke-[2.5] xl:h-[21px] xl:w-[21px]" />
                  </button>

                  <div
                    className={cn(
                      "absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-center gap-[8px] rounded-full",
                      "bg-white/85 px-[11px] py-[7px]",
                      "shadow-[0_14px_28px_-22px_rgba(15,23,42,0.7)] backdrop-blur",
                      "xl:bottom-[18px] xl:px-[12px] xl:py-[8px]",
                    )}
                  >
                    {images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Show product image ${index + 1}`}
                        className={cn(
                          "h-[8px] rounded-full transition-all duration-300",
                          index === activeImageIndex
                            ? "w-[26px] bg-[#009fe3]"
                            : "w-[8px] bg-[#c8d9e8] hover:bg-[#91caee]",
                        )}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            {/* Thumbnail row */}
            {hasMultipleImages ? (
              <div
                className={cn(
                  "flex max-w-full gap-[10px] overflow-x-auto overscroll-x-contain pb-[4px]",
                  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  "sm:gap-[12px]",
                )}
              >
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={cn(
                      "relative shrink-0 overflow-hidden",
                      "h-[62px] w-[78px] rounded-[12px]",
                      "sm:h-[70px] sm:w-[88px] sm:rounded-[14px]",
                      "xl:h-[74px] xl:w-[92px] xl:rounded-[16px]",
                      "border bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03]",
                      index === activeImageIndex
                        ? "border-[#009fe3] ring-2 ring-[#009fe3]/20 shadow-[0_12px_24px_-20px_rgba(0,159,227,0.85)]"
                        : "border-[#dce9f6] hover:border-[#91caee] hover:shadow-[0_12px_24px_-22px_rgba(15,23,42,0.45)]",
                    )}
                  >
                    <CmsImage
                      src={image.src}
                      alt={image.alt || data.title || "Product thumbnail"}
                      fill
                      sizes="92px"
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Product information - no box/card */}
          <div className="order-1 rtl:text-right">
            {data.eyebrow ? (
              <span
                className={cn(
                  "mb-[20px] inline-flex items-center rounded-full bg-[#daecd4]/75",
                  "h-[24px] px-[12px]",
                  "text-[11px] font-black uppercase leading-none tracking-[0.2em] text-[#2a8d33]",
                  "sm:mb-[22px] sm:px-[14px] sm:text-[12px] sm:tracking-[0.24em]",
                  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#daecd4] xl:mb-[24px]",
                )}
              >
                {data.eyebrow}
              </span>
            ) : null}

            <h2
              className={cn(
                "max-w-[760px]",
                "font-black leading-[1.04] tracking-[-0.055em] text-[#071329]",
                "text-[34px]",
                "sm:text-[40px]",
                "md:text-[44px]",
                "xl:text-[48px]",
              )}
            >
              {data.title}
            </h2>

            {data.subtitle ? (
              <p
                className={cn(
                  "mt-[22px] max-w-[720px] border-l-[4px] border-[#009fe3] pl-[18px] rtl:border-l-0 rtl:border-r-[4px] rtl:pl-0 rtl:pr-[18px]",
                  "text-[16px] font-semibold leading-[1.6] tracking-[-0.012em] text-[#071329]",
                  "sm:text-[17px]",
                  "md:text-[18px] md:leading-[1.55]",
                  "xl:mt-[24px] xl:pl-[20px] rtl:xl:pl-0 rtl:xl:pr-[20px]",
                )}
              >
                {data.subtitle}
              </p>
            ) : null}

            {data.body?.length ? (
              <div
                className={cn(
                  "mt-[24px] max-w-[720px] space-y-[18px]",
                  "text-[15px] font-medium leading-[1.68] tracking-[-0.01em] text-[#263b59]",
                  "sm:text-[16px]",
                  "md:mt-[26px] md:space-y-[20px] md:leading-[1.6]",
                )}
              >
                {data.body.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {data.bullets?.length ? (
              <div
                className={cn(
                  "mt-[28px] grid gap-[12px]",
                  "sm:mt-[30px] sm:grid-cols-2 sm:gap-[12px]",
                  "lg:grid-cols-1",
                  "xl:mt-[32px] xl:gap-[14px]",
                )}
              >
                {data.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className={cn(
                      "group/bullet flex min-h-[42px] items-center rounded-full",
                      "border border-[#dce9f6] bg-white px-[16px]",
                      "text-[13px] font-black leading-[1.2] tracking-[-0.012em] text-[#071329]",
                      "sm:min-h-[44px] sm:px-[17px] sm:text-[14px]",
                      "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#91caee] hover:bg-white hover:shadow-[0_14px_28px_-24px_rgba(15,23,42,0.45)] xl:min-h-[46px] xl:px-[18px]",
                    )}
                  >
                    <span className="mr-[10px] inline-block h-[8px] w-[8px] shrink-0 rounded-full bg-[#4cb748] transition-transform duration-300 ease-out group-hover/bullet:scale-125 rtl:ml-[10px] rtl:mr-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {data.actions?.length ? (
              <div className="mt-[32px] flex flex-col gap-3 sm:flex-row sm:flex-wrap rtl:sm:flex-row-reverse rtl:sm:justify-end xl:mt-[36px]">
                {data.actions.map((action, index) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full",
                      "h-[48px] px-6",
                      "text-[14px] font-black leading-none tracking-[-0.01em]",
                      "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                      index === 0
                        ? "bg-[#009fe3] text-white hover:bg-[#0092d3] hover:shadow-[0_18px_38px_-24px_rgba(0,159,227,0.95)]"
                        : "border border-[#91caee] bg-white text-[#009fe3] hover:bg-[#f7fbff] hover:shadow-[0_16px_34px_-26px_rgba(15,23,42,0.45)]",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
