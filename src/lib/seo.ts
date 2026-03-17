import type { Metadata } from "next";
import { CONTACT, HOMEFIX, SERVICE_AREAS, SITE, SOCIAL } from "@/lib/constants";

export const PAGE_META = {
  "/": {
    title: "Aesthetic Homes | Premium Interior Designers in Chennai & Nellore",
    description:
      "Award-winning interior design and home renovation. 10+ years of expertise in modular kitchens, wardrobes, and full-home turnkey interiors. Get a free quote!",
  },
  "/projects": {
    title: `Interior Design Portfolio | Our Completed Projects in Chennai`,
    description: `Browse 53+ completed interior design projects in Chennai. See our craftsmanship across Velachery, Anna Nagar, OMR, and Adyar.`,
  },
  "/services": {
    title: "Interior Design & Renovation Services in Chennai | Aesthetic Homes",
    description:
      "Explore our custom interior services: modular kitchens, custom wardrobes, TV units, and 3D visualization. Zero hidden costs, handled entirely in-house.",
  },
  "/about": {
    title: `About Aesthetic Homes | Trusted Interior Design Studio in Chennai`,
    description: `Founded in 2015, Aesthetic Homes is a Chennai-based interior design studio. No subcontractors. Transparent pricing. 1-year workmanship warranty.`,
  },
  "/blog": {
    title: "Interior Design Blog - Tips, Ideas & Project Stories | Chennai",
    description: `Interior design tips, modular kitchen ideas, wardrobe guides and before-after project stories from Aesthetic Homes Chennai. ${SITE.projectCount}+ projects, ${SITE.rating}★ rated.`,
  },
  "/contact": {
    title: "Contact Aesthetic Homes - Free Site Visit Chennai",
    description: `Contact Aesthetic Homes for a free interior design and renovation site visit in Chennai or Nellore. WhatsApp ${CONTACT.phone1Display}.`,
  },
  "/estimator": {
    title:
      "Interior Design Cost Estimator Chennai - Kitchen & Wardrobe Budget Calculator",
    description: `Estimate interior design costs in Chennai with our interactive calculator. Modular kitchens, wardrobes - live 2D plan + instant cost breakdown. Aesthetic Homes, ${SITE.projectCount} projects, ${SITE.rating}★.`,
  },
  "/store": {
    title: "HomeFix Store | Buy Modular Furniture Online in Chennai",
    description:
      "Shop premium modular kitchens, wardrobes, and TV units. Quick flat-pack delivery in 3-5 days with free installation across Chennai. Shop now!",
  },
} as const;

type ArticleMeta = {
  publishedAt?: string;
  tags?: string[];
};

type BuildMetadataInput = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  location?: string;
  article?: ArticleMeta;
};

const toAbsoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://"))
    return pathOrUrl;
  if (pathOrUrl === "/" || pathOrUrl === "") return `${SITE.url}/`;
  return `${SITE.url}${pathOrUrl}`;
};

