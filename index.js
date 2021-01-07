const colors = require('colors');
const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config({ path: 'variables.env' });

// helper vardump
const { vardump } = require('./helpers/vardump');

// crear la conexion a la db
const db = require('./config/db');
db.sync()
  .then(() => console.log('conectado...'))
  .catch((error) => console.log(error));

// habilitar lectura de formularios
app.use(express.urlencoded({ extended: true }));

// directorio publico
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash mensajes
app.use(flash());

app.use(cookieParser());

// para navegar entre distintas paginas sin volver a autenticar
app.use(
  session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// pasar vardump a cualquier lugar de la aplicación
app.use((req, res, next) => {
  res.locals.vardump = vardump;
  res.locals.mensajes = req.flash();
  next();
});

// añadir las rutas
app.use(require('./routes/index'));

// servidor y puerto
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log('escuchando puerto: 3000'.green);
});
