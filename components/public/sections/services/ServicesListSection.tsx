import type {
  ContentSectionData,
  SectionAction,
  SectionIcon,
  SectionMedia,
} from "@/components/public/sections/base/types";

import { ServiceFeatureSection } from "./ServiceFeatureSection";

export interface ServiceItemData {
  id: string;
  isVisible?: boolean;
  eyebrow?: string;
  headerLabel?: string;
  anchorId?: string;
  href?: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: SectionIcon;
  image?: SectionMedia;
  features?: string[];
  cta?: SectionAction;
}

export interface ServicesListData {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: ServiceItemData[];
}

const accents = ["orange", "green", "blue"] as const;

export type NormalizedServiceItemData = ServiceItemData & {
  headerLabel: string;
  anchorId: string;
  href: string;
};

export function getServiceItemAnchorId(value?: string | null) {
  const slug = (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    return "services-item";
  }

  return slug.startsWith("services-") ? slug : `services-${slug}`;
}

function getUniqueAnchorId(anchorId: string, seenAnchors: Set<string>) {
  let candidate = anchorId;
  let counter = 2;

  while (seenAnchors.has(candidate)) {
    candidate = `${anchorId}-${counter}`;
    counter += 1;
  }

  seenAnchors.add(candidate);
  return candidate;
}

function hasVisibleContent(item: ServiceItemData) {
  return Boolean(
    item.title?.trim() ||
      item.subtitle?.trim() ||
      item.description?.trim() ||
      item.features?.some((feature) => feature.trim()),
  );
}

function normalizeServiceItem(
  item: ServiceItemData,
  seenAnchors: Set<string>,
): NormalizedServiceItemData {
  const anchorSource = item.anchorId || item.id || item.title;
  const anchorId = getUniqueAnchorId(
    getServiceItemAnchorId(anchorSource),
    seenAnchors,
  );
  const href = item.href?.trim() || `/services#${anchorId}`;
  const headerLabel = item.headerLabel?.trim() || item.title;

  return {
    ...item,
    headerLabel,
    anchorId,
    href,
  };
}

export function getVisibleServiceItems(
  items: ServiceItemData[],
): NormalizedServiceItemData[] {
  const seenAnchors = new Set<string>();

  return items
    .filter((item) => item.isVisible !== false && hasVisibleContent(item))
    .map((item) => normalizeServiceItem(item, seenAnchors));
}

function toContentSectionData(item: NormalizedServiceItemData): ContentSectionData {
  const cta =
    item.cta?.label && (item.cta.href || item.href)
      ? [{ ...item.cta, href: item.cta.href || item.href }]
      : undefined;

  return {
    eyebrow: item.eyebrow,
    title: item.title,
    subtitle: item.subtitle,
    body: item.description ? [item.description] : undefined,
    bullets: item.features,
    icon: item.icon,
    image: item.image,
    actions: cta,
  };
}

export function ServicesListSection({ data }: { data: ServicesListData }) {
  const visibleItems = getVisibleServiceItems(data.items);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <>
      {visibleItems.map((item, index) => (
        <ServiceFeatureSection
          key={item.id || `${item.title}-${index}`}
          sectionId={item.anchorId}
          data={toContentSectionData(item)}
          index={index}
          accent={accents[index % accents.length]}
        />
      ))}
    </>
  );
}
