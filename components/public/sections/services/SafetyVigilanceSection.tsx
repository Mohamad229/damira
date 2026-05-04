import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface SafetyVigilanceSectionProps {
  data: ContentSectionData;
}

export function SafetyVigilanceSection({ data }: SafetyVigilanceSectionProps) {
  return <ServiceFeatureSection data={data} index={2} accent="blue" />;
}
