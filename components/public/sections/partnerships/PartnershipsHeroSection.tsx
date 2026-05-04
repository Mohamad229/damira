import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface PartnershipsHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function PartnershipsHeroSection({
  data,
  className,
}: PartnershipsHeroSectionProps) {
  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#fffaf6] pt-24 pb-16 sm:pt-28 md:pb-20 lg:pt-32",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(254,226,205,0.95),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(197,225,245,0.82),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-[#f9d7bf] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f58238]">
              {data.eyebrow || "Partnerships"}
            </span>
            <h1 className="text-balance text-4xl font-black leading-[1.02] text-slate-950 sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
            {data.subtitle ? (
              <p className="mt-7 max-w-xl border-l-4 border-[#f58238] pl-5 text-base leading-relaxed text-slate-650 sm:text-lg md:text-xl">
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
                      "rounded-full px-5 py-3 text-sm font-black",
                      index === 0
                        ? "bg-[#f58238] text-white"
                        : "border border-[#0097dc]/25 bg-white text-[#0097dc]",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative min-h-[420px]">
            <div className="absolute inset-8 rounded-[3rem] bg-[#f58238]/10" />
            <div className="absolute inset-0 overflow-hidden rounded-[2.75rem] border border-white bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.7)]">
              {data.backgroundImage ? (
                <Image
                  src={data.backgroundImage.src}
                  alt={data.backgroundImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#fee2cd,#ffffff,#c5e1f5)]" />
              )}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
