import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface ProductInfoSectionProps {
  data: ContentSectionData;
}

export function ProductInfoSection({ data }: ProductInfoSectionProps) {
  const image = data.images?.[0] || data.image;

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2.75rem] border border-[#e5eef8] bg-white shadow-[0_30px_80px_-58px_rgba(15,23,42,0.7)]">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,#daecd4,#ffffff,#c5e1f5)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
          </div>

          <div className="rounded-[2.5rem] border border-[#e5eef8] bg-white p-7 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.55)] sm:p-9 md:p-10">
            {data.eyebrow ? (
              <span className="mb-4 inline-flex rounded-full bg-[#daecd4]/70 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#2a8d33]">
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.subtitle ? (
              <p className="mt-5 border-l-4 border-[#0097dc] pl-5 text-base leading-relaxed text-slate-650 sm:text-lg">
                {data.subtitle}
              </p>
            ) : null}
            {data.body?.length ? (
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {data.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {data.bullets?.length ? (
              <div className="mt-7 grid gap-3">
                {data.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-2xl border border-[#e5eef8] bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#4cb748]" />
                    {bullet}
                  </div>
                ))}
              </div>
            ) : null}
            {data.actions?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-full bg-[#0097dc] px-5 py-3 text-sm font-bold text-white hover:bg-[#00a5e1]"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
