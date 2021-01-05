const express = require('express');
const router = express.Router();

router.use(require('./proyectos'));
router.use(require('./tareas'));

module.exports = router;
