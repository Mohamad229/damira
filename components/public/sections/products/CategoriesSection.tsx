import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";

interface CategoriesSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface CategoriesSectionProps {
  data: CategoriesSectionData;
}

export function CategoriesSection({ data }: CategoriesSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0097dc]">
              Product categories
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
          <div className="grid gap-5 md:grid-cols-2">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#dfeaf6] bg-[#f8fbff] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#91caee] hover:bg-white"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c5e1f5] transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative">
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0097dc] shadow-sm">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="font-black">{index + 1}</span>
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
