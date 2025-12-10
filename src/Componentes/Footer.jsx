'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin, Facebook, TwitterIcon } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 lg:py-16">

        {/* Grid principal - 4 columnas en desktop, apilado en mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <h2 className="text-4xl font-bold text-white lowercase tracking-tight transition-all duration-300 group-hover:text-emerald-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                cocofit
              </h2>
            </Link>
            <p className="text-white/60 font-light text-sm leading-relaxed max-w-xs">
              Ropa deportiva femenina diseñada para mujeres que transforman su potencial en poder.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/cocofit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-emerald-400 text-white hover:text-black border border-white/10 hover:border-emerald-400 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/cocofit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-emerald-400 text-white hover:text-black border border-white/10 hover:border-emerald-400 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/cocofit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-emerald-400 text-white hover:text-black border border-white/10 hover:border-emerald-400 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-white font-light text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-3">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/nosotros', label: 'Sobre Nosotros' },
                { href: '/mision', label: 'Misión y Visión' },
                { href: '/formularioContacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-emerald-400 font-light text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h3 className="text-white font-light text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-3">
              Información
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/politicas', label: 'Políticas de Privacidad' },
                { href: '/terminos', label: 'Términos y Condiciones' },
                { href: '/envios', label: 'Envíos y Devoluciones' },
                { href: '/faq', label: 'Preguntas Frecuentes' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-emerald-400 font-light text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-white font-light text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-3">
              Contáctanos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <a
                    href="tel:+56912345678"
                    className="text-white/80 hover:text-emerald-400 font-light text-sm transition-colors duration-300"
                  >
                    +56 9 1234 5678
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <a
                    href="mailto:contacto@cocofit.cl"
                    className="text-white/80 hover:text-emerald-400 font-light text-sm transition-colors duration-300 break-all"
                  >
                    contacto@cocofit.cl
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/80 font-light text-sm leading-relaxed">
                    Santiago, Chile
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-light text-lg mb-3 tracking-wide">
              Únete a nuestra comunidad
            </h3>
            <p className="text-white/60 font-light text-sm mb-6">
              Recibe novedades, ofertas exclusivas y tips de entrenamiento
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 font-light text-sm focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all duration-300"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-light text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/50 whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="text-center mb-4">
            <h4 className="text-white/60 font-light text-xs tracking-widest uppercase mb-4">
              Métodos de Pago
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                <Image
                  src="/mercadopago.png"
                  alt="Mercado Pago"
                  width={80}
                  height={30}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 font-light text-xs text-center md:text-left">
              © {currentYear} COCOFIT. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-white/40 font-light text-xs">
              <span className="hidden sm:inline">Hecho con</span>
              <span className="text-emerald-400">❤</span>
              <span className="hidden sm:inline">para Marti by NativeCode - Software Engineering </span>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de gradiente superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
    </footer>
  );
}

