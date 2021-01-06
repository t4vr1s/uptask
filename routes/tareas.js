const express = require('express');
const { usuarioAutenticado } = require('../controllers/authController');
const router = express.Router();
const {
  crearTarea,
  cambiarEstadoTarea,
  eliminarTarea,
} = require('../controllers/tareasController');

router.post('/proyectos/:url', usuarioAutenticado, crearTarea);

router.patch('/tareas/:id', usuarioAutenticado, cambiarEstadoTarea);

router.delete('/tareas/:id', usuarioAutenticado, eliminarTarea);

module.exports = router;
