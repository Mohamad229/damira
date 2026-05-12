import { CheckCircle2, ShieldCheck } from "lucide-react";

import { CmsImage } from "@/components/public/sections/base/CmsImage";
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

interface PartnershipAdvantageSectionProps {
  data?: ContentSectionData;
  className?: string;
}

type AdvantageRawItem = {
  id?: string | number;
  title?: string;
  heading?: string;
  label?: string;
  description?: string;
  subtitle?: string;
  text?: string;
  content?: string;
  body?: string | string[];
  icon?: SectionIcon;
};

type AdvantageItem = {
  id: string;
  title: string;
  description?: string;
  icon?: SectionIcon;
};

type AdvantageImage = {
  src: string;
  alt?: string;
};

type PartnershipAdvantageData = ContentSectionData & {
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  items?: AdvantageRawItem[];
  cards?: AdvantageRawItem[];
  features?: AdvantageRawItem[];
  image?: AdvantageImage;
  images?: AdvantageImage[];
};

const fallbackItems: AdvantageItem[] = [
  {
    id: "risk-mitigation",
    title: "Risk Mitigation",
    description:
      "Rigorous compliance frameworks protect your brand reputation in complex markets.",
  },
  {
    id: "accelerated-access",
    title: "Accelerated Access",
    description:
      "Our regulatory expertise speeds up registration and market entry timelines.",
  },
  {
    id: "deep-market-penetration",
    title: "Deep Market Penetration",
    description:
      "Established relationships with KOLs, hospitals, and major pharmacy chains.",
  },
  {
    id: "transparent-reporting",
    title: "Transparent Reporting",
    description:
      "Real-time data sharing on sales, inventory, and pharmacovigilance.",
  },
];

const cardThemes = [
  {
    icon: "text-[#009fe3]",
    iconBg: "bg-[#e2f4ff]",
    bar: "bg-[#009fe3]",
    border: "hover:border-[#9ed8f8]",
  },
  {
    icon: "text-[#2f8f54]",
    iconBg: "bg-[#edfbee]",
    bar: "bg-[#4cb748]",
    border: "hover:border-[#b7e3bb]",
  },
  {
    icon: "text-[#f58238]",
    iconBg: "bg-[#fff0e4]",
    bar: "bg-[#f58238]",
    border: "hover:border-[#ffd3b5]",
  },
];

function toText(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  return undefined;
}

function getItemTitle(item: AdvantageRawItem, index: number): string {
  return (
    item.title ||
    item.heading ||
    item.label ||
    fallbackItems[index]?.title ||
    "Partnership Advantage"
  );
}

function getItemDescription(
  item: AdvantageRawItem,
  index: number,
): string | undefined {
  return (
    item.description ||
    item.subtitle ||
    item.text ||
    item.content ||
    toText(item.body) ||
    fallbackItems[index]?.description
  );
}

function getAdvantageItems(data?: ContentSectionData): AdvantageItem[] {
  const sectionData = data as PartnershipAdvantageData | undefined;

  const sourceItems =
    sectionData?.items || sectionData?.cards || sectionData?.features;

  if (sourceItems?.length) {
    return sourceItems.map((item, index) => ({
      id: String(item.id || fallbackItems[index]?.id || `advantage-${index}`),
      title: getItemTitle(item, index),
      description: getItemDescription(item, index),
      icon: item.icon,
    }));
  }

  if (data?.bullets?.length) {
    return data.bullets.map((bullet, index) => ({
      id: fallbackItems[index]?.id || `advantage-${index}`,
      title: bullet,
      description: fallbackItems[index]?.description,
    }));
  }

  return fallbackItems;
}

function getSectionDescription(data?: ContentSectionData): string | undefined {
  const sectionData = data as PartnershipAdvantageData | undefined;

  return (
    sectionData?.description ||
    sectionData?.subtitle ||
    toText(data?.body?.[0]) ||
    toText(data?.body)
  );
}

function getImage(data?: ContentSectionData): AdvantageImage | undefined {
  const sectionData = data as PartnershipAdvantageData | undefined;

  return sectionData?.images?.[0] || sectionData?.image;
}

function getCardPlacementClass(index: number, total: number) {
  if (total === 1) {
    return "sm:col-span-2";
  }

  if (total % 2 === 1 && index === total - 1) {
    return "sm:col-span-2";
  }

  return "";
}

