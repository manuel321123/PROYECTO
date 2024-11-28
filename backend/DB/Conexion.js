const admin=require("firebase-admin");
const keys=require("../keys.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)
});
const db=admin.firestore();
const usuariosDB=db.collection("ejemploBD");
const productoDB=db.collection("productos");
const ventaDB=db.collection("ventas");

module.exports = {
    usuariosDB,
    productoDB,
    ventaDB
}

//console.log(usuariosDB);