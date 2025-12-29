"use client";
import { useState } from "react";

export default function CarruselProducto({ imagenes, imagen1, imagen2, imagen3, imagen4 }) {
    // Permitir recibir hasta 4 props individuales o un array
    let imagenesFinal = [];
    if (Array.isArray(imagenes) && imagenes.length > 0) {
        imagenesFinal = imagenes.filter(Boolean).slice(0, 4);
    } else {
        // Si se pasan props individuales, construir el array
        imagenesFinal = [imagen1, imagen2, imagen3, imagen4].filter(Boolean);
    }

    const [actual, setActual] = useState(0);

    const siguiente = () => setActual((actual + 1) % imagenesFinal.length);
    const anterior = () => setActual((actual - 1 + imagenesFinal.length) % imagenesFinal.length);

    // Si no hay imágenes, no renderizamos el carrusel
    if (!imagenesFinal.length) return null;

    const thumbs = imagenesFinal.slice(0, 4);


    return (
        <div className="flex flex-col items-center w-full gap-2 md:gap-4 mt-0 md:mt-4">
            {/* Miniaturas: solo visibles en desktop/tablet, ocultas en mobile */}
            <div className="hidden md:flex gap-3 mb-2 justify-center w-full overflow-x-auto py-2 bg-white rounded-xl">
                {thumbs.map((img, i) => {
                    const isActive = i === actual;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActual(i)}
                            className={
                                "shrink-0 rounded-xl p-1 bg-white transition flex items-center justify-center " +
                                (isActive
                                    ? "ring-2 ring-black"
                                    : "ring-1 ring-black/10 hover:ring-black/30")
                            }
                            aria-label={`Ver imagen ${i + 1}`}
                        >
                            <div className="bg-white rounded-lg p-0.5 flex items-center justify-center">
                                <img
                                    src={img}
                                    alt={`Miniatura ${i + 1}`}
                                    className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-lg"
                                />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Imagen principal */}
            <div className="relative w-full max-w-full sm:max-w-xl">
                <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                    <img
                        src={imagenesFinal[actual]}
                        alt={`Imagen principal ${actual + 1}`}
                        className="h-[80vw] max-h-[90vw] w-full object-contain md:h-full md:max-h-none"
                        style={{minHeight: '220px'}} // asegura buen tamaño en móviles
                    />

                    {/* Flecha izquierda */}
                    <button
                        type="button"
                        onClick={anterior}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white"
                        aria-label="Imagen anterior"
                    >
                        <span className="text-2xl leading-none">‹</span>
                    </button>

                    {/* Flecha derecha */}
                    <button
                        type="button"
                        onClick={siguiente}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white"
                        aria-label="Imagen siguiente"
                    >
                        <span className="text-2xl leading-none">›</span>
                    </button>

                    {/* Indicador */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                        {actual + 1} / {imagenesFinal.length}
                    </div>
                </div>
            </div>
        </div>
    );
}