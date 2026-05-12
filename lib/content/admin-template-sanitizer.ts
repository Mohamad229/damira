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
  "quality.ethicsCompliance",
  "partnerships.whyPartner",
  "partnerships.partnershipForm",
  "contact.contactForm",
]);

const ARRAY_LENGTH_LIMITS = new Map<string, number>([
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

    return arrayValue.map((item, index) =>
      sanitizeValueAgainstTemplate(item, itemTemplate, context ? {
        pageKey: context.pageKey,
        sectionKey: context.sectionKey,
        path: [...(context.path ?? []), String(index)],
      } : undefined),
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