function AdvantageCard({
  item,
  index,
  total,
}: {
  item: AdvantageItem;
  index: number;
  total: number;
}) {
  const theme = cardThemes[index % cardThemes.length];

  return (
    <article
      className={cn(
        getCardPlacementClass(index, total),
        "group relative overflow-hidden rounded-[18px] border border-[#e8eef6] bg-[#f8fbff]",
        "px-[20px] py-[22px]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:bg-white",
        "hover:shadow-[0_22px_46px_-38px_rgba(15,23,42,0.5)]",
        "sm:px-[22px] sm:py-[24px]",
        "xl:px-[24px] xl:py-[25px]",
        theme.border,
      )}
    >
      <div
        className={cn(
          "mb-[16px] flex h-[42px] w-[42px] items-center justify-center rounded-full",
          "transition-transform duration-300 group-hover:scale-105",
          theme.iconBg,
          theme.icon,
        )}
      >
        {isSectionMediaIcon(item.icon) ? (
          <SectionIconImage
            icon={item.icon}
            width={24}
            height={24}
            className="h-[21px] w-[21px] object-contain"
          />
        ) : (
          <CheckCircle2 className="h-[21px] w-[21px] stroke-[2.35]" />
        )}
      </div>

      <h3 className="text-[17px] font-black leading-[1.22] tracking-[-0.025em] text-[#071329] sm:text-[18px]">
        {item.title}
      </h3>

      {item.description ? (
        <p className="mt-[10px] text-[14px] font-medium leading-[1.55] tracking-[-0.01em] text-[#263b59] sm:text-[15px]">
          {item.description}
        </p>
      ) : null}

      <span
        className={cn(
          "absolute bottom-0 left-0 h-[4px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100",
          theme.bar,
        )}
      />
    </article>
  );
}

export function PartnershipAdvantageSection({
  data,
  className,
}: PartnershipAdvantageSectionProps) {
  const sectionData = data as PartnershipAdvantageData | undefined;

  const eyebrow = sectionData?.eyebrow || "Partnership Advantage";
  const title = data?.title || "The Damira Advantage";
  const description =
    getSectionDescription(data) ||
    "A partnership model built around compliance, access, market execution, and transparent performance reporting.";

  const items = getAdvantageItems(data);
  const image = getImage(data);
  const overlayTitle = sectionData?.overlayTitle || "Compliant Market Access";
  const overlayDescription =
    sectionData?.overlayDescription ||
    "Built for resilient healthcare partnerships.";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
          className,
        )}
      >
        <div className="pointer-events-none absolute left-[-190px] top-[-180px] h-[380px] w-[380px] rounded-full bg-[#e2f4ff] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-220px] right-[-180px] h-[440px] w-[440px] rounded-full bg-[#edfbee] blur-3xl" />

        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          {/* Center title */}
          <div
            className={cn(
              "mx-auto text-center",
              "mb-[34px] max-w-[800px]",
              "sm:mb-[42px]",
              "lg:mb-[50px]",
              "xl:mb-[56px]",
            )}
          >
            {eyebrow ? (
              <span className="mb-[18px] inline-flex rounded-full bg-[#e5f3ec] px-[16px] py-[7px] text-[11px] font-black uppercase leading-none tracking-[0.18em] text-[#2f8f54] sm:text-[12px]">
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

          {/* Mobile: image then cards. Desktop: cards left, image right */}
          <div
            className={cn(
              "mx-auto grid max-w-[1220px] items-stretch",
              "gap-[28px]",
              "lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-[44px]",
              "xl:grid-cols-[minmax(0,1.02fr)_minmax(430px,0.98fr)] xl:gap-[56px]",
            )}
          >
            {/* Cards left on desktop, below image on mobile */}
            <div className="order-2 lg:order-1 rtl:lg:order-2">
              <div
                className={cn(
                  "grid grid-cols-1 gap-[18px]",
                  "sm:grid-cols-2 sm:gap-[20px]",
                  "xl:gap-[22px]",
                )}
              >
                {items.map((item, index) => (
                  <AdvantageCard
                    key={item.id || `${item.title}-${index}`}
                    item={item}
                    index={index}
                    total={items.length}
                  />
                ))}
              </div>
            </div>

            {/* Image right on desktop, after title on mobile */}
            <div className="order-1 lg:order-2 rtl:lg:order-1">
              <div
                className={cn(
                  "relative h-full overflow-hidden rounded-[22px]",
                  "border border-[#e8eef6] bg-[#f8fbff]",
                  "shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)]",
                  "sm:rounded-[24px]",
                )}
              >
                <div
                  className={cn(
                    "relative w-full",
                    "h-[260px]",
                    "sm:h-[340px]",
                    "md:h-[400px]",
                    "lg:h-full lg:min-h-[430px]",
                    "xl:min-h-[470px]",
                  )}
                >
                  {image?.src ? (
                    <CmsImage
                      src={image.src}
                      alt={image.alt || title || "Damira Pharma partnership"}
                      fill
                      sizes="(min-width: 1280px) 430px, (min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(135deg,#dceffb_0%,#ffffff_52%,#eef8f1_100%)]" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,41,0)_30%,rgba(7,19,41,0.24)_100%)]" />
                </div>

                <div
                  className={cn(
                    "absolute bottom-4 left-4 right-4",
                    "rounded-[18px] border border-white/55 bg-white/90",
                    "p-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.75)] backdrop-blur-md",
                    "sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-[20px] sm:p-5",
                  )}
                >
                  <div className="flex items-center gap-3 rtl:text-right">
                    <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#edfbee] text-[#2f8f54]">
                      <ShieldCheck className="h-[22px] w-[22px] stroke-[2.35]" />
                    </div>

                    <div>
                      <p className="text-[14px] font-black leading-[1.2] tracking-[-0.02em] text-[#071329] sm:text-[16px]">
                        {overlayTitle}
                      </p>

                      <p className="mt-[4px] text-[12px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#58708d] sm:text-[13px]">
                        {overlayDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
