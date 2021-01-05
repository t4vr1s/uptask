const express = require('express');
const router = express.Router();

router.use(require('./proyectos'));
router.use(require('./tareas'));
router.use(require('./usuarios'));

module.exports = router;
