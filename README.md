# Damira Pharma Website

The **Damira Pharma** website is a full-stack web project built with **Next.js**. It includes a bilingual public company website and a protected internal admin dashboard for managing page content, products, media, users, settings, and form submissions received from website visitors.

This document explains the project structure, technologies used, public website sections, admin dashboard, database, storage, and the most important environment variables. It is intended to help developers, IT staff, or hosting providers understand the project before running it locally or deploying it to production.

> Important note: this README explains the project from a technical and functional perspective. It does not replace a dedicated production deployment guide such as `DEPLOYMENT.md`.

---

## 1. Project Overview

The project is a pharmaceutical/medical company website with an internal content management system. The public website displays company content in both **English** and **Arabic**, while the admin dashboard allows authorized users to manage most page content, products, media, user accounts, settings, and visitor messages.

### Main Features

- Bilingual public website: English and Arabic.
- Direction-aware layout: `LTR` for English and `RTL` for Arabic.
- Protected admin dashboard with authentication.
- Managed public page content through the admin panel.
- Product management with categories, translations, images, attachments, and advanced details.
- Media library for uploading and managing images/files.
- Contact, partnership, and product inquiry forms.
- Form submissions stored in PostgreSQL and displayed in the admin dashboard.
- Internal admin notification system for new submissions.
- Global website settings such as site name, email, phone, address, and footer description.
- Dynamic metadata, Open Graph data, sitemap, and robots configuration.

---

## 2. Technologies and Tools Used

### Framework and Frontend

| Tool                       | Purpose                                                                    |
| -------------------------- | -------------------------------------------------------------------------- |
| `Next.js 16.2.2`           | Main framework using App Router, Server Components, and Server Actions.    |
| `React 19.2.4`             | UI component library.                                                      |
| `TypeScript`               | Type-safe development and improved maintainability.                        |
| `Tailwind CSS v4`          | Utility-first styling system.                                              |
| `tw-animate-css`           | Additional CSS animation utilities.                                        |
| `framer-motion`            | UI animations and transitions.                                             |
| `lucide-react`             | Icon library used across the interface.                                    |
| `shadcn` / `components/ui` | Reusable UI primitives such as buttons, cards, inputs, dialogs, and menus. |
| `@base-ui/react`           | Low-level UI primitives used where needed.                                 |

### Internationalization and Languages

| Tool/File          | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `next-intl`        | Handles translations and localized routing.       |
| `messages/en.json` | English translation messages.                     |
| `messages/ar.json` | Arabic translation messages.                      |
| `i18n/config.ts`   | Defines supported locales and text direction.     |
| `i18n/routing.ts`  | Locale routing configuration.                     |
| `i18n/request.ts`  | Loads translation messages for the active locale. |

Configured locales:

```ts
export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
```

The project uses `localePrefix: "as-needed"`, which means the default English locale may not require a URL prefix, while Arabic routes usually appear as:

```txt
/ar/about
/ar/products
/ar/contact
```

### Database and ORM

| Tool                 | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `PostgreSQL`         | Main production database.                               |
| `Prisma 7.6.0`       | Database schema definition, migrations, and ORM access. |
| `@prisma/client`     | Prisma Client used by the application.                  |
| `@prisma/adapter-pg` | Prisma PostgreSQL adapter.                              |
| `pg`                 | PostgreSQL driver.                                      |

Main Prisma files:

```txt
prisma/schema.prisma
prisma/migrations/final_migration/migration.sql
prisma/seed.ts
prisma/cleanup-page-content.ts
prisma.config.ts
```

### Authentication and Security

| Tool/File              | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `next-auth v5 beta`    | Admin authentication and session handling.                                |
| `Credentials Provider` | Email/password login for admin users.                                     |
| `bcryptjs`             | Password hash comparison.                                                 |
| `proxy.ts`             | Protects `/admin` routes and handles redirects for unauthenticated users. |

User roles defined in the database:

```prisma
enum UserRole {
  ADMIN
  INTERNAL_USER
}
```

### Data Validation

| Tool  | Purpose                                                        |
| ----- | -------------------------------------------------------------- |
| `zod` | Validates form input, Server Actions, filters, and admin data. |

### Tables and Admin Data Grids

| Tool                    | Purpose                                                                   |
| ----------------------- | ------------------------------------------------------------------------- |
| `@tanstack/react-table` | Builds admin tables such as products, users, form submissions, and media. |

### File and Media Storage

