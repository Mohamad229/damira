import type { ContentSectionData } from "@/components/public/sections/base/types";
import { ServiceFeatureSection } from "./ServiceFeatureSection";

interface MedicalSupportSectionProps {
  data: ContentSectionData;
}

export function MedicalSupportSection({ data }: MedicalSupportSectionProps) {
  return <ServiceFeatureSection data={data} index={3} accent="green" />;
}
