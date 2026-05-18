import type { LucideIcon } from "lucide-react";
import {
  Award,
  Building2,
  ChartNoAxesCombined,
  FileCheck2,
  Globe2,
  Handshake,
  Network,
  PackageCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import type {
  CardGridData,
  SectionIcon,
  ServiceCardData,
} from "@/components/public/sections/base/types";
import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

export interface WhyPartnerSectionData extends CardGridData {
  eyebrow?: string;
  subtitle?: string;
  items?: ServiceCardData[];
  cards?: ServiceCardData[];
  features?: ServiceCardData[];
  bullets?: string[];
}

interface WhyPartnerSectionProps {
  data?: WhyPartnerSectionData;
  className?: string;
}

type PartnerRawItem = ServiceCardData & {
  heading?: string;
  label?: string;
  subtitle?: string;
  text?: string;
  content?: string;
  body?: string | string[];
  iconName?: string;
};

type PartnerItem = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  icon?: SectionIcon;
  features?: string[];
};

const fallbackItems: PartnerItem[] = [
  {
    id: "global-innovators",
    title: "Global Innovators",
    description:
      "Multinational pharmaceutical and biotech companies seeking a compliant, audit-ready gateway into the Syrian market.",
    Icon: Globe2,
  },
  {
    id: "specialty-manufacturers",
    title: "Specialty Manufacturers",
    description:
      "Producers of niche therapeutics, orphan drugs, and complex medical devices requiring targeted commercialization.",
    Icon: Building2,
  },
  {
    id: "regional-distributors",
    title: "Regional Distributors",
    description:
      "MENA-region distributors looking for a reliable, highly-networked local partner for downstream execution.",
    Icon: Handshake,
  },
];

const iconMap: Record<string, LucideIcon> = {
  globe: Globe2,
  global: Globe2,
  building: Building2,
  company: Building2,
  manufacturer: Building2,
  handshake: Handshake,
  partner: Handshake,
  partnership: Handshake,
  network: Network,
  users: UsersRound,
  team: UsersRound,
  package: PackageCheck,
  distribution: PackageCheck,
  shield: ShieldCheck,
  compliance: ShieldCheck,
  file: FileCheck2,
  approval: FileCheck2,
  chart: ChartNoAxesCombined,
  growth: ChartNoAxesCombined,
  award: Award,
};

const iconThemes = [
  {
    iconWrap: "text-[#009fe3]",
    bullet: "bg-[#009fe3]",
    border: "group-hover:border-[#9ed8f8]",
  },
  {
    iconWrap: "text-[#2f8f54]",
    bullet: "bg-[#4cb748]",
    border: "group-hover:border-[#b7e3bb]",
  },
  {
    iconWrap: "text-[#f58238]",
    bullet: "bg-[#f58238]",
    border: "group-hover:border-[#ffd3b5]",
  },
];

function toText(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  return undefined;
}

function getFallbackIcon(index: number) {
  const icons = [
    Globe2,
    Building2,
    Handshake,
    Network,
    PackageCheck,
    ShieldCheck,
    UsersRound,
    FileCheck2,
    ChartNoAxesCombined,
    Award,
  ];

  return icons[index % icons.length] || Globe2;
}

function resolveIcon(item: PartnerRawItem, index: number): LucideIcon {
  const fallback = fallbackItems[index]?.Icon || getFallbackIcon(index);

  const iconValue =
    typeof item.icon === "string" ? item.icon : item.iconName;

  if (iconValue) {
    return iconMap[iconValue.toLowerCase()] || fallback;
  }

  if (item.icon && typeof item.icon === "function") {
    return item.icon as LucideIcon;
  }

  return fallback;
}

function resolveTitle(item: PartnerRawItem, index: number): string {
  return (
    item.title ||
    item.heading ||
    item.label ||
    fallbackItems[index]?.title ||
    "Strategic Partner"
  );
}

