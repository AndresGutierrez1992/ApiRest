
const exp = require("express");
const enrutador = require("./router")
const app = exp();
app.set("view engine", "ejs")
const path = require("path")
const session = require('express-session');
app.set("views", path.join(__dirname, "views")); // views está en frontend/views
app.use("/assets", exp.static(path.join(__dirname, "assets")));

const backup = require('../backend/config/backup');
const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
  console.log('Realizando Backup de la Base de datos');
  backup.backupDatabase();
});


app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(session({ 
    secret: 'tu_secreto', // cámbialo por uno más seguro
    resave: false,    
    saveUninitialized: true,    
    cookie: { secure: false } // true si usas HTTPS
}));

// Rutas

app.use("/v1",enrutador)


app.listen(9090, function() {
    console.log("http://localhost:9090/v1")
});