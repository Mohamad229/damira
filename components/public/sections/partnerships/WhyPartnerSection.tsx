import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

export interface WhyPartnerSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface WhyPartnerSectionProps {
  data: WhyPartnerSectionData;
}

export function WhyPartnerSection({ data }: WhyPartnerSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:border-l-4 lg:border-[#f58238] lg:pl-5">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-[#f9d7bf] bg-[#fff5ee] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <span className="absolute right-5 top-5 text-5xl font-black text-[#fee2cd]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#f58238] shadow-sm group-hover:bg-[#f58238] group-hover:text-white">
                    {Icon ? (
                      <Icon className="h-6 w-6" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    )}
                  </div>
                  <h3 className="relative z-10 text-xl font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>
                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
