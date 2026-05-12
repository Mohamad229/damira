import type { LucideIcon } from "lucide-react";
import {
  Ban,
  BookOpenCheck,
  Handshake,
  Scale,
  ShieldCheck,
} from "lucide-react";

import type {
  ContentSectionData,
  SectionIcon,
} from "@/components/public/sections/base/types";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface EthicsComplianceSectionProps {
  data?: ContentSectionData;
}

type EthicsRawItem = {
  id?: string;
  title?: string;
  description?: string;
  statusLabel?: string;
  icon?: SectionIcon;
};

type EthicsResolvedItem = {
  id: string;
  title: string;
  description: string;
  statusLabel?: string;
  Icon: LucideIcon;
  icon?: SectionIcon;
};

const fallbackItems: EthicsResolvedItem[] = [
  {
    id: "code-of-conduct",
    title: "Formal Code of Conduct",
    description:
      "Aligned with international anti-corruption standards and promotional codes — binding for all staff and partners.",
    statusLabel: "Compliant",
    Icon: Scale,
  },
  {
    id: "no-off-label",
    title: "No Off-Label Promotion",
    description:
      "Scientific exchange is driven exclusively by approved clinical evidence, with zero tolerance for off-label promotional activities.",
    statusLabel: "Approved Evidence",
    Icon: Ban,
  },
  {
    id: "fair-market-value",
    title: "Fair-Market-Value Arrangements",
    description:
      "Transparent fair-market-value arrangements with healthcare professionals and institutions — no hidden incentives.",
    statusLabel: "Transparent",
    Icon: Handshake,
  },
  {
    id: "training-audits",
    title: "Regular Training & Audits",
    description:
      "Staff training on compliance topics and internal compliance audits conducted on a regular scheduled basis.",
    statusLabel: "Regularly Audited",
    Icon: BookOpenCheck,
  },
];

const cardThemes = [
  {
    wrapper: "bg-[#edfbee]",
    icon: "text-[#2f8f54]",
    number: "text-[#e5f6e8]",
    border: "hover:border-[#4cb748]/45",
  },
  {
    wrapper: "bg-[#e2f4ff]",
    icon: "text-[#009fe3]",
    number: "text-[#e0f4ff]",
    border: "hover:border-[#009fe3]/40",
  },
  {
    wrapper: "bg-[#fff0e4]",
    icon: "text-[#f58238]",
    number: "text-[#fff0e4]",
    border: "hover:border-[#f58238]/35",
  },
  {
    wrapper: "bg-[#edfbee]",
    icon: "text-[#2f8f54]",
    number: "text-[#e5f6e8]",
    border: "hover:border-[#4cb748]/45",
  },
];

function getEthicsItems(data?: ContentSectionData): EthicsResolvedItem[] {
  const possibleItems = (
    data as unknown as { items?: EthicsRawItem[] } | undefined
  )?.items;

  if (possibleItems?.length) {
    return possibleItems.slice(0, 4).map((item, index) => {
      const fallback = fallbackItems[index] || fallbackItems[0];

      return {
        id: item.id || fallback.id,
        title: item.title || fallback.title,
        description: item.description || fallback.description,
        statusLabel: item.statusLabel || fallback.statusLabel,
        Icon: typeof item.icon === "function" ? item.icon : fallback.Icon,
        icon: item.icon,
      };
    });
  }

  if (data?.bullets?.length) {
    return data.bullets.slice(0, 4).map((bullet, index) => {
      const fallback = fallbackItems[index] || fallbackItems[0];

      return {
        ...fallback,
        title: bullet,
      };
    });
  }

  return fallbackItems;
}

function getDescription(data?: ContentSectionData) {
  const possibleDescription = (
    data as unknown as { description?: string } | undefined
  )?.description;

  return (
    data?.subtitle ||
    possibleDescription ||
    data?.body?.[0] ||
    "Operating with unwavering integrity across all business functions to ensure transparency, accountability, and responsible healthcare partnerships."
  );
}

export function EthicsComplianceSection({
  data,
}: EthicsComplianceSectionProps) {
  const items = getEthicsItems(data);

  const eyebrow = data?.eyebrow || "Our Standards";
  const title = data?.title || "Ethics & Compliance Commitment";
  const description = getDescription(data);

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white py-[88px] sm:py-[96px] lg:py-[104px]">
        <div className="pointer-events-none absolute left-[-180px] top-[-140px] h-[380px] w-[380px] rounded-full bg-[#edfbee] opacity-80 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-170px] right-[-160px] h-[420px] w-[420px] rounded-full bg-[#e2f4ff] opacity-80 blur-3xl" />

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-[120px] 2xl:px-[210px]">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="inline-flex rounded-full bg-[#e5f3ec] px-[16px] py-[7px] text-[12px] font-black uppercase leading-none tracking-[0.18em] text-[#2f8f54]">
              {eyebrow}
            </span>

            <h2 className="mt-[18px] text-[32px] font-black leading-[1.08] tracking-[-0.045em] text-[#071329] sm:text-[38px] lg:text-[44px]">
              {title}
            </h2>

            <div className="mx-auto mt-[24px] h-[4px] w-[66px] rounded-full bg-[#4cb748]" />

            <p className="mx-auto mt-[24px] max-w-[780px] text-[16px] font-medium leading-[1.65] tracking-[-0.012em] text-[#263b59] sm:text-[18px]">
              {description}
            </p>
          </div>

          <div className="mt-[62px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => {
              const Icon = item.Icon;
              const theme = cardThemes[index] || cardThemes[0];

              return (
                <article
                  key={item.id}
                  className={cn(
                    "group relative flex min-h-[310px] flex-col overflow-hidden rounded-[34px] border border-[#e5eef8] bg-white px-[30px] py-[34px]",
                    "shadow-[0_22px_55px_-48px_rgba(15,23,42,0.55)] transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-[0_32px_70px_-48px_rgba(15,23,42,0.75)]",
                    theme.border,
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none absolute right-[22px] top-[18px] text-[54px] font-black leading-none tracking-[-0.06em] rtl:left-[22px] rtl:right-auto",
                      theme.number,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={cn(
                      "relative z-10 mb-[30px] flex h-[58px] w-[58px] items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
                      theme.wrapper,
                      theme.icon,
                    )}
                  >
                    {isSectionMediaIcon(item.icon) ? (
                      <SectionIconImage
                        icon={item.icon}
                        width={30}
                        height={30}
                        className="h-[28px] w-[28px] object-contain"
                      />
                    ) : (
                      <Icon className="h-[28px] w-[28px] stroke-[2.25]" />
                    )}
                  </div>

                  <h3 className="relative z-10 text-[21px] font-black leading-[1.2] tracking-[-0.035em] text-[#071329]">
                    {item.title}
                  </h3>

                  <p className="relative z-10 mt-[18px] text-[15px] font-medium leading-[1.58] tracking-[-0.01em] text-[#263b59] sm:text-[16px]">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-[28px]">
                    <div className="h-px w-full bg-[#e8eef6]" />

                    <div className="mt-[18px] inline-flex items-center gap-[9px] text-[13px] font-black uppercase tracking-[0.11em] text-[#2f8f54]">
                      <ShieldCheck className="h-[16px] w-[16px] stroke-[2.3]" />
                      {item.statusLabel || "Compliant"}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
