import { SectionReveal } from "@/components/public/sections/base";
import type { StatsSectionData } from "@/components/public/sections/base/types";

interface HomeStatsSectionProps {
  data: StatsSectionData;
}

export function HomeStatsSection({ data }: HomeStatsSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#91caee] to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            {data.title ? (
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
                {data.title}
              </h2>
            ) : null}
            {data.description ? (
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id || index}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-[#dfeefa] bg-white p-6 shadow-[0_18px_42px_-36px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 hover:border-[#91caee]"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c5e1f5]/50 transition group-hover:bg-[#fee2cd]/70" />
                  {Icon ? (
                    <Icon className="relative mb-5 h-6 w-6 text-[#4cb748]" />
                  ) : null}
                  <p className="relative text-4xl font-black tracking-tight text-[#0097dc] sm:text-5xl">
                    {item.value}
                  </p>
                  <h3 className="relative mt-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                    {item.label}
                  </h3>
                  {item.description ? (
                    <p className="relative mt-2 text-sm leading-6 text-slate-600">
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
