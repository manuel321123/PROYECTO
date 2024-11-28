var fechaHora=()=>{
    let ahora = new Date();
    let año = ahora.getFullYear();
    let mes = ahora.getMonth() + 1; // Los meses empiezan desde 0
    let día = ahora.getDate();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    var date={
        fecha:`${día}/${mes}/${año}`,
        hora: `${horas}:${minutos}:${segundos}`
    }
    console.log(`Fecha: ${día}/${mes}/${año}`);
    console.log(`Hora: ${horas}:${minutos}:${segundos}`);
    return date;
}

module.exports = {
    fechaHora
}