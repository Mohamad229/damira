# Damira Pharma Website

موقع **Damira Pharma** هو مشروع ويب كامل مبني باستخدام **Next.js**، يحتوي على واجهة عامة متعددة اللغات للشركة، ولوحة تحكم داخلية لإدارة محتوى الصفحات، المنتجات، الوسائط، المستخدمين، الإعدادات، ورسائل النماذج القادمة من المستخدمين.

هذا الملف يشرح بنية المشروع، التقنيات المستخدمة، أقسام الموقع، لوحة الإدارة، قاعدة البيانات، التخزين، وأهم متغيرات البيئة حتى يستطيع أي مطور أو مسؤول IT فتح المشروع وفهمه بسرعة قبل تشغيله أو نشره على بيئة إنتاج.

> ملاحظة مهمة: هذا الملف يشرح المشروع تقنيًا ووظيفيًا. لا يغني عن ملف نشر إنتاجي منفصل مثل `DEPLOYMENT.md` عند تسليم المشروع للاستضافة.

---

## 1. نظرة عامة على المشروع

المشروع عبارة عن موقع شركة دوائية/طبية مع نظام إدارة محتوى داخلي. الواجهة العامة تعرض صفحات الشركة ومحتواها باللغتين **English** و **Arabic**، ولوحة الإدارة تسمح بتعديل أغلب محتوى الصفحات وإدارة المنتجات والوسائط ورسائل المستخدمين.

### الوظائف الأساسية

- موقع عام متعدد اللغات: إنكليزي وعربي.
- دعم اتجاه الواجهة حسب اللغة: `LTR` للإنكليزية و `RTL` للعربية.
- لوحة تحكم محمية بتسجيل دخول.
- إدارة محتوى الصفحات العامة من لوحة الإدارة.
- إدارة المنتجات وتصنيفاتها ومعلوماتها وصورها ومرفقاتها.
- مكتبة وسائط لرفع وإدارة الصور والملفات.
- نماذج تواصل وشراكات واستفسارات منتجات.
- حفظ رسائل النماذج في قاعدة البيانات وعرضها داخل لوحة الإدارة.
- نظام إشعارات داخلية للادمن عند وصول رسائل جديدة.
- إعدادات عامة للموقع مثل اسم الموقع، البريد، الهاتف، العنوان، ووصف الفوتر.
- توليد Metadata و Open Graph و Sitemap و Robots للموقع.

---

## 2. التقنيات والأدوات المستخدمة

### Framework والواجهة

| الأداة                     | الاستخدام                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `Next.js 16.2.2`           | إطار العمل الأساسي للموقع باستخدام App Router و Server Components و Server Actions. |
| `React 19.2.4`             | بناء مكونات الواجهة.                                                                |
| `TypeScript`               | كتابة الكود بأنواع واضحة وتقليل الأخطاء أثناء التطوير.                              |
| `Tailwind CSS v4`          | تنسيق الواجهات وبناء التصميم بطريقة utility-first.                                  |
| `tw-animate-css`           | دعم حركات CSS إضافية.                                                               |
| `framer-motion`            | حركات وانتقالات في مكونات الواجهة.                                                  |
| `lucide-react`             | أيقونات الواجهة.                                                                    |
| `shadcn` / `components/ui` | مكونات UI أساسية مثل الأزرار، البطاقات، الحقول، النوافذ، والقوائم.                  |
| `@base-ui/react`           | مكونات واجهة منخفضة المستوى عند الحاجة.                                             |

### الترجمة واللغات

| الأداة             | الاستخدام                                       |
| ------------------ | ----------------------------------------------- |
| `next-intl`        | إدارة الترجمة والمسارات متعددة اللغات.          |
| `messages/en.json` | نصوص الواجهة العامة/المشتركة باللغة الإنكليزية. |
| `messages/ar.json` | نصوص الواجهة العامة/المشتركة باللغة العربية.    |
| `i18n/config.ts`   | تعريف اللغات المدعومة واتجاه كل لغة.            |
| `i18n/routing.ts`  | إعدادات routing الخاصة باللغات.                 |
| `i18n/request.ts`  | تحميل رسائل الترجمة حسب اللغة الحالية.          |

