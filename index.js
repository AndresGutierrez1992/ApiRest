
const exp = require("express");
const enrutador = require("./router")
const app = exp();
app.set("view engine", "ejs")
const path = require("path")
app.set("views", path.join(__dirname,"./views/"))

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


app.use("/v1",enrutador)

app.get("/v1/productos", (req, res) => {
    const productos = req.productos;
   
    if (!productos) {
        return res.status(500).send("No se encontraron productos");
    }
    
    res.render("pages/index", { productos });
});

app.listen(9090, function() {
    console.log("conectado")
});