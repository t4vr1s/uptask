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

  if (!respuesta) return next();

  res.redirect(`/proyectos/${url}`);
};

exports.cambiarEstadoTarea = async (req, res = response) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({
    where: {
      id,
    },
  });

  let estado = false;
  if (tarea.estado === estado) {
    estado = true;
  }
  tarea.estado = estado;

  const resultado = await tarea.save();

  if (!resultado) next();

  res.send('actualizado');
};
