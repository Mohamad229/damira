import type {
  ContentSectionData,
  CtaSectionData,
  HeroSectionData,
  ProductCardData,
  ServiceCardData,
  StatsSectionData,
} from "@/components/public/sections/base";
import type { Locale } from "@/i18n/config";

function editableIcon(alt: string) {
  return { src: "", alt };
}

interface GridWithServices {
  title: string;
  description?: string;
  columns?: 2 | 3 | 4;
  image?: {
    src?: string;
    alt?: string;
  };
  items: ServiceCardData[];
}

interface ServiceItemData {
  id: string;
  isVisible: boolean;
  eyebrow?: string;
  headerLabel: string;
  anchorId: string;
  href: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: { src: string; alt: string };
  image?: {
    src: string;
    alt: string;
  };
  features: string[];
  cta?: {
    label: string;
    href: string;
  };
}

interface ServicesListData {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: ServiceItemData[];
}

interface GridWithProducts {
  title: string;
  description?: string;
  columns?: 2 | 3 | 4;
  items: ProductCardData[];
}

interface VisionMissionData {
  title: string;
  description?: string;
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
}

interface ContactInfoData {
  title: string;
  description?: string;
  departments: Array<{
    title: string;
    emailLabel: string;
    email: string;
    emailHref?: string;
    phoneLabel: string;
    phone: string;
    phoneHref?: string;
    icon?: { src: string; alt: string };
    emailIcon?: { src: string; alt: string };
    phoneIcon?: { src: string; alt: string };
  }>;
}

interface InquiryTypeOptionData {
  value: string;
  label: string;
}

interface InquiryFormSectionData {
  title: string;
  description: string;
  features?: Array<{
    id: string;
    title: string;
    icon: { src: string; alt: string };
  }>;
  fields: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    inquiryType: string;
    inquiryTypePlaceholder: string;
    inquiryTypeOptions: InquiryTypeOptionData[];
    message: string;
    submit: string;
  };
}

interface QmsArchitectureData extends ContentSectionData {
  hubLabel: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: { src: string; alt: string };
  }>;
}

interface EthicsComplianceData extends ContentSectionData {
  items: Array<{
    id: string;
    title: string;
    description: string;
    statusLabel: string;
    icon: { src: string; alt: string };
  }>;
}

export interface QualityCertificatesData {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: Array<{
    id: string;
    isVisible: boolean;
    title: string;
    subtitle: string;
    issuer?: string;
    date?: string;
    icon: { src: string; alt: string };
    image: { src: string; alt: string };
    fileUrl?: string;
    openUrl?: string;
    order: number;
  }>;
}

interface PartnershipAdvantageData extends ContentSectionData {
  overlayTitle: string;
  overlayDescription: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: { src: string; alt: string };
  }>;
}

interface SuccessHighlightData {
  metricsTitle: string;
  metricsBadge: string;
  emptyMetricsText: string;
  items: Array<{
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string[];
    bullets: string[];
    metrics: Array<{
      label: string;
      value: string;
      progress: number;
      color: "blue" | "green" | "orange";
    }>;
  }>;
}

export interface HomePageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  atAGlance: StatsSectionData;
  strategicFocus: GridWithServices;
  keyStrengths: GridWithServices;
  coverageReach: StatsSectionData;
  successHighlight: SuccessHighlightData;
  cta: CtaSectionData;
}

export interface AboutPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  companyOverview: ContentSectionData;
  visionMission: VisionMissionData;
  coreValues: GridWithServices;
  legacySuccess: {
    stats: StatsSectionData;
    content: ContentSectionData;
  };
}

export interface ServicesPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  serviceItems: ServicesListData;
  infrastructure: ContentSectionData;
  regulatory: ContentSectionData;
  safetyVigilance: ContentSectionData;
  logisticsDistribution: ContentSectionData;
  marketAccess: ContentSectionData;
}

export interface ProductsPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  pipelineSegments: {
    title: string;
    description?: string;
    columns?: 2 | 3 | 4;
    items: Array<{
      id: string;
      title: string;
    }>;
  };
  catalog: GridWithProducts;
}

export interface QualityPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  complianceDetails: ContentSectionData;
  qmsArchitecture: QmsArchitectureData;
  certificates: QualityCertificatesData;
  ethicsCompliance: EthicsComplianceData;
}

export interface PartnershipsPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  whyPartner: GridWithServices;
  advantage: PartnershipAdvantageData;
  partnershipForm: InquiryFormSectionData;
}

export interface ContactPageData {
  metadata: {
    title: string;
    description: string;
  };
  hero: HeroSectionData;
  contactInfo: ContactInfoData;
  contactForm: InquiryFormSectionData;
}

export interface PublicUiData {
  home: HomePageData;
  about: AboutPageData;
  services: ServicesPageData;
  products: ProductsPageData;
  quality: QualityPageData;
  partnerships: PartnershipsPageData;
  contact: ContactPageData;
}

const PRODUCT_CARDS_EN: ProductCardData[] = [
  {
    id: "rinolac",
    name: "Rinolac",
    category: "Specialized Nutrition",
    description:
      "Premium infant and pediatric nutrition designed for clinical confidence and sustained growth outcomes.",
    indication: "Nutritional support for infants and toddlers",
    storage: "Store in dry conditions below 25C",
    badge: "Current Portfolio",
    href: "/products/rinolac",
    image: { src: "", alt: "Rinolac product pack" },
  },
  {
    id: "rino-plus",
    name: "Rino Plus",
    category: "Critical Care",
    description:
      "Hospital-focused therapeutic product line with reliable supply planning and scientific detailing.",
    indication: "ICU and acute care nutrition support",
    storage: "Controlled room temperature",
    badge: "Current Portfolio",
    href: "/products/rino-plus",
    image: { src: "", alt: "Rino Plus packaging" },
  },
  {
    id: "ausnutria",
    name: "Ausnutria",
    category: "Pediatrics",
    description:
      "Evidence-backed pediatric nutrition brand supported by localized education and field medical guidance.",
    indication: "Pediatric nutritional management",
    storage: "Keep away from humidity",
    badge: "Current Portfolio",
    href: "/products/ausnutria",
    image: {
      src: "",
      alt: "Ausnutria product range",
    },
  },
];

const PRODUCT_CARDS_AR: ProductCardData[] = [
  {
    id: "rinolac",
    name: "رينولاك",
    category: "التغذية المتخصصة",
    description:
      "حل تغذية للأطفال والرضع بمعايير موثوقة يدعم نتائج النمو بشكل مستدام.",
    indication: "دعم غذائي للرضع والأطفال",
    storage: "يحفظ في مكان جاف تحت 25 درجة",
    badge: "المحفظة الحالية",
    href: "/products/rinolac",
    image: { src: "", alt: "منتج رينولاك" },
  },
  {
    id: "rino-plus",
    name: "رينو بلس",
    category: "العناية الحرجة",
    description:
      "خط علاجي موجه للمستشفيات مع تخطيط توريد موثوق ودعم علمي مستمر.",
    indication: "دعم غذائي في العناية المركزة",
    storage: "درجة حرارة الغرفة المضبوطة",
    badge: "المحفظة الحالية",
    href: "/products/rino-plus",
    image: { src: "", alt: "منتج رينو بلس" },
  },
  {
    id: "ausnutria",
    name: "أوسنوتريا",
    category: "طب الأطفال",
    description:
      "علامة تغذية أطفال مدعومة بالأدلة مع برامج تعليمية ميدانية محلية.",
    indication: "إدارة التغذية للأطفال",
    storage: "يحفظ بعيدًا عن الرطوبة",
    badge: "المحفظة الحالية",
    href: "/products/ausnutria",
    image: { src: "", alt: "منتجات أوسنوتريا" },
  },
];

