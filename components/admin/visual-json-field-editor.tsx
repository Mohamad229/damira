"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  GripVertical,
  ImageIcon,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createItemFromTemplate,
  parseJsonForSanitizer,
  sanitizeTemplateValue,
  sanitizeValueAgainstTemplate,
  stringifySanitized,
  type SanitizedJson,
} from "@/lib/content/admin-template-sanitizer";
import { cn } from "@/lib/utils";

import { MediaPicker } from "./media-picker";

import type { MediaWithUser } from "@/lib/actions/media";

type JsonValue = SanitizedJson;

interface VisualJsonFieldEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  template?: unknown;
  sanitizerContext?: {
    pageKey: string;
    sectionKey: string;
  };
}

interface EditorNodeProps {
  value: JsonValue;
  template: JsonValue;
  path: string[];
  onChange: (value: JsonValue) => void;
}

const LONG_TEXT_KEYS = new Set([
  "description",
  "subtitle",
  "body",
  "paragraph",
  "caption",
  "summary",
  "emptyMetricsText",
]);

const URL_KEY_PATTERN = /(href|url|link|src)$/i;
const MEDIA_KEY_PATTERN = /(image|icon|logo|photo|media|thumbnail|illustration)$/i;
const INTERNAL_KEYS = new Set(["id"]);

function isPlainObject(value: unknown): value is Record<string, JsonValue> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function itemLabel(key: string, index: number, value: JsonValue): string {
  const valueTitle = isPlainObject(value) && typeof value.title === "string" ? value.title.trim() : "";
  if (valueTitle) {
    return valueTitle;
  }

  const singular: Record<string, string> = {
    actions: "Button",
    bullets: "List item",
    cards: "Card",
    departments: "Contact card",
    highlights: "Carousel item",
    items: "Item",
    metrics: "Metric",
    paragraphs: "Paragraph",
    slides: "Carousel item",
    stats: "Stat",
  };

  return `${singular[key] ?? "Item"} ${index + 1}`;
}

function itemKey(path: string[], index: number, value: JsonValue): string {
  if (isPlainObject(value) && typeof value.id === "string" && value.id.trim()) {
    return value.id;
  }

  return `${path.join(".") || "root"}-${index}`;
}

function isMediaObject(key: string, value: JsonValue, template: JsonValue): boolean {
  const objectValue = isPlainObject(value) ? value : isPlainObject(template) ? template : null;
  if (!objectValue) {
    return false;
  }

  return (
    MEDIA_KEY_PATTERN.test(key) ||
    (Object.prototype.hasOwnProperty.call(objectValue, "src") &&
      Object.prototype.hasOwnProperty.call(objectValue, "alt"))
  );
}

export function VisualJsonFieldEditor({
  value,
  onChange,
  label = "Content fields",
  template,
  sanitizerContext,
}: VisualJsonFieldEditorProps) {
  const parsedValue = useMemo(() => parseJsonForSanitizer(value), [value]);
  const normalizedTemplate = useMemo(
    () => sanitizeTemplateValue(template ?? parsedValue) ?? {},
    [template, parsedValue],
  );
  const effectiveValue = useMemo(
    () => sanitizeValueAgainstTemplate(parsedValue, normalizedTemplate, sanitizerContext),
    [parsedValue, normalizedTemplate, sanitizerContext],
  );

  const [rawDraft, setRawDraft] = useState(() => stringifySanitized(effectiveValue));
  const [rawError, setRawError] = useState<string | null>(null);

  useEffect(() => {
    setRawDraft(stringifySanitized(effectiveValue));
    setRawError(null);
  }, [effectiveValue]);

  function handleStructuredChange(nextValue: JsonValue) {
    const sanitizedValue = sanitizeValueAgainstTemplate(
      nextValue,
      normalizedTemplate,
      sanitizerContext,
    );

    setRawDraft(stringifySanitized(sanitizedValue));
    setRawError(null);
    onChange(JSON.stringify(sanitizedValue));
  }

  function handleRawChange(nextRawValue: string) {
    setRawDraft(nextRawValue);

    try {
      const parsedRawValue = JSON.parse(nextRawValue);
      const nextValue = sanitizeValueAgainstTemplate(
        sanitizeTemplateValue(parsedRawValue) ?? {},
        normalizedTemplate,
        sanitizerContext,
      );

      setRawError(null);
      onChange(JSON.stringify(nextValue));
    } catch {
      setRawError("Invalid JSON. The structured fields above remain unchanged until this is fixed.");
    }
  }

  return (
    <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">{label}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Edit simple structured fields. Media fields can be picked from the admin library.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Visual mode
        </span>
      </div>

      <EditorNode
        value={effectiveValue}
        template={normalizedTemplate}
        path={[]}
        onChange={handleStructuredChange}
      />

      <details className="group rounded-2xl border border-dashed border-border bg-muted/35 p-3 transition-colors open:bg-muted/50">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors group-open:text-foreground">
          <Code2 className="h-4 w-4" />
          Advanced developer JSON fallback
          <span className="ml-auto text-xs font-normal">Open only when needed</span>
        </summary>
        <div className="mt-3 space-y-2">
          <Textarea
            value={rawDraft}
            onChange={(event) => handleRawChange(event.target.value)}
            className="min-h-[240px] rounded-xl font-mono text-xs leading-5"
            spellCheck={false}
          />
          {rawError ? <p className="text-xs font-medium text-red-600">{rawError}</p> : null}
        </div>
      </details>
    </div>
  );
}

