import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface HomeKeyStrengthsSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface HomeKeyStrengthsSectionProps {
  data: HomeKeyStrengthsSectionData;
}

export function HomeKeyStrengthsSection({
  data,
}: HomeKeyStrengthsSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="mb-4 block h-1.5 w-16 rounded-full bg-[#f58238]" />
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="divide-y divide-[#e5eef8] rounded-[2rem] border border-[#e5eef8] bg-[#f8fbff]">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="group grid gap-5 p-6 transition-colors hover:bg-white sm:p-7 lg:grid-cols-[120px_1fr_0.65fr] lg:items-center"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#c5e1f5] group-hover:text-[#0097dc]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0097dc] shadow-sm group-hover:bg-[#0097dc] group-hover:text-white">
                      {Icon ? (
                        <Icon className="h-6 w-6" />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-current" />
                      )}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  {item.features?.length ? (
                    <ul className="space-y-2 text-sm text-slate-700">
                      {item.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4cb748]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