export function buildPageMetadata(
  path: keyof typeof PAGE_META | string,
  input: BuildMetadataInput = {},
): Metadata {
  const pageMeta = PAGE_META[path as keyof typeof PAGE_META] ?? PAGE_META["/"];
  const canonicalUrl = toAbsoluteUrl(input.canonicalPath ?? path);
  const imageUrl = input.ogImage ?? SITE.ogImage;
  const fullTitle = `${input.title ?? pageMeta.title} | ${SITE.name}`;
  const fullDescription = input.description ?? pageMeta.description;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_IN",
      siteName: SITE.name,
      ...(input.type === "article"
        ? {
            publishedTime: input.article?.publishedAt,
            tags: input.article?.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
    other: {
      "geo.region": "IN-TN",
      "geo.placename": input.location ?? "Chennai",
      "geo.position": `${CONTACT.address.lat};${CONTACT.address.lng}`,
      ICBM: `${CONTACT.address.lat}, ${CONTACT.address.lng}`,
      ...(input.article?.publishedAt
        ? { "article:published_time": input.article.publishedAt }
        : {}),
      ...(input.article?.tags?.length
        ? { "article:tag": input.article.tags.join(", ") }
        : {}),
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: [
        "Aesthetic Homes Chennai",
        "Aesthetic Homes Interiors",
      ],
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: SITE.logo,
        width: 192,
        height: 192,
      },
      image: SITE.ogImage,
      description: `${SITE.name} provides premium interior design and home renovation services in Chennai. Modular kitchens, wardrobes, TV units, and full turnkey execution.`,
      foundingDate: String(SITE.founded),
      taxID: SITE.gstin,
      vatID: SITE.gstin,
      // Knowledge Graph Enhancements
      knowsAbout: [
        "Interior Design",
        "Modular Kitchen Design",
        "Custom Wardrobes",
        "Turnkey Home Renovations",
        "Space Planning",
        "False Ceiling Design",
      ],
      award: ["Award-winning Interior Design Studio in Chennai"],
      hasMap: CONTACT.googleMapsUrl,
      telephone: [CONTACT.phone1Display],
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.area,
        addressRegion: CONTACT.address.state,
        postalCode: CONTACT.address.pincode,
        addressCountry: CONTACT.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.address.lat,
        longitude: CONTACT.address.lng,
      },
      areaServed: SERVICE_AREAS.map((area) => ({
        "@type": "City",
        name: area,
      })),
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: CONTACT.address.lat,
          longitude: CONTACT.address.lng,
        },
        geoRadius: "100000",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      priceRange: "₹₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer, Cheque",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(SITE.rating),
        reviewCount: String(SITE.reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: { "@type": "Person", name: "Google Reviewer" },
          reviewBody:
            "Excellent interior design execution and modular kitchen setup in Chennai.",
        },
      ],
      sameAs: [CONTACT.googleMapsUrl, SOCIAL.instagram, SOCIAL.youtube],
      subOrganization: {
        "@type": "Organization",
        "@id": `${HOMEFIX.url}/#organization`,
        name: "HomeFix",
        url: HOMEFIX.url,
        description:
          "HomeFix is the digital modular furniture platform by Aesthetic Homes - online store, 2D/3D planning and free installation in Chennai.",
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Interior Design Services Chennai",
        itemListElement: [
          {
            "@type": "Offer",
            priceCurrency: "INR",
            lowPrice: "85000",
            itemOffered: {
              "@type": "Service",
              name: "Modular Kitchen Chennai",
              description: "L, U, island, parallel modular kitchens in Chennai",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "INR",
            lowPrice: "45000",
            itemOffered: {
              "@type": "Service",
              name: "Wardrobe Design Chennai",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "INR",
            lowPrice: "18000",
            itemOffered: { "@type": "Service", name: "TV Unit Design Chennai" },
          },
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
            itemOffered: {
              "@type": "Service",
              name: "Free 3D Interior Visualization Chennai",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Home Interior Design Chennai",
              description:
                "Turnkey interior design for apartments and villas in Chennai",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/projects?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const localBusinessSchema = (area: string) => ({
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, "-")}/#localbusiness`,
  name: `Aesthetic Homes - Interior Designer in ${area}, Chennai`,
  url: `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, "-")}`,
  hasMap: CONTACT.googleMapsUrl,
  logo: {
    "@type": "ImageObject",
    url: SITE.logo,
    width: 192,
    height: 192,
  },
  telephone: CONTACT.phone1Display,
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.address.lat,
    longitude: CONTACT.address.lng,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: area,
    addressRegion: "Tamil Nadu",
    postalCode: CONTACT.address.pincode,
    addressCountry: "IN",
  },
  areaServed: [{ "@type": "City", name: area }],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(SITE.rating),
    reviewCount: String(SITE.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [CONTACT.googleMapsUrl, SOCIAL.instagram, SOCIAL.youtube],
  parentOrganization: { "@id": `${SITE.url}/#organization` },
});

export const buildBreadcrumbSchema = (
  items: { name: string; url: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildFaqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const buildArticleSchema = (post: {
  title: string;
  url: string;
  image?: string;
  publishedAt?: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  url: post.url,
  image: post.image,
  datePublished: post.publishedAt,
  author: { "@id": `${SITE.url}/#organization` },
  publisher: { "@id": `${SITE.url}/#organization` },
  keywords: post.tags?.join(", "),
});

export const buildServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: { "@type": "State", name: "Tamil Nadu" },
  url: service.url,
  image: service.image,
  serviceType: "Interior Design",
});

export const buildProjectSchema = (project: {
  title: string;
  description: string;
  images: string[];
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": project.url,
  },
  headline: project.title,
  description: project.description,
  image: project.images,
  author: { "@id": `${SITE.url}/#organization` },
  publisher: { "@id": `${SITE.url}/#organization` },
  about: {
    "@type": "Thing",
    name: "Interior Design Project",
  },
});
