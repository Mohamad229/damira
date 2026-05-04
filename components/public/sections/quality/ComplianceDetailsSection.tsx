import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ContentSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface ComplianceDetailsSectionProps {
  data: ContentSectionData;
}

export function ComplianceDetailsSection({
  data,
}: ComplianceDetailsSectionProps) {
  const image = data.images?.[0] || data.image;

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          {/* Left Text/Content Card */}
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
              <p className="mt-5 border-l-4 border-[#4cb748] pl-5 text-base leading-relaxed text-slate-650 sm:text-lg">
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

            {data.actions?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-full bg-[#4cb748] px-5 py-3 text-sm font-bold text-white hover:bg-[#43a83f]"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right Image Card */}
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
          </div>

          {/* QMS Hub and Spoke Section */}
          {data.bullets?.length ? (
            <div className="mt-10 rounded-3xl bg-[#f0fdf4] p-6 sm:p-8 lg:col-span-2">
              {/* Mobile/Tablet Header (Hidden on Desktop where radial layout takes over) */}
              <div className="mb-8 text-center md:hidden">
                <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Quality Management System (QMS)
                </h3>
                <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#4cb748]" />
              </div>

              {/* Layout Container */}
              <div className="relative flex flex-col items-center justify-center md:min-h-[500px]">
                {/* Center Node (QMS) - Fixed in center on Desktop, hidden on Mobile */}
                <div className="hidden md:flex relative z-10 h-32 w-48 flex-col items-center justify-center rounded-[2.5rem] border-[3px] border-[#4cb748] bg-white shadow-lg transition-transform hover:scale-105">
                  <h3 className="text-center text-xl font-black text-slate-900">
                    QMS
                  </h3>
                  {/* <span className="mt-1 text-xs font-bold uppercase tracking-widest text-[#2a8d33]">
                    System
                  </span> */}
                </div>

                {/* Orbiting Info Nodes */}
                <div className="flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 md:absolute md:inset-0 md:block md:w-full md:h-full">
                  {data.bullets.map((bullet, index, arr) => {
                    // Calculate angle for radial distribution
                    const totalNodes = arr.length; // Fix: Use 'arr' from the map callback
                    // Start from top (-90 degrees) and distribute evenly
                    const angle =
                      (index / totalNodes) * 2 * Math.PI - Math.PI / 2;

                    // Elliptical radiuses for desktop layout (percentages)
                    const radiusX = 35; // Horizontal spread
                    const radiusY = 35; // Vertical spread

                    // Position relative to center (50%)
                    const leftPos = `calc(50% + ${Math.cos(angle) * radiusX}%)`;
                    const topPos = `calc(50% + ${Math.sin(angle) * radiusY}%)`;

                    return (
                      <div
                        key={bullet}
                        className="group relative overflow-hidden rounded-2xl border border-[#d7efd2] bg-white p-5 shadow-sm transition-all hover:scale-105 hover:shadow-md md:absolute md:w-[220px] md:-translate-x-1/2 md:-translate-y-1/2 md:[left:var(--md-left)] md:[top:var(--md-top)]"
                        style={
                          {
                            "--md-left": leftPos,
                            "--md-top": topPos,
                          } as React.CSSProperties
                        }
                      >
                        {/* Green indicator bar on the left */}
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#4cb748] transition-all group-hover:w-2" />

                        <div className="pl-3 text-sm font-bold leading-relaxed text-slate-700 md:pl-0 md:text-center">
                          {bullet}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </SectionReveal>
  );
}
