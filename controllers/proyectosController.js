const { response, request } = require('express');
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render('index', {
    nombrePagina: 'Proyectos',
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res = response) => {
  const proyectos = await Proyectos.findAll();

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
      proyectos,
    });
  } else {
    const proyecto = Proyectos.create({ nombre });

    res.redirect('/');
  }
};

exports.proyectoPorUrl = async (req = request, res = response, next) => {
  const proyectos = await Proyectos.findAll();

  const url = req.params.url;

  const proyecto = await Proyectos.findOne({
    where: {
      url,
    },
  });

  if (!proyecto) {
    return next();
  }

  // render a la vista
  res.render('tareas', {
    nombrePagina: 'Tareas del Proyecto',
    proyecto,
    proyectos,
  });
};
