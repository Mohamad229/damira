import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";

interface HomeStrategicFocusSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface HomeStrategicFocusSectionProps {
  data: HomeStrategicFocusSectionData;
}

export function HomeStrategicFocusSection({
  data,
}: HomeStrategicFocusSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,151,220,0.07)_1px,transparent_1px),linear-gradient(rgba(0,151,220,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl md:mb-14">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-[#0097dc] shadow-sm">
              Strategic focus
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">
                {data.description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="group relative min-h-64 overflow-hidden rounded-[1.75rem] border border-[#dceaf6] bg-white p-6 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0097dc]/45"
                >
                  <span className="absolute right-5 top-4 text-6xl font-black text-[#c5e1f5]/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0097dc] text-white shadow-[0_16px_26px_-18px_rgba(0,151,220,0.95)]">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-black">{index + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-6">
                      <div className="h-1 w-10 rounded-full bg-[#f58238] transition-all duration-500 group-hover:w-full group-hover:bg-[#4cb748]" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
