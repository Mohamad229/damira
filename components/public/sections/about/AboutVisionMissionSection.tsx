import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface VisionMissionBlock {
  title: string;
  description: string;
}

interface AboutVisionMissionSectionProps {
  data: {
    title: string;
    description?: string;
    vision: VisionMissionBlock;
    mission: VisionMissionBlock;
  };
}

export function AboutVisionMissionSection({
  data,
}: AboutVisionMissionSectionProps) {
  const blocks = [data.vision, data.mission];

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#91caee] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((block, index) => (
              <article
                key={block.title}
                className="group relative overflow-hidden rounded-[2rem] border border-[#dfeaf6] bg-[#f8fbff] p-6 shadow-[0_22px_55px_-44px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-1 sm:p-8"
              >
                <span className="absolute -right-4 -top-5 text-9xl font-black text-white">
                  0{index + 1}
                </span>
                <div className="relative">
                  <div className="mb-8 h-14 w-14 rounded-full bg-[#0097dc] p-2 shadow-[0_18px_32px_-20px_rgba(0,151,220,0.85)]">
                    <div className="h-full w-full rounded-full border border-white/50" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {block.description}
                  </p>
                  <div className="mt-8 h-1 w-16 rounded-full bg-[#f58238] transition-all duration-500 group-hover:w-full group-hover:bg-[#4cb748]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
