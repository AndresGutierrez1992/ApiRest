
const exp = require("express");
const enrutador = require("./router")
const app = exp();


app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


app.use("/v1",enrutador)

app.listen(8888, function() {
    console.log("conectado")
});