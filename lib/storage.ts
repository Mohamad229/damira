import { del, put } from "@vercel/blob";
import { randomUUID } from "crypto";
import path from "path";

export type StorageProvider = "blob" | "local";

export interface UploadResult {
  url: string;
  key: string;
  pathname?: string;
  size: number;
  mimeType: string;
}

const BLOB_TOKEN_ERROR = "Vercel Blob token is not configured.";

function getStorageProvider(): StorageProvider {
  const configuredProvider =
    process.env.MEDIA_STORAGE_DRIVER || process.env.STORAGE_PROVIDER;

  if (configuredProvider === "local" && process.env.NODE_ENV === "development") {
    return "local";
  }

  return "blob";
}

function getBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error(BLOB_TOKEN_ERROR);
  }

  return token;
}

function getUploadPath(originalName: string): string {
  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const ext = path.extname(originalName).toLowerCase();
  const baseName =
    path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "media";
  const uniquePart = `${Date.now()}-${randomUUID()}`;

  return `media/${year}/${month}/${uniquePart}-${baseName}${ext}`;
}

async function uploadBlob(
  file: Buffer,
  originalFilename: string,
  mimeType: string,
): Promise<UploadResult> {
  const pathname = getUploadPath(originalFilename);
  const blob = await put(pathname, file, {
    access: "public",
    contentType: mimeType,
    token: getBlobToken(),
  });

  return {
    url: blob.url,
    key: blob.pathname,
    pathname: blob.pathname,
    size: file.length,
    mimeType,
  };
}

async function uploadLocalDevelopment(
  file: Buffer,
  originalFilename: string,
  mimeType: string,
): Promise<UploadResult> {
  const { mkdir, writeFile } = await import("fs/promises");
  const filename = path.basename(getUploadPath(originalFilename));
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, file);

  return {
    url: `/uploads/${filename}`,
    key: filename,
    pathname: filename,
    size: file.length,
    mimeType,
  };
}

async function deleteLocalDevelopment(keyOrUrl: string): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { unlink } = await import("fs/promises");
  const filename = keyOrUrl.startsWith("/uploads/")
    ? keyOrUrl.replace("/uploads/", "")
    : path.basename(keyOrUrl);
  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  await unlink(filePath).catch(() => undefined);
}

function isBlobUrl(value: string): boolean {
  return (
    value.includes(".public.blob.vercel-storage.com/") ||
    value.startsWith("media/")
  );
}

export const storage = {
  async upload(
    file: Buffer,
    originalFilename: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const provider = getStorageProvider();

    if (provider === "local") {
      return uploadLocalDevelopment(file, originalFilename, mimeType);
    }

    return uploadBlob(file, originalFilename, mimeType);
  },

  async delete(keyOrUrl: string): Promise<void> {
    if (isBlobUrl(keyOrUrl)) {
      await del(keyOrUrl, { token: getBlobToken() });
      return;
    }

    await deleteLocalDevelopment(keyOrUrl);
  },

  getPublicUrl(key: string): string {
    if (key.startsWith("http://") || key.startsWith("https://")) {
      return key;
    }

    if (key.startsWith("/uploads/")) {
      return key;
    }

    return key.startsWith("media/") ? key : `/uploads/${key}`;
  },
};

export default storage;
