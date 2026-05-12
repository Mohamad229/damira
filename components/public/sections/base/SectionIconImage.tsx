import type { SectionIcon, SectionMedia } from "./types";
import { CmsImage } from "./CmsImage";

export function isSectionMediaIcon(icon: SectionIcon | undefined): icon is SectionMedia {
  return Boolean(
    icon &&
      typeof icon === "object" &&
      "src" in icon &&
      typeof icon.src === "string" &&
      icon.src.length > 0,
  );
}

export function SectionIconImage({
  icon,
  className,
  width = 40,
  height = 40,
}: {
  icon: SectionMedia;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <CmsImage
      src={icon.src}
      alt={icon.alt || ""}
      width={width}
      height={height}
      className={className ?? "h-10 w-10 object-contain"}
    />
  );
}
