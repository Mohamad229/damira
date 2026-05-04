import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface CompanyOverviewSectionProps {
  data: ContentSectionData;
}

export function CompanyOverviewSection({ data }: CompanyOverviewSectionProps) {
  const image = data.images?.[0] || data.image;

  return (
    <SectionReveal>
      <section className="bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-[#fee2cd]/70" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_26px_70px_-46px_rgba(15,23,42,0.5)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#edf8ff]">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#e1edf7] bg-white p-6 shadow-[0_24px_55px_-46px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
              {data.eyebrow ? (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0097dc]">
                  {data.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                {data.title}
              </h2>
              {data.subtitle ? (
                <p className="mt-4 border-s-4 border-[#f58238] ps-4 text-base leading-7 text-slate-600">
                  {data.subtitle}
                </p>
              ) : null}
              {data.body?.length ? (
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {data.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {data.bullets?.length ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {data.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      <span className="me-2 inline-block h-2 w-2 rounded-full bg-[#4cb748]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {data.actions?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {data.actions.map((action, index) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition",
                        index === 0
                          ? "bg-[#0097dc] text-white hover:bg-[#00a5e1]"
                          : "border border-[#91caee] text-[#0097dc] hover:bg-[#c5e1f5]/35",
                      )}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
