import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface HomeHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function HomeHeroSection({ data, className }: HomeHeroSectionProps) {
  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#f8fbff] pt-24 pb-16 sm:pt-28 md:pb-20 lg:min-h-[88vh] lg:pt-32",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(197,225,245,0.9),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(254,226,205,0.85),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fbff_48%,#edf9f0_100%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-[linear-gradient(90deg,rgba(0,151,220,0.08),transparent)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#91caee] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0097dc] shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4cb748]" />
              {data.eyebrow || "Excellence in Healthcare"}
            </div>

            <h1 className="text-balance text-4xl font-black text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              {data.title || "The Future of Pharma"}
            </h1>

            {data.subtitle ? (
              <p className="mt-7 max-w-xl rounded-r-2xl border-l-4 border-[#f58238] bg-white/70 py-3 pl-5 text-base leading-relaxed text-slate-650 shadow-sm sm:text-lg md:text-xl">
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
                      "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      index === 0
                        ? "bg-[#0097dc] text-white shadow-[0_18px_40px_-22px_rgba(0,151,220,0.85)] hover:-translate-y-0.5 hover:bg-[#00a5e1] focus-visible:ring-[#0097dc]"
                        : "border border-[#0097dc]/25 bg-white text-[#0097dc] hover:-translate-y-0.5 hover:border-[#0097dc] hover:bg-[#c5e1f5]/30 focus-visible:ring-[#0097dc]",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <div className="absolute right-0 top-4 h-[72%] w-[72%] rounded-[3rem] bg-[#0097dc] shadow-[0_40px_90px_-55px_rgba(0,151,220,0.95)]" />
            <div className="absolute left-0 bottom-2 h-[58%] w-[58%] rounded-[2.5rem] border border-[#91caee]/60 bg-white/70 backdrop-blur" />
            <div className="absolute left-8 top-0 h-24 w-24 rounded-full bg-[#f58238]/18" />
            <div className="absolute bottom-10 right-8 h-20 w-20 rounded-full bg-[#4cb748]/18" />

            <div className="absolute inset-x-6 top-10 overflow-hidden rounded-[2.75rem] border border-white bg-white shadow-[0_35px_85px_-50px_rgba(15,23,42,0.65)] lg:inset-x-10 lg:top-12">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
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
                  <div className="h-full w-full bg-[linear-gradient(135deg,#c5e1f5,#ffffff,#daecd4)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-white/20" />
              </div>
            </div>

            <div className="absolute bottom-0 left-6 max-w-[260px] rounded-3xl border border-[#dcecf7] bg-white/92 p-5 shadow-[0_24px_55px_-35px_rgba(15,23,42,0.6)] backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#f58238]">
                Damira Pharma
              </div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">
                Integrated healthcare growth across products, services, quality,
                and partnerships.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