اللغات المعرفة في المشروع:

```ts
export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
```

المشروع يستخدم `localePrefix: "as-needed"`، لذلك اللغة الافتراضية `en` لا تحتاج بالضرورة إلى بادئة في الرابط، بينما العربية تظهر غالبًا بالشكل:

```txt
/ar/about
/ar/products
/ar/contact
```

### قاعدة البيانات والـ ORM

| الأداة               | الاستخدام                                                             |
| -------------------- | --------------------------------------------------------------------- |
| `PostgreSQL`         | قاعدة البيانات الأساسية.                                              |
| `Prisma 7.6.0`       | تعريف الجداول والعلاقات وتشغيل migrations والتعامل مع قاعدة البيانات. |
| `@prisma/client`     | Prisma Client المستخدم داخل التطبيق.                                  |
| `@prisma/adapter-pg` | تشغيل Prisma عبر PostgreSQL adapter.                                  |
| `pg`                 | PostgreSQL driver.                                                    |

ملفات Prisma الأساسية:

```txt
prisma/schema.prisma
prisma/migrations/final_migration/migration.sql
prisma/seed.ts
prisma/cleanup-page-content.ts
prisma.config.ts
```

### المصادقة والحماية

| الأداة                 | الاستخدام                                                   |
| ---------------------- | ----------------------------------------------------------- |
| `next-auth v5 beta`    | تسجيل دخول لوحة الإدارة وإدارة الجلسات.                     |
| `Credentials Provider` | تسجيل دخول باستخدام البريد وكلمة المرور.                    |
| `bcryptjs`             | مقارنة كلمات المرور المشفرة.                                |
| `proxy.ts`             | حماية مسارات `/admin` وإدارة توجيه المستخدمين غير المسجلين. |

أدوار المستخدمين المعرفة في قاعدة البيانات:

```prisma
enum UserRole {
  ADMIN
  INTERNAL_USER
}
```

### التحقق من البيانات

| الأداة | الاستخدام                                                           |
| ------ | ------------------------------------------------------------------- |
| `zod`  | التحقق من مدخلات النماذج، Server Actions، الفلاتر، وبيانات الإدارة. |

### الجداول والإدارة

| الأداة                  | الاستخدام                                                      |
| ----------------------- | -------------------------------------------------------------- |
| `@tanstack/react-table` | بناء جداول إدارية مثل المنتجات، المستخدمين، الرسائل، والوسائط. |

### التخزين ورفع الملفات

| الأداة         | الاستخدام                                             |
| -------------- | ----------------------------------------------------- |
| `@vercel/blob` | تخزين ملفات وصور مكتبة الوسائط في بيئة الإنتاج.       |
| Local uploads  | متاح فقط في بيئة التطوير عند ضبط التخزين على `local`. |
| `sharp`        | دعم معالجة/قراءة معلومات الصور عند الحاجة.            |

ملف التخزين الأساسي:

```txt
lib/storage.ts
```

سلوك التخزين الحالي:

- في بيئة التطوير يمكن استخدام التخزين المحلي داخل `public/uploads`.
- في بيئة الإنتاج يرجع النظام تلقائيًا إلى **Vercel Blob**.
- إذا تم نشر المشروع على VPS/Plesk وأُريد تخزين الملفات محليًا في الإنتاج، يحتاج الكود إلى تعديل لأن التخزين المحلي الحالي مخصص للتطوير فقط.

---

## 3. بنية المشروع العامة

