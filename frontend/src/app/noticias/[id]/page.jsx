import Link from 'next/link';
export default async function Noticia(params) {
    var url = await fetch(`http://universities.hipolabs.com/search?country=Mexico/${params.name}`);
    if(url.ok) {
        const universidad = await url.json();
        return (
            <div>
                <h1>Noticias</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Universidad</th>
                            <th>Web</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link href={`/noticias/${universidad.name}`}>{universidad.name}</Link>
                            </td>
                            <td>
                                <Link href={`${universidad.web_pages}`}>{universidad.web_pages}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }else{
        return (<p>Noticia no encontrada</p>);
    }
}