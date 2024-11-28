"use client"
import axios from "axios"

async function verificarLogin(e) {
    e.preventDefault();
    console.log("Estas en verificar");
    const url="http://localhost:3000/login";
    const datos={
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    const usuario = await axios.post(url, datos);
    console.log(usuario.data);
    if (usuario.data.tipoUsuario=="usuario") {
        window.location.replace("/users/mostrar");
    }else if(usuario.data.tipoUsuario=="admin") {
        window.location.replace("/users/nuevoUsuario");
    }else{
        document.getElementById("msj").innerHTML="Datos incorrectos";
    }
}

export default function Login() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="form col-6 mt-5" onSubmit={verificarLogin}>
                <div className="card">
                    <div className="card-header">
                        <h1>
                            Login
                        </h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" id="usuario" placeholder="Usuario" autoFocus/>
                        <input className="form-control mb-3" type="text"  id="password" placeholder="Contraseña"/>
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{height:"50px"}} className="btn btn-primary col-12">Iniciar sesion</button>
                        <div id="msj" className="text-danger fs-3"></div>
                    </div>
                </div>
            </form>
        </div>
    )
}