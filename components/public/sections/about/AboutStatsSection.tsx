import type { StatsSectionData } from "@/components/public/sections/base/types";

export function AboutStatsSection({ data }: { data: StatsSectionData }) {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#e3eef8] bg-[#073a63] text-white sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <article
              key={item.id || index}
              className="border-white/10 p-6 sm:border-r lg:p-8"
            >
              <p className="text-4xl font-black text-[#91caee]">{item.value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-white/70">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
