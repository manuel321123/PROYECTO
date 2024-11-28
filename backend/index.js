const express = require("express");
const cors = require("cors");
const session = require("express-session");
require('dotenv').config();
const app = express();
const usuariosRutas = require("./routes/RutasUsuarios");
const productosRutas = require("./routes/rutasProducto");
const RutasVentas = require("./routes/RutasVentas");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(
    {
        name: 'session',
        secret: process.env.KEYS,
        resave : false,
        saveUninitialized: true,
        maxAge: 1000*60*60*24,
    }
));
app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/", RutasVentas);

const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en https://localhost:"+port);
});