```txt
app/
  (public)/[locale]/        صفحات الموقع العامة متعددة اللغات
  (admin)/admin/            لوحة الإدارة
  api/                      API routes مثل auth ورفع الوسائط
  globals.css               التنسيقات العامة
  layout.tsx                Root layout
  robots.ts                 ملف robots الديناميكي
  sitemap.ts                ملف sitemap الديناميكي
  og/route.tsx              توليد Open Graph image

components/
  admin/                    مكونات لوحة الإدارة
  public/                   مكونات الموقع العام
  public/sections/          سكاشن صفحات الموقع العامة
  ui/                       مكونات UI مشتركة
  providers/                Providers مثل AuthProvider

i18n/
  config.ts                 إعدادات اللغات واتجاهاتها
  routing.ts                إعدادات routing للغات
  request.ts                تحميل رسائل الترجمة
  navigation.ts             أدوات navigation مترجمة

lib/
  actions/                  Server Actions الخاصة بالإدارة والنماذج
  content/                  تعريفات الصفحات ومحتوى CMS
  catalog/                  أدوات/اختبارات مرتبطة بالكتالوج
  auth.ts                   إعدادات NextAuth
  auth-utils.ts             دوال حماية الصلاحيات
  db.ts                     Prisma Client
  seo.ts                    أدوات Metadata و URLs
  site-settings.ts          جلب إعدادات الموقع العامة
  storage.ts                رفع وحذف الملفات
  utils.ts                  أدوات عامة

messages/
  en.json                   رسائل اللغة الإنكليزية
  ar.json                   رسائل اللغة العربية

prisma/
  schema.prisma             مخطط قاعدة البيانات
  migrations/               ملفات الهجرة
  seed.ts                   تعبئة أولية للمحتوى والادمن
```

---

## 4. صفحات الموقع العامة

جميع صفحات الموقع العامة موجودة تحت:

```txt
app/(public)/[locale]/
```

والصفحات الأساسية هي:

| المسار             | الملف                                            | الوظيفة                  |
| ------------------ | ------------------------------------------------ | ------------------------ |
| `/`                | `app/(public)/[locale]/page.tsx`                 | الصفحة الرئيسية.         |
| `/about`           | `app/(public)/[locale]/about/page.tsx`           | صفحة من نحن.             |
| `/services`        | `app/(public)/[locale]/services/page.tsx`        | صفحة الخدمات.            |
| `/products`        | `app/(public)/[locale]/products/page.tsx`        | صفحة المنتجات والكتالوج. |
| `/products/[slug]` | `app/(public)/[locale]/products/[slug]/page.tsx` | صفحة تفاصيل المنتج.      |
| `/quality`         | `app/(public)/[locale]/quality/page.tsx`         | صفحة الجودة والامتثال.   |
| `/partnerships`    | `app/(public)/[locale]/partnerships/page.tsx`    | صفحة الشراكات.           |
| `/contact`         | `app/(public)/[locale]/contact/page.tsx`         | صفحة التواصل.            |

كل صفحة عامة تستخدم:

```ts
getManagedPublicPageData(pageKey, locale);
```

لجلب المحتوى القابل للإدارة من قاعدة البيانات حسب الصفحة واللغة.

---

## 5. أقسام الصفحات العامة القابلة للإدارة

تعريف الصفحات والسكاشن موجود في:

```txt
lib/content/page-definitions.ts
```

المشروع لا يسمح للادمن بإنشاء صفحات عشوائية بالكامل، بل يعتمد على صفحات وسكاشن ثابتة ومحددة مسبقًا، والادمن يغير محتوى هذه السكاشن من لوحة الإدارة.

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

ملاحظة: كتالوج المنتجات الحقيقي يعتمد على منتجات قاعدة البيانات، بينما `catalog` في محتوى الصفحة يعمل كـ fallback عند عدم توفر منتجات منشورة.

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

## 6. لوحة الإدارة

لوحة الإدارة موجودة تحت المسار:

```txt
/admin
```

ويتم حمايتها من خلال `proxy.ts` و `NextAuth`.

### مسارات لوحة الإدارة

