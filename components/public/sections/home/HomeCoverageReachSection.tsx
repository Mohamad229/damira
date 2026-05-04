import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { StatsSectionData } from "@/components/public/sections/base/types";

interface HomeCoverageReachSectionProps {
  data: StatsSectionData;
}

export function HomeCoverageReachSection({
  data,
}: HomeCoverageReachSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,151,220,0.35),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(76,183,72,0.25),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase text-[#91caee]">
              Coverage
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-4 text-base leading-7 text-white/70">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {data.items.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="bg-slate-950/70 p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.08] sm:p-8"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-5xl font-black text-[#91caee] md:text-6xl">
                      {item.value}
                    </span>
                    {Icon ? <Icon className="h-7 w-7 text-[#4cb748]" /> : null}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#f58238]">
                    {item.label}
                  </h3>
                  {item.description ? (
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
