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
    await Proyectos.create({ nombre });

    res.redirect('/');
  }
};

exports.proyectoPorUrl = async (req = request, res = response, next) => {
  const proyectosPromise = Proyectos.findAll();

  const { url } = req.params;
  const proyectoPromise = Proyectos.findOne({
    where: {
      url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

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

exports.formularioEditar = async (req, res = response) => {
  const proyectosPromise = Proyectos.findAll();

  const { id } = req.params;
  const proyectoPromise = Proyectos.findOne({
    where: {
      id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render('nuevoProyecto', {
    nombrePagina: 'Editar Proyecto',
    proyectos,
    proyecto,
  });
};

exports.editarProyecto = async (req, res) => {
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
    await Proyectos.update(
      {
        nombre,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.redirect('/');
  }
};
