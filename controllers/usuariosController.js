const { response, request } = require('express');
const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res = response) => {
  res.render('crearCuenta', {
    nombrePagina: 'Crear Cuenta en Uptask',
  });
};

exports.formIniciarSesion = (req, res = response) => {
  const { error } = res.locals.mensajes;
  res.render('iniciarSesion', {
    nombrePagina: 'Iniciar Sesión en Uptask',
    error,
  });
};

exports.crearCuenta = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    await Usuarios.create({
      email,
      password,
    });

    res.redirect('/iniciar-sesion');
  } catch (error) {
    req.flash(
      'error',
      error.errors.map((error) => error.message)
    );
    res.render('crearCuenta', {
      mensajes: req.flash(),
      nombrePagina: 'Crear Cuenta en Uptask',
      email,
      password,
    });
  }
};
