import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface RegulatoryServicesSectionProps {
  data: ContentSectionData;
}

export function RegulatoryServicesSection({
  data,
}: RegulatoryServicesSectionProps) {
  return <ServiceFeatureSection data={data} index={0} accent="orange" />;
}
