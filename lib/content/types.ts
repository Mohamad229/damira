/**
 * TypeScript type definitions for the structured page content system.
 */

export type FieldValue = string | number | boolean | object | null | undefined;

export interface SectionData {
  [fieldKey: string]: FieldValue;
}

export interface PageData {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  visibility?: Record<string, boolean>;
  navigationLabels?: Record<string, string>;
  [sectionKey: string]:
    | SectionData
    | Record<string, boolean>
    | Record<string, string>
    | string
    | null
    | undefined;
}

export interface SectionSettings {
  isVisible: boolean;
  navigationLabel: string;
}

export interface GetPageContentResponse {
  pageKey: string;
  locale: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  sections: Record<string, SectionData>;
  sectionSettings: Record<string, SectionSettings>;
}

export interface UpdatePageContentResponse {
  success: boolean;
  message?: string;
  data?: GetPageContentResponse;
  errors?: Record<string, string[]>;
}

export interface PageEditorState {
  isLoading: boolean;
  isSaving: boolean;
  pageKey: string;
  locale: string;
  data: PageData | null;
  errors: Record<string, string>;
  lastSaved?: Date;
}
