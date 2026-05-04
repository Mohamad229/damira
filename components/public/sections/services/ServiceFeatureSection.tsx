import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface ServiceFeatureSectionProps {
  data: ContentSectionData;
  index: number;
  accent?: "blue" | "green" | "orange";
}

const accentMap = {
  blue: "#0097dc",
  green: "#4cb748",
  orange: "#f58238",
};

export function ServiceFeatureSection({
  data,
  index,
  accent = "blue",
}: ServiceFeatureSectionProps) {
  const image = data.images?.[0] || data.image;
  const reversed = index % 2 === 1;
  const accentColor = accentMap[accent];

  return (
    <SectionReveal>
      <section
        className={cn(
          "bg-white py-14 sm:py-16 md:py-20",
          index % 2 === 0 && "bg-[#f8fbff]",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className={cn("lg:col-span-5", reversed && "lg:order-2")}>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#dfeaf6] bg-white p-3 shadow-[0_28px_65px_-46px_rgba(15,23,42,0.55)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem] bg-[#edf8ff]">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(45deg, ${accentColor}33, transparent 55%)`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cn("lg:col-span-7", reversed && "lg:order-1")}>
              <div className="rounded-[2rem] border border-[#e3edf8] bg-white p-6 shadow-[0_18px_45px_-42px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {data.eyebrow ? (
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      {data.eyebrow}
                    </span>
                  ) : null}
                </div>
                <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
                  {data.title}
                </h2>
                {data.subtitle ? (
                  <p className="mt-4 text-base leading-7 text-slate-600">
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
                        className="rounded-xl bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-slate-700"
                      >
                        <span
                          className="me-2 inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {data.actions?.length ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {data.actions.map((action, actionIndex) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className={cn(
                          "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition",
                          actionIndex === 0
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
        </div>
      </section>
    </SectionReveal>
  );
}
