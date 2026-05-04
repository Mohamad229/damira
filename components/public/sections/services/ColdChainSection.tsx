import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface ColdChainSectionProps {
  data: ContentSectionData;
}

export function ColdChainSection({ data }: ColdChainSectionProps) {
  return <ServiceFeatureSection data={data} index={1} accent="green" />;
}
