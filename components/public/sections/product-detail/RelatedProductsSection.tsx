import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import type { ProductCardData } from "@/components/public/sections/base";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface RelatedProductsSectionProps {
  data: {
    title: string;
    description?: string;
    items: ProductCardData[];
    columns?: 2 | 3 | 4;
  };
}

function RelatedProductCard({ data }: { data: ProductCardData }) {
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
        {data.image?.src ? (
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

export function RelatedProductsSection({ data }: RelatedProductsSectionProps) {
  const items = data.items || [];

  if (!items.length) return null;

  const columnsClass =
    data.columns === 2
      ? "xl:grid-cols-2"
      : data.columns === 4
        ? "xl:grid-cols-4"
        : "xl:grid-cols-3";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-[#f8fbff]",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
        {/* Soft background depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,244,255,0.5),transparent_34%)]" />

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
              "mb-[36px] flex flex-col",
              "gap-[16px]",
              "sm:mb-[42px]",
              "lg:mb-[48px] lg:flex-row lg:items-center rtl:text-right",
              "xl:mb-[50px]",
            )}
          >
            <h2
              className={cn(
                "max-w-[620px]",
                "font-black leading-[1.04] tracking-[-0.055em] text-[#071329]",
                "text-[34px]",
                "sm:text-[40px]",
                "md:text-[44px]",
                "xl:text-[48px]",
              )}
            >
              {data.title}
            </h2>

            {data.description ? (
              <p
                className={cn(
                  "max-w-[560px] border-l-[4px] border-[#009fe3] rtl:border-l-0 rtl:border-r-[4px]",
                  "pl-[18px] rtl:pl-0 rtl:pr-[18px]",
                  "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                  "sm:text-[16px]",
                  "md:leading-[1.55]",
                  "lg:ml-[42px] rtl:lg:ml-0 rtl:lg:mr-[42px]",
                  "xl:ml-[54px] xl:pl-[22px] rtl:xl:ml-0 rtl:xl:mr-[54px] rtl:xl:pl-0 rtl:xl:pr-[22px]",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Cards */}
          <div
            className={cn(
              "grid",
              "gap-[18px]",
              "sm:grid-cols-2 sm:gap-[20px]",
              "lg:gap-[22px]",
              "xl:gap-[24px]",
              columnsClass,
            )}
          >
            {items.map((item) => (
              <RelatedProductCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
