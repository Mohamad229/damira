import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpenCheck,
  ClipboardCheck,
  FileSearch,
  Handshake,
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

interface QmsArchitectureSectionProps {
  data?: ContentSectionData;
}

type QmsRawItem = {
  id?: string;
  title?: string;
  description?: string;
  icon?: SectionIcon;
};

type QmsResolvedItem = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  icon?: SectionIcon;
};

const fallbackItems: QmsResolvedItem[] = [
  {
    id: "sop-capa",
    title: "SOP framework and CAPA workflows",
    description:
      "Documented procedures, corrective actions, and preventive quality controls.",
    Icon: ClipboardCheck,
  },
  {
    id: "gdp-gsp",
    title: "GDP and GSP compliance protocols",
    description:
      "Controlled distribution and storage practices across the full quality chain.",
    Icon: Award,
  },
  {
    id: "audits-documentation",
    title: "Internal audits and full documentation",
    description:
      "Traceable records and audit-ready documentation for continuous oversight.",
    Icon: FileSearch,
  },
  {
    id: "conduct-fmv",
    title: "Code of conduct and fair-market-value policies",
    description:
      "Transparent commercial conduct aligned with ethical partnership standards.",
    Icon: Handshake,
  },
  {
    id: "training",
    title: "Continuous compliance training",
    description:
      "Ongoing capability-building to keep teams aligned with quality standards.",
    Icon: BookOpenCheck,
  },
];

const nodeThemes = [
  {
    bar: "bg-[#4cb748]",
    iconWrap: "bg-[#edfbee]",
    icon: "text-[#2f8f54]",
    hoverBorder: "hover:border-[#4cb748]/50",
    glow: "group-hover:shadow-[0_28px_60px_-44px_rgba(76,183,72,0.95)]",
  },
  {
    bar: "bg-[#f58238]",
    iconWrap: "bg-[#fff0e4]",
    icon: "text-[#f58238]",
    hoverBorder: "hover:border-[#f58238]/45",
    glow: "group-hover:shadow-[0_28px_60px_-44px_rgba(245,130,56,0.95)]",
  },
  {
    bar: "bg-[#009fe3]",
    iconWrap: "bg-[#e2f4ff]",
    icon: "text-[#009fe3]",
    hoverBorder: "hover:border-[#009fe3]/45",
    glow: "group-hover:shadow-[0_28px_60px_-44px_rgba(0,159,227,0.95)]",
  },
  {
    bar: "bg-[#f58238]",
    iconWrap: "bg-[#fff0e4]",
    icon: "text-[#f58238]",
    hoverBorder: "hover:border-[#f58238]/45",
    glow: "group-hover:shadow-[0_28px_60px_-44px_rgba(245,130,56,0.95)]",
  },
  {
    bar: "bg-[#009fe3]",
    iconWrap: "bg-[#e2f4ff]",
    icon: "text-[#009fe3]",
    hoverBorder: "hover:border-[#009fe3]/45",
    glow: "group-hover:shadow-[0_28px_60px_-44px_rgba(0,159,227,0.95)]",
  },
];

function getQmsItems(data?: ContentSectionData): QmsResolvedItem[] {
  const possibleItems = (
    data as unknown as { items?: QmsRawItem[] } | undefined
  )?.items;

  if (possibleItems?.length) {
    const resolved: QmsResolvedItem[] = possibleItems.slice(0, 5).map((item, index) => {
      const fallback = fallbackItems[index] || fallbackItems[0];

      return {
        id: item.id || fallback.id,
        title: item.title || fallback.title,
        description: item.description || fallback.description,
        Icon: typeof item.icon === "function" ? item.icon : fallback.Icon,
        icon: item.icon,
      };
    });

    while (resolved.length < 5) {
      resolved.push(fallbackItems[resolved.length]);
    }

    return resolved;
  }

  if (data?.bullets?.length) {
    const resolved = data.bullets.slice(0, 5).map((bullet, index) => {
      const fallback = fallbackItems[index] || fallbackItems[0];

      return {
        ...fallback,
        title: bullet,
      };
    });

    while (resolved.length < 5) {
      resolved.push(fallbackItems[resolved.length]);
    }

    return resolved;
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
    "A centralized quality management framework connecting procedures, audits, documentation, training, and ethical governance into one resilient operating system."
  );
}

