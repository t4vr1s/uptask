const express = require('express');
const router = express.Router();
const { proyectosHome } = require('../controllers/proyectosController');

module.exports = function () {
  router.get('/', proyectosHome);
  router.get('/nosotros', (req, res) => {});
  return router;
};
