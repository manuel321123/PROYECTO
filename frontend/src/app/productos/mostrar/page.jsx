import axios from "axios";
import Boton from "@/components/boton";
import BorrarProducto from "@/components/borrarProducto"
import Link from 'next/link';

async function getproductos() {
    const url="http://localhost:3000/productos";
    const products = await axios.get(url);
    return products.data;
}

export default async function productos() {
    var products=await getproductos();
    return (
        <div>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Borrar</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nombre}</td>
                                <td>
                                    {product.cantidad}
                                </td>
                                <td>
                                    {product.precio}
                                </td>
                                <td>
                                    <BorrarProducto id={product.id}/>
                                </td>
                                <td>
                                    <Link href={`/productos/mostrar/${product.id}`}>Editar</Link>
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