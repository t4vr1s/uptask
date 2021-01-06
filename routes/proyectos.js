const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { usuarioAutenticado } = require('../controllers/authController');
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  editarProyecto,
  eliminarProyecto,
} = require('../controllers/proyectosController');

// ruta para el home
router.get('/', usuarioAutenticado, proyectosHome);

router.get('/nuevo-proyecto', usuarioAutenticado, formularioProyecto);

router.post(
  '/nuevo-proyecto',
  usuarioAutenticado,
  body('nombre').notEmpty().trim().escape(),
  nuevoProyecto
);
// listar proyecto
router.get('/proyectos/:url', usuarioAutenticado, proyectoPorUrl);

// editar proyecto
router.get('/proyecto/editar/:id', usuarioAutenticado, formularioEditar);

router.post(
  '/nuevo-proyecto/:id',
  usuarioAutenticado,
  body('nombre').notEmpty().trim().escape(),
  editarProyecto
);

// eliminar un proyecto
router.delete('/proyectos/:url', usuarioAutenticado, eliminarProyecto);

module.exports = router;
