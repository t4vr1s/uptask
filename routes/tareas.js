const express = require('express');
const router = express.Router();
const {
  crearTarea,
  cambiarEstadoTarea,
} = require('../controllers/tareasController');

router.post('/proyectos/:url', crearTarea);

router.patch('/tareas/:id', cambiarEstadoTarea);

module.exports = router;