| Tool           | Purpose                                                       |
| -------------- | ------------------------------------------------------------- |
| `@vercel/blob` | Stores media files/images in production.                      |
| Local uploads  | Available only in development when local storage is selected. |
| `sharp`        | Used for reading or processing image metadata where needed.   |

Main storage file:

```txt
lib/storage.ts
```

Current storage behavior:

- In development, local uploads can be stored in `public/uploads`.
- In production, the system falls back to **Vercel Blob**.
- If the project is deployed to VPS/Plesk and production local storage is required, `lib/storage.ts` must be modified because local storage is currently intended for development only.

---

## 3. General Project Structure

```txt
app/
  (public)/[locale]/        Localized public website pages
  (admin)/admin/            Admin dashboard
  api/                      API routes such as auth and media upload
  globals.css               Global styles
  layout.tsx                Root layout
  robots.ts                 Dynamic robots file
  sitemap.ts                Dynamic sitemap
  og/route.tsx              Open Graph image generation

components/
  admin/                    Admin dashboard components
  public/                   Public website components
  public/sections/          Public page sections
  ui/                       Shared UI components
  providers/                Providers such as AuthProvider

i18n/
  config.ts                 Locale and direction configuration
  routing.ts                Locale routing configuration
  request.ts                Translation loading
  navigation.ts             Localized navigation helpers

lib/
  actions/                  Server Actions for admin and public forms
  content/                  Page definitions and CMS content logic
  catalog/                  Catalog-related utilities/tests
  auth.ts                   NextAuth configuration
  auth-utils.ts             Authorization helpers
  db.ts                     Prisma Client
  seo.ts                    Metadata and URL helpers
  site-settings.ts          Global site settings helpers
  storage.ts                File upload/delete logic
  utils.ts                  General utilities

messages/
  en.json                   English messages
  ar.json                   Arabic messages

prisma/
  schema.prisma             Database schema
  migrations/               Migration files
  seed.ts                   Initial seed data and admin user creation
```

---

## 4. Public Website Pages

All public pages are located under:

```txt
app/(public)/[locale]/
```

Main public pages:

| Route              | File                                             | Purpose                      |
| ------------------ | ------------------------------------------------ | ---------------------------- |
| `/`                | `app/(public)/[locale]/page.tsx`                 | Homepage.                    |
| `/about`           | `app/(public)/[locale]/about/page.tsx`           | About page.                  |
| `/services`        | `app/(public)/[locale]/services/page.tsx`        | Services page.               |
| `/products`        | `app/(public)/[locale]/products/page.tsx`        | Products and catalog page.   |
| `/products/[slug]` | `app/(public)/[locale]/products/[slug]/page.tsx` | Product detail page.         |
| `/quality`         | `app/(public)/[locale]/quality/page.tsx`         | Quality and compliance page. |
| `/partnerships`    | `app/(public)/[locale]/partnerships/page.tsx`    | Partnerships page.           |
| `/contact`         | `app/(public)/[locale]/contact/page.tsx`         | Contact page.                |

Each public page uses:

```ts
getManagedPublicPageData(pageKey, locale);
```

to load managed page content from the database based on the page key and active locale.

---

## 5. Managed Public Page Sections

Page and section definitions are located in:

```txt
lib/content/page-definitions.ts
```

The project does not allow admins to create completely arbitrary public pages. Instead, each page has a predefined set of fixed sections, and admins edit the content inside those sections.

### Home Page

```txt
hero
atAGlance
strategicFocus
keyStrengths
coverageReach
successHighlight
cta
```

### About Page

```txt
hero
companyOverview
visionMission
coreValues
legacySuccess
```

### Services Page

```txt
hero
serviceItems
```

### Products Page

```txt
hero
pipelineSegments
catalog
```

Note: the real product catalog is loaded from database products. The `catalog` page content can work as fallback content when no published products are available.

### Quality Page

```txt
hero
complianceDetails
qmsArchitecture
certificates
ethicsCompliance
```

### Partnerships Page

```txt
hero
whyPartner
advantage
partnershipForm
```

### Contact Page

```txt
hero
contactInfo
contactForm
```

---

## 6. Admin Dashboard

The admin dashboard is located at:

```txt
/admin
```

It is protected through `proxy.ts` and `NextAuth`.

### Admin Routes

