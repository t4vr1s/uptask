const colors = require('colors');
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// añadir las rutas
app.use('/', routes());

app.listen(3000, () => {
  console.log('Escuchando en el puerto 3000'.green);
});
