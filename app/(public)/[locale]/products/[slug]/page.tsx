import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { ProductCardData } from "@/components/public/sections/base";
import {
  ProductDetailCtaSection,
  ProductInfoSection,
  RelatedProductsSection,
  SpecificationsSection,
} from "@/components/public/sections/product-detail";

import {
  getPublicProductBySlug,
  type PublicProductDetail,
} from "@/lib/actions/public-products";
import { buildOgImageUrl, createPublicMetadata } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type PublicLocale = "en" | "ar";

type ProductImageLike = {
  src?: string | null;
  url?: string | null;
  alt?: string | null;
};

type ProductCardLike = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  fullDescription?: string | null;
  status?: string | null;
  category?: {
    name?: string | null;
  } | null;
  therapeuticArea?: {
    name?: string | null;
  } | null;
  manufacturer?: {
    name?: string | null;
  } | null;
  advancedDetails?: {
    storageConditions?: string | null;
    regulatoryInfo?: string | null;
  } | null;
  coverImageUrl?: string | null;
  image?: ProductImageLike | null;
  images?: ProductImageLike[] | null;
  featuredImage?: ProductImageLike | null;
  media?: ProductImageLike[] | null;
};

type ProductDetailLike = PublicProductDetail &
  ProductCardLike & {
    relatedProducts?: ProductCardLike[] | null;
    related?: ProductCardLike[] | null;
    productType?: string | null;
  };

export const revalidate = 900;
export const dynamicParams = true;

function resolveLocale(locale: string): PublicLocale {
  return locale === "ar" ? "ar" : "en";
}

function cleanString(value?: string | null): string | undefined {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
}

function getProductImage(product: ProductCardLike) {
  const coverImageUrl = cleanString(product.coverImageUrl);
  const image =
    (coverImageUrl
      ? {
          src: coverImageUrl,
          alt: product.name || "Product image",
        }
      : null) ||
    product.image ||
    product.featuredImage ||
    product.images?.find((item) => item?.src || item?.url) ||
    product.media?.find((item) => item?.src || item?.url);

  const src = cleanString(image?.src) || cleanString(image?.url);

  if (!src) return undefined;

  return {
    src,
    alt: cleanString(image?.alt) || product.name || "Product image",
  };
}

function getProductImages(product: ProductCardLike) {
  const images = [
    getProductImage(product),
    ...(product.images || []),
    ...(product.media || []),
  ].filter(Boolean) as ProductImageLike[];
  const uniqueImages = new Map<string, { src: string; alt: string }>();

  for (const image of images) {
    const src = cleanString(image.src) || cleanString(image.url);
    if (!src || uniqueImages.has(src)) {
      continue;
    }

    uniqueImages.set(src, {
      src,
      alt: cleanString(image.alt) || product.name || "Product image",
    });
  }

  return Array.from(uniqueImages.values());
}

function getProductStatus(product: ProductCardLike, locale: PublicLocale) {
  const isArabic = locale === "ar";

  return product.status === "AVAILABLE"
    ? isArabic
      ? "متاح"
      : "Available"
    : isArabic
      ? "قيد التطوير"
      : "Pipeline";
}

function buildProductCard(
  product: ProductCardLike,
  locale: PublicLocale,
): ProductCardData {
  const image = getProductImage(product);

  return {
    id: product.id,
    name: product.name,
    description:
      cleanString(product.shortDescription) ||
      cleanString(product.fullDescription) ||
      "",
    category:
      cleanString(product.category?.name) ||
      (locale === "ar" ? "غير محدد" : "Not specified"),
    href: `/products/${product.slug}`,
    image,
    badge: getProductStatus(product, locale),
    indication: cleanString(product.therapeuticArea?.name),
    storage: cleanString(product.advancedDetails?.storageConditions),
  };
}

function getRelatedProducts(product: ProductDetailLike, locale: PublicLocale) {
  const relatedProducts = product.relatedProducts || product.related || [];

  return relatedProducts.map((item) => buildProductCard(item, locale));
}