| Route                       | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `/admin/login`              | Admin login page.                                 |
| `/admin`                    | Dashboard home.                                   |
| `/admin/pages`              | Manage public website pages.                      |
| `/admin/pages/[id]/edit`    | Edit public page content by language and section. |
| `/admin/products`           | View and manage products.                         |
| `/admin/products/new`       | Create a new product.                             |
| `/admin/products/[id]/edit` | Edit an existing product.                         |
| `/admin/media`              | Media library and uploads.                        |
| `/admin/forms`              | View form submissions from visitors.              |
| `/admin/forms/[id]`         | View a specific form submission.                  |
| `/admin/users`              | Manage admin users.                               |
| `/admin/users/new`          | Create a new user.                                |
| `/admin/users/[id]/edit`    | Edit an existing user.                            |
| `/admin/users/profile`      | Current user profile page.                        |
| `/admin/settings`           | Manage global website settings.                   |

### Important Admin Components

```txt
components/admin/admin-sidebar.tsx
components/admin/admin-header.tsx
components/admin/page-header.tsx
components/admin/language-tabs.tsx
components/admin/media-picker.tsx
components/admin/visual-json-field-editor.tsx
components/admin/stats-card.tsx
components/admin/recent-activity.tsx
components/admin/quick-actions.tsx
```

---

## 7. Content Management System (CMS)

The CMS mainly relies on the following database tables:

```txt
PageContent
PageContentSection
PageContentField
```

### How It Works

- Each managed page has a `pageKey`, such as `home`, `about`, or `products`.
- Each page has localized content versions for `en` and `ar`.
- Each page contains predefined sections based on `PAGE_DEFINITIONS`.
- Each section contains fields stored in `PageContentField`.
- Many complex section values are stored as JSON in a field named `data`.

Important files:

```txt
lib/content/page-definitions.ts
lib/content/loaders.ts
lib/content/validators.ts
lib/content/admin-template-sanitizer.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
app/(admin)/admin/pages/[id]/edit/structured-page-editor-client.tsx
```

### What Admins Can Edit

Depending on the page and section, admins can edit text content, images, cards, statistics, section titles, metadata descriptions, and section visibility.

---

## 8. Products

Products are managed through the database, not static files.

### Product-Related Tables

```txt
Product
ProductTranslation
ProductAdvancedDetails
ProductAttachment
ProductImage
Category
TherapeuticArea
Manufacturer
```

### Product Features

- Unique product slug.
- Simple or advanced products through `ProductType`.
- Product status: `AVAILABLE` or `PIPELINE`.
- Publish/unpublish products using `isPublished`.
- English and Arabic translations through `ProductTranslation`.
- Product connection to category, therapeutic area, and manufacturer.
- Multiple product images and attachments.
- Public product detail page by `slug`.

Important files:

```txt
lib/actions/products.ts
lib/actions/public-products.ts
app/(admin)/admin/products/product-form-client.tsx
app/(admin)/admin/products/products-table-client.tsx
app/(public)/[locale]/products/page.tsx
app/(public)/[locale]/products/[slug]/page.tsx
components/public/sections/products/ProductCatalogFilterSection.tsx
components/public/sections/product-detail/
```

---

## 9. Forms and Submissions

The project includes public visitor forms for:

```txt
CONTACT
PARTNERSHIP
PRODUCT_INQUIRY
```

When any form is submitted, the system:

1. Validates the data using `zod`.
2. Performs basic spam prevention using a honeypot field.
3. Stores the submission in the `FormSubmission` table.
4. Creates an internal `AdminNotification`.
5. Revalidates relevant admin pages.
6. Shows a localized success message to the visitor.

Main file:

```txt
lib/actions/public-forms.ts
```

Admin management files:

```txt
lib/actions/forms.ts
app/(admin)/admin/forms/forms-table-client.tsx
app/(admin)/admin/forms/[id]/form-detail-client.tsx
```

### Important Note About Email

The project currently **does not send actual email notifications** when a new form submission is received. Submissions are stored in the database, shown in the admin dashboard, and an internal admin notification is created.

If email notifications must be sent to addresses such as:

```txt
info@damirapharma.sy
cs@damirapharma.sy
bd@damirapharma.sy
pv@damirapharma.sy
```

then SMTP or a transactional email provider such as Resend, SendGrid, Mailgun, or Postmark must be added as a new feature.

Official domain mailboxes are created by the hosting provider or email provider, not by this Next.js project.

---

## 10. Media Library

The media library allows admins to upload and manage images/files used in pages and products.

### Tables and Files

```txt
Media
lib/storage.ts
lib/actions/media.ts
app/(admin)/admin/media/media-library-client.tsx
app/api/admin/media/upload/route.ts
components/admin/media-picker.tsx
```

