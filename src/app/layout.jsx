// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";

// Metadata optimizada para SEO máximo de COCOFIT - Ropa Deportiva Premium
// Configuración completa para indexación en Google, Bing, Yahoo y otros buscadores
export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cocofit.cl");

export const metadata = {
    title: {
        default: "COCOFIT | Ropa Deportiva Premium - Moda Fitness y Activewear Chile",
        template: "%s | COCOFIT",
    },
    description:
        "COCOFIT - Ropa deportiva premium para hombre y mujer. Encuentra la mejor moda fitness, activewear, ropa de gimnasio y vestimenta deportiva en Chile. Envío rápido a todo el país, calidad superior y diseños modernos.",
    keywords: [
        // Marca principal
        "COCOFIT",
        "cocofit chile",
        "cocofit ropa deportiva",

        // Categorías principales
        "ropa deportiva",
        "ropa fitness",
        "activewear",
        "moda deportiva",
        "ropa de gimnasio",
        "vestimenta deportiva",

        // Por género
        "ropa deportiva mujer",
        "ropa deportiva hombre",
        "ropa fitness mujer",
        "ropa fitness hombre",
        "leggings deportivos",
        "calzas deportivas",
        "tops deportivos",
        "poleras deportivas",

        // Por actividad
        "ropa para yoga",
        "ropa para running",
        "ropa para crossfit",
        "ropa para pilates",
        "ropa para entrenar",

        // Características
        "ropa deportiva premium",
        "activewear Chile",
        "moda fitness Chile",
        "ropa deportiva Santiago",
        "ropa gym mujer",
        "ropa gym hombre",

        // Long-tail keywords
        "comprar ropa deportiva online",
        "tienda ropa deportiva Chile",
        "ropa deportiva de calidad",
        "vestimenta deportiva premium",
        "moda fitness online",
    ],
    authors: [{ name: "COCOFIT", url: metadataBase.href }],
    creator: "COCOFIT",
    publisher: "COCOFIT",

    // Configuración de robots optimizada para máxima indexación
    robots: {
        index: true,
        follow: true,
        nocache: false,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // URL canónica
    alternates: {
        canonical: metadataBase.href,
    },

    // Información de categorización
    category: "Ropa Deportiva",
    classification: "E-commerce - Moda Deportiva",

    // Open Graph optimizado para redes sociales
    openGraph: {
        title: "COCOFIT | Ropa Deportiva Premium - Moda Fitness Chile",
        description:
            "Descubre la mejor ropa deportiva premium en Chile. COCOFIT ofrece activewear de alta calidad para hombre y mujer. Diseños modernos, comodidad y estilo para tu entrenamiento.",
        url: metadataBase.href,
        siteName: "COCOFIT",
        images: [
            {
                url: `${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`,
                width: 1200,
                height: 630,
                alt: "COCOFIT - Ropa Deportiva Premium Chile",
                type: "image/png",
            },
            {
                url: `${metadataBase.href.replace(/\/$/, "")}/logoOriginal.png`,
                width: 800,
                height: 600,
                alt: "COCOFIT Logo",
                type: "image/png",
            },
        ],
        locale: "es_CL",
        type: "website",
        countryName: "Chile",
    },

    // Twitter/X Cards optimizado
    twitter: {
        card: "summary_large_image",
        title: "COCOFIT | Ropa Deportiva Premium Chile",
        description:
            "Ropa deportiva de alta calidad para tu entrenamiento. Moda fitness moderna y funcional. ¡Envío a todo Chile!",
        images: [`${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`],
        creator: "@cocofit",
        site: "@cocofit",
    },

    // Información de aplicación (si decides hacer PWA en el futuro)
    applicationName: "COCOFIT",

    // Información de verificación (añade tus IDs cuando los tengas)
    verification: {
        // google: "tu-codigo-de-verificacion-google",
        // yandex: "tu-codigo-yandex",
        // bing: "tu-codigo-bing",
    },

    // Información adicional para buscadores
    other: {
        "revisit-after": "7 days",
        "distribution": "global",
        "rating": "general",
        "language": "Spanish",
        "geo.region": "CL",
        "geo.placename": "Chile",
    },
};

export default function RootLayout({ children }) {
    // JSON-LD Schema para SEO estructurado
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        "name": "COCOFIT",
        "description": "Ropa deportiva premium para hombre y mujer. Moda fitness, activewear y vestimenta deportiva de alta calidad en Chile.",
        "url": "https://cocofit.cl",
        "logo": "https://cocofit.cl/logoGrande.png",
        "image": "https://cocofit.cl/logoGrande.png",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "CL",
            "addressLocality": "Santiago",
            "addressRegion": "Región Metropolitana"
        },
        "telephone": "+56912345678",
        "email": "contacto@cocofit.cl",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.instagram.com/cocofit",
            "https://www.facebook.com/cocofit",
            "https://twitter.com/cocofit"
        ],
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://cocofit.cl/catalogo?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <ClerkProvider>
            <html lang="es">
            <head>
                {/* JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-screen bg-white">
            {/* Aquí usamos el componente cliente que ya maneja Motion */}
            <AnimatedLayout>{children}</AnimatedLayout>
            </body>
            </html>
        </ClerkProvider>
    );
}