import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface MarketAccessSectionProps {
  data: ContentSectionData;
}

export function MarketAccessSection({ data }: MarketAccessSectionProps) {
  return <ServiceFeatureSection data={data} index={2} accent="blue" />;
}