| المسار                      | الوظيفة                                   |
| --------------------------- | ----------------------------------------- |
| `/admin/login`              | تسجيل دخول الادمن.                        |
| `/admin`                    | الصفحة الرئيسية للوحة التحكم.             |
| `/admin/pages`              | إدارة صفحات الموقع العامة.                |
| `/admin/pages/[id]/edit`    | تعديل محتوى صفحة عامة حسب اللغة والسكاشن. |
| `/admin/products`           | عرض وإدارة المنتجات.                      |
| `/admin/products/new`       | إنشاء منتج جديد.                          |
| `/admin/products/[id]/edit` | تعديل منتج موجود.                         |
| `/admin/media`              | مكتبة الوسائط ورفع الملفات.               |
| `/admin/forms`              | عرض رسائل النماذج القادمة من المستخدمين.  |
| `/admin/forms/[id]`         | تفاصيل رسالة فورم محددة.                  |
| `/admin/users`              | إدارة مستخدمي لوحة التحكم.                |
| `/admin/users/new`          | إنشاء مستخدم جديد.                        |
| `/admin/users/[id]/edit`    | تعديل مستخدم.                             |
| `/admin/users/profile`      | صفحة ملف المستخدم الحالي.                 |
| `/admin/settings`           | إدارة إعدادات الموقع العامة.              |

### أهم مكونات لوحة الإدارة

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

## 7. إدارة المحتوى CMS

يعتمد CMS على الجداول التالية:

```txt
PageContent
PageContentSection
PageContentField
```

### آلية العمل

- كل صفحة لها `pageKey` مثل `home`, `about`, `products`.
- كل صفحة لها نسخة لكل لغة: `en` و `ar`.
- كل صفحة تحتوي على سكاشن ثابتة حسب `PAGE_DEFINITIONS`.
- كل سكشن يحتوي على حقول محفوظة داخل `PageContentField`.
- كثير من محتوى السكاشن محفوظ كـ JSON في حقل باسم `data`.

الملفات المهمة:

```txt
lib/content/page-definitions.ts
lib/content/loaders.ts
lib/content/validators.ts
lib/content/admin-template-sanitizer.ts
lib/content/public-ui/managed-data.ts
lib/content/public-ui/mock-data.ts
app/(admin)/admin/pages/[id]/edit/structured-page-editor-client.tsx
```

### ماذا يمكن للادمن تعديله؟

حسب الصفحة والسكشن، يستطيع الادمن تعديل النصوص، الصور، الكروت، الإحصائيات، عناوين الأقسام، وصف الميتاداتا، وإظهار/إخفاء السكاشن.

---

## 8. المنتجات

المنتجات مدارة من قاعدة البيانات وليست فقط محتوى static.

### الجداول المرتبطة بالمنتجات

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

### ميزات المنتجات

- Product slug فريد لكل منتج.
- دعم منتج بسيط أو متقدم عبر `ProductType`.
- حالة المنتج: `AVAILABLE` أو `PIPELINE`.
- نشر/إخفاء المنتج عبر `isPublished`.
- ترجمات للإنكليزية والعربية عبر `ProductTranslation`.
- ربط المنتج بتصنيف و Therapeutic Area و Manufacturer.
- دعم صور متعددة ومرفقات للمنتج.
- صفحة عامة لكل منتج حسب `slug`.

الملفات المهمة:

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

## 9. النماذج والرسائل

المشروع يحتوي على نماذج عامة للمستخدمين:

```txt
CONTACT
PARTNERSHIP
PRODUCT_INQUIRY
```

عند إرسال أي نموذج، يقوم النظام بـ:

1. التحقق من البيانات باستخدام `zod`.
2. منع spam بسيط عبر honeypot field.
3. حفظ الرسالة في جدول `FormSubmission`.
4. إنشاء إشعار داخلي في `AdminNotification`.
5. إعادة تحديث صفحات الادمن المتعلقة بالرسائل.
6. إظهار رسالة نجاح للمستخدم باللغة المناسبة.

الملف الأساسي:

