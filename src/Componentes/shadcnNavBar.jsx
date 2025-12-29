"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Phone, Menu, X } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";

export function ShadcnNavBar() {

    const [carrito, _setCarrito] = useCarritoGlobal();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [carritoGlobalCanitidad, setCarritoGlobalCanitidad] = React.useState(0)

    // Sincronizar la cantidad del carrito solo en el cliente para evitar errores de hidratación
    React.useEffect(() => {
        setCarritoGlobalCanitidad(carrito.length || 0);
    }, [carrito]);

    return (
        <div className="w-full bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5">

                {/* Header para móvil: Hamburguesa y Carrito */}
                <div className="flex lg:hidden items-center justify-between">

                    {/* Botón Hamburguesa (solo móvil) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all duration-300 border border-white/10"
                        aria-label="Abrir menú"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Botón Carrito */}
                    <Link
                        href="/carrito"
                        className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 group"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-emerald-600 rounded-full border-2 border-black">
                            {carritoGlobalCanitidad}
                        </span>
                    </Link>
                </div>

                {/* Navigation Menu Desktop (oculto en móvil) */}
                <div className="hidden lg:flex items-center justify-between">
                    <NavigationMenu className="relative z-50 flex-1">
                        <NavigationMenuList className="flex-wrap gap-2">


                {/* ========== MENÚ INICIO ========== */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/5 text-base font-light px-5 py-2.5 tracking-wide transition-all duration-300">
                        Inicio
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px] lg:grid-cols-[.75fr_1fr] bg-black border border-white/10">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="no-underline flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 outline-none hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
                                        href="/">
                                        <div className="mb-2 mt-4 text-2xl font-bold text-white lowercase tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                                            NeoFitness
                                        </div>
                                        <p className="text-sm font-light leading-tight text-white/90">
                                            Ropa deportiva femenina de alto rendimiento. Estilo y poder.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/nosotros" title="Sobre Nosotros">
                                Nuestra historia y compromiso con el empoderamiento femenino.
                            </ListItem>
                            <ListItem href="/mision" title="Misión y Visión">
                                Nuestro compromiso con la excelencia y sustentabilidad.
                            </ListItem>
                            <ListItem href="/formularioContacto" title="Contacto">
                                Contáctanos para asesoría personalizada.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* ========== MENÚ DE SERVICIOS ========== */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/5 text-base font-light px-5 py-2.5 tracking-wide transition-all duration-300">
                        Servicios
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px] bg-black border border-white/10">
                            <ListItem href="/catalogo" title="Explorar Colección">
                                Descubre nuestra selección de ropa deportiva femenina premium.
                            </ListItem>
                            <ListItem href="/formularioContacto" title="Asesoría Personalizada">
                                Nuestras expertas te ayudan a encontrar tu look perfecto.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ========== ENLACE CATÁLOGO COMPLETO ========== */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/catalogo" className="no-underline text-white/90 hover:text-white hover:bg-white/5 text-base font-light px-5 py-2.5 tracking-wide transition-all duration-300">
                            Catálogo
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* ========== ENLACE CONTACTO ========== */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/formularioContacto" className="no-underline text-white/90 hover:text-white hover:bg-white/5 text-base font-light px-5 py-2.5 tracking-wide transition-all duration-300">
                            Contacto
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

                    {/* Número de teléfono y Carrito (Desktop) */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* Número de teléfono */}
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
                            <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <a
                                href="tel:+56995043704"
                                className="text-base font-light text-white hover:text-emerald-400 transition-colors duration-300 tracking-wide"
                            >
                                +56 9 9504 3704
                            </a>
                        </div>

                        {/* Botón Carrito */}
                        <Link
                            href="/carrito"
                            className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 group"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-light tracking-wide">Carrito</span>
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-emerald-600 rounded-full border-2 border-black">
                                {carritoGlobalCanitidad}
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Menú Móvil Desplegable */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${
                        mobileMenuOpen
                            ? 'max-h-[calc(100vh-72px)] opacity-100 mt-4 overflow-y-auto'
                            : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                    style={{ WebkitOverflowScrolling: 'touch' }} // momentum scrolling en iOS
                >
                    <div className="flex flex-col gap-2 py-4 border-t border-white/10">

                        {/* Número de teléfono móvil */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/30 hover:bg-white/10 transition-all duration-300 group"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="text-base font-light text-white tracking-wide">+56 9 9504 3704</span>
                        </Link>

                        {/* Inicio */}
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-lg text-base font-light text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 tracking-wide"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Inicio
                        </Link>

                        {/* Catálogo Completo */}
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-lg text-base font-light text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 tracking-wide"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Catálogo
                        </Link>

                        {/* Servicios */}
                        <div className="px-4 py-2">
                            <p className="text-xs font-light text-white/50 uppercase tracking-[0.2em] mb-3">Nuestros Servicios</p>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-emerald-400 group-hover:scale-110 transition-transform">✨</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-light text-white/90 group-hover:text-white tracking-wide">
                                            Explorar Colección
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-emerald-400 group-hover:scale-110 transition-transform">💬</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-light text-white/90 group-hover:text-white tracking-wide">
                                            Asesoría Personalizada
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-emerald-400 group-hover:scale-110 transition-transform">🚚</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-light text-white/90 group-hover:text-white tracking-wide">
                                            Envíos a Todo Chile
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-emerald-400 group-hover:scale-110 transition-transform">🌿</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-light text-white/90 group-hover:text-white tracking-wide">
                                            100% Sustentable
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Contacto */}
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-lg text-base font-light text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 tracking-wide"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contacto
                        </Link>

                        {/* Sobre Nosotros */}
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-lg text-base font-light text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 tracking-wide"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sobre Nosotros
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    )
}

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="no-underline block select-none space-y-1 rounded-lg p-3 leading-none outline-none transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white"
                >
                    <div className="text-sm leading-none font-light text-white tracking-wide">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/60 font-light">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
