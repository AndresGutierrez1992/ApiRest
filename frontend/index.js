
const exp = require("express");
const enrutador = require("./router")
const app = exp();
app.set("view engine", "ejs")
const path = require("path")
app.set("views", path.join(__dirname, "views")); // views está en frontend/views
app.use("/assets", exp.static(path.join(__dirname, "assets")));


app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


const methodOverride = require('method-override');
app.use(methodOverride('_method'));



app.use("/v1",enrutador)


app.listen(9090, function() {
    console.log("conectado")
});