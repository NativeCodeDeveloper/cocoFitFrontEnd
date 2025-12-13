"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Descubre tu estilo COCOFIT.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p
              className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                La primera regla de COCOFIT es que te sientas increíble.
              </span>{" "}
              Diseñada con los mejores materiales y tecnología de punta para
              brindarte el máximo confort y rendimiento en cada entrenamiento.
              Lista para capturar cada momento de tu transformación.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="cocofit collection"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Rendimiento",
    title: "Más que ropa deportiva.",
    src: "/mujergym.png",
    content: <DummyContent />,
  },
  {
    category: "Productividad",
    title: "Mejora tu rendimiento.",
    src: "/mujertenis2.png",
    content: <DummyContent />,
  },
  {
    category: "Colección",
    title: "Nueva colección 2025.",
    src: "/mujertrote.png",
    content: <DummyContent />,
  },
  {
    category: "Estilo",
    title: "Diseñada para ti.",
    src: "/mujertenis.png",
    content: <DummyContent />,
  },
  {
    category: "Innovación",
    title: "Calidad y resistencia en tus entrenamientos.",
    src: "/mujersent.png",
    content: <DummyContent />,
  },
  {
    category: "Comunidad",
    title: "Únete a la familia COCOFIT",
    src: "/mujercross.png",
    content: <DummyContent />,
  },
];