function buildProductDetailViewModel(
  product: ProductDetailLike,
  locale: PublicLocale,
) {
  const isArabic = locale === "ar";
  const image = getProductImage(product);
  const images = getProductImages(product);

  const shortDescription = cleanString(product.shortDescription);
  const fullDescription = cleanString(product.fullDescription);

  const body = [fullDescription, shortDescription]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(/\n+/))
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  const categoryName =
    cleanString(product.category?.name) ||
    (isArabic ? "غير محدد" : "Not specified");

  const therapeuticAreaName =
    cleanString(product.therapeuticArea?.name) ||
    (isArabic ? "غير محدد" : "Not specified");

  const manufacturerName =
    cleanString(product.manufacturer?.name) ||
    (isArabic ? "غير محدد" : "Not specified");

  const productType =
    cleanString(product.productType) ||
    cleanString(product.category?.name) ||
    (isArabic ? "غير محدد" : "Not specified");

  const storageConditions =
    cleanString(product.advancedDetails?.storageConditions) ||
    (isArabic ? "غير محدد" : "Not specified");

  const regulatoryInfo =
    cleanString(product.advancedDetails?.regulatoryInfo) ||
    (isArabic ? "غير محدد" : "Not specified");

  const productBullets = [
    `${isArabic ? "الفئة" : "Category"}: ${categoryName}`,
    `${isArabic ? "المجال العلاجي" : "Therapeutic Area"}: ${therapeuticAreaName}`,
    `${isArabic ? "الشركة المصنعة" : "Manufacturer"}: ${manufacturerName}`,
  ];

  const specificationItems = [
    {
      label: isArabic ? "الحالة" : "Status",
      value: getProductStatus(product, locale),
    },
    {
      label: isArabic ? "نوع المنتج" : "Product Type",
      value: productType,
    },
    {
      label: isArabic ? "شروط التخزين" : "Storage Conditions",
      value: storageConditions,
    },
    {
      label: isArabic ? "المعلومات التنظيمية" : "Regulatory Information",
      value: regulatoryInfo,
    },
  ];

  return {
    hero: {
      eyebrow: isArabic ? "تفاصيل المنتج" : "Product Detail",
      title: product.name,
      subtitle: shortDescription || "",
      backgroundImage: image,
      actions: [
        {
          label: isArabic ? "العودة إلى المنتجات" : "Back to Products",
          href: "/products",
        },
      ],
    },
    productInfo: {
      eyebrow: isArabic ? "معلومات المنتج" : "Product Information",
      title: product.name,
      subtitle: shortDescription || "",
      body,
      bullets: productBullets,
      image,
      images,
    },
    specifications: {
      title: isArabic ? "المواصفات" : "Specifications",
      description: isArabic
        ? "ملخص فني سريع لفرق الجودة والامتثال والتسجيل."
        : "A quick technical summary for quality, compliance, and registration teams.",
      items: specificationItems,
    },
    relatedProducts: {
      title: isArabic ? "منتجات ذات صلة" : "Related Products",
      description: isArabic
        ? "منتجات أخرى من نفس الفئة أو المجال العلاجي."
        : "Other products from the same category or therapeutic area.",
      items: getRelatedProducts(product, locale),
      columns: 3 as const,
    },
    cta: {
      eyebrow: isArabic ? "هل تحتاج مزيدًا من المعلومات؟" : "Need More Information?",
      title: isArabic
        ? "تواصل مع فريق المنتجات لدى داميرا"
        : "Connect with Damira's Product Team",
      description: isArabic
        ? "يساعدك فريقنا في الأسئلة الفنية والتوفر وخطط الإطلاق."
        : "Our team can support technical questions, availability, and launch planning.",
      primaryAction: {
        label: isArabic ? "تواصل معنا" : "Contact Us",
        href: "/contact",
      },
      secondaryAction: {
        label: isArabic ? "استكشف الشراكات" : "Explore Partnerships",
        href: "/partnerships",
      },
    },
  };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = resolveLocale(locale);

  const product = await getPublicProductBySlug(currentLocale, slug);

  if (!product) {
    const title =
      currentLocale === "ar" ? "المنتج غير موجود" : "Product Not Found";

    return createPublicMetadata({
      locale: currentLocale,
      pathname: `/products/${slug}`,
      title,
      description:
        currentLocale === "ar"
          ? "تعذر العثور على المنتج المطلوب."
          : "The requested product could not be found.",
      image: buildOgImageUrl(title, currentLocale),
    });
  }

  const productData = product as ProductDetailLike;

  const title = productData.name;
  const description =
    cleanString(productData.shortDescription) ||
    cleanString(productData.fullDescription) ||
    (currentLocale === "ar"
      ? "تفاصيل منتج من داميرا فارما."
      : "Product details from Damira Pharma.");

  return createPublicMetadata({
    locale: currentLocale,
    pathname: `/products/${slug}`,
    title,
    description,
    image: buildOgImageUrl(title, currentLocale),
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const currentLocale = resolveLocale(locale);

  const product = await getPublicProductBySlug(currentLocale, slug);

  if (!product) {
    notFound();
  }

  const pageData = buildProductDetailViewModel(
    product as ProductDetailLike,
    currentLocale,
  );

  return (
    <>
      <section id="product-information" className="scroll-mt-32">
        <ProductInfoSection data={pageData.productInfo} />
      </section>

      <section id="product-specifications" className="scroll-mt-32">
        <SpecificationsSection data={pageData.specifications} />
      </section>

      <section id="related-products" className="scroll-mt-32">
        <RelatedProductsSection data={pageData.relatedProducts} />
      </section>

      <section id="product-contact" className="scroll-mt-32">
        <ProductDetailCtaSection data={pageData.cta} />
      </section>
    </>
  );
}