const PUBLIC_UI_EN: PublicUiData = {
  home: {
    metadata: {
      title: "Building Syria's Specialized Healthcare Distribution Ecosystem",
      description:
        "Trusted partner for global life science, nutrition, and medical technology innovators.",
    },
    hero: {
      eyebrow: "Damira Pharma",
      title: "Building Syria's Specialized Healthcare Distribution Ecosystem",
      subtitle:
        "Trusted partner for global life science, nutrition, and medical technology innovators.",
      actions: [
        { label: "Explore Products", href: "/products", variant: "primary" },
        {
          label: "Become a Partner",
          href: "/partnerships",
          variant: "secondary",
        },
      ],
      backgroundImage: {
        src: "",
        alt: "Healthcare logistics and pharmaceutical operations",
      },
    },
    atAGlance: {
      title: "Damira Pharma at a Glance",
      items: [
        { id: "founded", label: "Founded", value: "2025" },
        {
          id: "legacy",
          label: "Al Ahlam Group Established",
          value: "1974",
        },
        {
          id: "facility",
          label: "Facility",
          value: "1,500 m2",
        },
        { id: "storage", label: "Storage", value: "9,000 m3" },
      ],
    },
    strategicFocus: {
      title: "Strategic Focus Areas",
      description:
        "Four clinical segments where Damira delivers depth, control, and sustained value.",
      items: [
        {
          id: "oncology",
          title: "Oncology & Hematology",
          description:
            "Specialized programs with strict handling protocols and patient-centered supply continuity.",
          icon: editableIcon("Oncology and hematology icon"),
        },
        {
          id: "icu",
          title: "Critical Care & ICU",
          description:
            "Rapid-response supply models for high-acuity environments and life-support workflows.",
          icon: editableIcon("Critical care and ICU icon"),
        },
        {
          id: "nutrition",
          title: "Nutrition & Pediatrics",
          description:
            "Clinically informed nutrition portfolios for neonatal, pediatric, and specialized care pathways.",
          icon: editableIcon("Nutrition and pediatrics icon"),
        },
        {
          id: "diagnostics",
          title: "Diagnostics & Devices",
          description:
            "Reliable movement of precision diagnostics and healthcare technologies across care networks.",
          icon: editableIcon("Diagnostics and devices icon"),
        },
      ],
    },
    keyStrengths: {
      title: "Key Strengths",
      description:
        "A corporate execution model built for compliance, control, and measurable outcomes.",
      image: {
        src: "",
        alt: "Healthcare logistics and pharmaceutical distribution facility",
      },
      items: [
        {
          id: "audit",
          title: "Audit-Ready Infrastructure",
          description:
            "Documented systems, validated workflows, and inspection-grade operating discipline.",
          icon: editableIcon("Audit-ready infrastructure icon"),
        },
        {
          id: "cold-chain",
          title: "Advanced Cold Chain",
          description:
            "Validated 2-8C and ultra-low environments with real-time monitoring coverage.",
          icon: editableIcon("Advanced cold chain icon"),
        },
        {
          id: "regulatory",
          title: "Regulatory Expertise",
          description:
            "Structured dossiers, authorization pathways, and continuous regulatory follow-up.",
          icon: editableIcon("Regulatory expertise icon"),
        },
        {
          id: "distribution",
          title: "Nationwide Distribution",
          description:
            "Field-proven last-mile capabilities spanning hospitals, pharmacies, and institutions.",
          icon: editableIcon("Nationwide distribution icon"),
        },
        {
          id: "legacy-strength",
          title: "50+ Years Group Legacy",
          description:
            "Operational maturity and financial stability through Al Ahlam Group foundations.",
          icon: editableIcon("Group legacy strength icon"),
        },
      ],
    },
    coverageReach: {
      title: "Coverage & Reach",
      items: [
        {
          id: "hospitals",
          label: "Hospitals & Centers",
          value: "100+",
        },
        { id: "pos", label: "Points of Sale", value: "35,000+" },
        {
          id: "pharmacies",
          label: "Pharmacies",
          value: "15,000+",
        },
        {
          id: "coverage",
          label: "Nationwide Access",
          value: "Syria",
        },
      ],
    },
    successHighlight: {
      metricsTitle: "Impact Snapshot",
      metricsBadge: "Live Model",
      emptyMetricsText:
        "Add metrics from the dashboard to show commercial impact indicators for this success highlight.",
      items: [
        {
          id: "brand-scaling",
          eyebrow: "Success Highlight",
          title: "Proven Brand Scaling",
          subtitle:
            "Damira Pharma provides an integrated commercialization model for specialized healthcare brands entering complex markets.",
          body: [
            "Our team supports partners from regulatory preparation through market access, institutional engagement, and long-term distribution execution.",
          ],
          bullets: [
            "Accelerated access to hospitals, pharmacies, and healthcare institutions",
            "Audit-ready logistics with traceable distribution workflows",
            "Commercial execution supported by market intelligence and field teams",
          ],
          metrics: [
            {
              label: "Market Penetration Speed",
              value: "Accelerated",
              progress: 85,
              color: "blue",
            },
            {
              label: "Formulary Success Rate",
              value: "High",
              progress: 92,
              color: "blue",
            },
            {
              label: "Compliance & Traceability",
              value: "100%",
              progress: 100,
              color: "green",
            },
          ],
        },
        {
          id: "market-access",
          eyebrow: "Success Highlight",
          title: "Specialized Market Access",
          subtitle:
            "We help global healthcare innovators navigate regulatory, commercial, and logistical barriers with a structured launch model.",
          body: [
            "From product registration support to stakeholder mapping, Damira Pharma builds the operational bridge between manufacturers and local healthcare demand.",
          ],
          bullets: [
            "Regulatory pathway coordination for complex healthcare products",
            "Targeted engagement with key opinion leaders and institutions",
            "Launch planning aligned with supply chain and demand realities",
          ],
          metrics: [
            {
              label: "Launch Readiness",
              value: "Structured",
              progress: 88,
              color: "blue",
            },
            {
              label: "Partner Visibility",
              value: "High",
              progress: 90,
              color: "orange",
            },
            {
              label: "Risk Control",
              value: "Strong",
              progress: 94,
              color: "green",
            },
          ],
        },
        {
          id: "distribution-execution",
          eyebrow: "Success Highlight",
          title: "Reliable Distribution Execution",
          subtitle:
            "Our infrastructure is designed for high-sensitivity healthcare products that require disciplined storage, handling, and delivery.",
          body: [
            "We combine quality systems, cold-chain controls, and data-backed reporting to protect product integrity and partner confidence.",
          ],
          bullets: [
            "Temperature-sensitive handling and documented storage processes",
            "Traceable inventory movement from warehouse to healthcare channel",
            "Operational reporting for partners and internal quality review",
          ],
          metrics: [
            {
              label: "Cold Chain Control",
              value: "Monitored",
              progress: 96,
              color: "green",
            },
            {
              label: "Distribution Coverage",
              value: "National",
              progress: 82,
              color: "blue",
            },
            {
              label: "Reporting Quality",
              value: "Transparent",
              progress: 91,
              color: "blue",
            },
          ],
        },
      ],
    },
    cta: {
      eyebrow: "Partnership",
      title: "Let's Build the Future of Healthcare in Syria",
      description:
        "Partner with Damira Pharma to enter the Syrian healthcare market through a trusted, compliant, and scalable platform.",
      primaryAction: { label: "Become a Partner", href: "/partnerships" },
      secondaryAction: { label: "Contact Us", href: "/contact" },
    },
  },
  about: {
    metadata: {
      title: "About Damira Pharma",
      description:
        "Specialized healthcare division of Al Ahlam Group with a modern, compliant operating model.",
    },
    hero: {
      eyebrow: "About Us",
      title: "About Damira Pharma",
      subtitle: "Specialized Healthcare Division of Al Ahlam Group",
      backgroundImage: {
        src: "",
        alt: "Damira Pharma facility and team",
      },
    },
    companyOverview: {
      eyebrow: "Company Overview",
      title: "A New Healthcare Platform with Deep Operational Roots",
      body: [
        "Damira Pharma was founded in 2025 as the specialized healthcare division of Al Ahlam Group, established in 1974.",
        "The group is ISO and FDA certified and supports nationwide execution through trusted infrastructure and disciplined governance.",
      ],
      bullets: [
        "Founded in 2025 with focused healthcare specialization",
        "Built on Al Ahlam Group legacy since 1974",
        "Nationwide infrastructure with quality-first execution",
      ],
      images: [
        {
          src: "",
          alt: "Healthcare laboratory operations",
        },
        {
          src: "",
          alt: "Healthcare distribution facility",
        },
        {
          src: "",
          alt: "Medical healthcare equipment",
        },
      ],
    },
    visionMission: {
      title: "Vision & Mission",
      description:
        "A long-term strategy anchored in access, quality, and scientific commercialization.",
      vision: {
        title: "Vision",
        description:
          "To be the preferred strategic partner for global healthcare innovators seeking resilient and compliant growth in Syria.",
      },
      mission: {
        title: "Mission",
        description:
          "To provide a GDP-compliant ecosystem that ensures safe and reliable access to therapies while building sustainable partnerships.",
      },
    },
    coreValues: {
      title: "Core Values",
      items: [
        {
          id: "quality",
          title: "Quality & Compliance",
          description:
            "Every process is designed for consistency, documentation, and patient safety.",
          icon: editableIcon("Quality and compliance icon"),
        },
        {
          id: "science",
          title: "Scientific Excellence",
          description:
            "Clinical accuracy and evidence-based engagement guide all field and medical activities.",
          icon: editableIcon("Scientific excellence icon"),
        },
        {
          id: "ethics",
          title: "Ethics & Partnerships",
          description:
            "Transparent collaboration with principled governance and long-term accountability.",
          icon: editableIcon("Ethics and partnerships icon"),
        },
        {
          id: "team",
          title: "Team Development",
          description:
            "Structured capability-building programs sustain performance and leadership continuity.",
          icon: editableIcon("Team development icon"),
        },
        {
          id: "patient",
          title: "Patient Commitment",
          description:
            "Operational decisions prioritize therapeutic access and continuity of care.",
          icon: editableIcon("Patient commitment icon"),
        },
      ],
    },
    legacySuccess: {
      stats: {
        items: [
          {
            id: "m1",
            label: "Operational Legacy",
            value: "50+ Years",
          },
          {
            id: "m2",
            label: "Proven Growth",
            value: "+20%",
            description: "Market growth achieved for Rinolac",
          },
          {
            id: "m3",
            label: "National Network",
            value: "Nationwide",
          },
          {
            id: "m4",
            label: "Healthcare Relationships",
            value: "Long-term",
          },
        ],
      },
      content: {
        slides: [
          {
            id: "legacy-strength",
            eyebrow: "Legacy & Strength",
            title: "Operational Strength Backed by 50+ Years of Experience",
            subtitle:
              "A specialized healthcare platform strengthened by mature regional execution.",
            body: [
              "Damira benefits from established healthcare relationships and a national network shaped through decades of operational execution.",
              "The organization combines mature governance with agile market operations to scale partners sustainably.",
            ],
            bullets: [
              "Established operational roots",
              "Nationwide healthcare relationships",
              "Governance-backed execution",
              "Partner-focused growth",
            ],
            actions: [
              { label: "Explore Services", href: "/services" },
              { label: "Contact Us", href: "/contact" },
            ],
          },
          {
            id: "success-story",
            eyebrow: "Success Story",
            title: "Growth Built on Disciplined Execution",
            subtitle:
              "Commercial execution, market access, and supply discipline work together.",
            body: [
              "Damira aligns stakeholder engagement, product availability, and field planning to support measurable healthcare brand growth.",
            ],
            bullets: [
              "Data-led market planning",
              "Structured partner onboarding",
              "Traceable distribution workflows",
              "Transparent performance reporting",
            ],
            actions: [{ label: "Start Partnership", href: "/partnerships" }],
          },
        ],
      },
    },
  },
  services: {
    metadata: {
      title:
        "Comprehensive Healthcare Distribution & Commercialization Services",
      description:
        "Integrated infrastructure, regulatory, logistics, and medical support capabilities.",
    },
    hero: {
      eyebrow: "Services",
      title:
        "Comprehensive Healthcare Distribution & Commercialization Services",
      subtitle:
        "From validated infrastructure to scientific market execution, Damira delivers a full specialized healthcare operating stack.",
      actions: [
        { label: "Explore Products", href: "/products", variant: "primary" },
      ],
    },
    serviceItems: {
      eyebrow: "Services",
      title: "Integrated healthcare services",
      description:
        "End-to-end support for life science partners through one specialized operating platform.",
      items: [
        {
          id: "regulatory",
          isVisible: true,
          eyebrow: "Regulatory Services",
          headerLabel: "Regulatory Affairs & Compliance",
          anchorId: "services-regulatory",
          href: "/services#services-regulatory",
          title: "Structured Regulatory Affairs Execution",
          description:
            "Registration and compliance support for healthcare products entering regulated markets.",
          icon: editableIcon("Regulatory service icon"),
          image: {
            src: "",
            alt: "Regulatory documentation",
          },
          features: [
            "Dossier preparation and submission planning",
            "Product registration and market authorization",
            "Continuous regulatory monitoring and updates",
          ],
          cta: { label: "Request Service", href: "/contact" },
        },
        {
          id: "infrastructure",
          isVisible: true,
          eyebrow: "Infrastructure",
          headerLabel: "Infrastructure & Storage",
          anchorId: "services-infrastructure",
          href: "/services#services-infrastructure",
          title: "Advanced Infrastructure & Storage",
          subtitle:
            "1,500 m2 facility with 9,000 m3 climate-controlled capacity.",
          description:
            "Validated storage and operating infrastructure for specialized healthcare portfolios.",
          icon: editableIcon("Infrastructure service icon"),
          image: {
            src: "",
            alt: "Storage infrastructure",
          },
          features: [
            "Segregated zones for oncology, ambient, and sterile products",
            "HVAC and HEPA environmental controls",
            "24/7 monitored security and restricted access",
          ],
          cta: { label: "Request Service", href: "/contact" },
        },
        {
          id: "market-access",
          isVisible: true,
          eyebrow: "Market Access",
          headerLabel: "Market Access",
          anchorId: "services-market-access",
          href: "/services#services-market-access",
          title: "Hospital Access and Commercial Acceleration",
          description:
            "Commercial execution support for hospital access, stakeholder engagement, and launch growth.",
          icon: editableIcon("Market access service icon"),
          image: {
            src: "",
            alt: "Market access strategy",
          },
          features: [
            "Hospital relationship management",
            "Decision-maker engagement",
            "Tender and bid management support",
            "Scientific events and symposia execution",
          ],
          cta: { label: "Request Service", href: "/contact" },
        },
        {
          id: "logistics-distribution",
          isVisible: true,
          eyebrow: "Logistics & Distribution",
          headerLabel: "Logistics & Distribution",
          anchorId: "services-logistics-distribution",
          href: "/services#services-logistics-distribution",
          title: "Nationwide Delivery and Traceability",
          description:
            "Controlled logistics and delivery workflows with traceability across healthcare channels.",
          icon: editableIcon("Logistics and distribution service icon"),
          image: {
            src: "",
            alt: "Distribution fleet",
          },
          features: [
            "Nationwide delivery network across Syria",
            "Multi-zone temperature-controlled transport",
            "End-to-end shipment traceability",
            "Direct hospital and institutional delivery",
          ],
          cta: { label: "Request Service", href: "/contact" },
        },
        {
          id: "safety-vigilance",
          isVisible: true,
          eyebrow: "Safety & Vigilance",
          headerLabel: "Safety & Vigilance",
          anchorId: "services-safety-vigilance",
          href: "/services#services-safety-vigilance",
          title: "Pharmacovigilance and Materiovigilance Readiness",
          description:
            "Safety monitoring frameworks that support compliant post-market oversight.",
          icon: editableIcon("Safety and vigilance service icon"),
          image: {
            src: "",
            alt: "Safety vigilance operations",
          },
          features: [
            "PV and MV frameworks with SOP-guided workflows",
            "24-hour serious event reporting model",
            "Dedicated safety officer oversight",
          ],
          cta: { label: "Request Service", href: "/contact" },
        },
      ],
    },
    infrastructure: {
      eyebrow: "Infrastructure",
      title: "Advanced Infrastructure & Storage",
      subtitle: "1,500 m2 facility with 9,000 m3 climate-controlled capacity.",
      bullets: [
        "Segregated zones for oncology, ambient, and sterile products",
        "HVAC and HEPA environmental controls",
        "24/7 monitored security and restricted access",
      ],
      icon: editableIcon("Infrastructure service icon"),
      image: {
        src: "",
        alt: "Storage infrastructure",
      },
    },
    regulatory: {
      eyebrow: "Regulatory Services",
      title: "Structured Regulatory Affairs Execution",
      bullets: [
        "Dossier preparation and submission planning",
        "Product registration and market authorization",
        "Continuous regulatory monitoring and updates",
      ],
      icon: editableIcon("Regulatory service icon"),
      image: {
        src: "",
        alt: "Regulatory documentation",
      },
    },
    safetyVigilance: {
      eyebrow: "Safety & Vigilance",
      title: "Pharmacovigilance and Materiovigilance Readiness",
      bullets: [
        "PV and MV frameworks with SOP-guided workflows",
        "24-hour serious event reporting model",
        "Dedicated safety officer oversight",
      ],
      icon: editableIcon("Safety and vigilance service icon"),
      image: {
        src: "",
        alt: "Safety vigilance operations",
      },
      imagePosition: "left",
    },
    logisticsDistribution: {
      eyebrow: "Logistics & Distribution",
      title: "Nationwide Delivery and Traceability",
      bullets: [
        "Nationwide delivery network across Syria",
        "Multi-zone temperature-controlled transport",
        "End-to-end shipment traceability",
        "Direct hospital and institutional delivery",
      ],
      icon: editableIcon("Logistics and distribution service icon"),
      image: {
        src: "",
        alt: "Distribution fleet",
      },
      imagePosition: "left",
    },
    marketAccess: {
      eyebrow: "Market Access",
      title: "Hospital Access and Commercial Acceleration",
      bullets: [
        "Hospital relationship management",
        "Decision-maker engagement",
        "Tender and bid management support",
        "Scientific events and symposia execution",
      ],
      icon: editableIcon("Market access service icon"),
      image: {
        src: "",
        alt: "Market access strategy",
      },
    },
  },
  products: {
    metadata: {
      title: "Strategic Portfolio of Specialized Healthcare Products",
      description:
        "Focused portfolio and growth pipeline across critical therapeutic verticals.",
    },
    hero: {
      eyebrow: "Products",
      title: "Strategic Portfolio of Specialized Healthcare Products",
      subtitle:
        "Damira aligns specialized brands with market need, quality infrastructure, and scientific execution.",
      actions: [
        {
          label: "Contact Product Team",
          href: "/contact",
          variant: "secondary",
        },
      ],
      backgroundImage: {
        src: "",
        alt: "Pharmaceutical product portfolio",
      },
    },
    pipelineSegments: {
      title: "Pipeline Segments",
      items: [
        {
          id: "p1",
          title: "Oncology Therapies",
        },
        {
          id: "p2",
          title: "ICU Life-Saving Drugs",
        },
        {
          id: "p3",
          title: "Clinical Nutrition",
        },
        {
          id: "p4",
          title: "Pediatric Products",
        },
        {
          id: "p5",
          title: "Diagnostic Solutions",
        },
      ],
    },
    catalog: {
      title: "Product Catalog",
      description:
        "Each product profile includes category, indication, storage requirements, and supporting documents.",
      items: PRODUCT_CARDS_EN,
      columns: 3,
    },
  },
  quality: {
    metadata: {
      title: "Commitment to Quality, Safety, and Regulatory Excellence",
      description:
        "System-driven quality management and ethical healthcare operations.",
    },
    hero: {
      eyebrow: "Quality & Compliance",
      title: "Commitment to Quality, Safety, and Regulatory Excellence",
      subtitle:
        "Damira's quality architecture supports resilient healthcare delivery through compliance-by-design.",
    },
    complianceDetails: {
      title: "Structured Governance Across Every Stage",
      description:
        "At Damira Pharma, quality is the operating system of our entire organization. We adhere to strict international guidelines to ensure product integrity from manufacturer to patient.",
      items: [
        {
          id: "iso-certification",
          title: "ISO Certification",
          description:
            "Quality management systems certified to international ISO standards with continuous improvement, documented processes, and risk management.",
          icon: editableIcon("ISO certification icon"),
        },
        {
          id: "fda-compliance",
          title: "FDA Compliance Alignment",
          description:
            "Facilities and procedures designed to align with stringent pharmaceutical handling, storage, and traceability guidelines.",
          icon: editableIcon("FDA compliance alignment icon"),
        },
      ],
    },
    qmsArchitecture: {
      eyebrow: "QMS Framework",
      title: "Quality Management System",
      description:
        "A centralized quality management framework connecting procedures, audits, documentation, training, and ethical governance into one resilient operating system.",
      hubLabel: "QMS",
      items: [
        {
          id: "sop-capa",
          title: "SOP framework and CAPA workflows",
          description:
            "Documented procedures, corrective actions, and preventive quality controls.",
          icon: editableIcon("SOP and CAPA icon"),
        },
        {
          id: "gdp-gsp",
          title: "GDP and GSP compliance protocols",
          description:
            "Controlled distribution and storage practices across the full quality chain.",
          icon: editableIcon("GDP and GSP compliance icon"),
        },
        {
          id: "audits-documentation",
          title: "Internal audits and full documentation",
          description:
            "Traceable records and audit-ready documentation for continuous oversight.",
          icon: editableIcon("Internal audits and documentation icon"),
        },
        {
          id: "conduct-fmv",
          title: "Code of conduct and fair-market-value policies",
          description:
            "Transparent commercial conduct aligned with ethical partnership standards.",
          icon: editableIcon("Code of conduct and fair-market-value icon"),
        },
        {
          id: "training",
          title: "Continuous compliance training",
          description:
            "Ongoing capability-building to keep teams aligned with quality standards.",
          icon: editableIcon("Continuous compliance training icon"),
        },
      ],
    },
    certificates: {
      eyebrow: "Certifications",
      title: "Certifications & Compliance Records",
      description:
        "Official certificates and quality records that validate our commitment to international standards, documented governance, and regulatory compliance.",
      items: [
        {
          id: "iso-9001",
          isVisible: true,
          title: "ISO 9001:2015 Certification",
          subtitle: "Quality Management System",
          issuer: "International Quality Certification",
          date: "Valid until 2027",
          icon: editableIcon("ISO 9001 certificate icon"),
          image: {
            src: "",
            alt: "ISO 9001 certificate preview",
          },
          fileUrl: "",
          openUrl: "",
          order: 1,
        },
        {
          id: "gdp-compliance",
          isVisible: true,
          title: "GDP Compliance Record",
          subtitle: "Good Distribution Practice",
          issuer: "Quality Assurance Department",
          date: "Annual review record",
          icon: editableIcon("GDP compliance record icon"),
          image: {
            src: "",
            alt: "GDP compliance record preview",
          },
          fileUrl: "",
          openUrl: "",
          order: 2,
        },
        {
          id: "cold-chain-validation",
          isVisible: true,
          title: "Cold Chain Validation Record",
          subtitle: "Temperature-controlled storage and distribution",
          issuer: "Damira Pharma Quality Unit",
          date: "Current validation cycle",
          icon: editableIcon("Cold chain validation record icon"),
          image: {
            src: "",
            alt: "Cold chain validation record preview",
          },
          fileUrl: "",
          openUrl: "",
          order: 3,
        },
      ],
    },
    ethicsCompliance: {
      eyebrow: "Our Standards",
      title: "Ethics & Compliance Commitment",
      description:
        "Operating with unwavering integrity across all business functions to ensure transparency, accountability, and responsible healthcare partnerships.",
      items: [
        {
          id: "code-of-conduct",
          title: "Formal Code of Conduct",
          description:
            "Aligned with international anti-corruption standards and promotional codes - binding for all staff and partners.",
          statusLabel: "Compliant",
          icon: editableIcon("Formal code of conduct icon"),
        },
        {
          id: "no-off-label",
          title: "No Off-Label Promotion",
          description:
            "Scientific exchange is driven exclusively by approved clinical evidence, with zero tolerance for off-label promotional activities.",
          statusLabel: "Approved Evidence",
          icon: editableIcon("No off-label promotion icon"),
        },
        {
          id: "fair-market-value",
          title: "Fair-Market-Value Arrangements",
          description:
            "Transparent fair-market-value arrangements with healthcare professionals and institutions - no hidden incentives.",
          statusLabel: "Transparent",
          icon: editableIcon("Fair-market-value arrangements icon"),
        },
        {
          id: "training-audits",
          title: "Regular Training & Audits",
          description:
            "Staff training on compliance topics and internal compliance audits conducted on a regular scheduled basis.",
          statusLabel: "Regularly Audited",
          icon: editableIcon("Regular training and audits icon"),
        },
      ],
    },
  },
  partnerships: {
    metadata: {
      title: "Partner with Damira Pharma",
      description:
        "Strategic commercialization and distribution partnerships for healthcare innovators.",
    },
    hero: {
      eyebrow: "Partnerships",
      title: "Partner with Damira Pharma",
      subtitle:
        "Accelerate market entry in Syria through a specialized, compliant, and financially stable healthcare platform.",
      actions: [
        {
          label: "Explore Opportunities",
          href: "/contact",
          variant: "primary",
        },
        { label: "View Services", href: "/services", variant: "ghost" },
      ],
    },
    whyPartner: {
      title: "Why Partner with Us",
      items: [
        {
          id: "w1",
          title: "Strategic Specialization",
          description:
            "Focused therapeutic verticals with deep operational know-how.",
          icon: editableIcon("Strategic specialization icon"),
        },
        {
          id: "w2",
          title: "Audit-Ready Infrastructure",
          description:
            "Validated systems designed for international quality expectations.",
          icon: editableIcon("Audit-ready infrastructure icon"),
        },
        {
          id: "w3",
          title: "Regulatory Strength",
          description:
            "Disciplined registration and compliance execution across lifecycle stages.",
          icon: editableIcon("Regulatory strength icon"),
        },
        {
          id: "w4",
          title: "Market Access Capabilities",
          description:
            "Hospital and specialist engagement with structured access programs.",
          icon: editableIcon("Market access capabilities icon"),
        },
        {
          id: "w5",
          title: "Data-Driven Commercialization",
          description:
            "Performance-led planning backed by field and market intelligence.",
          icon: editableIcon("Data-driven commercialization icon"),
        },
        {
          id: "w6",
          title: "Financial Backing",
          description:
            "Backed by Al Ahlam Group's long-standing financial stability.",
          icon: editableIcon("Financial backing icon"),
        },
      ],
    },
    advantage: {
      eyebrow: "Partnership Advantage",
      title: "The Damira Advantage",
      description:
        "A partnership model built around compliance, access, market execution, and transparent performance reporting.",
      overlayTitle: "Compliant Market Access",
      overlayDescription: "Built for resilient healthcare partnerships.",
      image: {
        src: "",
        alt: "Healthcare market access partnership",
      },
      items: [
        {
          id: "risk-mitigation",
          title: "Risk Mitigation",
          description:
            "Rigorous compliance frameworks protect your brand reputation in complex markets.",
          icon: editableIcon("Risk mitigation icon"),
        },
        {
          id: "accelerated-access",
          title: "Accelerated Access",
          description:
            "Our regulatory expertise speeds up registration and market entry timelines.",
          icon: editableIcon("Accelerated access icon"),
        },
        {
          id: "deep-market-penetration",
          title: "Deep Market Penetration",
          description:
            "Established relationships with KOLs, hospitals, and major pharmacy chains.",
          icon: editableIcon("Deep market penetration icon"),
        },
        {
          id: "transparent-reporting",
          title: "Transparent Reporting",
          description:
            "Real-time data sharing on sales, inventory, and pharmacovigilance.",
          icon: editableIcon("Transparent reporting icon"),
        },
      ],
    },
    partnershipForm: {
      title: "Request a Partnership",
      description:
        "Share your business model, portfolio focus, and market objectives. Our partnership team will route your request to the right commercial and regulatory stakeholders.",
      features: [
        {
          id: "clear-collaboration",
          title: "Clear collaboration",
          icon: editableIcon("Clear collaboration icon"),
        },
        {
          id: "compliance-first",
          title: "Compliance-first",
          icon: editableIcon("Compliance-first icon"),
        },
        {
          id: "structured-follow-up",
          title: "Structured follow-up",
          icon: editableIcon("Structured follow-up icon"),
        },
      ],
      fields: {
        fullName: "Full Name",
        email: "Business Email",
        phone: "Phone Number",
        company: "Organization",
        inquiryType: "Partnership Type",
        inquiryTypePlaceholder: "Select partnership type",
        inquiryTypeOptions: [
          { value: "distribution", label: "Distribution Partnership" },
          { value: "licensing", label: "Licensing Opportunity" },
          { value: "strategic", label: "Strategic Alliance" },
          { value: "investment", label: "Investment / Joint Venture" },
          { value: "other", label: "Other" },
        ],
        message: "Partnership Details",
        submit: "Send Partnership Request",
      },
    },
  },
  contact: {
    metadata: {
      title: "Get in Touch with Damira Pharma",
      description:
        "Contact our team for partnerships, product inquiries, and strategic collaboration.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Get in Touch with Damira Pharma",
      subtitle:
        "Our team is ready to support your partnership, product, and market access needs.",
    },
    contactInfo: {
      title: "Contact Information",
      description: "Reach our corporate office through the channels below.",
      departments: [
        {
          title: "General Inquiries",
          emailLabel: "Email",
          email: "info@damirapharma.sy",
          emailHref: "mailto:info@damirapharma.sy",
          phoneLabel: "Mobile Number",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("General inquiries icon"),
          emailIcon: editableIcon("Email icon"),
          phoneIcon: editableIcon("Phone icon"),
        },
        {
          title: "Customer Service",
          emailLabel: "Email",
          email: "cs@damirapharma.sy",
          emailHref: "mailto:cs@damirapharma.sy",
          phoneLabel: "Mobile Number",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("Customer service icon"),
          emailIcon: editableIcon("Email icon"),
          phoneIcon: editableIcon("Phone icon"),
        },
        {
          title: "Business Development & Partnerships",
          emailLabel: "Email",
          email: "bd@damirapharma.sy",
          emailHref: "mailto:bd@damirapharma.sy",
          phoneLabel: "Mobile Number",
          phone: "+963 930 078 366",
          phoneHref: "tel:+963930078366",
          icon: editableIcon("Business development and partnerships icon"),
          emailIcon: editableIcon("Email icon"),
          phoneIcon: editableIcon("Phone icon"),
        },
        {
          title: "Pharmacovigilance",
          emailLabel: "Email",
          email: "pv@damirapharma.sy",
          emailHref: "mailto:pv@damirapharma.sy",
          phoneLabel: "Mobile Number",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("Pharmacovigilance icon"),
          emailIcon: editableIcon("Email icon"),
          phoneIcon: editableIcon("Phone icon"),
        },
      ],
    },
    contactForm: {
      title: "Send an Inquiry",
      description: "Submit your request and our team will follow up promptly.",
      features: [
        {
          id: "clear-response",
          title: "Clear response",
          icon: editableIcon("Clear response icon"),
        },
        {
          id: "privacy-protected",
          title: "Privacy protected",
          icon: editableIcon("Privacy protected icon"),
        },
        {
          id: "structured-follow-up",
          title: "Structured follow-up",
          icon: editableIcon("Structured follow-up icon"),
        },
      ],
      fields: {
        fullName: "Full Name",
        email: "Business Email",
        phone: "Phone Number",
        company: "Company",
        inquiryType: "Inquiry Type",
        inquiryTypePlaceholder: "Select inquiry type",
        inquiryTypeOptions: [
          { value: "general", label: "General Inquiry" },
          { value: "partnership", label: "Partnership Follow-up" },
          { value: "products", label: "Product & Availability" },
          { value: "regulatory", label: "Regulatory & Compliance" },
          { value: "media", label: "Media & Communications" },
          { value: "other", label: "Other" },
        ],
        message: "Message",
        submit: "Submit Inquiry",
      },
    },
  },
};

