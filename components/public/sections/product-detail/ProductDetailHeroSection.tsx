import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { HeroSectionData } from "@/components/public/sections/base/types";

export function ProductDetailHeroSection({ data }: { data: HeroSectionData }) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-28 lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(197,225,245,0.85),transparent_34%),linear-gradient(to_bottom,#fff,#f8fbff)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0097dc]">
            {data.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-black text-slate-950 sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          {data.subtitle ? (
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {data.subtitle}
            </p>
          ) : null}
          {data.actions?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-xl border border-[#91caee] bg-white px-6 py-3 text-sm font-black text-[#0097dc]"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-[#dce9f6] bg-[#f8fbff]">
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
  );
}
