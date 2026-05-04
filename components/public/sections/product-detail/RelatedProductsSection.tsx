import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ProductCardData } from "@/components/public/sections/base";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface RelatedProductsSectionProps {
  data: {
    title: string;
    description?: string;
    items: ProductCardData[];
    columns?: 2 | 3 | 4;
  };
}

export function RelatedProductsSection({ data }: RelatedProductsSectionProps) {
  const columnsClass =
    data.columns === 2
      ? "lg:grid-cols-2"
      : data.columns === 4
        ? "lg:grid-cols-4"
        : "lg:grid-cols-3";

  if (!data.items.length) return null;

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:border-l-4 lg:border-[#0097dc] lg:pl-5">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className={`grid gap-6 sm:grid-cols-2 ${columnsClass}`}>
            {data.items.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/products"}
                className="group overflow-hidden rounded-[2rem] border border-[#e5eef8] bg-white shadow-[0_22px_54px_-45px_rgba(15,23,42,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-[#91caee]"
              >
                <div className="relative aspect-[4/3] bg-[#f8fbff]">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt || item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
                  )}
                  {item.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#0097dc]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-6">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#4cb748]">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">
                    {item.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
