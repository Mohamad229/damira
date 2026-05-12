import {
  Award,
  BadgeCheck,
  FileSearch,
  Scale,
  ShieldCheck,
} from "lucide-react";

import {
  isSectionMediaIcon,
  SectionIconImage,
} from "@/components/public/sections/base/SectionIconImage";
import type {
  ContentSectionData,
  SectionIcon,
} from "@/components/public/sections/base/types";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface ComplianceDetailsSectionProps {
  data: ContentSectionData;
}

type ComplianceItem = {
  id?: string;
  title?: string;
  description?: string;
  icon?: SectionIcon;
  color?: "blue" | "green";
};

const fallbackItems: ComplianceItem[] = [
  {
    title: "ISO Certification",
    description:
      "Our quality management systems are certified to international ISO standards, ensuring continuous improvement, documented processes, and rigorous risk management across all operations.",
    color: "green",
  },
  {
    title: "FDA Compliance Alignment",
    description:
      "Our facilities and procedures are designed to align with stringent FDA guidelines for pharmaceutical handling, storage, and traceability, making us a trusted partner for US-based innovators.",
    color: "blue",
  },
  {
    title: "GDP Compliance",
    description:
      "Good Distribution Practice (GDP) is strictly enforced. Temperature mapping, qualification of transport routes, and rigorous cold chain management.",
    color: "blue",
  },
  {
    title: "Audit-Ready Infrastructure",
    description:
      "Open-book policy for our partners. Our facilities, documentation, and digital records are maintained in a perpetual state of audit readiness.",
    color: "blue",
  },
  {
    title: "Anti-Counterfeiting",
    description:
      "Advanced serialization and traceability protocols to guarantee product authenticity and protect the supply chain from falsified medicines.",
    color: "blue",
  },
];

function getItems(data: ContentSectionData): ComplianceItem[] {
  const possibleItems = (data as unknown as { items?: ComplianceItem[] }).items;

  if (possibleItems?.length) {
    return possibleItems.map((item, index) => ({
      ...fallbackItems[index],
      ...item,
    }));
  }

  if (data.bullets?.length) {
    return data.bullets.map((bullet, index) => ({
      ...fallbackItems[index],
      title: fallbackItems[index]?.title || bullet,
      description: bullet,
    }));
  }

  return fallbackItems;
}

function getIcon(index: number) {
  const icons = [Award, ShieldCheck, Scale, FileSearch, BadgeCheck];

  return icons[index] || ShieldCheck;
}

export function ComplianceDetailsSection({
  data,
}: ComplianceDetailsSectionProps) {
  const items = getItems(data);
  const topItems = items.slice(0, 2);

  const title = data.title || "Our Commitment to Excellence";

  const description =
    data.description ||
    data.subtitle ||
    data.body?.[0] ||
    "At Damira Pharma, quality is not a department—it is the operating system of our entire organization. We adhere to the strictest international guidelines to ensure product integrity from the manufacturer to the patient.";

  return (
    <SectionReveal>
      <section className="relative overflow-hidden bg-white py-[78px]">
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-[210px]">
          {/* Header */}
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[30px] font-black leading-[1.12] tracking-[-0.04em] text-[#071329] sm:text-[32px]">
              {title}
            </h2>

            {description ? (
              <p className="mx-auto mt-[22px] max-w-[760px] text-[17px] font-medium leading-[1.45] tracking-[-0.012em] text-[#263b59]">
                {description}
              </p>
            ) : null}
          </div>

          {/* Top certification cards */}
          <div className="mt-[70px] grid grid-cols-1 gap-[30px] lg:grid-cols-2">
            {topItems.map((item, index) => {
              const Icon = getIcon(index);
              const isGreen = item.color === "green" || index === 0;

              return (
                <article
                  key={item.id || `${item.title}-${index}`}
                  className={cn(
                    "relative overflow-hidden rounded-[24px]",
                    "border border-[#e8eef6] bg-[#f8fbff]",
                    "min-h-[216px]",
                    "px-[32px] py-[35px]",
                  )}
                >
                  <div className="mb-[26px]">
                    {isSectionMediaIcon(item.icon) ? (
                      <SectionIconImage
                        icon={item.icon}
                        width={44}
                        height={44}
                        className="h-[43px] w-[43px] object-contain"
                      />
                    ) : (
                      <Icon
                        className={cn(
                          "h-[43px] w-[43px] stroke-[2.25]",
                          isGreen ? "text-[#2f8f54]" : "text-[#009fe3]",
                        )}
                      />
                    )}
                  </div>

                  <h3 className="text-[24px] font-black leading-[1.18] tracking-[-0.035em] text-[#071329]">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-[18px] max-w-[620px] text-[15px] font-medium leading-[1.45] tracking-[-0.01em] text-[#263b59] sm:text-[16px]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>

          {/* Bottom three features */}
          {/* <div className="mt-[95px] grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-[72px]">
            {bottomItems.map((item, index) => {
              const realIndex = index + 2;
              const Icon = getIcon(realIndex);

              return (
                <article
                  key={item.id || `${item.title}-${realIndex}`}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-[29px] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#e2f4ff] text-[#009fe3]">
                    <Icon className="h-[29px] w-[29px] stroke-[2.25]" />
                  </div>

                  <h3 className="text-[20px] font-black leading-[1.18] tracking-[-0.035em] text-[#071329]">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-[17px] max-w-[360px] text-[15px] font-medium leading-[1.42] tracking-[-0.01em] text-[#263b59] sm:text-[16px]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div> */}
        </div>
      </section>
    </SectionReveal>
  );
}