```txt
lib/actions/public-forms.ts
```

إدارة الرسائل من لوحة الادمن تتم عبر:

```txt
lib/actions/forms.ts
app/(admin)/admin/forms/forms-table-client.tsx
app/(admin)/admin/forms/[id]/form-detail-client.tsx
```

### ملاحظة مهمة عن البريد الإلكتروني

المشروع حاليًا **لا يرسل رسائل بريد إلكتروني فعليًا** عند وصول نموذج جديد. الرسائل تُحفظ في قاعدة البيانات وتظهر داخل لوحة الإدارة، ويتم إنشاء إشعار داخلي للادمن فقط.

إذا كان مطلوبًا إرسال إشعار إلى عناوين مثل:

```txt
info@damirapharma.sy
cs@damirapharma.sy
bd@damirapharma.sy
pv@damirapharma.sy
```

فهذا يحتاج إضافة SMTP أو خدمة بريد transactional مثل Resend/SendGrid/Mailgun/Postmark أو استخدام SMTP خاص بالدومين.

إنشاء صناديق البريد الرسمية للدومين نفسه يتم من مزود الاستضافة أو مزود البريد، وليس من كود هذا المشروع.

---

## 10. مكتبة الوسائط

مكتبة الوسائط تسمح للادمن برفع وإدارة الصور والملفات المستخدمة في الصفحات والمنتجات.

### الجداول والملفات

```txt
Media
lib/storage.ts
lib/actions/media.ts
app/(admin)/admin/media/media-library-client.tsx
app/api/admin/media/upload/route.ts
components/admin/media-picker.tsx
```

### أنواع الملفات

يدعم النظام تخزين معلومات مثل:

- اسم الملف.
- رابط الملف.
- نوع الملف: image/document/video.
- MIME type.
- الحجم.
- أبعاد الصورة عند توفرها.
- المستخدم الذي رفع الملف.

### التخزين الحالي

- Development: يمكن استخدام local uploads داخل `public/uploads`.
- Production: يستخدم Vercel Blob افتراضيًا.

لذلك في الإنتاج يجب توفير:

```env
BLOB_READ_WRITE_TOKEN="..."
```

إذا تم نشر المشروع خارج Vercel مع الرغبة باستخدام تخزين محلي أو S3 أو Cloudinary، يجب تعديل استراتيجية التخزين في `lib/storage.ts`.

---

## 11. إعدادات الموقع العامة

الإعدادات العامة محفوظة في جدول:

```txt
SiteSetting
```

وتُقرأ من:

```txt
lib/site-settings.ts
```

المفاتيح الحالية المستخدمة:

```txt
siteName
contactEmail
contactPhone
footerDescriptionEn
footerDescriptionAr
contactAddressEn
contactAddressAr
```

هذه القيم تستخدم في أجزاء عامة مثل الفوتر ومعلومات التواصل العامة.

ملاحظة: بعض تفاصيل صفحة Contact مثل كروت الأقسام والبريد الخاص بكل قسم موجودة ضمن محتوى صفحة Contact القابل للتعديل من CMS، وليست كلها من `SiteSetting`.

---

## 12. SEO و Metadata

المشروع يحتوي على أدوات SEO مخصصة في:

```txt
lib/seo.ts
```

ويستخدمها في الصفحات العامة لتوليد:

- `title`
- `description`
- canonical URLs
- alternate language URLs
- Open Graph metadata
- Twitter card metadata

ملفات SEO المهمة:

```txt
app/sitemap.ts
app/robots.ts
app/og/route.tsx
lib/seo.ts
```

متغير البيئة المهم هنا:

```env
NEXT_PUBLIC_APP_URL="https://damirapharma.sy"
```

إذا لم يتم ضبطه، يرجع النظام افتراضيًا إلى:

```txt
http://localhost:3000
```

وهذا غير مناسب للإنتاج.

---

## 13. أوامر المشروع

الأوامر معرفة في `package.json`:

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

