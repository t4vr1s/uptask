const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');
const { response } = require('express');

exports.crearTarea = async (req, res = response, next) => {
  const { url } = req.params;
  const { tarea } = req.body;
  const estado = false;

  const proyecto = await Proyectos.findOne({
    where: {
      url,
    },
  });

  const { id } = proyecto;
  const respuesta = await Tareas.create({
    nombre: tarea,
    estado,
    proyectoId: id,
  });

  if (!respuesta) {
    return next();
  }

  res.redirect(`/proyectos/${url}`);
};
