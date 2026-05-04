import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { CtaSectionData } from "@/components/public/sections/base/types";

interface QualityCtaSectionProps {
  data: CtaSectionData;
}

export function QualityCtaSection({ data }: QualityCtaSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#4cb748] to-[#0097dc] p-6 text-white shadow-[0_30px_80px_-45px_rgba(76,183,72,0.85)] sm:p-8 md:p-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                {data.eyebrow ? (
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                    {data.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  {data.title}
                </h2>
                {data.description ? (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                    {data.description}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {data.primaryAction ? (
                  <Link
                    href={data.primaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-[#0097dc]"
                  >
                    {data.primaryAction.label}
                  </Link>
                ) : null}
                {data.secondaryAction ? (
                  <Link
                    href={data.secondaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 text-sm font-black text-white"
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
