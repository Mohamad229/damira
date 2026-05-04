import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";

interface CoreValuesSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface CoreValuesSectionProps {
  data: CoreValuesSectionData;
}

export function CoreValuesSection({ data }: CoreValuesSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0097dc]">
              Core values
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="relative overflow-hidden rounded-[1.5rem] border border-[#dfeaf6] bg-white p-6 shadow-[0_18px_48px_-40px_rgba(15,23,42,0.45)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5e1f5]/65 text-[#0097dc]">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="font-black">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#f58238]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
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
