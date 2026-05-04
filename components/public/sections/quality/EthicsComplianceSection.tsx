import { Scale, Ban, Handshake, BookOpenCheck } from "lucide-react";
import { ContentSectionData } from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";

interface EthicsComplianceSectionProps {
  data?: ContentSectionData; // Optional so we can still use fallback content if CMS lacks it
}

export function EthicsComplianceSection({ data }: EthicsComplianceSectionProps) {
  // Using default content if CMS data not present
  const defaultItems = [
    {
      title: "Formal Code of Conduct",
      description: "Aligned with international anti-corruption standards and promotional codes - binding for all staff and partners.",
      icon: <Scale className="h-6 w-6 text-[#4cb748]" />,
    },
    {
      title: "No Off-Label Promotion",
      description: "Scientific exchange is driven exclusively by approved clinical evidence. Zero tolerance for off-label promotional activities.",
      icon: <Ban className="h-6 w-6 text-[#4cb748]" />,
    },
    {
      title: "Fair-Market-Value Arrangements",
      description: "Transparent, fair-market-value arrangements with healthcare professionals and institutions - no hidden incentives.",
      icon: <Handshake className="h-6 w-6 text-[#4cb748]" />,
    },
    {
      title: "Regular Training & Audits",
      description: "Staff training on compliance topics and internal compliance audits conducted on a regular scheduled basis.",
      icon: <BookOpenCheck className="h-6 w-6 text-[#4cb748]" />,
    },
  ];

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
        {/* Subtle Background Elements */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#f0fdf4] opacity-50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#e5eef8] opacity-50 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex rounded-full bg-[#daecd4]/70 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#2a8d33]">
              {data?.eyebrow || "Our Standards"}
            </span>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data?.title || "Ethics & Compliance Commitment"}
            </h2>
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#4cb748]" />
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              {data?.subtitle ||
                "Operating with unwavering integrity across all business functions to ensure transparency and accountability."}
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {defaultItems.map((item, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e5eef8] bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)]"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0fdf4] shadow-inner transition-transform group-hover:scale-110 group-hover:bg-[#4cb748]/10">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-auto text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}