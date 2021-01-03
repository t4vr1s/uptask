const colors = require('colors');
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

// crear la conexion a la db
const db = require('./config/db');

// importar el modelo para sincronizar a la db
require('./models/Proyectos');

db.sync()
  .then(() => console.log('conectado...'))
  .catch((error) => console.log(error));

// directorio publico
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// habilitar lectura de formularios
app.use(express.urlencoded({ extended: true }));

// añadir las rutas
app.use('/', routes());

app.listen(3000, () => {
  console.log('Escuchando en el puerto 3000'.green);
});
