import Boton from "@/components/boton";
import axios from "axios";
import Link from 'next/link';

async function universidadesMexico() {
    const url="http://universities.hipolabs.com/search?country=Mexico";
    const universidades= await axios.get(url);
    return universidades.data;
}

export default async function Noticias() {
    var universidades=await universidadesMexico();
    return (
        <div>
            <h1>Noticias</h1>
            <p>Estas en noticias</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Universidad</th>
                        <th>Web</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        universidades.map((universidad,i)=>(
                            <tr key="{i}">
                                <td>{i+1}</td>
                                <td>
                                    <Link href={`/noticias/${universidad.name}`}>{universidad.name}</Link>
                                </td>
                                <td>
                                    <Link href={`${universidad.web_pages[0]}`}>{universidad.web_pages[0]}</Link>
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