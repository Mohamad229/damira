"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import type { ProductCardData } from "@/components/public/sections/base";
import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface CategoryOption {
  id: string;
  label: string;
  value: string;
}

interface ProductCatalogFilterSectionProps {
  locale: Locale;
  title: string;
  description?: string;
  items: ProductCardData[];
  columns?: 2 | 3 | 4;
  categoryOptions?: CategoryOption[];
}

const LABELS: Record<
  Locale,
  {
    searchPlaceholder: string;
    allCategories: string;
    more: string;
    noResultsTitle: string;
    noResultsDescription: string;
  }
> = {
  en: {
    searchPlaceholder: "Search products, types...",
    allCategories: "All",
    more: "More",
    noResultsTitle: "No matching products",
    noResultsDescription: "Try another keyword or choose a different category.",
  },
  ar: {
    searchPlaceholder: "ابحث في المنتجات أو الأنواع...",
    allCategories: "الكل",
    more: "المزيد",
    noResultsTitle: "لا توجد منتجات مطابقة",
    noResultsDescription: "جرّب كلمة بحث أخرى أو اختر فئة مختلفة.",
  },
};

function normalize(value?: string | null): string {
  return value?.trim().toLowerCase() || "";
}

function getVisibleFilterCount() {
  if (typeof window === "undefined") return 3;

  const width = window.innerWidth;

  /**
   * Count includes the "All" button.
   *
   * < 420px:
   * All + More
   *
   * 420px - 639px:
   * All + 1 category + More
   *
   * 640px - 1023px:
   * All + 2 categories + More
   *
   * 1024px+:
   * All + 3 categories + More
   */
  if (width < 420) return 2;
  if (width < 640) return 3;
  if (width < 1024) return 4;

  return 4;
}