function resolveDescription(item: PartnerRawItem, index: number): string {
  return (
    item.description ||
    item.subtitle ||
    item.text ||
    item.content ||
    toText(item.body) ||
    fallbackItems[index]?.description ||
    ""
  );
}

function resolveItems(data?: WhyPartnerSectionData): PartnerItem[] {
  const sourceItems = data?.items || data?.cards || data?.features;

  if (sourceItems?.length) {
    return sourceItems.map((rawItem, index) => {
      const item = rawItem as PartnerRawItem;

      return {
        id: String(item.id || `${resolveTitle(item, index)}-${index}`),
        title: resolveTitle(item, index),
        description: resolveDescription(item, index),
        Icon: resolveIcon(item, index),
        icon: item.icon,
        features: item.features,
      };
    });
  }

  if (data?.bullets?.length) {
    return data.bullets.map((bullet, index) => {
      const fallback = fallbackItems[index] || fallbackItems[index % fallbackItems.length];

      return {
        id: fallback?.id || `partner-${index}`,
        title: bullet,
        description: fallback?.description || "",
        Icon: fallback?.Icon || getFallbackIcon(index),
      };
    });
  }

  return fallbackItems;
}

function getCardPlacementClass(index: number, total: number) {
  /*
    Same placement strategy as CoreValuesSection:
    Desktop uses 12 columns.
    Normal card = 4 columns, so each row has 3 cards.

    Balanced examples:
    1 card  => centered
    2 cards => centered
    4 cards => 3 + 1 centered
    5 cards => 3 + 2 centered
    7 cards => 3 + 3 + 1 centered
    8 cards => 3 + 3 + 2 centered
  */

  if (total === 1) {
    return cn(
      "md:col-span-2 md:mx-auto md:w-full md:max-w-[430px]",
      "xl:col-span-4 xl:col-start-5 xl:mx-0 xl:max-w-none",
    );
  }

  if (total === 2) {
    return cn(
      "md:col-span-1",
      index === 0 && "xl:col-span-4 xl:col-start-3",
      index === 1 && "xl:col-span-4 xl:col-start-7",
    );
  }

  const remainder = total % 3;
  const lastRowStartIndex = total - remainder;

  const isTabletOddLast = total % 2 === 1 && index === total - 1;

  const tabletClass = isTabletOddLast
    ? "md:col-span-2 md:mx-auto md:w-[calc((100%_-_24px)/2)] xl:mx-0 xl:w-full"
    : "md:col-span-1";

  if (remainder === 1 && index === lastRowStartIndex) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-5");
  }

  if (remainder === 2 && index === lastRowStartIndex) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-3");
  }

  if (remainder === 2 && index === lastRowStartIndex + 1) {
    return cn(tabletClass, "xl:col-span-4 xl:col-start-7");
  }

  return cn(tabletClass, "xl:col-span-4");
}

