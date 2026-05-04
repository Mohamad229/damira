import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface SpecificationItem {
  label: string;
  value: string;
}

interface SpecificationsSectionProps {
  data: {
    title: string;
    description?: string;
    items: SpecificationItem[];
  };
}

export function SpecificationsSection({ data }: SpecificationsSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0097dc]">
              Technical dossier
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
          <dl className="grid gap-4 md:grid-cols-2">
            {data.items.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-[#dfeaf6] bg-[#f8fbff] p-5"
              >
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#f58238]">
                  {item.label}
                </dt>
                <dd className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SectionReveal>
  );
}
