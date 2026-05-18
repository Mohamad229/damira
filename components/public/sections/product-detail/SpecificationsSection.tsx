import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import { cn } from "@/lib/utils";

interface SpecificationItem {
  label: string;
  value: string;
}

interface SpecificationsSectionProps {
  data: {
    title: string;
    description?: string;
    items: SpecificationItem[];
  };
}

export function SpecificationsSection({ data }: SpecificationsSectionProps) {
  const items = data.items || [];

  return (
    <SectionReveal>
      <section
        className={cn(
          "group/specifications relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
        )}
      >
        {/* Soft background depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,244,255,0.42),transparent_34%)] transition-transform duration-700 ease-out group-hover/specifications:scale-[1.015]" />

        <div
          className={cn(
            "relative z-10 w-full",
            "px-4 sm:px-6 md:px-8",
            "lg:px-[80px]",
            "xl:px-[120px]",
            "2xl:px-[210px]",
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "mb-[34px] max-w-[760px]",
              "sm:mb-[38px]",
              "lg:mb-[42px]",
              "xl:mb-[44px]",
            )}
          >
            <p
              className={cn(
                "font-black uppercase leading-none tracking-[0.22em] text-[#009fe3]",
                "text-[11px]",
                "sm:text-[12px] sm:tracking-[0.24em]",
              )}
            >
              Technical Dossier
            </p>

            <h2
              className={cn(
                "font-black leading-[1.04] tracking-[-0.055em] text-[#071329]",
                "mt-[16px]",
                "text-[34px]",
                "sm:text-[40px]",
                "md:text-[44px]",
                "xl:mt-[18px] xl:text-[48px]",
              )}
            >
              {data.title}
            </h2>

            {data.description ? (
              <p
                className={cn(
                  "max-w-[760px]",
                  "mt-[18px]",
                  "text-[15px] font-medium leading-[1.65] tracking-[-0.01em] text-[#263b59]",
                  "sm:text-[16px]",
                  "md:text-[17px] md:leading-[1.55]",
                  "xl:mt-[22px]",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Specification items */}
          <dl
            className={cn(
              "grid",
              "gap-[14px]",
              "sm:gap-[16px]",
              "md:grid-cols-2",
              "xl:gap-[18px]",
            )}
          >
            {items.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "relative overflow-hidden",
                  "rounded-[18px] sm:rounded-[20px] xl:rounded-[24px]",
                  "border border-[#dce9f6] bg-[#f8fbff]",
                  "px-[18px] py-[18px]",
                  "sm:px-[20px] sm:py-[20px]",
                  "xl:px-[22px] xl:py-[22px]",
                  "group/spec-item transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:scale-[1.01] hover:border-[#c5e1f5] hover:bg-white",
                  "hover:shadow-[0_22px_48px_-36px_rgba(15,23,42,0.52)]",
                )}
              >
                <dt
                  className={cn(
                    "font-black uppercase leading-none tracking-[0.2em] text-[#f58238] transition-colors duration-300 group-hover/spec-item:text-[#009fe3]",
                    "text-[11px]",
                    "sm:text-[12px] sm:tracking-[0.24em]",
                  )}
                >
                  {item.label}
                </dt>

                <dd
                  className={cn(
                    "break-words font-medium tracking-[-0.01em] text-[#071329] transition-colors duration-300 group-hover/spec-item:text-[#0b203d]",
                    "mt-[14px]",
                    "text-[15px] leading-[1.6]",
                    "sm:mt-[16px] sm:text-[16px] sm:leading-[1.55]",
                    "xl:mt-[18px]",
                  )}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SectionReveal>
  );
}