### Stored File Metadata

The system stores information such as:

- File name.
- File URL.
- File type: image/document/video.
- MIME type.
- Size.
- Image dimensions when available.
- User who uploaded the file.

### Current Storage Strategy

- Development: local uploads can be stored in `public/uploads`.
- Production: Vercel Blob is used by default.

Production requires:

```env
BLOB_READ_WRITE_TOKEN="..."
```

If the project is deployed outside Vercel and local VPS storage, S3, Supabase Storage, or Cloudinary is required, the storage strategy in `lib/storage.ts` must be modified.

---

## 11. Global Site Settings

Global settings are stored in the following table:

```txt
SiteSetting
```

They are loaded from:

```txt
lib/site-settings.ts
```

Currently used setting keys:

```txt
siteName
contactEmail
contactPhone
footerDescriptionEn
footerDescriptionAr
contactAddressEn
contactAddressAr
```

These values are used in public-facing areas such as the footer and general contact information.

Note: some Contact page details, such as department cards and department-specific emails, are managed inside the Contact page CMS content, not entirely through `SiteSetting`.

---

## 12. SEO and Metadata

The project includes custom SEO helpers in:

```txt
lib/seo.ts
```

These helpers generate:

- `title`
- `description`
- canonical URLs
- alternate language URLs
- Open Graph metadata
- Twitter card metadata

Important SEO files:

```txt
app/sitemap.ts
app/robots.ts
app/og/route.tsx
lib/seo.ts
```

Important environment variable:

```env
NEXT_PUBLIC_APP_URL="https://damirapharma.sy"
```

If this variable is not configured, the system falls back to:

```txt
http://localhost:3000
```

This is not suitable for production.

---

## 13. Project Commands

The following scripts are defined in `package.json`:

```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "postinstall": "prisma generate",
  "start": "next start",
  "lint": "eslint",
  "test:catalog-i18n": "node --test --import tsx lib/catalog/catalog-bilingual.test.ts"
}
```

### Run Locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm run start
```

### Run ESLint

```bash
npm run lint
```

### Run Bilingual Catalog Test

```bash
npm run test:catalog-i18n
```

---

## 14. Prisma and Database

### Generate Prisma Client

```bash
npx prisma generate
```

This also runs automatically during:

```bash
npm run build
```

and through the `postinstall` script after package installation.

### Apply Production Migrations

```bash
npx prisma migrate deploy
```

### Run Seed Script

```bash
npx prisma db seed
```

or directly:

```bash
npx tsx prisma/seed.ts
```

### Important Seed Note

The seed script uses:

```env
SEED_ADMIN_EMAIL="admin@damirapharma.sy"
SEED_ADMIN_PASSWORD="temporary-strong-password"
```

In production, a strong temporary password must be configured and changed immediately after the first login.

---

## 15. Required Environment Variables

The real `.env` file must not be delivered with the project because it contains secrets. Only a clean `.env.example` should be delivered. The hosting provider or IT team should configure the real values in the production environment.

### Core Variables

```env
# App URL
NEXT_PUBLIC_APP_URL="https://damirapharma.sy"

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Optional Prisma migration/direct URL
POSTGRES_PRISMA_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Auth
AUTH_SECRET="replace-with-strong-random-secret"

# Media storage - required when using Vercel Blob
BLOB_READ_WRITE_TOKEN="replace-with-vercel-blob-token"

