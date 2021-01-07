const { response, request } = require('express');
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {
  const usuarioId = req.user.id;

  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  res.render('index', {
    nombrePagina: 'Proyectos',
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const usuarioId = req.user.id;

  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
    proyectos,
  });
};

exports.nuevoProyecto = async (req = request, res = response) => {
  const usuarioId = req.user.id;

  const proyectos = await Proyectos.findAll({ where: { usuarioId } });
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
    await Proyectos.create({ nombre, usuarioId });

    res.redirect('/');
  }
};

exports.proyectoPorUrl = async (req = request, res = response, next) => {
  const usuarioId = req.user.id;

  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

  const { url } = req.params;
  const proyectoPromise = Proyectos.findOne({
    where: {
      url,
      usuarioId,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  const tareas = await Tareas.findAll({
    where: {
      proyectoId: proyecto.id,
    },
    // include: [{ model: Proyectos }],
  });

  if (!proyecto) {
    return next();
  }

  // render a la vista
  res.render('tareas', {
    nombrePagina: 'Tareas del Proyecto',
    proyecto,
    proyectos,
    tareas,
  });
};

exports.formularioEditar = async (req, res = response) => {
  const usuarioId = req.user.id;

  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

  const { id } = req.params;
  const proyectoPromise = Proyectos.findOne({
    where: {
      id,
      usuarioId,
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
  const usuarioId = req.user.id;

  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

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

exports.eliminarProyecto = async (req, res, next) => {
  const { urlProyecto } = req.query;
  const resultado = await Proyectos.destroy({
    where: {
      url: urlProyecto,
    },
  });

  if (!resultado) {
    next();
  }

  res.send('Tu proyecto fue eliminado.');
};
