"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useObjetosPagosGlobales} from "@/ContextosGlobales/ObjetoPagarContext";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {
    ButtonGroup,
    // ButtonGroupSeparator,
    // ButtonGroupText,
} from "@/components/ui/button-group"

import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




export default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();
    const [_objetoDePago, _setObjetoDePago] = useObjetosPagosGlobales();
    const [_nuevaCantidad, _setNuevaCantidad] = useState(0);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);


    const productoCatidades = {};
    let totalPago = 0;

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        } else {
            productoCatidades[productos.id_producto] = {...productos, cantidadVendida: 1};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)

    useEffect(() => {
        // Solo ejecutar esta lógica después del montaje para evitar mismatch SSR/cliente
        if (!isMounted) return;
        if (
            productosDelCarrito.length > 0 &&
            (idSeleccionado === null ||
                !productosDelCarrito.some(p => p.id_producto === idSeleccionado))
        ) {
            setIdSeleccionado(productosDelCarrito[0].id_producto);
        }
    }, [productosDelCarrito, isMounted]);

    for (const producto of productosDelCarrito) {
        totalPago += (producto.valorProducto * producto.cantidadVendida);
    }


    function quitarDelCarrito(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para quitarlo del carrito!');
            } else {
                const nuevoCarrito = carrito.filter(producto => {
                    return producto.id_producto !== id_producto
                });
                setCarrito(nuevoCarrito);
            }

        } catch (e) {
            return toast.error("No se puede eliminar el producto del carrito. Pruebe mas tarde");
        }
    }




    function aumentarCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder aumentar su cantidad.');
            } else {

                const productoAumentar = carrito.find(producto => producto.id_producto === id_producto);
                if (!productoAumentar) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    setCarrito([...carrito, {...productoAumentar}]);
                }

            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }




    function disminuirCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder bajar su cantidad.');
            } else {
                const productoEliminar = carrito.findIndex(producto => producto.id_producto === id_producto);
                if (productoEliminar === -1) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    const nuevoCarritoConProductoEliminado = [...carrito];
                    nuevoCarritoConProductoEliminado.splice(productoEliminar, 1);
                    setCarrito(nuevoCarritoConProductoEliminado);
                }
            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }



    // Reemplazo del render: mantengo toda la lógica pero muestro tabla en md+ y tarjetas en móvil
    return (
        <div className="mt-20 bg-white min-h-screen">
            <div className="p-4 sm:p-6">

                <h1 className="text-emerald-600 text-3xl sm:text-4xl font-bold tracking-tight">Carrito de Compras</h1>

                {/* Mensaje cuando no hay productos */}
                {isMounted && productosDelCarrito.length === 0 && (
                    <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-gray-700">
                        Tu carrito está vacío.
                    </div>
                )}

                {/* VISTA ESCRITORIO: tabla (md+) */}
                <div className="hidden md:block">
                    <Table className="w-full mt-8 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200">
                        <TableCaption></TableCaption>
                        <TableHeader className="bg-emerald-50">
                            <TableRow className="text-emerald-700">
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">Producto</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">Referencia</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">Unidades</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">Aumentar/Disminuir</TableHead>
                                <TableHead className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">Valor
                                    Unidad</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-sm text-emerald-700 border-b border-emerald-200">SubTotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isMounted && productosDelCarrito.map((producto) => (
                                <TableRow key={producto.id_producto} className="hover:bg-emerald-50/50 transition-colors">
                                    <TableCell
                                        className="px-4 py-4 text-sm text-gray-800 align-middle border-b border-gray-200 font-medium">
                                        <span className="text-emerald-600 font-semibold">{producto.tituloProducto}</span>
                                        <span className="mt-3 block"><ShadcnButton
                                            funcion={() => quitarDelCarrito(producto.id_producto)}
                                            nombre={"Eliminar"}/></span>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-sm text-gray-800 align-middle border-b border-gray-200"><img
                                        src={producto.imagenProducto} alt={"Imagen Producto"} width={100}
                                        height={100} className="object-cover rounded-lg shadow-sm"/></TableCell>
                                    <TableCell
                                        className="px-4 py-4 text-sm text-gray-800 align-middle border-b border-gray-200 font-medium">{producto.cantidadVendida}</TableCell>
                                    <TableCell className="px-4 py-4 text-sm text-gray-800 align-middle border-b border-gray-200">

                                        <ButtonGroup aria-label="Acciones">
                                            <Button onClick={()=>disminuirCantidad(producto.id_producto)} variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">-</Button>
                                            <Button onClick={()=>aumentarCantidad(producto.id_producto)} variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">+</Button>
                                        </ButtonGroup>

                                    </TableCell>
                                    <TableCell
                                        className="px-4 py-4 text-sm text-gray-800 align-middle border-b border-gray-200 font-medium">${producto.valorProducto}</TableCell>
                                    <TableCell
                                        className="px-4 py-4 text-sm text-emerald-600 align-middle border-b border-gray-200 text-right font-semibold">${producto.cantidadVendida * producto.valorProducto}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-emerald-50 w-full font-semibold">
                                <TableCell className="px-4 py-3 w-full text-left text-emerald-700"
                                           colSpan={3}>Total</TableCell>
                                <TableCell className="px-4 py-3 text-right text-emerald-600 font-bold text-lg">$ {isMounted ? totalPago : 0}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                {/* VISTA MÓVIL: tarjetas (sm) */}
                <div className="md:hidden mt-6 space-y-4">
                    {isMounted && productosDelCarrito.map((producto) => (
                        <div key={producto.id_producto} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:border-emerald-200 transition-colors">
                            <img src={producto.imagenProducto} alt={producto.tituloProducto} className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-emerald-600 truncate">{producto.tituloProducto}</div>
                                        <div className="text-xs text-gray-500 mt-1">Ref: {producto.id_producto}</div>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                        <div className="text-sm font-semibold text-gray-800">${producto.valorProducto}</div>
                                        <div className="text-xs text-gray-500">Unidad</div>
                                    </div>
                                </div>

                                {/* Acciones: en móvil apilan si falta espacio */}
                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <ButtonGroup aria-label="Acciones mobile">
                                            <Button size="sm" onClick={()=>disminuirCantidad(producto.id_producto)} variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">-</Button>
                                            <Button size="sm" onClick={()=>aumentarCantidad(producto.id_producto)} variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">+</Button>
                                        </ButtonGroup>
                                        <div className="text-sm text-gray-700">Unidades: <span className="font-medium text-emerald-600">{producto.cantidadVendida}</span></div>
                                    </div>

                                    <div className="flex items-center gap-2 justify-end flex-shrink-0">
                                        <div className="w-max">
                                            <ShadcnButton funcion={() => quitarDelCarrito(producto.id_producto)} nombre={"Eliminar"} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                    {/* Total y botón pagar en móvil */}
                    <div className="bg-emerald-50 p-4 rounded-lg shadow-sm border border-emerald-200 flex items-center justify-between">
                        <div className="text-lg font-semibold text-emerald-700">Total</div>
                        <div className="text-xl font-bold text-emerald-600">$ {isMounted ? totalPago : 0}</div>
                    </div>
                </div>

                {/* Botón Ir a pagar (se mantiene visible en ambos tamaños) */}
                <div className="mt-6">
                    <Link href="/formularioPago">
                        <button
                            className="px-8 py-3 rounded-lg font-semibold text-base
    bg-emerald-500 hover:bg-emerald-600
    text-white shadow-md transition-all duration-300
    hover:scale-105 hover:shadow-xl"
                        >
                            Ir a Pagar
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}