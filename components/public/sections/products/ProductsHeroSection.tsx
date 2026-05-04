import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface ProductsHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function ProductsHeroSection({
  data,
  className,
}: ProductsHeroSectionProps) {
  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#f8fbff] pt-24 pb-16 sm:pt-28 md:pb-20 lg:pt-32",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_45%,#effaf1_100%)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_25%,rgba(197,225,245,0.9),transparent_34%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-[#d7efd2] bg-[#daecd4]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2a8d33]">
              {data.eyebrow || "Products"}
            </span>
            <h1 className="text-balance text-4xl font-black leading-[1.02]  text-slate-950 sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
            {data.subtitle ? (
              <p className="mt-7 max-w-xl border-l-4 border-[#0097dc] pl-5 text-base leading-relaxed text-slate-650 sm:text-lg md:text-xl">
                {data.subtitle}
              </p>
            ) : null}
            {data.actions?.length ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {data.actions.map((action, index) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-black transition-all",
                      index === 0
                        ? "bg-[#4cb748] text-white hover:bg-[#43a83f]"
                        : "border border-[#0097dc]/25 bg-white text-[#0097dc] hover:bg-[#c5e1f5]/30",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative min-h-[420px]">
            <div className="absolute inset-y-8 left-8 right-0 rounded-[3rem] bg-[#0097dc]/10" />
            <div className="absolute inset-y-0 left-0 right-12 overflow-hidden rounded-[2.75rem] border border-white bg-white shadow-[0_35px_90px_-58px_rgba(15,23,42,0.75)]">
              {data.backgroundImage ? (
                <Image
                  src={data.backgroundImage.src}
                  alt={data.backgroundImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/15" />
            </div>
            <div className="absolute bottom-6 right-0 rounded-3xl border border-[#deebf7] bg-white/92 p-5 shadow-[0_22px_50px_-35px_rgba(15,23,42,0.55)] backdrop-blur">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#f58238]">
                Catalog ready
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Browse categories, pipeline, and available products.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
