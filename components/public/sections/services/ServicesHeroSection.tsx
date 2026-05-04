import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/public/sections/base";
import type { HeroSectionData } from "@/components/public/sections/base/types";

export function ServicesHeroSection({ data }: { data: HeroSectionData }) {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] pt-24 pb-16 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,#f8fbff_0%,#ffffff_44%,#eef8fe_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-[2rem] border border-[#dcecf8] bg-white p-6 shadow-[0_28px_80px_-55px_rgba(15,23,42,0.7)] sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-[#daecd4] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#2c8c2b]">
                {data.eyebrow || "Operational services"}
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {data.title}
              </h1>
              {data.subtitle ? (
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  {data.subtitle}
                </p>
              ) : null}
              {data.actions?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {data.actions.map((action, index) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={
                        index === 0
                          ? "rounded-xl bg-[#0097dc] px-6 py-3 text-sm font-bold text-white"
                          : "rounded-xl border border-[#91caee] px-6 py-3 text-sm font-bold text-[#0097dc]"
                      }
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative min-h-[340px] overflow-hidden rounded-[1.7rem] bg-[#eaf6fd]">
              {data.backgroundImage ? (
                <Image
                  src={data.backgroundImage.src}
                  alt={data.backgroundImage.alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0097dc]/24 via-transparent to-[#4cb748]/16" />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