function EditorNode({ value, template, path, onChange }: EditorNodeProps) {
  const key = path[path.length - 1] ?? "content";

  if (Array.isArray(value) || Array.isArray(template)) {
    const arrayValue = Array.isArray(value) ? value : [];
    const itemTemplate = Array.isArray(template) && template.length > 0 ? template[0] : arrayValue[0] ?? "";

    return (
      <div className="space-y-3">
        {arrayValue.map((item, index) => (
          <div
            key={itemKey(path, index, item)}
            className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-200 hover:border-primary/25 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/35 px-3 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                <span className="truncate text-sm font-semibold text-foreground">
                  {itemLabel(key, index, item)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0"
                  disabled={index === 0}
                  onClick={() => {
                    const next = [...arrayValue];
                    [next[index - 1], next[index]] = [next[index], next[index - 1]];
                    onChange(next);
                  }}
                  aria-label="Move item up"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0"
                  disabled={index === arrayValue.length - 1}
                  onClick={() => {
                    const next = [...arrayValue];
                    [next[index], next[index + 1]] = [next[index + 1], next[index]];
                    onChange(next);
                  }}
                  aria-label="Move item down"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => onChange(arrayValue.filter((_, itemIndex) => itemIndex !== index))}
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <EditorNode
                value={item}
                template={itemTemplate}
                path={[...path, String(index)]}
                onChange={(nextItem) =>
                  onChange(arrayValue.map((existingItem, itemIndex) => (itemIndex === index ? nextItem : existingItem)))
                }
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
          onClick={() => onChange([...arrayValue, createItemFromTemplate(itemTemplate)])}
        >
          <Plus className="h-4 w-4" />
          Add {humanizeKey(key).toLowerCase().replace(/s$/, "")}
        </Button>
      </div>
    );
  }

  if (isPlainObject(value) || isPlainObject(template)) {
    const objectValue = isPlainObject(value) ? value : {};
    const objectTemplate = isPlainObject(template) ? template : objectValue;

    if (isMediaObject(key, objectValue, objectTemplate)) {
      return (
        <MediaObjectEditor
          value={sanitizeValueAgainstTemplate(objectValue, objectTemplate)}
          onChange={onChange}
          compact={/icon|logo/i.test(key)}
        />
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(objectTemplate).filter(([nestedKey]) => !INTERNAL_KEYS.has(nestedKey)).map(([nestedKey, nestedTemplate]) => {
          const nestedValue = sanitizeValueAgainstTemplate(objectValue[nestedKey], nestedTemplate);
          const isWide =
            Array.isArray(nestedValue) ||
            isPlainObject(nestedValue) ||
            LONG_TEXT_KEYS.has(nestedKey) ||
            nestedKey.toLowerCase().includes("description");

          return (
            <div key={nestedKey} className={cn("space-y-2", isWide && "md:col-span-2")}>
              <Label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {humanizeKey(nestedKey)}
              </Label>
              <EditorNode
                value={nestedValue}
                template={nestedTemplate}
                path={[...path, nestedKey]}
                onChange={(nextNestedValue) =>
                  onChange({
                    ...objectValue,
                    [nestedKey]: nextNestedValue,
                  })
                }
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <PrimitiveEditor
      fieldKey={key}
      value={value}
      onChange={onChange}
    />
  );
}

function PrimitiveEditor({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-3 py-2 shadow-sm transition-colors hover:border-primary/25">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-primary"
        />
        <span className="text-sm font-medium text-foreground">{value ? "Enabled" : "Disabled"}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <Input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rounded-xl bg-background"
      />
    );
  }

  const stringValue = typeof value === "string" ? value : "";

  if (LONG_TEXT_KEYS.has(fieldKey) || stringValue.length > 90) {
    return (
      <Textarea
        value={stringValue}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-xl bg-background leading-6"
      />
    );
  }

  return (
    <Input
      type={URL_KEY_PATTERN.test(fieldKey) ? "url" : "text"}
      value={stringValue}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-xl bg-background"
    />
  );
}

function MediaObjectEditor({
  value,
  onChange,
  compact,
}: {
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  compact?: boolean;
}) {
  const mediaValue = isPlainObject(value) ? value : {};
  const src = typeof mediaValue.src === "string" ? mediaValue.src : "";
  const alt = typeof mediaValue.alt === "string" ? mediaValue.alt : "";
  const [pickerOpen, setPickerOpen] = useState(false);

  function updateMedia(next: Record<string, JsonValue>) {
    onChange({
      ...mediaValue,
      ...next,
    });
  }

  function handleSelect(media: MediaWithUser) {
    updateMedia({
      src: media.url,
      alt: alt || media.name,
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border/70 bg-background p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/45 shadow-inner",
            compact ? "h-14 w-14" : "h-28 w-44",
          )}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element -- Admin previews must render newly selected Blob URLs immediately.
            <img
              src={src}
              alt={alt || ""}
              className={cn(
                "h-full w-full",
                compact ? "object-contain p-2" : "object-cover",
              )}
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Media asset</p>
          <p className="max-w-md text-xs leading-5 text-muted-foreground">
            Pick from the media library or paste a direct URL. Keep alt text descriptive for accessibility.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setPickerOpen(true)}>
              {src ? "Change media" : "Select media"}
            </Button>
            {src ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => updateMedia({ src: "" })}
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Media URL</Label>
          <Input value={src} onChange={(event) => updateMedia({ src: event.target.value })} className="rounded-xl bg-card" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Alt text</Label>
          <Input value={alt} onChange={(event) => updateMedia({ alt: event.target.value })} className="rounded-xl bg-card" />
        </div>
      </div>

      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={(media) => {
          if (Array.isArray(media)) {
            return;
          }

          handleSelect(media);
        }}
        title="Select media"
      />
    </div>
  );
}
