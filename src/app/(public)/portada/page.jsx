'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PortadaPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/neo.webp"
          alt="COCOFIT - Ropa deportiva femenina"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Overlay gradient para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl">
            {/* Badge sutil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-block">
                <span className="font-light text-xs text-emerald-400/90 tracking-[0.3em] uppercase">
                  Colección 2025
                </span>
                <div className="mt-1 h-[1px] w-full bg-gradient-to-r from-emerald-400/60 to-transparent" />
              </div>
            </motion.div>

            {/* Título principal - Estilo deportivo moderno */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-12"
            >
              <h1
                className="font-black text-5xl md:text-9xl text-white  tracking-tighter leading-[0.8]"
                style={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                  letterSpacing: '-0.05em',
                  fontWeight: '900'
                }}
              >
                NeoFitness
              </h1>
            </motion.div>

            {/* Subtítulo minimalista */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-12 max-w-2xl"
            >
              <p className="font-light text-xl text-white/95 sm:text-2xl md:text-3xl leading-relaxed">
                Diseñada para mujeres que
                <br />
                <span className="text-emerald-300/90">
                  transforman su potencial en poder
                </span>
              </p>
              <p className="mt-4 font-light text-base text-white/60 tracking-wide">
                Rendimiento superior · Estilo inigualable
              </p>
            </motion.div>

            {/* CTAs minimalistas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-white px-10 py-5 font-light text-base text-black transition-all duration-300 hover:bg-emerald-400"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                    Explorar Colección
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group border-2 border-white/30 bg-transparent px-10 py-5 font-light text-base text-white backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:bg-white/5"
                >
                  <span className="flex items-center justify-center gap-3 tracking-wide">
                    Nuestra Historia
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Características destacadas con diseño minimalista */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-12"
            >
              {[
                { value: "100%", label: "Comodidad" },
                { value: "100%", label: "Original" },
                { value: "100%", label: "Mujeres" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="font-light text-4xl text-emerald-400/90 tracking-tight transition-all duration-300 group-hover:text-emerald-300">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-light text-xs text-white/50 tracking-widest uppercase transition-all duration-300 group-hover:text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator minimalista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-light text-[10px] text-white/40 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