function QmsHubCard({
  label,
  className,
  compact = false,
}: {
  label: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative z-20 mx-auto flex flex-col items-center justify-center border-2 border-[#4cb748] bg-white text-center",
        "shadow-[0_34px_78px_-52px_rgba(47,143,84,0.95)]",
        compact
          ? "h-[126px] w-[196px] rounded-full px-6 py-5"
          : "w-full rounded-[28px] px-6 py-7 sm:rounded-[32px] sm:px-8 sm:py-8",
        className,
      )}
    >
      {!compact ? (
        <div className="mb-[14px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#edfbee] text-[#2f8f54]">
          <ShieldCheck className="h-[30px] w-[30px] stroke-[2.35]" />
        </div>
      ) : null}

      <h3
        className={cn(
          "font-black leading-none tracking-[-0.05em] text-[#071329]",
          compact ? "text-[32px]" : "text-[30px] sm:text-[34px]",
        )}
      >
        {label}
      </h3>

      {/* {!compact ? (
        <p className="mt-[12px] max-w-[220px] text-[13px] font-bold leading-[1.45] tracking-[-0.01em] text-[#58708d] sm:text-[14px]">
          Central quality management hub
        </p>
      ) : null} */}
    </div>
  );
}

function QmsNodeCard({
  item,
  index,
  className,
  variant = "grid",
}: {
  item: QmsResolvedItem;
  index: number;
  className?: string;
  variant?: "grid" | "diagram";
}) {
  const Icon = item.Icon;
  const theme = nodeThemes[index] || nodeThemes[0];

  return (
    <article
      className={cn(
        "group relative w-full overflow-hidden border border-[#d9eadf] bg-white/95 backdrop-blur",
        "shadow-[0_22px_50px_-40px_rgba(15,23,42,0.55)]",
        "transition-all duration-300 hover:-translate-y-1 hover:bg-white",
        "hover:shadow-[0_34px_74px_-50px_rgba(15,23,42,0.75)]",
        theme.hoverBorder,
        theme.glow,
        variant === "diagram"
          ? "rounded-[22px] px-5 py-5 text-center"
          : "rounded-[24px] px-5 py-5 sm:rounded-[26px] sm:px-6 sm:py-6",
        className,
      )}
    >
      {variant === "grid" ? (
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-[5px] rtl:left-auto rtl:right-0",
            theme.bar,
          )}
        />
      ) : null}

      <div
        className={cn(
          "relative z-10 flex gap-[15px]",
          variant === "diagram"
            ? "flex-col items-center text-center"
            : "items-start text-start",
        )}
      >
        <div
          className={cn(
            "flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full",
            "transition-transform duration-300 group-hover:scale-110",
            theme.iconWrap,
            theme.icon,
          )}
        >
          {isSectionMediaIcon(item.icon) ? (
            <SectionIconImage
              icon={item.icon}
              width={28}
              height={28}
              className="h-[25px] w-[25px] object-contain"
            />
          ) : (
            <Icon className="h-[25px] w-[25px] stroke-[2.25]" />
          )}
        </div>

        <div>
          <h4 className="text-[15px] font-black leading-[1.35] tracking-[-0.03em] text-[#071329] sm:text-[16px]">
            {item.title}
          </h4>

          <p className="mt-[8px] text-[13px] font-semibold leading-[1.55] tracking-[-0.01em] text-[#58708d] sm:text-[14px]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function QmsArchitectureSection({ data }: QmsArchitectureSectionProps) {
  const items = getQmsItems(data);

  const title = data?.title || "Quality Management System";
  const eyebrow =
    (data as unknown as { eyebrow?: string } | undefined)?.eyebrow ||
    "QMS Framework";
  const description = getDescription(data);
  const hubLabel =
    (data as unknown as { hubLabel?: string } | undefined)?.hubLabel || "QMS";

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-[#f8fbff] py-[76px] sm:py-[88px] lg:py-[96px] xl:py-[104px]">
        <div className="pointer-events-none absolute left-[-180px] top-[-170px] h-[360px] w-[360px] rounded-full bg-[#e8f8ed] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-190px] right-[-160px] h-[430px] w-[430px] rounded-full bg-[#e2f4ff] blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-[1420px] px-4 sm:px-6 md:px-8 lg:px-[72px] 2xl:px-[120px]">
          <div className="mx-auto max-w-[880px] text-center">
            <span className="inline-flex rounded-full bg-[#e5f3ec] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#2f8f54] sm:text-[12px]">
              {eyebrow}
            </span>

            <h2 className="mt-[18px] text-[30px] font-black leading-[1.08] tracking-[-0.045em] text-[#071329] sm:text-[38px] lg:text-[42px] xl:text-[44px]">
              {title}
            </h2>

            <p className="mx-auto mt-[20px] max-w-[780px] text-[16px] font-medium leading-[1.65] tracking-[-0.012em] text-[#263b59] sm:text-[18px]">
              {description}
            </p>
          </div>

          <div className="relative mx-auto mt-[48px] max-w-[1220px] sm:mt-[56px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[540px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,183,72,0.13),transparent_67%)] blur-[2px] xl:block" />

            {/* Small / tablet / medium layout: stacked free cards */}
            <div className="relative z-10 xl:hidden">
              <QmsHubCard label={hubLabel} className="max-w-[340px]" />

              <div className="mx-auto mt-7 grid max-w-[980px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                {items.map((item, index) => (
                  <QmsNodeCard
                    key={item.id}
                    item={item}
                    index={index}
                    variant="grid"
                    className={cn(
                      "min-h-[150px]",
                      index === 4 && "sm:col-span-2",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Desktop layout: free pentagon around the QMS hub */}
            <div className="relative hidden min-h-[620px] xl:block">
              <svg
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                viewBox="0 0 1220 620"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Pentagon outline */}
                <path
                  d="M610 76 L1003 200 L897 505 L323 505 L217 200 Z"
                  fill="none"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="9 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Hub spokes */}
                <path
                  d="M610 310 L610 76"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                />
                <path
                  d="M610 310 L1003 200"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                />
                <path
                  d="M610 310 L897 505"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                />
                <path
                  d="M610 310 L323 505"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                />
                <path
                  d="M610 310 L217 200"
                  stroke="#bfe8c7"
                  strokeWidth="2"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                />
              </svg>

              {/* info 1 - top */}
              <QmsNodeCard
                item={items[0]}
                index={0}
                variant="diagram"
                className="absolute left-1/2 top-0 z-10 min-h-[150px] w-[286px] -translate-x-1/2"
              />

              {/* info 2 - upper right */}
              <QmsNodeCard
                item={items[1]}
                index={1}
                variant="diagram"
                className="absolute right-[74px] top-[122px] z-10 min-h-[150px] w-[286px] rtl:left-[74px] rtl:right-auto"
              />

              {/* info 3 - lower right */}
              <QmsNodeCard
                item={items[2]}
                index={2}
                variant="diagram"
                className="absolute bottom-[38px] right-[180px] z-10 min-h-[150px] w-[286px] rtl:left-[180px] rtl:right-auto"
              />

              {/* QMS - center */}
              <QmsHubCard
                label={hubLabel}
                compact
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              />

              {/* info 4 - lower left */}
              <QmsNodeCard
                item={items[3]}
                index={3}
                variant="diagram"
                className="absolute bottom-[38px] left-[180px] z-10 min-h-[150px] w-[286px] rtl:left-auto rtl:right-[180px]"
              />

              {/* info 5 - upper left */}
              <QmsNodeCard
                item={items[4]}
                index={4}
                variant="diagram"
                className="absolute left-[74px] top-[122px] z-10 min-h-[150px] w-[286px] rtl:left-auto rtl:right-[74px]"
              />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