# Initial admin seed
SEED_ADMIN_EMAIL="admin@damirapharma.sy"
SEED_ADMIN_PASSWORD="replace-with-temporary-strong-password"
```

### Extra Development Variables That May Exist

The current development environment may include extra variables generated by Neon/Vercel, such as:

```txt
DATABASE_URL_UNPOOLED
NEON_PROJECT_ID
PGDATABASE
PGHOST
PGHOST_UNPOOLED
PGPASSWORD
PGUSER
POSTGRES_DATABASE
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_URL
POSTGRES_URL_NON_POOLING
POSTGRES_URL_NO_SSL
POSTGRES_USER
VERCEL_OIDC_TOKEN
```

Not all of these are directly used by the application code. The most important runtime variable is `DATABASE_URL`. Prisma may also use `POSTGRES_PRISMA_URL` when available.

---

## 16. Important Files to Review

| File                                      | Importance                                                  |
| ----------------------------------------- | ----------------------------------------------------------- |
| `package.json`                            | Dependencies and project scripts.                           |
| `next.config.ts`                          | Next.js configuration, image domains, and next-intl plugin. |
| `proxy.ts`                                | Protects `/admin` and enables locale middleware.            |
| `lib/auth.ts`                             | NextAuth configuration.                                     |
| `lib/db.ts`                               | Prisma Client and database connection.                      |
| `lib/storage.ts`                          | File upload and delete logic.                               |
| `lib/content/page-definitions.ts`         | Managed page and section definitions.                       |
| `lib/actions/public-forms.ts`             | Public form submission logic.                               |
| `lib/actions/products.ts`                 | Product management logic.                                   |
| `lib/actions/content.ts`                  | Page content management logic.                              |
| `lib/actions/settings.ts`                 | Global settings management logic.                           |
| `prisma/schema.prisma`                    | Database schema.                                            |
| `prisma/seed.ts`                          | Initial data and admin user creation.                       |
| `messages/en.json` and `messages/ar.json` | Translation files.                                          |

---

## 17. Pre-Handoff and Pre-Deployment Checklist

Before delivering or deploying the project to production, verify the following:

- Do not deliver the real `.env` file.
- Create a clean `.env.example` without secrets.
- Set `NEXT_PUBLIC_APP_URL` to the real production domain.
- Configure `DATABASE_URL` for the production database.
- Configure `AUTH_SECRET` with a strong random value.
- Configure `BLOB_READ_WRITE_TOKEN` if Vercel Blob is used.
- Run migrations on the production database.
- Run seed to create the first admin user if needed.
- Test admin login.
- Test media uploads from the media library.
- Test product creation and editing.
- Test page content editing in both languages.
- Test Contact, Partnership, and Product Inquiry form submissions and verify they appear in the admin dashboard.
- Verify that `sitemap` and metadata use the real production domain.
- Verify required public assets such as logos and icons are present.

---

## 18. Hosting Notes

The project can be deployed to Vercel or to VPS/Plesk, provided the platform supports Next.js and PostgreSQL access.

### Using Vercel

- Vercel is well-suited for Next.js applications.
- The database should be external, such as Neon, Supabase, Railway, or another managed PostgreSQL provider.
- The current media storage approach is compatible with Vercel Blob.
- Official domain emails require a separate email provider such as Plesk Mail, Google Workspace, Microsoft 365, Zoho, or another mail host.

### Using VPS/Plesk

The hosting environment must provide:

- A suitable Node.js version.
- PostgreSQL or access to an external PostgreSQL database.
- Ability to run build and start commands.
- Environment variable configuration.
- SSL certificate support.
- A clear storage solution for uploaded images/files.

Note: production local file storage is not currently enabled in the code. Use Vercel Blob or modify the storage implementation.

---

## 19. Email Status in the Project

The project displays company email addresses as website content. Some of these values can be managed from global settings or the Contact page CMS content, depending on where they appear.

However, receiving and sending official email from addresses such as:

```txt
info@damirapharma.sy
cs@damirapharma.sy
bd@damirapharma.sy
pv@damirapharma.sy
```

is handled by the email provider or hosting provider, not by the Next.js application itself.

There is currently no SMTP integration in the code for sending email notifications when a new form submission is received. The current flow is:

```txt
Form Submit -> PostgreSQL -> Admin Dashboard -> Admin Notification
```

not:

```txt
Form Submit -> Email Notification
```

If email notifications are required, they must be added as a new feature.

---

## 20. Quick Summary for Developers or IT Staff

This project is a:

```txt
Next.js full-stack website
+ PostgreSQL database
+ Prisma ORM
+ NextAuth admin authentication
+ next-intl bilingual routing
+ Admin CMS for public pages
+ Product management
+ Media library
+ Contact/Partnership/Product inquiry forms
+ Vercel Blob-based production media storage
```

Minimum requirements for running the project:

```txt
Node.js
PostgreSQL
DATABASE_URL
AUTH_SECRET
NEXT_PUBLIC_APP_URL
BLOB_READ_WRITE_TOKEN if media is stored on Vercel Blob
```

Main commands:

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
npm run build
npm run start
```

---

## 21. Recommended Additional Handoff Files

For a professional production handoff, this README should be delivered together with:

```txt
.env.example
DEPLOYMENT.md
TECHNICAL_HANDOFF.md
```

`README.md` explains the project. `DEPLOYMENT.md` should explain the exact deployment steps for the selected hosting environment. `TECHNICAL_HANDOFF.md` should clarify responsibilities between the developer, the hosting provider/IT team, and the production environment requirements.
