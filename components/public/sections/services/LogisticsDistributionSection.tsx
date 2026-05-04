import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface LogisticsDistributionSectionProps {
  data: ContentSectionData;
}

export function LogisticsDistributionSection({
  data,
}: LogisticsDistributionSectionProps) {
  return <ServiceFeatureSection data={data} index={4} accent="orange" />;
}
