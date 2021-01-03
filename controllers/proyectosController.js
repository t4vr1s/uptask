const { response } = require('express');
const slug = require('slug');
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {
  res.render('index', { nombrePagina: 'Proyectos' });
};

exports.formularioProyecto = (req, res) => {
  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
  });
};

exports.nuevoProyecto = async (req, res = response) => {
  // validar datos en el input
  const { nombre } = req.body;

  let errores = [];
  if (!nombre) {
    errores.push({ texto: 'agrega un nombra al proyecto' });
  }

  if (errores.length > 0) {
    res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      errores,
    });
  } else {
    const proyecto = Proyectos.create({ nombre });
    res.redirect('/');
  }
};
