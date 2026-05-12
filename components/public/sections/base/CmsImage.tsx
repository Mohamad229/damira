import type { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CmsImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src?: string | null;
  alt?: string | null;
  fill?: boolean;
}

export function CmsImage({
  src,
  alt = "",
  className,
  fill = false,
  loading = "lazy",
  ...props
}: CmsImageProps) {
  if (!src) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- CMS media may use Vercel Blob URLs that should render without image optimizer coupling.
    <img
      src={src}
      alt={alt || ""}
      loading={loading}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      {...props}
    />
  );
}
