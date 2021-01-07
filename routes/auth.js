const { Router } = require('express');
const router = Router();
const {
  autenticarUsuario,
  cerrarSesion,
  enviarToken,
  validarToken,
  cambiarPassword,
} = require('../controllers/authController');

router.post('/iniciar-sesion', autenticarUsuario);
router.get('/cerrar-sesion', cerrarSesion);
router.post('/reestablecer', enviarToken);
router.get('/reestablecer/:token', validarToken);
router.post('/reestablecer/:token', cambiarPassword);

module.exports = router;