function PartnerCard({
  item,
  index,
  total,
}: {
  item: PartnerItem;
  index: number;
  total: number;
}) {
  const Icon = item.Icon;
  const theme = iconThemes[index % iconThemes.length];

  return (
    <article
      className={cn(
        getCardPlacementClass(index, total),
        "group relative overflow-hidden",
        "rounded-[18px] sm:rounded-[20px]",
        "border border-[#e8eef6] bg-[#f8fbff]",
        "min-h-[220px]",
        "px-[24px] py-[26px]",
        "sm:min-h-[232px] sm:px-[28px] sm:py-[30px]",
        "xl:min-h-[246px] xl:px-[32px] xl:pb-[32px] xl:pt-[31px]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[#dce8f4] hover:bg-white",
        "hover:shadow-[0_30px_64px_-44px_rgba(15,23,42,0.55)]",
      )}
    >
      <div
        className={cn(
          "mb-[22px] flex items-center justify-center rounded-full",
          "border border-[#edf2f7] bg-white",
          "h-[42px] w-[42px]",
          "sm:mb-[24px] sm:h-[44px] sm:w-[44px]",
          "xl:mb-[27px] xl:h-[46px] xl:w-[46px]",
          "shadow-[0_8px_18px_-16px_rgba(15,23,42,0.65)]",
          "transition-all duration-300 ease-out group-hover:scale-110",
          theme.iconWrap,
          theme.border,
        )}
      >
        {isSectionMediaIcon(item.icon) ? (
          <SectionIconImage
            icon={item.icon}
            width={22}
            height={22}
            className="h-[19px] w-[19px] object-contain transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[20px] sm:w-[20px] xl:h-[21px] xl:w-[21px]"
          />
        ) : (
          <Icon className="h-[19px] w-[19px] stroke-[2.25] transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[20px] sm:w-[20px] xl:h-[21px] xl:w-[21px]" />
        )}
      </div>

      <h3
        className={cn(
          "font-black leading-[1.2] tracking-[-0.025em] text-[#071329] transition-colors duration-300 group-hover:text-[#009fe3]",
          "text-[18px]",
          "sm:text-[19px]",
          "xl:text-[20px]",
        )}
      >
        {item.title}
      </h3>

      {item.description ? (
        <p
          className={cn(
            "mt-[13px] max-w-[390px]",
            "text-[14px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59] transition-colors duration-300 group-hover:text-[#1f334f]",
            "sm:mt-[15px] sm:text-[15px]",
            "xl:mt-[16px] xl:text-[16px] xl:leading-[1.55]",
          )}
        >
          {item.description}
        </p>
      ) : null}

      {item.features?.length ? (
        <ul className="mt-4 space-y-2 text-[14px] font-medium leading-6 tracking-[-0.01em] text-[#52627a]">
          {item.features.slice(0, 3).map((feature) => (
            <li key={feature} className="group/feature flex gap-2 transition-transform duration-300 ease-out hover:translate-x-1 rtl:hover:-translate-x-1">
              <span
                className={cn(
                  "mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 ease-out group-hover/feature:scale-125",
                  theme.bullet,
                )}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function WhyPartnerSection({ data, className }: WhyPartnerSectionProps) {
  const items = resolveItems(data);

  const eyebrow = data?.eyebrow || "Partnership Profile";
  const title = data?.title || "Who We Partner With";
  const description =
    data?.description ||
    data?.subtitle ||
    "We build tailored distribution models for different types of healthcare organizations.";

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/why-partner relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
          className,
        )}
      >
        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          <div
            className={cn(
              "mx-auto text-center",
              "mb-[42px] max-w-[760px]",
              "sm:mb-[50px]",
              "lg:mb-[58px]",
              "xl:mb-[66px] xl:max-w-[860px]",
            )}
          >
            {eyebrow ? (
              <span className="mb-[18px] inline-flex rounded-full bg-[#e5f3ec] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#2f8f54] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#dff0e7] sm:text-[12px]">
                {eyebrow}
              </span>
            ) : null}

            <h2
              className={cn(
                "font-black leading-[1.12] tracking-[-0.04em] text-[#071329]",
                "text-[32px]",
                "sm:text-[36px]",
                "xl:text-[38px]",
              )}
            >
              {title}
            </h2>

            {description ? (
              <p
                className={cn(
                  "mx-auto mt-[18px] max-w-[760px]",
                  "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                  "sm:text-[16px]",
                  "lg:text-[17px]",
                  "xl:mt-[22px] xl:text-[18px] xl:leading-[1.55]",
                )}
              >
                {description}
              </p>
            ) : null}
          </div>

          <div
            className={cn(
              "mx-auto grid",
              "grid-cols-1",
              "gap-[20px]",
              "sm:gap-[24px]",
              "md:grid-cols-2",
              "lg:gap-[28px]",
              "xl:grid-cols-12 xl:gap-[32px]",
            )}
          >
            {items.map((item, index) => (
              <PartnerCard
                key={item.id || `${item.title}-${index}`}
                item={item}
                index={index}
                total={items.length}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
