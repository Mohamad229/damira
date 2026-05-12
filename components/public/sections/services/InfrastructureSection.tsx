import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface InfrastructureSectionProps {
  data: ContentSectionData;
}

export function InfrastructureSection({ data }: InfrastructureSectionProps) {
  return <ServiceFeatureSection data={data} index={1} accent="green" />;
}