function ProductCatalogCard({ data }: { data: ProductCardData }) {
  const href = data.href || "/products";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[22px] border border-[#e5eef8] bg-white",
        "shadow-[0_22px_52px_-46px_rgba(15,23,42,0.58)]",
        "public-card-hover",
        "hover:-translate-y-1 hover:border-[#91caee]",
        "sm:rounded-[24px]",
        "xl:rounded-[28px]",
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[#f8fbff] sm:aspect-[4/3] xl:aspect-[16/11]">
        {data.image ? (
          <CmsImage
            src={data.image.src}
            alt={data.image.alt || data.name}
            fill
            sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
            className="public-image-hover object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/26 via-transparent to-transparent" />

        {data.badge ? (
          <span
            className={cn(
              "absolute left-[14px] top-[14px] rounded-full bg-white/92 rtl:left-auto rtl:right-[14px]",
              "px-[11px] py-[5px]",
              "text-[11px] font-black uppercase leading-none tracking-[0.16em] text-[#0097dc]",
              "shadow-sm backdrop-blur",
              "xl:left-4 xl:top-4 xl:px-3 xl:py-1.5 xl:text-xs rtl:xl:left-auto rtl:xl:right-4",
            )}
          >
            {data.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-[20px] sm:p-[22px] xl:p-6">
        <div className="mb-[14px] flex items-center justify-between gap-3 xl:mb-4">
          <span className="max-w-[78%] truncate rounded-full bg-[#daecd4]/70 px-3 py-1 text-[11px] font-bold leading-none text-[#2a8d33] xl:text-xs">
            {data.category}
          </span>

          <span className="h-2 w-2 shrink-0 rounded-full bg-[#f58238]" />
        </div>

        <h3 className="text-[19px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 xl:text-xl">
          {data.name}
        </h3>

        <p className="mt-[10px] line-clamp-3 text-[14px] font-medium leading-[1.55] tracking-[-0.01em] text-slate-600 xl:mt-3 xl:text-sm xl:leading-relaxed">
          {data.description}
        </p>

        <div className="mt-auto pt-[22px] xl:pt-6">
          {data.indication ? (
            <p className="text-[11px] font-black uppercase leading-none tracking-[0.14em] text-[#0097dc] xl:text-xs">
              {data.indication}
            </p>
          ) : null}

          {data.storage ? (
            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-500">
              {data.storage}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function ProductCatalogFilterSection({
  locale,
  title,
  description,
  items,
  columns = 4,
  categoryOptions,
}: ProductCatalogFilterSectionProps) {
  const labels = LABELS[locale];
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [visibleFilterCount, setVisibleFilterCount] = useState(3);

  useEffect(() => {
    function handleResize() {
      setVisibleFilterCount(getVisibleFilterCount());
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resolvedCategories = useMemo(() => {
    if (categoryOptions?.length) return categoryOptions;

    const seen = new Set<string>();

    return items
      .map((item) => item.category)
      .filter((category) => {
        const key = normalize(category);

        if (!key || seen.has(key)) return false;

        seen.add(key);
        return true;
      })
      .map((category) => ({
        id: normalize(category).replace(/\s+/g, "-"),
        label: category,
        value: category,
      }));
  }, [categoryOptions, items]);

  const filterOptions = [
    {
      id: "all",
      label: labels.allCategories,
      value: "all",
    },
    ...resolvedCategories,
  ];

  const visibleFilterOptions = filterOptions.slice(0, visibleFilterCount);
  const shouldShowMoreButton = filterOptions.length > visibleFilterCount;

  const isSelectedCategoryInMore =
    shouldShowMoreButton &&
    !visibleFilterOptions.some((option) => option.value === selectedCategory);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => {
    const query = normalize(searchQuery);

    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        normalize(item.category) === normalize(selectedCategory);

      if (!query) return matchesCategory;

      const searchableText = [
        item.name,
        item.category,
        item.description,
        item.indication || "",
        item.storage || "",
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [items, searchQuery, selectedCategory]);

  const columnsClass =
    columns === 2
      ? "xl:grid-cols-2"
      : columns === 3
        ? "xl:grid-cols-3"
        : "xl:grid-cols-4";

  function selectCategory(value: string) {
    setSelectedCategory(value);
    setIsMoreOpen(false);
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#f8fbff]",
        "py-[60px] sm:py-[68px] lg:py-[76px] xl:py-[84px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,244,255,0.55),transparent_34%)]" />

      <div
        className={cn(
          "relative z-10 w-full",
          "px-4 sm:px-6 md:px-8",
          "lg:px-[80px]",
          "xl:px-[120px]",
          "2xl:px-[210px]",
        )}
      >
        {title || description ? (
          <div className="sr-only">
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
        ) : null}

        {/* Filter/search row */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mb-[34px] flex flex-col gap-5",
            "sm:mb-[38px]",
            "lg:mb-[42px]",
            "xl:flex-row xl:items-center xl:justify-between",
          )}
        >
          {/* Categories */}
          <div className="relative flex min-w-0 flex-nowrap items-center gap-2">
            {visibleFilterOptions.map((category) => {
              const isActive = selectedCategory === category.value;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.value)}
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-full",
                    "h-[40px] px-[16px]",
                    "border text-[13px] font-bold leading-none tracking-[-0.012em]",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                    "sm:h-[42px] sm:px-[20px] sm:text-[14px]",
                    "xl:h-[44px] xl:px-[24px]",
                    isActive
                      ? "border-[#009fe3] bg-[#009fe3] text-white shadow-[0_12px_26px_-20px_rgba(0,159,227,0.9)]"
                      : "border-[#d9e4ef] bg-white text-[#33445f] hover:border-[#9ed8f8] hover:text-[#009fe3]",
                  )}
                >
                  <span className="max-w-[120px] truncate whitespace-nowrap sm:max-w-[160px] md:max-w-[190px] xl:max-w-[220px]">
                    {category.label}
                  </span>
                </button>
              );
            })}

            {shouldShowMoreButton ? (
              <div ref={moreMenuRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((current) => !current)}
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
                    "h-[40px] px-[16px]",
                    "border text-[13px] font-bold leading-none tracking-[-0.012em]",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009fe3] focus-visible:ring-offset-2",
                    "sm:h-[42px] sm:px-[20px] sm:text-[14px]",
                    "xl:h-[44px] xl:px-[24px]",
                    isMoreOpen || isSelectedCategoryInMore
                      ? "border-[#009fe3] bg-[#009fe3] text-white shadow-[0_12px_26px_-20px_rgba(0,159,227,0.9)]"
                      : "border-[#d9e4ef] bg-white text-[#33445f] hover:border-[#9ed8f8] hover:text-[#009fe3]",
                  )}
                >
                  <span>{labels.more}</span>

                  <ChevronDown
                    className={cn(
                      "h-[15px] w-[15px] stroke-[2.5] transition-transform duration-300",
                      isMoreOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isMoreOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className={cn(
                        "absolute left-0 top-[calc(100%+10px)] z-30 rtl:left-auto rtl:right-0 rtl:text-right",
                        "w-[260px] overflow-hidden rounded-[18px]",
                        "border border-[#d9e4ef] bg-white",
                        "shadow-[0_22px_48px_-32px_rgba(15,23,42,0.45)]",
                        "sm:w-[300px]",
                      )}
                    >
                      <div className="max-h-[315px] overflow-y-auto p-2">
                        {filterOptions.map((category) => {
                          const isActive = selectedCategory === category.value;

                          return (
                            <button
                              key={`${category.id}-menu`}
                              type="button"
                              onClick={() => selectCategory(category.value)}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-[12px]",
                                "px-4 py-3 text-start",
                                "text-[14px] font-bold leading-[1.25] tracking-[-0.012em]",
                                "transition-colors duration-200",
                                isActive
                                  ? "bg-[#eaf7ff] text-[#009fe3]"
                                  : "text-[#33445f] hover:bg-[#f8fbff] hover:text-[#009fe3]",
                              )}
                            >
                              <span>{category.label}</span>

                              {isActive ? (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#009fe3]" />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}
          </div>

          {/* Search */}
          <div className="relative w-full shrink-0 xl:w-[320px]">
            <Search className="pointer-events-none absolute left-[16px] top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#8da0bd] rtl:left-auto rtl:right-[16px]" />

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className={cn(
                "h-[40px] w-full rounded-full",
                "border border-[#d9e4ef] bg-white",
                "pl-[43px] pr-[18px] rtl:pl-[18px] rtl:pr-[43px]",
                "text-[13px] font-medium leading-none tracking-[-0.01em] text-[#33445f]",
                "shadow-[0_12px_28px_-24px_rgba(15,23,42,0.45)]",
                "outline-none transition-all duration-300",
                "placeholder:text-[#64748b]",
                "focus:border-[#9ed8f8] focus:ring-2 focus:ring-[#c5e1f5]",
                "sm:h-[42px] sm:text-[14px]",
                "xl:h-[44px] xl:w-[320px]",
              )}
            />
          </div>
        </motion.div>

        {/* Product cards */}
        <AnimatePresence mode={reduceMotion ? "sync" : "popLayout"}>
          {filteredItems.length > 0 ? (
            <motion.div
              layout={!reduceMotion}
              className={cn(
                "grid",
                "gap-[18px]",
                "sm:grid-cols-2 sm:gap-[20px]",
                "lg:gap-[22px]",
                "xl:gap-[24px]",
                columnsClass,
              )}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.28,
                    delay: Math.min(index * 0.04, 0.3),
                  }}
                >
                  <ProductCatalogCard data={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              className="rounded-[24px] border border-[#e2ebf7] bg-white px-6 py-14 text-center shadow-[0_16px_40px_-34px_rgba(15,23,42,0.35)]"
            >
              <p className="text-[18px] font-black tracking-[-0.02em] text-slate-900">
                {labels.noResultsTitle}
              </p>

              <p className="mt-2 text-[14px] font-medium leading-6 text-slate-600">
                {labels.noResultsDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
