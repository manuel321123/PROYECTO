"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Nuevo() {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cantidad, setCantidad] = useState(1); // Estado de la cantidad para mantener consistencia.
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const usuariosData = await axios.get("http://localhost:3000/");
                const productosData = await axios.get("http://localhost:3000/productos");
                setUsuarios(usuariosData.data);
                setProductos(productosData.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    function calcTotal(cantidadInput) {
        const productoSeleccionado = document.getElementById("idProducto").value;
        const productoEncontrado = productos.find(
            (product) => product.nombre === productoSeleccionado
        );
        if (productoEncontrado) {
            const nuevoTotal = productoEncontrado.precio * cantidadInput;
            setTotal(nuevoTotal); // Actualiza el estado del total inmediatamente
        }
    }

    async function guardarUsuario(e) {
        e.preventDefault();
        console.log("Función actualizar venta");
    
        // Obtén los valores directamente del DOM o asegúrate de usar los estados actualizados
        const datos = {
            idUsuario: document.getElementById("idUsuario").value,
            idProducto: document.getElementById("idProducto").value,
            cantidad: parseInt(document.getElementById("cantidad").value, 10) || 1, // Asegura un valor válido
            total,
        };
    
        console.log("Datos a enviar:", datos); // Debug para revisar los datos enviados
    
        // Relaciona los nombres de usuarios y productos con sus IDs
        const usuarioEncontrado = usuarios.find((user) => user.nombre === datos.idUsuario);
        if (usuarioEncontrado) {
            datos.idUsuario = usuarioEncontrado.id;
        }
    
        const productoEncontrado = productos.find(
            (product) => product.nombre === datos.idProducto
        );
        if (productoEncontrado) {
            datos.idProducto = productoEncontrado.id;
        }
    
        try {
            const url = "http://localhost:3000/ventas/nuevaVenta";
            const respuesta = await axios.post(url, datos); // Envía los datos a Firebase
            location.replace("/ventas/mostrar");
        } catch (error) {
            console.error("Error al guardar la venta:", error);
        }
    }
    

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="m-0 row justify-content-center">
            <form className="text-center col-6 mt-5" onSubmit={guardarUsuario}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva venta</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-floating">
                            <input
                                className="form-control"
                                list="datalistOptions-Users"
                                style={{ height: "50px" }}
                                id="idUsuario"
                                placeholder="Usuario..."
                                required
                            />
                            <datalist id="datalistOptions-Users">
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.nombre} />
                                ))}
                            </datalist>
                            <label htmlFor="idUsuario">Usuario:</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className="form-control"
                                list="datalistOptions-Products"
                                style={{ height: "50px" }}
                                id="idProducto"
                                placeholder="Producto..."
                                required
                                onChange={() => calcTotal(cantidad)} // Calcula el total al cambiar el producto
                            />
                            <datalist id="datalistOptions-Products">
                                {productos.map((product) => (
                                    <option key={product.id} value={product.nombre} />
                                ))}
                            </datalist>
                            <label htmlFor="idProducto">Producto:</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className="form-control"
                                type="number"
                                style={{ height: "50px" }}
                                id="cantidad"
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={(e) => {
                                    const nuevaCantidad = parseInt(e.target.value, 10) || 1;
                                    setCantidad(nuevaCantidad); // Actualiza el estado de la cantidad
                                    calcTotal(nuevaCantidad); // Recalcula el total inmediatamente
                                }}
                            />
                            <label htmlFor="cantidad">Cantidad:</label>
                        </div>
                        <div className="form-group mt-3">
                            <p>Total a pagar: <strong>${total}</strong></p> {/* Muestra el total en un párrafo */}
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            type="submit"
                            style={{ height: "50px" }}
                            className="btn btn-primary col w-100"
                        >
                            Guardar nueva venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
