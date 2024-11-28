"use client"
import axios from "axios";
import Boton from "@/components/boton";
import BorrarUsuario from "@/components/borrarUsuario";
import Link from 'next/link';

async function getSessionUsuario() {
    console.log("Estas en getSession");
    const url="http://localhost:3000/getSesionUsuario";
    const sesionValida=await axios.get(url);
    console.log(sesionValida.data);
}

async function getUsuarios() {
    const url="http://localhost:3000";
    const users = await axios.get(url);
    return users.data;
}

export default async function Usuarios() {
    getSessionUsuario();
    var users=await getUsuarios();
    return (
        <div>
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Borrar</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>
                                    {user.usuario}
                                </td>
                                <td>
                                    <BorrarUsuario id={user.id}/>
                                </td>
                                <td>
                                    <Link href={`/users/mostrar/${user.id}`}>Editar</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Boton />
        </div>
    );
}