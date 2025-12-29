// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";

// Metadata optimizada para SEO máximo de NEOFITNESS - Ropa Deportiva Premium
// Configuración completa para indexación en Google, Bing, Yahoo y otros buscadores
export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neofitness.cl");

export const metadata = {
    title: {
        default: "NEOFITNESS | Ropa Deportiva Mujer - Moda Fitness y Activewear Chile",
        template: "%s | NEOFITNESS",
    },
    description:
        "NEOFITNESS - Ropa deportiva premium solo para mujer. Encuentra la mejor moda fitness, activewear, ropa de gimnasio y vestimenta deportiva femenina en Chile. Envío rápido a todo el país, calidad superior y diseños modernos.",
    keywords: [
        // Marca principal
        "NEOFITNESS",
        "neofitness chile",
        "neofitness ropa deportiva mujer",

        // Categorías principales
        "ropa deportiva mujer",
        "ropa fitness mujer",
        "activewear mujer",
        "moda deportiva mujer",
        "ropa de gimnasio mujer",
        "vestimenta deportiva mujer",
        "leggings deportivos mujer",
        "calzas deportivas mujer",
        "tops deportivos mujer",
        "poleras deportivas mujer",

        // Por actividad
        "ropa para yoga mujer",
        "ropa para running mujer",
        "ropa para crossfit mujer",
        "ropa para pilates mujer",
        "ropa para entrenar mujer",

        // Características
        "ropa deportiva premium mujer",
        "activewear Chile mujer",
        "moda fitness Chile mujer",
        "ropa deportiva Santiago mujer",
        "ropa gym mujer",

        // Long-tail keywords
        "comprar ropa deportiva mujer online",
        "tienda ropa deportiva mujer Chile",
        "ropa deportiva de calidad mujer",
        "vestimenta deportiva premium mujer",
        "moda fitness online mujer",
    ],
    authors: [{ name: "NEOFITNESS", url: metadataBase.href }],
    creator: "NEOFITNESS",
    publisher: "NEOFITNESS",

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
        title: "NEOFITNESS | Ropa Deportiva Mujer Premium - Moda Fitness Chile",
        description:
            "Descubre la mejor ropa deportiva premium solo para mujer en Chile. NEOFITNESS ofrece activewear femenino de alta calidad. Diseños modernos, comodidad y estilo para tu entrenamiento.",
        url: metadataBase.href,
        siteName: "NEOFITNESS",
        images: [
            {
                url: `${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`,
                width: 1200,
                height: 630,
                alt: "NEOFITNESS - Ropa Deportiva Premium Chile",
                type: "image/png",
            },
            {
                url: `${metadataBase.href.replace(/\/$/, "")}/logoOriginal.png`,
                width: 800,
                height: 600,
                alt: "NEOFITNESS Logo",
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
        title: "NEOFITNESS | Ropa Deportiva Mujer Premium Chile",
        description:
            "Ropa deportiva femenina de alta calidad para tu entrenamiento. Moda fitness moderna y funcional. ¡Envío a todo Chile!",
        images: [`${metadataBase.href.replace(/\/$/, "")}/logoGrande.png`],
        creator: "@neofitness",
        site: "@neofitness",
    },

    // Información de aplicación (si decides hacer PWA en el futuro)
    applicationName: "NEOFITNESS",

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
        "name": "NEOFITNESS",
        "description": "Ropa deportiva premium solo para mujer. Moda fitness, activewear y vestimenta deportiva femenina de alta calidad en Chile.",
        "url": "https://neofitness.cl",
        "logo": "https://neofitness.cl/logoGrande.png",
        "image": "https://neofitness.cl/logoGrande.png",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "CL",
            "addressLocality": "Santiago",
            "addressRegion": "Región Metropolitana"
        },
        "telephone": "+56912345678",
        "email": "contacto@neofitness.cl",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.instagram.com/neofitness",
            "https://www.facebook.com/neofitness",
            "https://twitter.com/neofitness"
        ],
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://neofitness.cl/catalogo?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <ClerkProvider>
            <html lang="es">
            <head>
                <title>NEOFITNESS | Ropa Deportiva  - Moda Fitness y Activewear Chile</title>
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