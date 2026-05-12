import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type { CtaSectionData } from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface HomeCtaSectionProps {
  data: CtaSectionData;
}

export function HomeCtaSection({ data }: HomeCtaSectionProps) {
  return (
    <SectionReveal>
      <section className="relative isolate overflow-hidden bg-[#009bd8] py-[93px] text-white">
        {/* Optional dashboard background image */}
        {data.backgroundImage ? (
          <CmsImage
            src={data.backgroundImage.src}
            alt={data.backgroundImage.alt || data.title || "CTA background"}
            fill
            sizes="100vw"
            className="object-cover opacity-[0.08] mix-blend-overlay"
          />
        ) : null}

        {/* Soft background depth like the target */}
        <div className="pointer-events-none absolute inset-0 bg-[#009bd8]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.16),transparent_38%),radial-gradient(circle_at_74%_52%,rgba(0,122,184,0.22),transparent_34%)]" />

        {/* Same page padding rhythm as previous sections */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-[210px]">
          <div className="mx-auto max-w-[1120px] text-center">
            {data.eyebrow ? (
              <p className="mb-5 text-[13px] font-extrabold uppercase leading-none text-white/75">
                {data.eyebrow}
              </p>
            ) : null}

            <h2 className="mx-auto max-w-[1110px] text-[36px] font-black leading-[1.13] text-white sm:text-[44px] lg:text-[48px]">
              {data.title || "Ready to scale in the Syrian healthcare market?"}
            </h2>

            {data.description ? (
              <p className="mx-auto mt-[22px] max-w-[690px] text-[22px] font-semibold leading-[1.25] text-white/78">
                {data.description}
              </p>
            ) : null}

            {(data.primaryAction || data.secondaryAction) ? (
              <div className="mt-[43px] flex flex-col items-center justify-center gap-4 sm:flex-row rtl:sm:flex-row-reverse">
                {data.primaryAction ? (
                  <Link
                    href={data.primaryAction.href}
                    className={cn(
                      "inline-flex h-[54px] min-w-[304px] items-center justify-center rounded-full",
                      "bg-white px-8 text-[16px] font-extrabold leading-none text-[#009bd8]",
                      "shadow-[0_18px_35px_-24px_rgba(15,23,42,0.65)]",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7fbff]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#009bd8]",
                    )}
                  >
                    {data.primaryAction.label}
                  </Link>
                ) : null}

                {data.secondaryAction ? (
                  <Link
                    href={data.secondaryAction.href}
                    className={cn(
                      "inline-flex h-[54px] min-w-[227px] items-center justify-center rounded-full",
                      "border border-white/28 bg-transparent px-8 text-[16px] font-extrabold leading-none text-white",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#009bd8]",
                    )}
                  >
                    {data.secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
