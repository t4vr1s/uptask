const { Router } = require('express');
const {
  autenticarUsuario,
  cerrarSesion,
} = require('../controllers/authController');
const {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
} = require('../controllers/usuariosController');
const router = Router();

router.get('/crear-cuenta', formCrearCuenta);

router.post('/crear-cuenta', crearCuenta);

router.get('/iniciar-sesion', formIniciarSesion);

router.post('/iniciar-sesion', autenticarUsuario);

router.get('/cerrar-sesion', cerrarSesion);

module.exports = router;
