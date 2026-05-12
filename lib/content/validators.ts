/**
 * Content Validation Schemas
 *
 * Zod validators for page content updates and creation.
 * Ensures data integrity for structured content system.
 */

import { z } from "zod";
import type { FieldValue } from "@/lib/content/types";

/**
 * Schema for updating a single field
 */
export const updatePageContentFieldSchema = z.object({
  sectionKey: z.string().min(1),
  fieldKey: z.string().min(1),
  value: z.string().nullable(),
});

export type UpdatePageContentField = z.infer<
  typeof updatePageContentFieldSchema
>;

/**
 * Schema for updating multiple fields in a section
 */
export const updatePageContentSectionSchema = z.object({
  sectionKey: z.string().min(1),
  fields: z.record(z.string(), z.string().nullable()),
});

export type UpdatePageContentSection = z.infer<
  typeof updatePageContentSectionSchema
>;

/**
 * Schema for updating entire page content
 */
export const updatePageContentSchema = z.object({
  pageKey: z.string().min(1),
  locale: z.enum(["en", "ar"]),
  title: z.string().min(1, "Title is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  sections: z.record(z.string(), z.record(z.string(), z.string().nullable())),
});

export type UpdatePageContent = z.infer<typeof updatePageContentSchema>;

/**
 * Helper: Parse JSON field value
 */
export function parseFieldValue(
  value: string | null,
  fieldType: string,
): FieldValue {
  if (!value) return null;

  try {
    if (fieldType === "json") {
      const parsed = JSON.parse(value);

      // Backward compatibility: old records may contain stringified JSON inside JSON.
      if (typeof parsed === "string") {
        try {
          return JSON.parse(parsed);
        } catch {
          return parsed;
        }
      }

      return parsed;
    }
    if (fieldType === "number") {
      return parseFloat(value);
    }
    if (fieldType === "boolean") {
      return value === "true" || value === "1";
    }
    return value;
  } catch (error) {
    console.error("Error parsing field value:", error);
    return null;
  }
}

/**
 * Helper: Serialize field value to string for storage
 */
export function serializeFieldValue(
  value: unknown,
  fieldType: string,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (fieldType === "json") {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return null;
      }

      // If UI sends JSON text, validate and normalize it before storage.
      const parsed = JSON.parse(trimmed);
      return JSON.stringify(parsed);
    }

    return JSON.stringify(value);
  }
  if (fieldType === "boolean") {
    return value ? "true" : "false";
  }
  if (fieldType === "number") {
    return String(value);
  }
  return String(value);
}

/**
 * Helper: Validate JSON array format
 */
export const validateJsonArray = (
  value: string,
): { valid: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return { valid: false, error: "Value must be a JSON array" };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid JSON format" };
  }
};

/**
 * Helper: Validate JSON object format
 */
export const validateJsonObject = (
  value: string,
): { valid: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed !== "object" || Array.isArray(parsed)) {
      return { valid: false, error: "Value must be a JSON object" };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid JSON format" };
  }
};
