const express = require('express');
const router = express.Router();
const { crearTarea } = require('../controllers/tareasController');

router.post('/proyectos/:url', crearTarea);

module.exports = router;
