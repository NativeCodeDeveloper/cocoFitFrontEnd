// app/page.jsx
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import { Case1 } from "@/Componentes/carruselMarcas";



export default function Home({ searchParams }) {


    return (
        <main>
            <Portada></Portada>

            <Catalogo searchParams={searchParams || {}}></Catalogo>



        </main>
    );
}