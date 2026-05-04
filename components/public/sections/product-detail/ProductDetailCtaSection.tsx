import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { CtaSectionData } from "@/components/public/sections/base/types";

interface ProductDetailCtaSectionProps {
  data: CtaSectionData;
}

export function ProductDetailCtaSection({
  data,
}: ProductDetailCtaSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#d7efd2] bg-[#daecd4]/55 p-7 sm:p-10 md:p-12">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#4cb748]/15" />
            <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                {data.eyebrow ? (
                  <span className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#2a8d33]">
                    {data.eyebrow}
                  </span>
                ) : null}
                <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
                  {data.title}
                </h2>
                {data.description ? (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-650 sm:text-base md:text-lg">
                    {data.description}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {data.primaryAction ? (
                  <Link
                    href={data.primaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0097dc] px-6 text-sm font-black text-white hover:bg-[#00a5e1]"
                  >
                    {data.primaryAction.label}
                  </Link>
                ) : null}
                {data.secondaryAction ? (
                  <Link
                    href={data.secondaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0097dc]/25 bg-white px-6 text-sm font-black text-[#0097dc] hover:bg-[#f8fbff]"
                  >
                    {data.secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
