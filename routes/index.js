const express = require('express');
const router = express.Router();

router.use(require('./proyectos'));
router.use(require('./tareas'));
router.use(require('./usuarios'));
router.use(require('./auth'));

module.exports = router;
