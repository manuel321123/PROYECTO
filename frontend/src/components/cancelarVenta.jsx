"use client"
import axios from "axios"
import Link from "next/link"
export default function cancelarV({id}) {
    async function cancelar() {
        console.log("Cancelar venta");
        const url="http://localhost:3000/ventas/upEstatusVentas/"+id;
        const respuesta = await axios.get(url);
        window.location.replace("/ventas/mostrar");
    }
    return (
        <Link href="" onClick={cancelar}>cancelar</Link>
    );
}