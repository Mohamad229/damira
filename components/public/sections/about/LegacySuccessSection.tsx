import {
  type ContentSectionData,
  type StatsSectionData,
} from "@/components/public/sections/base";
import { AboutContentSection } from "./AboutContentSection";
import { AboutStatsSection } from "./AboutStatsSection";

interface LegacySuccessSectionProps {
  data: {
    content: ContentSectionData;
    stats: StatsSectionData;
  };
}

export function LegacySuccessSection({ data }: LegacySuccessSectionProps) {
  return (
    <>
      <AboutStatsSection data={data.stats} />
      <AboutContentSection data={data.content} variant="legacy" />
    </>
  );
}
