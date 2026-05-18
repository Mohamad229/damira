import { CmsImage } from "@/components/public/sections/base/CmsImage";
import { SectionReveal } from "@/components/public/sections/base/SectionReveal";
import type {
  ContentSectionData,
  SectionMedia,
} from "@/components/public/sections/base/types";
import { cn } from "@/lib/utils";

interface CompanyOverviewSectionProps {
  data: ContentSectionData;
}

function getRenderableImages(data: ContentSectionData): SectionMedia[] {
  return (
    data.images
      ?.slice(0, 3)
      .filter((image): image is SectionMedia => Boolean(image?.src?.trim())) ??
    []
  );
}

function OverviewImageFrame({
  image,
  className,
  sizes,
}: {
  image: SectionMedia;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[#eef6fb]",
        "shadow-[0_20px_35px_-30px_rgba(15,23,42,0.65)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_55px_-36px_rgba(15,23,42,0.72)]",
        className,
      )}
    >
      <CmsImage
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}

export function CompanyOverviewSection({ data }: CompanyOverviewSectionProps) {
  const images = getRenderableImages(data);
  const title =
    data.title || "A New Healthcare Platform with Deep Operational Roots";

  return (
    <SectionReveal>
      <section
        className={cn(
          "relative overflow-hidden bg-white",
          "py-[72px] sm:py-[82px] lg:py-[90px] xl:py-[96px]",
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
              "grid items-center",
              "gap-[48px] md:gap-[58px]",
              images.length > 0
                ? "lg:grid-cols-[0.92fr_1fr] lg:gap-[56px] xl:grid-cols-[0.9fr_1fr] xl:gap-[72px]"
                : "max-w-[850px]",
            )}
          >
            {/* Left content */}
            <div className="max-w-[710px]">
              {data.eyebrow ? (
                <p
                  className={cn(
                    "mb-[15px] text-[12px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#009fe3]",
                    "sm:text-[13px]",
                    "xl:mb-[17px] xl:text-[14px]",
                  )}
                >
                  {data.eyebrow}
                </p>
              ) : null}

              <h2
                className={cn(
                  "font-black leading-[1.1] tracking-[-0.045em] text-[#071329]",
                  "text-[30px]",
                  "sm:text-[34px]",
                  "md:text-[36px]",
                  "xl:text-[38px]",
                )}
              >
                {title}
              </h2>

              {data.subtitle ? (
                <p
                  className={cn(
                    "mt-[22px] max-w-[690px]",
                    "text-[16px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                    "sm:text-[17px]",
                    "md:text-[18px]",
                    "xl:mt-[27px] xl:text-[19px] xl:leading-[1.55]",
                  )}
                >
                  {data.subtitle}
                </p>
              ) : null}

              {data.body?.length ? (
                <div
                  className={cn(
                    "mt-[22px] max-w-[690px] space-y-[20px]",
                    "text-[16px] font-medium leading-[1.6] tracking-[-0.01em] text-[#263b59]",
                    "sm:text-[17px]",
                    "md:text-[18px] md:space-y-[22px]",
                    "xl:mt-[27px] xl:space-y-[25px] xl:text-[19px] xl:leading-[1.55]",
                  )}
                >
                  {data.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {data.bullets?.length ? (
                <ul
                  className={cn(
                    "mt-[28px] grid gap-3",
                    "sm:grid-cols-2",
                    "xl:mt-[31px]",
                  )}
                >
                  {data.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "rounded-[14px] bg-[#f3faff]",
                        "px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_35px_-30px_rgba(15,23,42,0.6)]",
                        "text-[13px] font-bold leading-5 tracking-[-0.01em] text-[#263b59]",
                        "sm:text-[14px]",
                        "xl:rounded-[16px]",
                      )}
                    >
                      <span className="me-2 inline-block h-2 w-2 rounded-full bg-[#4cb748]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Right image collage */}
            {images.length > 0 ? (
              <div
                className={cn(
                  images.length === 1 ? "grid" : "grid grid-cols-2",
                  "gap-[12px] sm:gap-[14px] xl:gap-[16px]",
                  images.length === 1
                    ? "min-h-[320px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[470px] xl:min-h-[512px]"
                    : "min-h-[360px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[470px] xl:min-h-[512px]",
                )}
              >
                {images.length === 1 ? (
                  <OverviewImageFrame
                    image={images[0]}
                    sizes="(min-width: 1536px) 44vw, (min-width: 1024px) 50vw, 100vw"
                    className={cn(
                      "min-h-[320px] rounded-[12px]",
                      "sm:min-h-[420px] sm:rounded-[14px]",
                      "md:min-h-[480px]",
                      "lg:min-h-[470px]",
                      "xl:min-h-[512px]",
                    )}
                  />
                ) : null}

                {images.length === 2 ? (
                  images.map((image) => (
                    <OverviewImageFrame
                      key={`${image.src}-${image.alt}`}
                      image={image}
                      sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 25vw, 50vw"
                      className={cn(
                        "min-h-[300px] rounded-[12px]",
                        "sm:min-h-[420px] sm:rounded-[14px]",
                        "md:min-h-[460px]",
                        "lg:min-h-[440px]",
                        "xl:min-h-[480px]",
                      )}
                    />
                  ))
                ) : null}

                {images.length >= 3 ? (
                  <>
                    {/* Left stack */}
                    <div className="flex flex-col gap-[12px] sm:gap-[14px] xl:gap-[16px]">
                      <OverviewImageFrame
                        image={images[0]}
                        sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                        className={cn(
                          "h-[145px] rounded-[12px]",
                          "sm:h-[178px] sm:rounded-[14px]",
                          "md:h-[195px]",
                          "lg:h-[178px]",
                          "xl:h-[192px]",
                        )}
                      />

                      <OverviewImageFrame
                        image={images[1]}
                        sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                        className={cn(
                          "h-[194px] rounded-[12px]",
                          "sm:h-[250px] sm:rounded-[14px]",
                          "md:h-[270px]",
                          "lg:h-[238px]",
                          "xl:h-[257px]",
                        )}
                      />
                    </div>

                    {/* Right stack */}
                    <div
                      className={cn(
                        "flex flex-col gap-[12px] sm:gap-[14px] xl:gap-[16px]",
                        "pt-[34px]",
                        "sm:pt-[44px]",
                        "md:pt-[48px]",
                        "lg:pt-[42px]",
                        "xl:pt-[49px]",
                      )}
                    >
                      <OverviewImageFrame
                        image={images[2]}
                        sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 38vw, 50vw"
                        className={cn(
                          "h-[194px] rounded-[12px]",
                          "sm:h-[250px] sm:rounded-[14px]",
                          "md:h-[270px]",
                          "lg:h-[238px]",
                          "xl:h-[257px]",
                        )}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
