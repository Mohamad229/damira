type JsonPrimitive = string | number | boolean | null;
export type SanitizedJson =
  | JsonPrimitive
  | SanitizedJson[]
  | { [key: string]: SanitizedJson };

type SanitizedRecord = Record<string, SanitizedJson>;
type SanitizerContext = {
  pageKey: string;
  sectionKey: string;
  path?: string[];
};

const ARRAY_ICON_KEYS = new Set(["items", "features", "cards"]);

const SERVICE_ICON_SECTIONS = new Set([
  "services.infrastructure",
  "services.regulatory",
  "services.marketAccess",
  "services.logisticsDistribution",
  "services.safetyVigilance",
]);

const ITEM_ICON_SECTIONS = new Set([
  "home.strategicFocus",
  "home.keyStrengths",
  "about.coreValues",
  "quality.complianceDetails",
  "quality.qmsArchitecture",
  "quality.certificates",
  "quality.ethicsCompliance",
  "partnerships.whyPartner",
  "partnerships.partnershipForm",
  "contact.contactForm",
]);

const ARRAY_LENGTH_LIMITS = new Map<string, number>([
  ["home.coverageReach.items", 4],
  ["about.companyOverview.images", 3],
  ["about.legacySuccess.stats.items", 4],
  ["quality.complianceDetails.items", 2],
  ["quality.ethicsCompliance.items", 4],
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSanitizedRecord(value: unknown): value is SanitizedRecord {
  return isRecord(value);
}

function isCompatiblePrimitive(
  current: SanitizedJson | undefined,
  template: SanitizedJson,
): boolean {
  if (current === undefined) {
    return false;
  }

  if (template === null) {
    return (
      current === null ||
      typeof current === "string" ||
      typeof current === "number" ||
      typeof current === "boolean"
    );
  }

  if (typeof template === "number") {
    return typeof current === "number" && Number.isFinite(current);
  }

  return typeof current === typeof template;
}

function isReactLikeObject(value: Record<string, unknown>): boolean {
  return typeof value.render === "function" || value.$$typeof !== undefined;
}

function isIconLikeKey(key: string): boolean {
  return /icon$/i.test(key);
}

function isMediaRecord(value: SanitizedJson | undefined): value is SanitizedRecord {
  return (
    isSanitizedRecord(value) &&
    typeof value.src === "string" &&
    typeof value.alt === "string"
  );
}

function isAllowedIconPath(
  pageKey: string,
  sectionKey: string,
  path: string[],
): boolean {
  const sectionId = `${pageKey}.${sectionKey}`;
  const fieldKey = path[path.length - 1];

  if (fieldKey !== "icon") {
    return false;
  }

  if (SERVICE_ICON_SECTIONS.has(sectionId)) {
    return path.length === 1;
  }

  if (!ITEM_ICON_SECTIONS.has(sectionId)) {
    return false;
  }

  return (
    path.length === 3 &&
    ARRAY_ICON_KEYS.has(path[0]) &&
    /^\d+$/.test(path[1])
  );
}

export function sanitizeTemplateValue(
  value: unknown,
  context?: SanitizerContext,
): SanitizedJson | undefined {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "function" || typeof value === "symbol") {
    return undefined;
  }

  const path = context?.path ?? [];

  if (Array.isArray(value)) {
    return value
      .map((item, index) =>
        sanitizeTemplateValue(
          item,
          context
            ? {
                pageKey: context.pageKey,
                sectionKey: context.sectionKey,
                path: [...path, String(index)],
              }
            : undefined,
        ),
      )
      .filter((item): item is SanitizedJson => item !== undefined);
  }

  if (isRecord(value)) {
    if (isReactLikeObject(value)) {
      return undefined;
    }

    const output: SanitizedRecord = {};

    for (const [key, child] of Object.entries(value)) {
      const childPath = [...path, key];

      const sanitizedChild = sanitizeTemplateValue(
        child,
        context
          ? {
              pageKey: context.pageKey,
              sectionKey: context.sectionKey,
              path: childPath,
            }
            : undefined,
      );

      if (
        context &&
        isIconLikeKey(key) &&
        !isAllowedIconPath(context.pageKey, context.sectionKey, childPath) &&
        !isMediaRecord(sanitizedChild)
      ) {
        continue;
      }

      if (sanitizedChild !== undefined) {
        output[key] = sanitizedChild;
      }
    }

    return output;
  }

  return undefined;
}

function getArrayLengthLimit(context: SanitizerContext | undefined): number | null {
  if (!context) {
    return null;
  }

  const path = context.path ?? [];
  const key = `${context.pageKey}.${context.sectionKey}.${path.join(".")}`;
  return ARRAY_LENGTH_LIMITS.get(key) ?? null;
}

function slugifyAnchor(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeServiceAnchorId(value: unknown, fallback: unknown): string {
  const source =
    typeof value === "string" && value.trim()
      ? value
      : typeof fallback === "string" && fallback.trim()
        ? fallback
        : "item";
  const slug = slugifyAnchor(source);

  if (!slug) {
    return "services-item";
  }

  return slug.startsWith("services-") ? slug : `services-${slug}`;
}

function uniqueServiceAnchorId(anchorId: string, seen: Set<string>): string {
  let candidate = anchorId;
  let counter = 2;

  while (seen.has(candidate)) {
    candidate = `${anchorId}-${counter}`;
    counter += 1;
  }

  seen.add(candidate);
  return candidate;
}

function normalizeServiceItemRecord(
  item: SanitizedJson,
  seenAnchors: Set<string>,
): SanitizedJson {
  if (!isSanitizedRecord(item)) {
    return item;
  }

  const fallbackAnchor = item.id || item.title || item.headerLabel;
  const anchorId = uniqueServiceAnchorId(
    normalizeServiceAnchorId(item.anchorId, fallbackAnchor),
    seenAnchors,
  );
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const headerLabel =
    typeof item.headerLabel === "string" && item.headerLabel.trim()
      ? item.headerLabel.trim()
      : title;

  return {
    ...item,
    headerLabel,
    anchorId,
    href: `/services#${anchorId}`,
  };
}

function normalizeContextualArray(
  value: SanitizedJson[],
  context: SanitizerContext | undefined,
): SanitizedJson[] {
  if (
    context?.pageKey !== "services" ||
    context.sectionKey !== "serviceItems" ||
    (context.path ?? []).join(".") !== "items"
  ) {
    return value;
  }

  const seenAnchors = new Set<string>();
  return value.map((item) => normalizeServiceItemRecord(item, seenAnchors));
}

export function emptyFromTemplate(template: SanitizedJson): SanitizedJson {
  if (Array.isArray(template)) {
    return [];
  }

  if (isSanitizedRecord(template)) {
    return Object.fromEntries(
      Object.entries(template).map(([key, nestedTemplate]) => [
        key,
        emptyFromTemplate(nestedTemplate),
      ]),
    );
  }

  if (typeof template === "number") {
    return 0;
  }

  if (typeof template === "boolean") {
    return false;
  }

  return "";
}

function normalizeCurrentValue(value: unknown): SanitizedJson | undefined {
  return sanitizeTemplateValue(value);
}

function hasTemplateKeyOverlap(
  current: SanitizedRecord,
  template: SanitizedRecord,
): boolean {
  return Object.keys(template).some((key) =>
    Object.prototype.hasOwnProperty.call(current, key),
  );
}

function unwrapStoredDataField(
  current: SanitizedJson | undefined,
  template: SanitizedJson,
): SanitizedJson | undefined {
  if (!isSanitizedRecord(current) || !isSanitizedRecord(template)) {
    return current;
  }

  const nestedData = current.data;
  if (!isSanitizedRecord(nestedData)) {
    return current;
  }

  if (
    Object.keys(current).length === 1 ||
    !hasTemplateKeyOverlap(current, template)
  ) {
    return nestedData;
  }

  return current;
}

export function sanitizeValueAgainstTemplate(
  currentValue: unknown,
  templateValue: SanitizedJson,
  context?: SanitizerContext,
): SanitizedJson {
  const normalizedCurrent = unwrapStoredDataField(
    normalizeCurrentValue(currentValue),
    templateValue,
  );

  if (Array.isArray(templateValue)) {
    if (!Array.isArray(normalizedCurrent)) {
      const limit = getArrayLengthLimit(context);
      return limit === null ? templateValue : templateValue.slice(0, limit);
    }

    if (templateValue.length === 0) {
      return normalizedCurrent;
    }

    const itemTemplate = templateValue[0] ?? null;
    const limit = getArrayLengthLimit(context);
    const arrayValue = limit === null ? normalizedCurrent : normalizedCurrent.slice(0, limit);

    return normalizeContextualArray(
      arrayValue.map((item, index) =>
        sanitizeValueAgainstTemplate(
          item,
          itemTemplate,
          context
            ? {
                pageKey: context.pageKey,
                sectionKey: context.sectionKey,
                path: [...(context.path ?? []), String(index)],
              }
            : undefined,
        ),
      ),
      context,
    );
  }

  if (isSanitizedRecord(templateValue)) {
    const currentRecord = isSanitizedRecord(normalizedCurrent)
      ? normalizedCurrent
      : {};

    return Object.fromEntries(
      Object.entries(templateValue).map(([key, nestedTemplate]) => [
        key,
        sanitizeValueAgainstTemplate(
          currentRecord[key],
          nestedTemplate,
          context
            ? {
                pageKey: context.pageKey,
                sectionKey: context.sectionKey,
                path: [...(context.path ?? []), key],
              }
            : undefined,
        ),
      ]),
    );
  }

  if (isCompatiblePrimitive(normalizedCurrent, templateValue)) {
    return normalizedCurrent === undefined ? templateValue : normalizedCurrent;
  }

  return templateValue;
}

export function createItemFromTemplate(template: SanitizedJson): SanitizedJson {
  const item = emptyFromTemplate(template);

  if (isSanitizedRecord(item) && isSanitizedRecord(template) && "id" in template) {
    return {
      ...item,
      id: `cms-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
  }

  return item;
}

export function parseJsonForSanitizer(value: string): SanitizedJson {
  try {
    return sanitizeTemplateValue(JSON.parse(value)) ?? {};
  } catch {
    return {};
  }
}

export function stringifySanitized(value: SanitizedJson): string {
  return JSON.stringify(value, null, 2);
}
