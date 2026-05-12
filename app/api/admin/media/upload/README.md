# Media Upload API

## Endpoint

`POST /api/admin/media/upload`

Upload media files (images, documents, videos) to Vercel Blob and create a Media database record.

## Authentication

Requires a valid Auth.js session. User must be logged in as ADMIN.

## Request Format

**Content-Type:** `multipart/form-data`

### Form Fields

| Field     | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| `file`    | File   | Yes      | The file to upload                  |
| `name`    | String | No       | Display name for the media          |

## File Requirements

### Supported File Types

**Images:**

- JPEG/JPG (`image/jpeg`, `image/jpg`)
- PNG (`image/png`)
- GIF (`image/gif`)
- WebP (`image/webp`)
- SVG (`image/svg+xml`)

**Documents:**

- PDF (`application/pdf`)
- DOC (`application/msword`)
- DOCX (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)

**Videos:**

- MP4 (`video/mp4`)
- WebM (`video/webm`)

### File Size Limits

- Images: 10MB maximum
- Documents: 10MB maximum
- Videos: 50MB maximum

## Response Format

### Success Response (201 Created)

```json
{
  "success": true,
  "media": {
    "id": "clxyz123456789",
    "name": "Company Logo",
    "url": "https://store-id.public.blob.vercel-storage.com/media/2026/05/1715000000000-id-company-logo.png",
    "type": "image",
    "mimeType": "image/png",
    "size": 524288,
    "width": 1920,
    "height": 1080,
    "uploadedById": "user-id",
    "createdAt": "2026-04-08T10:30:00.000Z"
  }
}
```

### Error Responses

**401 Unauthorized:**

```json
{
  "error": "Unauthorized. Please log in."
}
```

**400 Bad Request - No file:**

```json
{
  "error": "No file provided. Please upload a file."
}
```

**400 Bad Request - Invalid file type:**

```json
{
  "error": "Invalid file type: application/exe. Allowed types are: images (jpg, jpeg, png, gif, webp, svg), documents (pdf), videos (mp4, webm)"
}
```

**400 Bad Request - File too large:**

```json
{
  "error": "Image file too large. Maximum size is 10MB"
}
```

**400 Bad Request - Invalid metadata:**

```json
{
  "error": "Invalid metadata",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["name"],
      "message": "Expected string, received number"
    }
  ]
}
```

**500 Internal Server Error:**

```json
{
  "error": "Vercel Blob token is not configured."
}
```

## Usage Examples

### JavaScript (Fetch API)

```javascript
const uploadMedia = async (file, metadata = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  if (metadata.name) formData.append("name", metadata.name);

  const response = await fetch("/api/admin/media/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Upload failed");
  }

  return response.json();
};

// Usage
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

try {
  const result = await uploadMedia(file, {
    name: "New Product Launch",
  });

  console.log("Upload successful:", result.media);
} catch (error) {
  console.error("Upload failed:", error.message);
}
```

### React Component Example

```typescript
'use client'

import { useState } from 'react';

export function MediaUploadForm() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const result = await response.json();
      console.log('Upload successful:', result.media);

      // Reset form
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">File:</label>
        <input
          type="file"
          id="file"
          name="file"
          required
          accept="image/*,video/mp4,video/webm,.pdf,.doc,.docx"
        />
      </div>

      <div>
        <label htmlFor="name">Display name:</label>
        <input type="text" id="name" name="name" />
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}
```

### cURL Example

```bash
# Upload an image with a display name
curl -X POST http://localhost:3000/api/admin/media/upload \
  -H "Cookie: authjs.session-token=YOUR_SESSION_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "name=Product Hero Image"

# Upload a PDF document
curl -X POST http://localhost:3000/api/admin/media/upload \
  -H "Cookie: authjs.session-token=YOUR_SESSION_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "name=Product Catalog 2026"

# Upload a video
curl -X POST http://localhost:3000/api/admin/media/upload \
  -H "Cookie: authjs.session-token=YOUR_SESSION_TOKEN" \
  -F "file=@/path/to/video.mp4" \
  -F "name=Company Introduction Video"
```

## Implementation Details

### Storage

The API uses the storage abstraction layer in `lib/storage.ts`:

- **Vercel Blob** (default/production): Files uploaded with the server-side `BLOB_READ_WRITE_TOKEN`
- **Local storage**: Development-only fallback when `MEDIA_STORAGE_DRIVER=local` and `NODE_ENV=development`

Blob pathnames are automatically generated under `media/yyyy/mm/` with a timestamp and random id to prevent collisions.

### Image Processing

Images (except SVG) use optional Sharp metadata extraction when Sharp is available. Uploads still succeed if metadata extraction is unavailable.

### Database Schema

Created media records include:

- `id`: Unique identifier (CUID)
- `url`: Public URL
- `type`: Media category (image, document, video)
- `mimeType`: Full MIME type
- `size`: File size in bytes
- `width`/`height`: Dimensions (images only)
- `uploadedById`: User ID who uploaded
- `createdAt`: Upload timestamp

## Environment Variables

Configure Blob storage in your `.env` file:

```env
BLOB_READ_WRITE_TOKEN=...

# Development fallback only
# MEDIA_STORAGE_DRIVER=local
```

## Security Notes

1. **Authentication Required**: All uploads require a valid user session
2. **File Type Validation**: Strict MIME type checking
3. **File Size Limits**: Enforced to prevent abuse
4. **Unique Filenames**: Automatic generation prevents overwrites and path traversal
5. **User Attribution**: Uploads are linked to the authenticated user

## Related API Endpoints

- `GET /api/admin/media` - List all media files (TODO)
- `GET /api/admin/media/:id` - Get single media file (TODO)
- `DELETE /api/admin/media/:id` - Delete media file (TODO)
- `PATCH /api/admin/media/:id` - Update media metadata (TODO)
