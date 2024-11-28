class Venta{
    constructor(data) {
        this.id=data.id;
        this.idUsuario=data.idUsuario;
        this.idProducto=data.idProducto;
        this.cantidad=data.cantidad;
        this.total=data.total;
        this.fecha=data.fecha;
        this.estatus=data.estatus;
    }
    set id(id) {
        this._id=id;
    }
    set idUsuario(idUsuario) {
        this._idUsuario=idUsuario;
    }
    set idProducto(idProducto) {
        this._idProducto=idProducto;
    }
    set fecha(fecha) {
        this._fecha=fecha;
    }
    set estatus(estatus) {
        this._estatus=estatus;
    }
    set cantidad(cantidad) {
        this._cantidad=cantidad;
    }
    set total(total) {
        this._total=total;
    }

    get id() {
        return this._id;
    }
    get idUsuario() {
        return this._idUsuario;
    }
    get idProducto() {
        return this._idProducto;
    }
    get fecha() {
        return this._fecha;
    }
    get estatus() {
        return this._estatus;
    }
    get cantidad() {
        return this._cantidad;
    }
    get total() {
        return this._total;
    }
    get datos() {
        if(this._id!=undefined) {
            return {
                id: this.id,
                idUsuario:this.idUsuario,
                idProducto:this.idProducto,
                cantidad:this.cantidad,
                total:this.total,
                fecha:this.fecha,
                estatus:this.estatus
            }
        }else{
            return {
                idUsuario:this.idUsuario,
                idProducto:this.idProducto,
                total:this.total,
                cantidad:this.cantidad,
                fecha:this.fecha,
                estatus:this.estatus
            }
        }
    }
}

module.exports = Venta;