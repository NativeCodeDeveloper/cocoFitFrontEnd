// app/page.jsx
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import { Case1 } from "@/Componentes/carruselMarcas";
import { AppleCardsCarouselDemo } from "@/Componentes/AppleCardsCarouselDemo";



export default function Home({ searchParams }) {


    return (
        <main>
            <Portada></Portada>

            <AppleCardsCarouselDemo />

            <Catalogo searchParams={searchParams || {}}></Catalogo>



        </main>
    );
}