### تشغيل المشروع محليًا

```bash
npm install
npm run dev
```

ثم فتح:

```txt
http://localhost:3000
```

### بناء المشروع للإنتاج

```bash
npm run build
```

### تشغيل نسخة production build

```bash
npm run start
```

### فحص ESLint

```bash
npm run lint
```

### اختبار الكتالوج متعدد اللغات

```bash
npm run test:catalog-i18n
```

---

## 14. Prisma وقاعدة البيانات

### توليد Prisma Client

```bash
npx prisma generate
```

يتم تشغيل هذا تلقائيًا داخل:

```bash
npm run build
```

وعبر `postinstall` بعد تثبيت الحزم.

### تطبيق migrations في الإنتاج

```bash
npx prisma migrate deploy
```

### تشغيل seed

```bash
npx prisma db seed
```

أو حسب إعداد `package.json`:

```bash
npx tsx prisma/seed.ts
```

### تنبيه مهم بخصوص seed

سكريبت seed يستخدم متغيرات:

```env
SEED_ADMIN_EMAIL="admin@damirapharma.sy"
SEED_ADMIN_PASSWORD="temporary-strong-password"
```

في بيئة الإنتاج يجب ضبط كلمة مرور قوية ومؤقتة، ويجب تغييرها بعد أول تسجيل دخول.

---

## 15. متغيرات البيئة المطلوبة

لا يجب تسليم ملف `.env` الحقيقي لأنه يحتوي على أسرار. يجب تسليم ملف `.env.example` فقط، ثم يقوم مسؤول الاستضافة بإضافة القيم الحقيقية في بيئة الإنتاج.

### المتغيرات الأساسية

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

### متغيرات موجودة في بيئة التطوير الحالية لكنها ليست كلها ضرورية للكود

قد تظهر متغيرات إضافية متولدة من Neon/Vercel مثل:

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

هذه ليست كلها مستخدمة مباشرة داخل كود التطبيق. المهم فعليًا للتشغيل هو `DATABASE_URL`، وقد يستخدم Prisma `POSTGRES_PRISMA_URL` عند توفره.

---

## 16. ملفات مهمة يجب الانتباه لها

| الملف                                   | أهميته                                    |
| --------------------------------------- | ----------------------------------------- |
| `package.json`                          | الحزم والأوامر.                           |
| `next.config.ts`                        | إعداد Next.js، الصور، و next-intl plugin. |
| `proxy.ts`                              | حماية `/admin` وتفعيل middleware للغات.   |
| `lib/auth.ts`                           | إعداد NextAuth.                           |
| `lib/db.ts`                             | Prisma Client والاتصال بقاعدة البيانات.   |
| `lib/storage.ts`                        | منطق رفع وحذف الملفات.                    |
| `lib/content/page-definitions.ts`       | تعريف الصفحات والسكاشن القابلة للإدارة.   |
| `lib/actions/public-forms.ts`           | إرسال النماذج العامة.                     |
| `lib/actions/products.ts`               | إدارة المنتجات.                           |
| `lib/actions/content.ts`                | إدارة محتوى الصفحات.                      |
| `lib/actions/settings.ts`               | إدارة إعدادات الموقع.                     |
| `prisma/schema.prisma`                  | مخطط قاعدة البيانات.                      |
| `prisma/seed.ts`                        | إنشاء بيانات أولية ومستخدم admin.         |
| `messages/en.json` و `messages/ar.json` | ملفات الترجمة.                            |

---

## 17. ملاحظات قبل التسليم أو النشر

قبل تسليم المشروع أو نشره على production، يجب التأكد من النقاط التالية:

