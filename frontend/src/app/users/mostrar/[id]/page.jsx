"use client"
import axios from "axios";
async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Función guardadr usuario");
    const url = "http://localhost:3000/updateUsuario";
    const datos = {
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value
    }
    const respuesta = await axios.post(url,datos);
    console.log(respuesta);
    location.replace("/users/mostrar")
}

export default async function User({params}) {
    var url = await fetch(`http://localhost:3000/buscarPorId/${params.id}`);
    if(url.ok)  {
        console.log(url);
        var usuario = await url.json();
        return (
            <div className="m-0 row justify-content-center">
                <form className="text-center col-6 mt-5" onSubmit={guardarUsuario}>
                    <div className="card">
                        <div className="card-header">
                            <h1>cambiar datos: usuario</h1>
                        </div>
                        <div className="card-body">
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="id" value={`${params.id}`}/>
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="nombre" defaultValue={usuario.nombre} placeholder={usuario.nombre} autoFocus/>
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="usuario" defaultValue={usuario.usuario} placeholder={""+usuario.usuario}/>
                        </div>
                        <div className="card-footer">
                            <button style={{height:"50px"}} className="btn btn-primary col w-100">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }else{
        return (<p>Noticia no encontrada</p>);
    }
};