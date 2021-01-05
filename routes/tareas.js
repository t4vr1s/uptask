const express = require('express');
const router = express.Router();
const {
  crearTarea,
  cambiarEstadoTarea,
  eliminarTarea,
} = require('../controllers/tareasController');

router.post('/proyectos/:url', crearTarea);

router.patch('/tareas/:id', cambiarEstadoTarea);

router.delete('/tareas/:id', eliminarTarea);

module.exports = router;
