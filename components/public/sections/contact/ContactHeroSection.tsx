import Image from "next/image";
import type { HeroSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base";

export function ContactHeroSection({ data }: { data: HeroSectionData }) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(254,226,205,0.75),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(197,225,245,0.85),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <span className="rounded-full bg-[#fee2cd] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f58238]">
              {data.eyebrow || "Contact"}
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-950 sm:text-5xl lg:text-6xl">
              {data.title}
            </h1>
            {data.subtitle ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {data.subtitle}
              </p>
            ) : null}
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-[#e5eef8] bg-[#f8fbff]">
            {data.backgroundImage ? (
              <Image
                src={data.backgroundImage.src}
                alt={data.backgroundImage.alt || data.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
