const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  editarProyecto,
  eliminarProyecto,
} = require('../controllers/proyectosController');

module.exports = function () {
  // ruta para el home
  router.get('/', proyectosHome);

  router.get('/nuevo-proyecto', formularioProyecto);

  router.post(
    '/nuevo-proyecto',
    body('nombre').notEmpty().trim().escape(),
    nuevoProyecto
  );
  // listar proyecto
  router.get('/proyectos/:url', proyectoPorUrl);

  // editar proyecto
  router.get('/proyecto/editar/:id', formularioEditar);

  router.post(
    '/nuevo-proyecto/:id',
    body('nombre').notEmpty().trim().escape(),
    editarProyecto
  );

  // eliminar un proyecto
  router.delete('/proyectos/:url', eliminarProyecto);

  return router;
};
