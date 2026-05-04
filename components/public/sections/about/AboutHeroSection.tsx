import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { HeroSectionData } from "@/components/public/sections/base/types";

interface AboutHeroSectionProps {
  data: HeroSectionData;
  className?: string;
}

export function AboutHeroSection({ data, className }: AboutHeroSectionProps) {
  return (
    <SectionReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-white pt-24 pb-16 sm:pt-28 md:pb-20 lg:pt-32",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,#ffffff_0%,#f8fbff_42%,#fff7ef_100%)]" />
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c5e1f5]/70 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#daecd4]/65 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-[#f9d7bf] bg-[#fff5ee] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f58238]">
              {data.eyebrow || "About Damira"}
            </span>
            <h1 className="text-balance text-4xl font-black leading-[1.02] text-slate-950 sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
            {data.subtitle ? (
              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-650 sm:text-lg md:text-xl">
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
                      "inline-flex min-h-12 items-center justify-center rounded-2xl px-6 text-sm font-bold transition-all duration-300",
                      index === 0
                        ? "bg-[#0097dc] text-white hover:bg-[#00a5e1]"
                        : "border border-[#91caee] bg-white text-[#0097dc] hover:bg-[#c5e1f5]/30",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute left-0 top-0 h-44 w-44 rounded-[2rem] bg-[#0097dc]/10" />
            <div className="absolute bottom-0 right-4 h-56 w-56 rounded-[2.5rem] bg-[#f58238]/10" />
            <div className="absolute inset-8 overflow-hidden rounded-[3rem] border border-[#e5eef8] bg-white shadow-[0_35px_80px_-52px_rgba(15,23,42,0.7)]">
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
                <div className="h-full w-full bg-[linear-gradient(135deg,#c5e1f5,#ffffff,#fee2cd)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/10" />
            </div>
            <div className="absolute left-0 bottom-8 rounded-3xl border border-[#deebf7] bg-white/95 p-5 shadow-[0_22px_50px_-35px_rgba(15,23,42,0.55)]">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#0097dc]">
                Our story
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Purpose, partnerships, and healthcare access.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
