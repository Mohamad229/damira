import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface HomeSuccessHighlightSectionProps {
  data: ContentSectionData;
}

export function HomeSuccessHighlightSection({
  data,
}: HomeSuccessHighlightSectionProps) {
  const image = data.images?.[0] || data.image;

  return (
    <SectionReveal>
      <section className="bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-[#dceaf6] bg-white shadow-[0_30px_70px_-48px_rgba(15,23,42,0.5)] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-80 bg-[#edf8ff]">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0097dc]/45 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              {data.eyebrow ? (
                <p className="text-xs font-bold uppercase text-[#0097dc]">
                  {data.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                {data.title}
              </h2>
              {data.subtitle ? (
                <p className="mt-4 border-s-4 border-[#4cb748] ps-4 text-base leading-7 text-slate-600">
                  {data.subtitle}
                </p>
              ) : null}
              {data.body?.length ? (
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {data.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {data.bullets?.length ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {data.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl border border-[#e8eff7] bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      <span className="me-2 inline-block h-2 w-2 rounded-full bg-[#f58238]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {data.actions?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {data.actions.map((action, index) => (
                    <Link
                      key={`${action.href}-${action.label}`}
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
