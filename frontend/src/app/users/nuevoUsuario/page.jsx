"use client"
import axios from "axios";
async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Función guardadr usuario");
    const url = "http://localhost:3000/nuevoUsuario";
    const datos = {
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value,
    }
    const respuesta = await axios.post(url,datos);
    console.log(respuesta);
    location.replace("/users/mostrar")
}
export default function Nuevo() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="text-center col-6 mt-5" action="" onSubmit={guardarUsuario}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo usuario</h1>
                    </div>
                    <div className="card-body">
                        <input type="text" className="form-control mb-3" style={{height:"50px"}} id="nombre" placeholder="Nombre" autoFocus/>
                        <input type="text" className="form-control mb-3" style={{height:"50px"}} id="usuario" placeholder="Usuario"/>
                        <input type="text" className="form-control" style={{height:"50px"}} id="password" placeholder="Password"/>
                    </div>
                    <div className="card-footer">
                        <button style={{height:"50px"}} className="btn btn-primary col w-100">Guardar nuevo Usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
};