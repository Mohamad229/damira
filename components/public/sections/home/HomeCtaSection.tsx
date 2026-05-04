import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { CtaSectionData } from "@/components/public/sections/base/types";

interface HomeCtaSectionProps {
  data: CtaSectionData;
}

export function HomeCtaSection({ data }: HomeCtaSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[#0097dc] px-6 py-10 text-white shadow-[0_30px_80px_-42px_rgba(0,151,220,0.85)] sm:px-8 md:px-12 md:py-14">
            {data.backgroundImage ? (
              <Image
                src={data.backgroundImage.src}
                alt={data.backgroundImage.alt}
                fill
                sizes="100vw"
                className="object-cover opacity-15 mix-blend-overlay"
              />
            ) : null}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(76,183,72,0.35),transparent_28%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                {data.eyebrow ? (
                  <p className="text-xs font-bold uppercase text-white/75">
                    {data.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
                  {data.title}
                </h2>
                {data.description ? (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                    {data.description}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {data.primaryAction ? (
                  <Link
                    href={data.primaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-[#0097dc] transition hover:bg-[#f8fbff]"
                  >
                    {data.primaryAction.label}
                  </Link>
                ) : null}
                {data.secondaryAction ? (
                  <Link
                    href={data.secondaryAction.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20"
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
