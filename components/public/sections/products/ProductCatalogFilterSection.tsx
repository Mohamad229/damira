"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "@/i18n/navigation";
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
    categoryLabel: string;
    allCategories: string;
    results: string;
    noResultsTitle: string;
    noResultsDescription: string;
  }
> = {
  en: {
    searchPlaceholder: "Search products...",
    categoryLabel: "Category",
    allCategories: "All categories",
    results: "results",
    noResultsTitle: "No matching products",
    noResultsDescription: "Try another keyword or choose a different category.",
  },
  ar: {
    searchPlaceholder: "ابحث في المنتجات...",
    categoryLabel: "الفئة",
    allCategories: "كل الفئات",
    results: "نتيجة",
    noResultsTitle: "لا توجد منتجات مطابقة",
    noResultsDescription: "جرّب كلمة بحث أخرى أو اختر فئة مختلفة.",
  },
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function ProductCatalogCard({ data }: { data: ProductCardData }) {
  const href = data.href || "/products";

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e5eef8] bg-white shadow-[0_24px_60px_-48px_rgba(15,23,42,0.62)] transition-all duration-300 hover:-translate-y-1 hover:border-[#91caee]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8fbff]">
        {data.image ? (
          <Image src={data.image.src} alt={data.image.alt || data.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-transparent" />
        {data.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#0097dc] shadow-sm backdrop-blur">
            {data.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#daecd4]/70 px-3 py-1 text-xs font-bold text-[#2a8d33]">{data.category}</span>
          <span className="h-2 w-2 rounded-full bg-[#f58238]" />
        </div>
        <h3 className="text-xl font-black tracking-tight text-slate-950">{data.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{data.description}</p>
        <div className="mt-auto pt-6">
          {data.indication ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0097dc]">{data.indication}</p> : null}
          {data.storage ? <p className="mt-2 text-xs text-slate-500">{data.storage}</p> : null}
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
  columns = 3,
  categoryOptions,
}: ProductCatalogFilterSectionProps) {
  const labels = LABELS[locale];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resolvedCategories = useMemo(() => {
    if (categoryOptions?.length) return categoryOptions;

    const seen = new Set<string>();
    return items
      .map((item) => item.category)
      .filter((category) => {
        const key = normalize(category);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((category) => ({
        id: normalize(category).replace(/\s+/g, "-"),
        label: category,
        value: category,
      }));
  }, [categoryOptions, items]);

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
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [items, searchQuery, selectedCategory]);

  const columnsClass =
    columns === 2
      ? "xl:grid-cols-2"
      : columns === 4
        ? "xl:grid-cols-4"
        : "xl:grid-cols-3";

  return (
    <section className="relative overflow-hidden border-y border-[#e5eef8] bg-white py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(218,236,212,0.65),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(197,225,245,0.75),transparent_30%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 rounded-[2.25rem] border border-[#e5eef8] bg-[#f8fbff]/80 p-6 md:mb-12 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                {description}
              </motion.p>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0097dc] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>
              {filteredItems.length} {labels.results}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10 grid gap-4 rounded-[1.5rem] border border-[#e5eef8] bg-white p-3 shadow-[0_18px_42px_-36px_rgba(15,23,42,0.35)] sm:grid-cols-[1fr_260px] md:mb-12"
        >
          <div className="relative">
            <span className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-[1rem] border border-transparent bg-[#f8fbff] ps-11 pe-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#0097dc] focus:bg-white focus:ring-2 focus:ring-[#c5e1f5]"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label={labels.categoryLabel}
              className="h-12 w-full appearance-none rounded-[1rem] border border-transparent bg-[#f8fbff] px-4 pe-10 text-sm text-slate-700 outline-none transition-all focus:border-[#0097dc] focus:bg-white focus:ring-2 focus:ring-[#c5e1f5]"
            >
              <option value="all">{labels.allCategories}</option>
              {resolvedCategories.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div layout className={cn("grid gap-6 sm:grid-cols-2", columnsClass)}>
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.3) }}
                >
                  <ProductCatalogCard data={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[2rem] border border-[#e2ebf7] bg-white px-6 py-14 text-center shadow-[0_16px_40px_-34px_rgba(15,23,42,0.35)]"
            >
              <p className="text-lg font-bold tracking-tight text-slate-900">
                {labels.noResultsTitle}
              </p>
              <p className="mt-2 text-sm text-slate-600">{labels.noResultsDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
