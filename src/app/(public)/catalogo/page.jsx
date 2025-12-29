"use client"

import {useState, useEffect, Suspense} from 'react';
import Link from "next/link";
import{useSearchParams} from "next/navigation";
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import MediaCardImage from "@/Componentes/MediaCardImage";
import { motion } from "motion/react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Catalogo() {
    return (
        <Suspense fallback={<div className="p-8 text-gray-500">Cargando catálogo…</div>}>
            <CatalogoInner />
        </Suspense>
    );
}


function CatalogoInner() {
    const searchParams = useSearchParams();
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [_carrito, setCarrito] = useCarritoGlobal();

    // Estados
    const [listaProductos, setListaProductos] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Obtener parámetros de búsqueda
    const id_CategoriaNavBar = searchParams.get("id_categoriaProducto");
    const buscarOfertas = searchParams.get("ofertas");
    const buscarRecientes = searchParams.get("recientes");

    function agregarAlCarrito(productoSeleccionado) {
        setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        toast.success("Producto Seleccionado!")
    }

    // Cargar productos según parámetros
    useEffect(() => {
        const cargarProductos = async () => {
            setIsLoading(true);
            try {
                if (buscarRecientes) {
                    await listarRecientes();
                } else if (buscarOfertas) {
                    await listarOfertas();
                } else if (id_CategoriaNavBar) {
                    await filtrarPorCategoria(id_CategoriaNavBar);
                } else {
                    await listarRecientes();
                }
            } catch (error) {
                console.error("Error cargando productos:", error);
                toast.error("Error al cargar productos");
            } finally {
                setIsLoading(false);
            }
        };

        cargarProductos();
    }, [buscarRecientes, buscarOfertas, id_CategoriaNavBar]);






    //FUNCION PARA LISTAR TODOS LOS PRODUCTOS RECIENTES QUE NO TENGAN ELIMINACION LOGICA
    async function listarRecientes(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProductoReciente`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar los productos recientes');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarRecientes:', err);
            setListaProductos([]);
        }
    }


    //FUNCION PARA FILTRAR PRODUCTOS SEGUN CATEGORIA
    async function filtrarPorCategoria(categoriaProducto){
        try {
            if(!categoriaProducto){
                return;
            }
            const res = await fetch(`${API}/producto/categoriaProducto`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify({categoriaProducto})
            })
            if (!res.ok){
                toast.error("Problema al filtrar categorías, contacte a Soporte de NativeCode.cl");
                return;
            }
            const dataFiltrada = await res.json();
            setListaProductos(dataFiltrada);

        }catch (error) {
            console.log(error);
        }
    }


    // FUNCION PARA SELECCIONAR LA LISTA COMPLETA DE CATEGORIAS DE PRODUCTOS
    async function seleccionarCategoriasCatalogo() {
        try {
            const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
                method: "GET",
                headers: {Accept: "application/json"},
                cache: "no-store",
            })
            if(!res.ok) {
                console.error('No fue posible cargar la lista de categorias');
                setListaCategorias([]);
                return [];
            }
            const dataCategorias = await res.json();
            const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
            setListaCategorias(listaCategorias);
            return listaCategorias;
        }catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        seleccionarCategoriasCatalogo();
    }, []);



    // FUNCION PARA LLAMAR A LOS PRODUCTOS EN OFERTA ESTADO NUMERO 3 estadoProducto en base de datos
    async function listarOfertas(){
        try {
            const res = await fetch(`${API}/producto/seleccionarOfertas`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar las ofertas');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarOfertas:', err);
            setListaProductos([]);
        }
    }

    //FUNCION PARA LISTAR TODOS LOS PRODUCTOS QUE NO TENGAN ELIMINACION LOGICA
    async function listarProductos(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProducto`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar todos los productos');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarProductos:', err);
            setListaProductos([]);
        }
    }


    async function publicacionesLaterales() {
        try {
            const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                console.error("No se han podido Listar Publicaciones / Falla en el fetch desde el frontEnd");
                setPublicaciones([])
                return[]
            }else {
                const publicaciones = await res.json();
                setPublicaciones(publicaciones);
                return publicaciones;
            }
        }catch(err) {
            console.error("Problema al consultar Backen desde la vista fronend:"+err);
        }
    }
    useEffect(() => {
        publicacionesLaterales();
    }, []);

    async function ordenarMayorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMayor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.")
            } else {
                const dataProductosMayorPrecio = await res.json();
                setListaProductos(dataProductosMayorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }
    async function ordenarMenorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMenor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })
            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.");
            } else{
                const dataProductosMenorPrecio = await res.json();
                setListaProductos(dataProductosMenorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }












    return (
        <>
            {/* Contenedor principal del catálogo: ancho máximo, centrado y espaciado vertical */}
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Encabezado del catálogo: título, subtítulo, breadcrumb y acciones visuales */}
                <header className="mb-10">

                    {/* Título principal deportivo y moderno */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tight text-black mb-4" style={{fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em'}}>
                            Colección NeoFitness
                        </h1>
                        <div className="flex justify-center mb-4">
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
                            Ropa deportiva diseñada para mujeres que transforman su potencial en poder
                        </p>
                    </div>

                    {/* Barra de acciones con diseño deportivo moderno */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <div className="flex w-full lg:w-auto">
                            <span className="sr-only">Filtrar por categoría</span>

                            {/* Cinta de categorías con diseño deportivo */}
                            <div className="flex gap-2.5 overflow-x-auto py-3 pr-2 scrollbar-hide">
                                <button
                                    key={"key"}
                                    type="button"
                                    onClick={() => listarProductos()}
                                    className="group relative whitespace-nowrap rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-light text-gray-700 tracking-wider uppercase transition-all duration-300 hover:bg-emerald-400 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                                >
                                    <span className="relative z-10">Ver Todos</span>
                                </button>

                                {listaCategorias.map((categoria) => (
                                    <button
                                        key={categoria.id_categoriaProducto}
                                        type="button"
                                        onClick={() => filtrarPorCategoria(categoria.id_categoriaProducto)}
                                        className="group relative whitespace-nowrap rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-light text-gray-700 tracking-wider uppercase transition-all duration-300 hover:bg-emerald-400 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                                    >
                                        <span className="relative z-10">{categoria.descripcionCategoria}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selector de ordenamiento con estilo deportivo */}
                        <div className="ml-auto flex items-center gap-2">
                            <Select onValueChange={(value) =>{
                                if(value === "menor"){
                                    ordenarMenorPrecio()
                                }else if(value === "mayor"){
                                    ordenarMayorPrecio()
                                }else if(value === "reciente"){
                                    listarRecientes()
                                }else if(value === "antiguo"){
                                    listarProductos()
                                }
                            }}>
                                <SelectTrigger className="w-80 border-gray-200 bg-white text-gray-700 font-light tracking-wide hover:border-emerald-400 focus:ring-emerald-400">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="menor" className="font-light text-gray-700 hover:bg-gray-50 focus:bg-emerald-400 focus:text-white">Precio, menor a mayor</SelectItem>
                                    <SelectItem value="mayor" className="font-light text-gray-700 hover:bg-gray-50 focus:bg-emerald-400 focus:text-white">Precio, mayor a menor</SelectItem>
                                    <SelectItem value="reciente" className="font-light text-gray-700 hover:bg-gray-50 focus:bg-emerald-400 focus:text-white">Fecha: reciente a antiguo(a)</SelectItem>
                                    <SelectItem value="antiguo" className="font-light text-gray-700 hover:bg-gray-50 focus:bg-emerald-400 focus:text-white">Fecha: antiguo(a) a reciente</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                </header>

                {/* Separador sutil entre encabezado y contenido */}
                <hr className="my-6 border-gray-200" />

                {/* Layout responsivo con separación: 1 columna en móviles, 5 en escritorio (sidebar + grilla) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Sidebar de publicaciones/banners: se mantiene fijo en viewport alto, sin alterar la lógica */}
                    <aside className="order-first hidden lg:block  lg:col-span-1 space-y-4 sticky top-24 self-start">
                        {/* Título del sidebar para dar contexto visual */}
                        <h3 className="text-sm font-light text-black tracking-widest uppercase mb-1">Tendencias</h3>
                        <p className="text-xs text-gray-500 font-light mb-4">Lo mejor de la temporada</p>



                        {/* Tarjetas simples para cada publicación: borde sutil, sombra ligera y transición al hover */}
                        {publicaciones
                            .filter(publicacion => Number(publicacion.id_publicaciones) !== 10)
                            .map(publicacion => (
                                <div key={publicacion.id_publicaciones} className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:shadow-emerald-400/20 hover:border-emerald-400 transition-all duration-300">
                                    <img
                                        src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${publicacion.imagenPublicaciones_primera}/card`}
                                        className="w-full aspect-[3/4] object-cover"
                                        alt="Publicación"
                                    />
                                </div>
                            ))}



                    </aside>

                    {/* Sección principal con la grilla de productos */}
                    <section className="order-1 lg:order-2 lg:col-span-4">
                        {/* Encabezado de la sección de productos con contador visual (sin alterar lógica) */}
                        <div className="flex items-baseline justify-between mb-4">
                            <h2 className="text-lg font-light text-black tracking-wider uppercase">Productos</h2>
                            <span className="text-sm text-gray-500 font-light">{listaProductos?.length ?? 0} resultados</span>
                        </div>

                        {/* Indicador de carga */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                            </div>
                        ) : (
                            /* Grilla de tarjetas de producto: columnas adaptativas y buen espacio entre elementos */
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                {
                                    listaProductos.map((producto, index) => {

                                        const id = producto.id_producto ?? index;
                                        return (




                                            <motion.div
                                                key={id}
                                                layout
                                                layoutId={`producto-${id}`}
                                                transition={{ layout: { duration: 0.35, ease: "easeOut" } }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ scale: 1.03, y: -5 }}
                                                className="flex flex-col h-full min-w-0 min-h-0 overflow-hidden break-words max-w-full rounded-lg border border-gray-200 bg-white hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-400/20 transition-all duration-300"
                                            >


                                                <div className="flex flex-col h-full min-w-0 min-h-0 overflow-hidden break-words max-w-full p-3">
                                                    <Link
                                                        href={`/producto/${id}`}
                                                        className="no-underline hover:no-underline inline-block focus:outline-none focus:ring-0 mb-3 overflow-hidden rounded-lg"
                                                        style={{ textDecoration: 'none', WebkitTextDecoration: 'none' }}
                                                    >

                                                        <MediaCardImage
                                                            imagenProducto={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/card`}
                                                            className="no-underline hover:no-underline transition-transform duration-300 hover:scale-105"
                                                        />
                                                    </Link>

                                                    {/* Título estilo deportivo moderno */}
                                                    <h3 className="mt-1 mb-1 text-gray-900 font-light tracking-wide uppercase text-sm">
                                                        {producto.tituloProducto}
                                                    </h3>

                                                    {/* Precio con estilo COCOFIT */}
                                                    <p className="mt-0 mb-3 text-emerald-600 text-lg font-bold tracking-tight">
                                                        ${producto.valorProducto}
                                                    </p>
                                                </div>

                                                <div className="flex justify-center px-3 pb-3">
                                                    {/* Versión desktop */}
                                                    <button
                                                        onClick={() => {agregarAlCarrito(producto)}}
                                                        className="hidden md:flex w-full py-2.5 px-6 bg-black text-white items-center justify-center gap-2 rounded-lg font-light tracking-wide uppercase text-xs transition-all duration-300 ease-in-out hover:bg-emerald-400 hover:text-black hover:shadow-lg hover:shadow-emerald-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 group"
                                                        title="Añadir al carrito"
                                                    >
                                                        <span className="transition-transform group-hover:scale-105">Añadir al carrito</span>
                                                        <ShoppingCartIcon className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-all" />
                                                    </button>

                                                    {/* Versión móvil */}
                                                    <button
                                                        onClick={() => {agregarAlCarrito(producto)}}
                                                        className="flex md:hidden w-full py-2 px-4 bg-black text-white items-center justify-center gap-2 rounded-lg font-light tracking-wide uppercase text-xs transition-all duration-300 ease-in-out hover:bg-emerald-400 hover:text-black hover:shadow-lg hover:shadow-emerald-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 group"
                                                        title="Añadir al carrito"
                                                    >
                                                        <span className="transition-transform group-hover:scale-105">Añadir</span>
                                                        <ShoppingCartIcon className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-all" />
                                                    </button>
                                                </div>

                                            </motion.div>



                                        )
                                    })
                                }
                            </div>
                        )}
                    </section>

                </div>
                </div>
            </div>
        </>
    )

}