const PUBLIC_UI_AR: PublicUiData = {
  ...PUBLIC_UI_EN,
  home: {
    ...PUBLIC_UI_EN.home,
    metadata: {
      title: "بناء منظومة توزيع الرعاية الصحية المتخصصة في سوريا",
      description:
        "شريك موثوق للابتكارات العالمية في علوم الحياة والتغذية والتقنيات الطبية.",
    },
    hero: {
      ...PUBLIC_UI_EN.home.hero,
      eyebrow: "داميرا فارما",
      title: "بناء منظومة توزيع الرعاية الصحية المتخصصة في سوريا",
      subtitle:
        "شريك موثوق للابتكارات العالمية في علوم الحياة والتغذية والتقنيات الطبية.",
      actions: [
        { label: "استكشف المنتجات", href: "/products", variant: "primary" },
        { label: "كن شريكًا", href: "/partnerships", variant: "secondary" },
      ],
      backgroundImage: {
        src: "",
        alt: "عمليات لوجستية وصحية دوائية",
      },
    },
    atAGlance: {
      title: "داميرا فارما بالأرقام",
      items: [
        { id: "founded", label: "سنة التأسيس", value: "2025" },
        {
          id: "legacy",
          label: "تأسيس مجموعة الأحلام",
          value: "1974",
        },
        { id: "facility", label: "المرفق", value: "1,500 م2" },
        { id: "storage", label: "التخزين", value: "9,000 م3" },
      ],
    },
    strategicFocus: {
      ...PUBLIC_UI_EN.home.strategicFocus,
      title: "مجالات التركيز الاستراتيجي",
      description:
        "أربعة قطاعات سريرية تقدم فيها داميرا عمقًا تشغيليًا وقيمة مستدامة.",
      items: [
        {
          id: "oncology",
          title: "الأورام وأمراض الدم",
          description:
            "برامج متخصصة ببروتوكولات تداول صارمة واستمرارية توريد تركز على المريض.",
          icon: editableIcon("أيقونة الأورام وأمراض الدم"),
        },
        {
          id: "icu",
          title: "العناية الحرجة والمركزة",
          description:
            "نماذج توريد سريعة الاستجابة لبيئات عالية الحدة ومسارات دعم الحياة.",
          icon: editableIcon("أيقونة العناية الحرجة"),
        },
        {
          id: "nutrition",
          title: "التغذية وطب الأطفال",
          description:
            "محافظ تغذية مستنيرة سريريا لمسارات رعاية حديثي الولادة والأطفال والحالات المتخصصة.",
          icon: editableIcon("أيقونة التغذية وطب الأطفال"),
        },
        {
          id: "diagnostics",
          title: "التشخيص والأجهزة",
          description:
            "حركة موثوقة للتشخيص الدقيق والتقنيات الصحية عبر شبكات الرعاية.",
          icon: editableIcon("أيقونة التشخيص والأجهزة"),
        },
      ],
    },
    keyStrengths: {
      ...PUBLIC_UI_EN.home.keyStrengths,
      title: "نقاط القوة الرئيسية",
      description: "نموذج تنفيذ مؤسسي قائم على الامتثال والنتائج.",
      image: {
        src: "",
        alt: "مرفق لوجستي لتوزيع المنتجات الدوائية",
      },
      items: [
        {
          id: "audit",
          title: "بنية جاهزة للتدقيق",
          description:
            "أنظمة موثقة وسير عمل معتمد وانضباط تشغيلي بمستوى التفتيش.",
          icon: editableIcon("أيقونة بنية جاهزة للتدقيق"),
        },
        {
          id: "cold-chain",
          title: "سلسلة باردة متقدمة",
          description: "بيئات 2-8 درجات وفائقة الانخفاض مع مراقبة مستمرة.",
          icon: editableIcon("أيقونة السلسلة الباردة"),
        },
        {
          id: "regulatory",
          title: "خبرة تنظيمية",
          description: "ملفات منظمة ومسارات ترخيص ومتابعة تنظيمية مستمرة.",
          icon: editableIcon("أيقونة الخبرة التنظيمية"),
        },
        {
          id: "distribution",
          title: "توزيع وطني",
          description: "قدرات وصول ميدانية تشمل المشافي والصيدليات والمؤسسات.",
          icon: editableIcon("أيقونة التوزيع الوطني"),
        },
        {
          id: "legacy-strength",
          title: "إرث مجموعة يتجاوز 50 عاما",
          description: "نضج تشغيلي واستقرار مالي عبر جذور مجموعة الأحلام.",
          icon: editableIcon("أيقونة إرث المجموعة"),
        },
      ],
    },
    coverageReach: {
      title: "التغطية والانتشار",
      items: [
        {
          id: "hospitals",
          label: "المشافي والمراكز",
          value: "+100",
        },
        { id: "pos", label: "نقاط البيع", value: "+35,000" },
        { id: "pharmacies", label: "الصيدليات", value: "+15,000" },
        {
          id: "coverage",
          label: "التغطية",
          value: "على مستوى سوريا",
        },
      ],
    },
    successHighlight: {
      metricsTitle: "لمحة عن الأثر",
      metricsBadge: "نموذج تشغيلي",
      emptyMetricsText:
        "أضف مؤشرات من لوحة التحكم لعرض أثر هذا الإنجاز التجاري.",
      items: [
        {
          id: "brand-scaling",
          eyebrow: "قصة نجاح",
          title: "توسيع علامات متخصصة",
          subtitle:
            "توفر داميرا فارما نموذج تسويق متكامل للعلامات الصحية المتخصصة التي تدخل أسواقًا معقدة.",
          body: [
            "يدعم فريقنا الشركاء من التحضير التنظيمي إلى الوصول للسوق والتواصل المؤسسي والتنفيذ التوزيعي طويل الأمد.",
          ],
          bullets: [
            "وصول أسرع إلى المشافي والصيدليات والمؤسسات الصحية",
            "عمليات لوجستية جاهزة للتدقيق وقابلة للتتبع",
            "تنفيذ تجاري مدعوم بذكاء السوق والفرق الميدانية",
          ],
          metrics: [
            {
              label: "سرعة اختراق السوق",
              value: "متسارعة",
              progress: 85,
              color: "blue",
            },
            {
              label: "نجاح الإدراج",
              value: "مرتفع",
              progress: 92,
              color: "blue",
            },
            {
              label: "الامتثال والتتبع",
              value: "100%",
              progress: 100,
              color: "green",
            },
          ],
        },
        {
          id: "market-access",
          eyebrow: "قصة نجاح",
          title: "وصول سوقي متخصص",
          subtitle:
            "نساعد مبتكري الرعاية الصحية على تجاوز العوائق التنظيمية والتجارية واللوجستية عبر نموذج إطلاق منظم.",
          body: [
            "من دعم تسجيل المنتجات إلى رسم خريطة أصحاب المصلحة، تبني داميرا الجسر التشغيلي بين المصنعين والطلب المحلي.",
          ],
          bullets: [
            "تنسيق المسارات التنظيمية للمنتجات الصحية المعقدة",
            "تفاعل موجه مع قادة الرأي والمؤسسات",
            "تخطيط إطلاق متوافق مع واقع التوريد والطلب",
          ],
          metrics: [
            {
              label: "جاهزية الإطلاق",
              value: "منظمة",
              progress: 88,
              color: "blue",
            },
            {
              label: "وضوح الشريك",
              value: "مرتفع",
              progress: 90,
              color: "orange",
            },
            {
              label: "ضبط المخاطر",
              value: "قوي",
              progress: 94,
              color: "green",
            },
          ],
        },
        {
          id: "distribution-execution",
          eyebrow: "قصة نجاح",
          title: "تنفيذ توزيعي موثوق",
          subtitle:
            "بنيت بنيتنا التحتية للمنتجات الصحية الحساسة التي تتطلب تخزينًا ومناولة وتسليمًا منضبطًا.",
          body: [
            "نمزج أنظمة الجودة وضوابط السلسلة الباردة والتقارير القائمة على البيانات لحماية سلامة المنتج وثقة الشريك.",
          ],
          bullets: [
            "مناولة للمنتجات الحساسة للحرارة وعمليات تخزين موثقة",
            "حركة مخزون قابلة للتتبع من المستودع إلى قناة الرعاية",
            "تقارير تشغيلية للشركاء ومراجعة الجودة الداخلية",
          ],
          metrics: [
            {
              label: "ضبط السلسلة الباردة",
              value: "مراقب",
              progress: 96,
              color: "green",
            },
            {
              label: "تغطية التوزيع",
              value: "وطنية",
              progress: 82,
              color: "blue",
            },
            {
              label: "جودة التقارير",
              value: "شفافة",
              progress: 91,
              color: "blue",
            },
          ],
        },
      ],
    },
    cta: {
      ...PUBLIC_UI_EN.home.cta,
      eyebrow: "شراكة",
      title: "لنصنع مستقبل الرعاية الصحية في سوريا",
      description:
        "ادخل السوق السورية عبر منصة موثوقة ومتوافقة وقابلة للتوسع مع داميرا فارما.",
      primaryAction: { label: "كن شريكًا", href: "/partnerships" },
      secondaryAction: { label: "تواصل معنا", href: "/contact" },
    },
  },
  about: {
    ...PUBLIC_UI_EN.about,
    metadata: {
      title: "من نحن - داميرا فارما",
      description:
        "قسم رعاية صحية متخصص تابع لمجموعة الأحلام بخبرة تشغيلية راسخة.",
    },
    hero: {
      ...PUBLIC_UI_EN.about.hero,
      eyebrow: "من نحن",
      title: "عن داميرا فارما",
      subtitle: "قسم الرعاية الصحية المتخصصة في مجموعة الأحلام",
      backgroundImage: {
        src: "",
        alt: "فريق ومرفق داميرا فارما",
      },
    },
    companyOverview: {
      eyebrow: "لمحة عن الشركة",
      title: "منصة رعاية صحية جديدة بجذور تشغيلية راسخة",
      body: [
        "تأسست داميرا فارما عام 2025 كقسم متخصص في الرعاية الصحية ضمن مجموعة الأحلام التي تأسست عام 1974.",
        "تدعم المجموعة التنفيذ على مستوى سوريا عبر بنية موثوقة وحوكمة تشغيلية منضبطة.",
      ],
      bullets: [
        "تأسست عام 2025 بتركيز متخصص على الرعاية الصحية",
        "مبنية على إرث مجموعة الأحلام منذ عام 1974",
        "بنية وطنية بتنفيذ قائم على الجودة",
      ],
      images: [
        {
          src: "",
          alt: "عمليات مختبرية للرعاية الصحية",
        },
        {
          src: "",
          alt: "مرفق توزيع للرعاية الصحية",
        },
        {
          src: "",
          alt: "معدات طبية للرعاية الصحية",
        },
      ],
    },
    visionMission: {
      title: "الرؤية والرسالة",
      description:
        "استراتيجية طويلة الأمد ترتكز على الوصول والجودة والتسويق العلمي.",
      vision: {
        title: "الرؤية",
        description:
          "أن نكون الشريك الاستراتيجي المفضل لمبتكري الرعاية الصحية العالميين الساعين إلى نمو مرن ومتوافق في سوريا.",
      },
      mission: {
        title: "الرسالة",
        description:
          "توفير منظومة متوافقة مع ممارسات التوزيع الجيدة تضمن وصولا آمنا وموثوقا للعلاجات وتبني شراكات مستدامة.",
      },
    },
    coreValues: {
      title: "قيمنا الأساسية",
      items: [
        {
          id: "quality",
          title: "الجودة والامتثال",
          description: "كل عملية مصممة لتحقيق الاتساق والتوثيق وسلامة المرضى.",
          icon: editableIcon("أيقونة الجودة والامتثال"),
        },
        {
          id: "science",
          title: "التميز العلمي",
          description:
            "الدقة السريرية والتواصل المبني على الدليل يوجهان أنشطتنا الميدانية والطبية.",
          icon: editableIcon("أيقونة التميز العلمي"),
        },
        {
          id: "ethics",
          title: "الأخلاقيات والشراكات",
          description: "تعاون شفاف مع حوكمة مبدئية ومسؤولية طويلة الأمد.",
          icon: editableIcon("أيقونة الأخلاقيات والشراكات"),
        },
        {
          id: "team",
          title: "تطوير الفريق",
          description: "برامج بناء قدرات منظمة تدعم الأداء واستمرارية القيادة.",
          icon: editableIcon("أيقونة تطوير الفريق"),
        },
        {
          id: "patient",
          title: "الالتزام بالمريض",
          description:
            "تضع قراراتنا التشغيلية الوصول العلاجي واستمرارية الرعاية في الأولوية.",
          icon: editableIcon("أيقونة الالتزام بالمريض"),
        },
      ],
    },
    legacySuccess: {
      stats: {
        items: [
          { id: "m1", label: "إرث تشغيلي", value: "+50 سنة" },
          {
            id: "m2",
            label: "نمو مثبت",
            value: "+20%",
            description: "نمو سوقي تحقق لرينولاك",
          },
          { id: "m3", label: "شبكة وطنية", value: "على مستوى سوريا" },
          { id: "m4", label: "علاقات صحية", value: "طويلة الأمد" },
        ],
      },
      content: {
        slides: [
          {
            id: "legacy-strength",
            eyebrow: "إرث وقوة",
            title: "قوة تشغيلية مدعومة بخبرة تتجاوز 50 عاما",
            subtitle:
              "منصة رعاية صحية متخصصة تعززها خبرة تنفيذية إقليمية ناضجة.",
            body: [
              "تستفيد داميرا من علاقات صحية راسخة وشبكة وطنية تشكلت عبر عقود من التنفيذ التشغيلي.",
              "تجمع المؤسسة بين الحوكمة الناضجة والمرونة السوقية لتوسيع أعمال الشركاء بشكل مستدام.",
            ],
            bullets: [
              "جذور تشغيلية راسخة",
              "علاقات صحية وطنية",
              "تنفيذ مدعوم بالحوكمة",
              "نمو يركز على الشريك",
            ],
            actions: [
              { label: "استكشف الخدمات", href: "/services" },
              { label: "تواصل معنا", href: "/contact" },
            ],
          },
          {
            id: "success-story",
            eyebrow: "قصة نجاح",
            title: "نمو مبني على تنفيذ منضبط",
            subtitle:
              "يتكامل التنفيذ التجاري والوصول للسوق وانضباط التوريد في نموذج واحد.",
            body: [
              "تنسق داميرا التواصل مع أصحاب المصلحة وتوفر المنتجات والتخطيط الميداني لدعم نمو قابل للقياس للعلامات الصحية.",
            ],
            bullets: [
              "تخطيط سوقي قائم على البيانات",
              "إدماج منظم للشركاء",
              "مسارات توزيع قابلة للتتبع",
              "تقارير أداء شفافة",
            ],
            actions: [{ label: "ابدأ شراكة", href: "/partnerships" }],
          },
        ],
      },
    },
  },
  services: {
    ...PUBLIC_UI_EN.services,
    metadata: {
      title: "خدمات متكاملة للتوزيع والتسويق الدوائي",
      description:
        "بنية تحتية وتنظيم ولوجستيات ودعم علمي في منظومة تشغيل واحدة.",
    },
    hero: {
      ...PUBLIC_UI_EN.services.hero,
      eyebrow: "الخدمات",
      title: "خدمات متكاملة للتوزيع والتسويق الدوائي",
      subtitle:
        "من البنية التحتية المعتمدة إلى التنفيذ العلمي في السوق، توفر داميرا منظومة تشغيل متخصصة.",
      actions: [
        { label: "استكشف المنتجات", href: "/products", variant: "primary" },
      ],
    },
    serviceItems: {
      eyebrow: "الخدمات",
      title: "خدمات رعاية صحية متكاملة",
      description:
        "دعم متكامل لشركاء علوم الحياة من خلال منصة تشغيل متخصصة واحدة.",
      items: [
        {
          id: "regulatory",
          isVisible: true,
          eyebrow: "الخدمات التنظيمية",
          headerLabel: "الشؤون التنظيمية والامتثال",
          anchorId: "services-regulatory",
          href: "/services#services-regulatory",
          title: "تنفيذ منظم للشؤون التنظيمية",
          description:
            "دعم التسجيل والامتثال للمنتجات الصحية التي تدخل أسواقا منظمة.",
          icon: editableIcon("أيقونة الخدمة التنظيمية"),
          image: {
            src: "",
            alt: "إعداد ملفات تنظيمية",
          },
          features: [
            "إعداد الملفات وتخطيط مسارات التقديم",
            "تسجيل المنتجات وترخيصها للسوق",
            "متابعة تنظيمية مستمرة وتحديثات دورية",
          ],
          cta: { label: "طلب الخدمة", href: "/contact" },
        },
        {
          id: "infrastructure",
          isVisible: true,
          eyebrow: "البنية التحتية",
          headerLabel: "البنية التحتية والتخزين",
          anchorId: "services-infrastructure",
          href: "/services#services-infrastructure",
          title: "بنية تخزين متقدمة",
          subtitle: "مرفق بمساحة 1,500 م2 وسعة تخزين مضبوطة 9,000 م3.",
          description:
            "بنية تشغيل وتخزين معتمدة لمحافظ الرعاية الصحية المتخصصة.",
          icon: editableIcon("أيقونة خدمة البنية التحتية"),
          image: {
            src: "",
            alt: "بنية تخزين دوائية",
          },
          features: [
            "مناطق منفصلة للأورام والمنتجات المحيطية والمعقمة",
            "أنظمة HVAC و HEPA للتحكم البيئي",
            "أمن ومراقبة على مدار الساعة مع وصول مقيد",
          ],
          cta: { label: "طلب الخدمة", href: "/contact" },
        },
        {
          id: "market-access",
          isVisible: true,
          eyebrow: "الوصول للسوق",
          headerLabel: "الوصول للسوق",
          anchorId: "services-market-access",
          href: "/services#services-market-access",
          title: "الوصول للمشافي وتسريع الأداء التجاري",
          description:
            "دعم التنفيذ التجاري للوصول للمشافي والتواصل مع أصحاب القرار ونمو الإطلاق.",
          icon: editableIcon("أيقونة الوصول للسوق"),
          image: {
            src: "",
            alt: "استراتيجية الوصول للسوق",
          },
          features: [
            "إدارة علاقات المشافي",
            "التواصل مع أصحاب القرار",
            "دعم المناقصات والعطاءات",
            "تنفيذ الفعاليات والندوات العلمية",
          ],
          cta: { label: "طلب الخدمة", href: "/contact" },
        },
        {
          id: "logistics-distribution",
          isVisible: true,
          eyebrow: "اللوجستيات والتوزيع",
          headerLabel: "اللوجستيات والتوزيع",
          anchorId: "services-logistics-distribution",
          href: "/services#services-logistics-distribution",
          title: "تسليم وطني مع قابلية تتبع",
          description:
            "عمليات لوجستية وتوزيع مضبوطة مع قابلية تتبع عبر قنوات الرعاية الصحية.",
          icon: editableIcon("أيقونة اللوجستيات والتوزيع"),
          image: {
            src: "",
            alt: "أسطول توزيع دوائي",
          },
          features: [
            "شبكة تسليم وطنية عبر سوريا",
            "نقل متعدد المناطق مضبوط الحرارة",
            "تتبع كامل للشحنات من البداية إلى النهاية",
            "تسليم مباشر للمشافي والمؤسسات",
          ],
          cta: { label: "طلب الخدمة", href: "/contact" },
        },
        {
          id: "safety-vigilance",
          isVisible: true,
          eyebrow: "السلامة والتيقظ",
          headerLabel: "السلامة والتيقظ",
          anchorId: "services-safety-vigilance",
          href: "/services#services-safety-vigilance",
          title: "جاهزية التيقظ الدوائي والمادي",
          description:
            "أطر مراقبة سلامة تدعم الإشراف المتوافق بعد طرح المنتجات في السوق.",
          icon: editableIcon("أيقونة السلامة والتيقظ"),
          image: {
            src: "",
            alt: "متابعة السلامة والتيقظ الدوائي",
          },
          features: [
            "أطر PV و MV موجهة بإجراءات تشغيل قياسية",
            "نموذج إبلاغ للحوادث الخطيرة خلال 24 ساعة",
            "إشراف مخصص من مسؤول السلامة",
          ],
          cta: { label: "طلب الخدمة", href: "/contact" },
        },
      ],
    },
    infrastructure: {
      eyebrow: "البنية التحتية",
      title: "بنية تخزين متقدمة",
      subtitle: "مرفق بمساحة 1,500 م2 وسعة تخزين مضبوطة 9,000 م3.",
      bullets: [
        "مناطق منفصلة للأورام والمنتجات المحيطية والمعقمة",
        "أنظمة HVAC و HEPA للتحكم البيئي",
        "أمن ومراقبة على مدار الساعة مع وصول مقيد",
      ],
      icon: editableIcon("أيقونة خدمة البنية التحتية"),
      image: {
        src: "",
        alt: "بنية تخزين دوائية",
      },
    },
    regulatory: {
      eyebrow: "الخدمات التنظيمية",
      title: "تنفيذ منظم للشؤون التنظيمية",
      bullets: [
        "إعداد الملفات وتخطيط مسارات التقديم",
        "تسجيل المنتجات وترخيصها للسوق",
        "متابعة تنظيمية مستمرة وتحديثات دورية",
      ],
      icon: editableIcon("أيقونة الخدمة التنظيمية"),
      image: {
        src: "",
        alt: "إعداد ملفات تنظيمية",
      },
    },
    safetyVigilance: {
      eyebrow: "السلامة والتيقظ",
      title: "جاهزية التيقظ الدوائي والمادي",
      bullets: [
        "أطر PV و MV موجهة بإجراءات تشغيل قياسية",
        "نموذج إبلاغ للحوادث الخطيرة خلال 24 ساعة",
        "إشراف مخصص من مسؤول السلامة",
      ],
      icon: editableIcon("أيقونة السلامة والتيقظ"),
      image: {
        src: "",
        alt: "متابعة السلامة والتيقظ الدوائي",
      },
      imagePosition: "left",
    },
    logisticsDistribution: {
      eyebrow: "اللوجستيات والتوزيع",
      title: "تسليم وطني مع قابلية تتبع",
      bullets: [
        "شبكة تسليم وطنية عبر سوريا",
        "نقل متعدد المناطق مضبوط الحرارة",
        "تتبع كامل للشحنات من البداية إلى النهاية",
        "تسليم مباشر للمشافي والمؤسسات",
      ],
      icon: editableIcon("أيقونة اللوجستيات والتوزيع"),
      image: {
        src: "",
        alt: "أسطول توزيع دوائي",
      },
      imagePosition: "left",
    },
    marketAccess: {
      eyebrow: "الوصول للسوق",
      title: "الوصول للمشافي وتسريع الأداء التجاري",
      bullets: [
        "إدارة علاقات المشافي",
        "التواصل مع أصحاب القرار",
        "دعم المناقصات والعطاءات",
        "تنفيذ الفعاليات والندوات العلمية",
      ],
      icon: editableIcon("أيقونة الوصول للسوق"),
      image: {
        src: "",
        alt: "استراتيجية الوصول للسوق",
      },
    },
  },
  products: {
    ...PUBLIC_UI_EN.products,
    metadata: {
      title: "محفظة استراتيجية من منتجات الرعاية الصحية المتخصصة",
      description: "محفظة مركزة مع خطط نمو مستقبلية عبر مجالات علاجية حيوية.",
    },
    hero: {
      ...PUBLIC_UI_EN.products.hero,
      eyebrow: "المنتجات",
      title: "محفظة استراتيجية من منتجات الرعاية الصحية المتخصصة",
      subtitle:
        "توازن داميرا بين احتياج السوق والبنية المتوافقة والتنفيذ العلمي.",
      actions: [
        {
          label: "تواصل مع فريق المنتجات",
          href: "/contact",
          variant: "secondary",
        },
      ],
      backgroundImage: {
        src: "",
        alt: "محفظة منتجات دوائية",
      },
    },
    pipelineSegments: {
      title: "قطاعات النمو",
      items: [
        {
          id: "p1",
          title: "علاجات الأورام",
        },
        {
          id: "p2",
          title: "أدوية العناية المركزة",
        },
        {
          id: "p3",
          title: "التغذية السريرية",
        },
        {
          id: "p4",
          title: "منتجات الأطفال",
        },
        {
          id: "p5",
          title: "حلول التشخيص",
        },
      ],
    },
    catalog: {
      ...PUBLIC_UI_EN.products.catalog,
      title: "كتالوج المنتجات",
      description:
        "يشمل كل ملف منتج الفئة العلاجية والاستطباب والتخزين والوثائق المتاحة.",
      items: PRODUCT_CARDS_AR,
    },
  },
  quality: {
    ...PUBLIC_UI_EN.quality,
    metadata: {
      title: "التزام بالجودة والسلامة والامتثال التنظيمي",
      description: "نظام جودة تشغيلي يدعم موثوقية الخدمات الصحية.",
    },
    hero: {
      ...PUBLIC_UI_EN.quality.hero,
      eyebrow: "الجودة والامتثال",
      title: "التزام بالجودة والسلامة والامتثال التنظيمي",
      subtitle:
        "تعتمد منظومة الجودة في داميرا على امتثال مصمم ضمن كل مرحلة تشغيلية.",
    },
    complianceDetails: {
      title: "حوكمة منظمة عبر كل مرحلة",
      description:
        "في داميرا فارما، الجودة هي نظام التشغيل الأساسي للمؤسسة. نلتزم بإرشادات صارمة لضمان سلامة المنتج من المصنع إلى المريض.",
      items: [
        {
          id: "iso-certification",
          title: "شهادة ISO",
          description:
            "أنظمة إدارة جودة معتمدة وفق معايير ISO الدولية مع تحسين مستمر وعمليات موثقة وإدارة مخاطر.",
          icon: editableIcon("أيقونة شهادة ISO"),
        },
        {
          id: "fda-compliance",
          title: "مواءمة امتثال FDA",
          description:
            "مرافق وإجراءات مصممة للتوافق مع متطلبات التعامل والتخزين والتتبع الدوائي الصارمة.",
          icon: editableIcon("أيقونة مواءمة امتثال FDA"),
        },
      ],
    },
    qmsArchitecture: {
      ...PUBLIC_UI_EN.quality.qmsArchitecture,
      eyebrow: "إطار نظام الجودة",
      title: "نظام إدارة الجودة",
      description:
        "إطار مركزي لإدارة الجودة يربط الإجراءات والتدقيق والتوثيق والتدريب والحوكمة الأخلاقية في منظومة تشغيلية متينة.",
      hubLabel: "QMS",
      items: [
        {
          id: "sop-capa",
          title: "إطار إجراءات SOP ومسارات CAPA",
          description:
            "إجراءات موثقة وإجراءات تصحيحية ووقائية وضوابط جودة مستمرة.",
          icon: editableIcon("أيقونة إجراءات الجودة"),
        },
        {
          id: "gdp-gsp",
          title: "بروتوكولات الامتثال لممارسات GDP و GSP",
          description: "ممارسات توزيع وتخزين مضبوطة على كامل سلسلة الجودة.",
          icon: editableIcon("أيقونة الامتثال للتوزيع والتخزين"),
        },
        {
          id: "audits-documentation",
          title: "تدقيق داخلي وتوثيق كامل",
          description:
            "سجلات قابلة للتتبع وتوثيق جاهز للتدقيق لدعم الرقابة المستمرة.",
          icon: editableIcon("أيقونة التدقيق والتوثيق"),
        },
        {
          id: "conduct-fmv",
          title: "مدونة سلوك وسياسات قيمة سوقية عادلة",
          description: "سلوك تجاري شفاف متوافق مع معايير الشراكة الأخلاقية.",
          icon: editableIcon("أيقونة مدونة السلوك"),
        },
        {
          id: "training",
          title: "تدريب امتثال مستمر",
          description:
            "بناء قدرات متواصل للحفاظ على توافق الفرق مع معايير الجودة.",
          icon: editableIcon("أيقونة تدريب الامتثال"),
        },
      ],
    },
    certificates: {
      ...PUBLIC_UI_EN.quality.certificates,
      eyebrow: "الشهادات",
      title: "الشهادات وسجلات الامتثال",
      description:
        "شهادات وسجلات جودة رسمية تؤكد التزامنا بالمعايير الدولية والحوكمة الموثقة والامتثال التنظيمي.",
      items: [
        {
          id: "iso-9001",
          isVisible: true,
          title: "شهادة ISO 9001:2015",
          subtitle: "نظام إدارة الجودة",
          issuer: "جهة اعتماد جودة دولية",
          date: "صالحة حتى 2027",
          icon: editableIcon("أيقونة شهادة ISO 9001"),
          image: {
            src: "",
            alt: "معاينة شهادة ISO 9001",
          },
          fileUrl: "",
          openUrl: "",
          order: 1,
        },
        {
          id: "gdp-compliance",
          isVisible: true,
          title: "سجل امتثال GDP",
          subtitle: "ممارسات التوزيع الجيد",
          issuer: "قسم ضمان الجودة",
          date: "سجل مراجعة سنوي",
          icon: editableIcon("أيقونة سجل امتثال GDP"),
          image: {
            src: "",
            alt: "معاينة سجل امتثال GDP",
          },
          fileUrl: "",
          openUrl: "",
          order: 2,
        },
        {
          id: "cold-chain-validation",
          isVisible: true,
          title: "سجل تحقق سلسلة التبريد",
          subtitle: "تخزين وتوزيع بدرجات حرارة مضبوطة",
          issuer: "وحدة الجودة في داميرا فارما",
          date: "دورة تحقق حالية",
          icon: editableIcon("أيقونة سجل تحقق سلسلة التبريد"),
          image: {
            src: "",
            alt: "معاينة سجل تحقق سلسلة التبريد",
          },
          fileUrl: "",
          openUrl: "",
          order: 3,
        },
      ],
    },
    ethicsCompliance: {
      ...PUBLIC_UI_EN.quality.ethicsCompliance,
      eyebrow: "معاييرنا",
      title: "الالتزام بالأخلاقيات والامتثال",
      description:
        "عمل بنزاهة ثابتة عبر جميع الوظائف لضمان الشفافية والمساءلة وشراكات الرعاية الصحية المسؤولة.",
      items: [
        {
          id: "code-of-conduct",
          title: "مدونة سلوك رسمية",
          description:
            "متوافقة مع معايير مكافحة الفساد الدولية ومدونات الترويج وملزمة لجميع الموظفين والشركاء.",
          statusLabel: "متوافق",
          icon: editableIcon("أيقونة مدونة السلوك الرسمية"),
        },
        {
          id: "no-off-label",
          title: "لا ترويج خارج الاستطباب",
          description:
            "يعتمد التبادل العلمي حصرا على الأدلة السريرية المعتمدة مع عدم التساهل مع أي نشاط ترويجي خارج الاستطباب.",
          statusLabel: "دليل معتمد",
          icon: editableIcon("أيقونة منع الترويج خارج الاستطباب"),
        },
        {
          id: "fair-market-value",
          title: "ترتيبات بقيمة سوقية عادلة",
          description:
            "ترتيبات شفافة مع المتخصصين والمؤسسات الصحية دون حوافز مخفية.",
          statusLabel: "شفاف",
          icon: editableIcon("أيقونة القيمة السوقية العادلة"),
        },
        {
          id: "training-audits",
          title: "تدريب وتدقيق منتظم",
          description:
            "تدريب الموظفين على مواضيع الامتثال وتنفيذ تدقيق داخلي وفق جدول منتظم.",
          statusLabel: "تدقيق منتظم",
          icon: editableIcon("أيقونة التدريب والتدقيق"),
        },
      ],
    },
  },
  partnerships: {
    ...PUBLIC_UI_EN.partnerships,
    metadata: {
      title: "الشراكة مع داميرا فارما",
      description: "شراكات استراتيجية للتسويق والتوزيع في قطاع الرعاية الصحية.",
    },
    hero: {
      ...PUBLIC_UI_EN.partnerships.hero,
      eyebrow: "الشراكات",
      title: "الشراكة مع داميرا فارما",
      subtitle:
        "سرّع دخولك للسوق السورية عبر منصة صحية متخصصة ومتوافقة وموثوقة.",
      actions: [
        { label: "استكشف الفرص", href: "/contact", variant: "primary" },
        { label: "عرض الخدمات", href: "/services", variant: "ghost" },
      ],
    },
    whyPartner: {
      title: "لماذا الشراكة معنا",
      items: [
        {
          id: "w1",
          title: "تخصص استراتيجي",
          description: "قطاعات علاجية مركزة بخبرة تشغيلية عميقة.",
          icon: editableIcon("أيقونة التخصص الاستراتيجي"),
        },
        {
          id: "w2",
          title: "بنية جاهزة للتدقيق",
          description: "أنظمة معتمدة مصممة لتوقعات الجودة الدولية.",
          icon: editableIcon("أيقونة بنية جاهزة للتدقيق"),
        },
        {
          id: "w3",
          title: "قوة تنظيمية",
          description: "تنفيذ منضبط للتسجيل والامتثال عبر مراحل دورة الحياة.",
          icon: editableIcon("أيقونة القوة التنظيمية"),
        },
        {
          id: "w4",
          title: "قدرات وصول للسوق",
          description: "تواصل مع المشافي والمتخصصين عبر برامج وصول منظمة.",
          icon: editableIcon("أيقونة قدرات الوصول للسوق"),
        },
        {
          id: "w5",
          title: "تسويق قائم على البيانات",
          description: "تخطيط أداء مدعوم بذكاء السوق والفرق الميدانية.",
          icon: editableIcon("أيقونة التسويق القائم على البيانات"),
        },
        {
          id: "w6",
          title: "دعم مالي",
          description: "مدعومة بالاستقرار المالي الراسخ لمجموعة الأحلام.",
          icon: editableIcon("أيقونة الدعم المالي"),
        },
      ],
    },
    advantage: {
      ...PUBLIC_UI_EN.partnerships.advantage,
      eyebrow: "ميزة الشراكة",
      title: "ميزة داميرا",
      description:
        "نموذج شراكة مبني على الامتثال والوصول للسوق والتنفيذ التجاري وشفافية التقارير.",
      overlayTitle: "وصول سوقي متوافق",
      overlayDescription: "مصمم لشراكات رعاية صحية مرنة.",
      image: {
        src: "",
        alt: "شراكة وصول سوقي في الرعاية الصحية",
      },
      items: [
        {
          id: "risk-mitigation",
          title: "تخفيف المخاطر",
          description: "أطر امتثال صارمة تحمي سمعة علامتكم في الأسواق المعقدة.",
          icon: editableIcon("أيقونة تخفيف المخاطر"),
        },
        {
          id: "accelerated-access",
          title: "تسريع الوصول",
          description: "خبرتنا التنظيمية تسرع التسجيل ومسارات دخول السوق.",
          icon: editableIcon("أيقونة تسريع الوصول"),
        },
        {
          id: "deep-market-penetration",
          title: "انتشار سوقي عميق",
          description:
            "علاقات راسخة مع قادة الرأي والمشافي وسلاسل الصيدليات الرئيسية.",
          icon: editableIcon("أيقونة الانتشار السوقي"),
        },
        {
          id: "transparent-reporting",
          title: "تقارير شفافة",
          description:
            "مشاركة واضحة لبيانات المبيعات والمخزون والتيقظ الدوائي.",
          icon: editableIcon("أيقونة التقارير الشفافة"),
        },
      ],
    },
    partnershipForm: {
      title: "طلب شراكة",
      description:
        "شاركنا نموذج التعاون، ومحفظة المنتجات، وأهدافك السوقية ليتم توجيه طلبك إلى فريق الشراكات المناسب.",
      features: [
        {
          id: "clear-collaboration",
          title: "تعاون واضح",
          icon: editableIcon("أيقونة تعاون واضح"),
        },
        {
          id: "compliance-first",
          title: "امتثال وتنظيم",
          icon: editableIcon("أيقونة الامتثال أولا"),
        },
        {
          id: "structured-follow-up",
          title: "متابعة منظمة",
          icon: editableIcon("أيقونة متابعة منظمة"),
        },
      ],
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني للعمل",
        phone: "رقم الهاتف",
        company: "الجهة",
        inquiryType: "نوع الشراكة",
        inquiryTypePlaceholder: "اختر نوع الشراكة",
        inquiryTypeOptions: [
          { value: "distribution", label: "شراكة توزيع" },
          { value: "licensing", label: "فرصة ترخيص" },
          { value: "strategic", label: "تحالف استراتيجي" },
          { value: "investment", label: "استثمار / مشروع مشترك" },
          { value: "other", label: "أخرى" },
        ],
        message: "تفاصيل الشراكة",
        submit: "إرسال طلب الشراكة",
      },
    },
  },
  contact: {
    ...PUBLIC_UI_EN.contact,
    metadata: {
      title: "تواصل مع داميرا فارما",
      description: "تواصل مع فريقنا للشراكات والاستفسارات والفرص التجارية.",
    },
    hero: {
      ...PUBLIC_UI_EN.contact.hero,
      eyebrow: "اتصل بنا",
      title: "تواصل مع داميرا فارما",
      subtitle: "فريقنا جاهز لدعم الشراكات والاستفسارات والفرص السوقية.",
    },
    contactInfo: {
      ...PUBLIC_UI_EN.contact.contactInfo,
      title: "معلومات التواصل",
      description: "يمكنكم الوصول إلى المكتب الرئيسي عبر القنوات التالية.",
      departments: [
        {
          title: "الاستفسارات العامة",
          emailLabel: "البريد الإلكتروني",
          email: "info@damirapharma.sy",
          emailHref: "mailto:info@damirapharma.sy",
          phoneLabel: "رقم الموبايل",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("أيقونة الاستفسارات العامة"),
          emailIcon: editableIcon("أيقونة البريد الإلكتروني"),
          phoneIcon: editableIcon("أيقونة الهاتف"),
        },
        {
          title: "خدمة العملاء",
          emailLabel: "البريد الإلكتروني",
          email: "cs@damirapharma.sy",
          emailHref: "mailto:cs@damirapharma.sy",
          phoneLabel: "رقم الموبايل",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("أيقونة خدمة العملاء"),
          emailIcon: editableIcon("أيقونة البريد الإلكتروني"),
          phoneIcon: editableIcon("أيقونة الهاتف"),
        },
        {
          title: "تطوير الأعمال والشراكات",
          emailLabel: "البريد الإلكتروني",
          email: "bd@damirapharma.sy",
          emailHref: "mailto:bd@damirapharma.sy",
          phoneLabel: "رقم الموبايل",
          phone: "+963 930 078 366",
          phoneHref: "tel:+963930078366",
          icon: editableIcon("أيقونة تطوير الأعمال والشراكات"),
          emailIcon: editableIcon("أيقونة البريد الإلكتروني"),
          phoneIcon: editableIcon("أيقونة الهاتف"),
        },
        {
          title: "اليقظة الدوائية",
          emailLabel: "البريد الإلكتروني",
          email: "pv@damirapharma.sy",
          emailHref: "mailto:pv@damirapharma.sy",
          phoneLabel: "رقم الموبايل",
          phone: "+963 989 004 767",
          phoneHref: "tel:+963989004767",
          icon: editableIcon("أيقونة اليقظة الدوائية"),
          emailIcon: editableIcon("أيقونة البريد الإلكتروني"),
          phoneIcon: editableIcon("أيقونة الهاتف"),
        },
      ],
    },
    contactForm: {
      title: "إرسال استفسار",
      description: "أرسل طلبك وسيتواصل معك فريقنا في أقرب وقت.",
      features: [
        {
          id: "clear-response",
          title: "رد واضح",
          icon: editableIcon("أيقونة رد واضح"),
        },
        {
          id: "privacy-protected",
          title: "خصوصية محفوظة",
          icon: editableIcon("أيقونة خصوصية محفوظة"),
        },
        {
          id: "structured-follow-up",
          title: "متابعة منظمة",
          icon: editableIcon("أيقونة متابعة منظمة"),
        },
      ],
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        company: "الشركة",
        inquiryType: "نوع الاستفسار",
        inquiryTypePlaceholder: "اختر نوع الاستفسار",
        inquiryTypeOptions: [
          { value: "general", label: "استفسار عام" },
          { value: "partnership", label: "متابعة شراكة" },
          { value: "products", label: "المنتجات والتوفر" },
          { value: "regulatory", label: "تنظيمي وامتثال" },
          { value: "media", label: "إعلام واتصال" },
          { value: "other", label: "أخرى" },
        ],
        message: "الرسالة",
        submit: "إرسال الطلب",
      },
    },
  },
};

export function getPublicUiData(locale: Locale): PublicUiData {
  return locale === "ar" ? PUBLIC_UI_AR : PUBLIC_UI_EN;
}
