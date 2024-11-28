class Producto{
    constructor(data){
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio
    }
    set id(id){
        this._id = id;
    }
    set nombre(nombre){
        const nombreRegex=/^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(nombreRegex.test(nombre)){
            this._nombre = nombre;
        }else{console.error("Error:valor no encontrado - Nombre");}
    }
    set cantidad(cantidad){
        const cantidadRegex = /^[0-9]+(\.[0-9]+)?$/;
        if (cantidadRegex.test(cantidad)) {
            this._cantidad = cantidad;
        }else{console.error("Error:valor no encontrado - Cantidad");}
    }
    set precio(precio){
        const cantidadRegex = /^[0-9]+(\.[0-9]+)?$/;
        if(cantidadRegex.test(precio)){
            this._precio = precio;
        }else{console.error("Error:valor no encontrado - Precio");}
    }
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get cantidad(){
        return this._cantidad;
    }
    get precio(){
        return this._precio;
    }
    get datos(){
        if (this._id!=undefined) {
            return {
                id:this.id,
                nombre:this.nombre,
                cantidad:this.cantidad,
                precio:this.precio
            }    
        }else{
            return {
                nombre:this.nombre,
                cantidad:this.cantidad,
                precio:this.precio
            }
        }
    }
}
module.exports = Producto;
