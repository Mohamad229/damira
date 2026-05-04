import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

export function AboutContentSection({
  data,
  variant = "story",
}: {
  data: ContentSectionData;
  variant?: "story" | "legacy";
}) {
  const image = data.images?.[0] || data.image;
  const imageRight = data.imagePosition === "right";
  const accent = variant === "legacy" ? "#4cb748" : "#f58238";

  return (
    <section className="overflow-hidden border-y border-[#e8eff7] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className={cn(
              "space-y-5",
              imageRight ? "lg:order-1" : "lg:order-2",
            )}
          >
            {data.eyebrow ? (
              <p
                className="text-xs font-black uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                {data.eyebrow}
              </p>
            ) : null}
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.subtitle ? (
              <p
                className="border-s-4 ps-4 text-base leading-7 text-slate-600"
                style={{ borderColor: accent }}
              >
                {data.subtitle}
              </p>
            ) : null}
            {data.body?.length ? (
              <div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                {data.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {data.bullets?.length ? (
              <ul className="grid gap-3 pt-2 text-sm font-medium text-slate-700 sm:grid-cols-2">
                {data.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            {data.actions?.length ? (
              <div className="flex flex-wrap gap-3 pt-3">
                {data.actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-xl border border-[#91caee] px-5 py-3 text-sm font-bold text-[#0097dc] hover:bg-[#eef8fe]"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div
            className={cn(
              "relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#f7fbff] shadow-[0_24px_60px_-42px_rgba(15,23,42,0.65)]",
              imageRight ? "lg:order-2" : "lg:order-1",
            )}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 ring-1 ring-inset ring-[#e3eef8]" />
          </div>
        </div>
      </div>
    </section>
  );
}
