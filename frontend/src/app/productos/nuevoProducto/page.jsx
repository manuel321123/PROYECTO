"use client"
import axios from "axios";
async function guardarProducto(e) {
    e.preventDefault();
    console.log("Función guardadr usuario");
    const url = "http://localhost:3000/producto/nuevoProducto";
    const datos = {
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value,
        cantidad:document.getElementById("cantidad").value,
    }
    const respuesta = await axios.post(url,datos);
    console.log(respuesta);
    location.replace("/productos/mostrar")
}
export default function Nuevo() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="text-center col-6 mt-5" action="" onSubmit={guardarProducto}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo producto</h1>
                    </div>
                    <div className="card-body">
                        <input type="text" className="form-control mb-3" style={{height:"50px"}} id="nombre" placeholder="Nombre" autoFocus/>
                        <input type="text" className="form-control mb-3" style={{height:"50px"}} id="precio" placeholder="Precio"/>
                        <input type="text" className="form-control" style={{height:"50px"}} id="cantidad" placeholder="Cantidad"/>
                    </div>
                    <div className="card-footer">
                        <button style={{height:"50px"}} className="btn btn-primary col w-100">Guardar nuevo Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
};