- عدم تسليم `.env` الحقيقي.
- إنشاء `.env.example` نظيف بدون أسرار.
- ضبط `NEXT_PUBLIC_APP_URL` على الدومين الحقيقي.
- ضبط `DATABASE_URL` لقاعدة بيانات production.
- ضبط `AUTH_SECRET` بقيمة قوية.
- ضبط `BLOB_READ_WRITE_TOKEN` إذا سيتم استخدام Vercel Blob.
- تشغيل migrations على قاعدة بيانات production.
- تشغيل seed لإنشاء أول مستخدم admin إذا لم يكن موجودًا.
- اختبار تسجيل الدخول للادمن.
- اختبار رفع الصور من مكتبة الوسائط.
- اختبار إنشاء وتعديل المنتجات.
- اختبار تعديل محتوى الصفحات باللغتين.
- اختبار إرسال نماذج Contact/Partnership/Product Inquiry وظهورها في لوحة الإدارة.
- التأكد من أن `sitemap` و `metadata` يستخدمان رابط الدومين الحقيقي.
- التأكد من وجود ملفات public المطلوبة مثل اللوغو والأيقونات.

---

## 18. ملاحظات عن الاستضافة

المشروع يمكن نشره على Vercel أو VPS/Plesk بشرط توفير متطلبات Next.js وقاعدة البيانات.

### عند استخدام Vercel

- Vercel مناسب جدًا لتطبيق Next.js.
- قاعدة البيانات تكون خارجية مثل Neon/Supabase/Railway/Managed PostgreSQL.
- الوسائط الحالية مناسبة مع Vercel Blob.
- الإيميلات الرسمية للدومين تحتاج مزود بريد منفصل مثل Plesk Mail أو Google Workspace أو Microsoft 365 أو Zoho.

### عند استخدام VPS/Plesk

يجب التأكد من توفر:

- Node.js مناسب.
- PostgreSQL أو اتصال بقاعدة PostgreSQL خارجية.
- إمكانية تشغيل build و start.
- Environment variables.
- SSL.
- حل واضح لتخزين الصور والملفات.

ملاحظة: التخزين المحلي للملفات في production غير مفعل حاليًا في الكود، لذلك يجب إما الاستمرار باستخدام Vercel Blob أو تعديل التخزين.

---

## 19. حالة البريد الإلكتروني في المشروع

المشروع يعرض إيميلات الشركة ضمن محتوى الموقع، ويمكن إدارة بعضها من إعدادات أو صفحة Contact حسب مكان ظهورها.

لكن استقبال وإرسال البريد الرسمي مثل:

```txt
info@damirapharma.sy
cs@damirapharma.sy
bd@damirapharma.sy
pv@damirapharma.sy
```

يتم من مزود البريد أو الاستضافة، وليس من Next.js نفسه.

كذلك لا يوجد حاليًا تكامل SMTP داخل الكود لإرسال إشعار بريدي عند وصول فورم جديد. الموجود حاليًا هو:

```txt
Form Submit -> PostgreSQL -> Admin Dashboard -> Admin Notification
```

وليس:

```txt
Form Submit -> Email Notification
```

إذا كانت إشعارات البريد مطلوبة، يجب إضافتها كميزة جديدة.

---

## 20. ملخص سريع للمطور أو مسؤول IT

هذا المشروع هو:

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

أهم ما يحتاجه للتشغيل:

```txt
Node.js
PostgreSQL
DATABASE_URL
AUTH_SECRET
NEXT_PUBLIC_APP_URL
BLOB_READ_WRITE_TOKEN إذا كانت الوسائط على Vercel Blob
```

أهم أوامر التشغيل:

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
npm run build
npm run start
```

---

## 21. الملفات التي يفضل إضافتها لاحقًا للتسليم الاحترافي

هذا المشروع يحتاج مع `README.md` ملفات تسليم إضافية:

```txt
.env.example
DEPLOYMENT.md
TECHNICAL_HANDOFF.md
```

الـ `README.md` يشرح المشروع. أما `DEPLOYMENT.md` فيجب أن يشرح خطوات النشر التفصيلية حسب الاستضافة المختارة، و `TECHNICAL_HANDOFF.md` يوضح مسؤوليات المطور، مسؤول الاستضافة، ومتطلبات الإنتاج.
