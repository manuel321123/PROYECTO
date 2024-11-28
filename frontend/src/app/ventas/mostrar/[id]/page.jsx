"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditarVenta({ params }) {
    const [venta, setVenta] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
    const [total, setTotal] = useState(0); // Estado para el total
    const [loading, setLoading] = useState(true);
    const [filtroUsuarios, setFiltroUsuarios] = useState([]); // Para sugerencias de usuarios
    const [filtroProductos, setFiltroProductos] = useState([]); // Para sugerencias de productos

    useEffect(() => {
        async function fetchData() {
            try {
                const ventaResponse = await axios.get(`http://localhost:3000/ventas/buscarPorId/${params.id}`);
                const usuariosResponse = await axios.get("http://localhost:3000/");
                const productosResponse = await axios.get("http://localhost:3000/productos");

                const ventaData = ventaResponse.data;

                // Actualizar estados iniciales
                setVenta(ventaData);
                setUsuarios(usuariosResponse.data);
                setProductos(productosResponse.data);
                setCantidad(ventaData.cantidad);
                setTotal(ventaData.total);
                setLoading(false);

                // Inicializar los filtros
                setFiltroUsuarios(usuariosResponse.data);
                setFiltroProductos(productosResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        }

        fetchData();
    }, [params.id]);

    useEffect(() => {
        if (venta && productos.length > 0) {
            const productoSeleccionado = productos.find((p) => p.id === venta.idProducto);
            if (productoSeleccionado) {
                const nuevoTotal = cantidad * productoSeleccionado.precio;
                setTotal(nuevoTotal);
            }
        }
    }, [cantidad, venta, productos]);

    async function guardarUsuario(e) {
        e.preventDefault();
        const nombreUsuario = document.getElementById("idUsuario").value;
        const nombreProducto = document.getElementById("idProducto").value;

        const usuarioSeleccionado = usuarios.find((u) => u.nombre === nombreUsuario);
        const productoSeleccionado = productos.find((p) => p.nombre === nombreProducto);

        if (!usuarioSeleccionado || !productoSeleccionado) {
            alert("Por favor, selecciona un usuario y un producto válidos.");
            return;
        }

        const datos = {
            id: venta.id,
            idUsuario: usuarioSeleccionado.id,
            idProducto: productoSeleccionado.id,
            cantidad,
            total,
        };

        try {
            const url = "http://localhost:3000/ventas/updateVentas";
            await axios.post(url, datos);
            location.replace("/ventas/mostrar");
        } catch (error) {
            console.error("Error al guardar la venta:", error);
        }
    }

    const filtrarUsuarios = (input) => {
        setFiltroUsuarios(usuarios.filter((u) => u.nombre.toLowerCase().includes(input.toLowerCase())));
    };

    const filtrarProductos = (input) => {
        setFiltroProductos(productos.filter((p) => p.nombre.toLowerCase().includes(input.toLowerCase())));
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="m-0 row justify-content-center">
            <form className="text-center col-6 mt-5" onSubmit={guardarUsuario}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="id"
                            value={venta.id}
                            readOnly
                            style={{ height: "50px" }}
                        />
                        <div className="form-floating mb-3 position-relative">
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="idUsuario"
                                style={{ height: "50px" }}
                                placeholder="Usuario..."
                                autoComplete="off"
                                onChange={(e) => filtrarUsuarios(e.target.value)}
                                defaultValue={usuarios.find((u) => u.id === venta.idUsuario)?.nombre || ""}
                            />
                            <label htmlFor="idUsuario">Usuario:</label>
                            {filtroUsuarios.length > 0 && (
                                <ul className="list-group position-absolute mt-2 w-100" style={{ zIndex: 5 }}>
                                    {filtroUsuarios.map((usuario) => (
                                        <li
                                            key={usuario.id}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                document.getElementById("idUsuario").value = usuario.nombre;
                                                setFiltroUsuarios([]);
                                            }}
                                        >
                                            {usuario.nombre}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="form-floating mb-3 position-relative">
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="idProducto"
                                style={{ height: "50px" }}
                                placeholder="Producto..."
                                autoComplete="off"
                                onChange={(e) => filtrarProductos(e.target.value)}
                                defaultValue={productos.find((p) => p.id === venta.idProducto)?.nombre || ""}
                            />
                            <label htmlFor="idProducto">Producto:</label>
                            {filtroProductos.length > 0 && (
                                <ul className="list-group position-absolute mt-2 w-100" style={{ zIndex: 5 }}>
                                    {filtroProductos.map((producto) => (
                                        <li
                                            key={producto.id}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                document.getElementById("idProducto").value = producto.nombre;
                                                setFiltroProductos([]);
                                            }}
                                        >
                                            {producto.nombre}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad"
                                style={{ height: "50px" }}
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
                                min="1"
                            />
                            <label htmlFor="cantidad">Cantidad:</label>
                        </div>
                        <div className="form-group">
                            <p>
                                Total a pagar: <strong>${total}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col w-100" style={{ height: "50px" }}>
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
