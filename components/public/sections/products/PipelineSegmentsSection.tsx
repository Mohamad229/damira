import type {
  CardGridData,
  ServiceCardData,
} from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface PipelineSegmentsSectionData extends CardGridData {
  items: ServiceCardData[];
}

interface PipelineSegmentsSectionProps {
  data: PipelineSegmentsSectionData;
}

export function PipelineSegmentsSection({
  data,
}: PipelineSegmentsSectionProps) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(197,225,245,0.75),transparent_32%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <div className="space-y-4">
            {data.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-[2rem] border border-[#e5eef8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#91caee] sm:p-7 lg:grid-cols-[96px_1fr_auto] lg:items-center"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#c5e1f5]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5e1f5]/55 text-[#0097dc]">
                      {Icon ? (
                        <Icon className="h-6 w-6" />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-current" />
                      )}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  {item.features?.length ? (
                    <div className="rounded-full bg-[#daecd4]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#2a8d33]">
                      {item.features[0]}
                    </div>
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
