const { Router } = require('express');
const router = Router();

const {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
  formReestablecerPassword,
  confirmarCuenta,
} = require('../controllers/usuariosController');

router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta', crearCuenta);
router.get('/confirmar/:correo', confirmarCuenta);

router.get('/iniciar-sesion', formIniciarSesion);

router.get('/reestablecer', formReestablecerPassword);

module.exports = router;
