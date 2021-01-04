const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
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

  return router;
};
