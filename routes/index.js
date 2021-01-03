const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
} = require('../controllers/proyectosController');

module.exports = function () {
  router.get('/', proyectosHome);
  router.get('/nuevo-proyecto', formularioProyecto);
  router.post(
    '/nuevo-proyecto',
    body('nombre').notEmpty().trim().escape(),
    nuevoProyecto
  );
  return router;
};
