import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface QualityHeroSectionProps {
  data: HeroSectionData;
}

export function QualityHeroSection({ data }: QualityHeroSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff,#f8fbff),radial-gradient(circle_at_15%_20%,rgba(197,225,245,0.7),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-[#4cb748]/30 bg-[#daecd4]/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4cb748]">
              {(data as { eyebrow?: string }).eyebrow || "Quality system"}
            </span>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[1.03] text-slate-950 sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
            {data.subtitle ? (
              <p className="mt-6 max-w-2xl border-s-4 border-[#0097dc] ps-5 text-lg leading-8 text-slate-600">
                {data.subtitle}
              </p>
            ) : null}
            {data.actions?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.actions.map((action, index) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center rounded-2xl px-6 text-sm font-black transition",
                      index === 0
                        ? "bg-[#4cb748] text-white hover:bg-[#3da33b]"
                        : "border border-[#91caee] text-[#0097dc] hover:bg-[#c5e1f5]/35",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative rounded-[2rem] border border-[#dfeaf6] bg-[#f8fbff] p-3 shadow-[0_30px_70px_-48px_rgba(15,23,42,0.5)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
              {data.backgroundImage ? (
                <Image
                  src={data.backgroundImage.src}
                  alt={data.backgroundImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4cb748]/25 via-transparent to-[#0097dc]/15" />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
