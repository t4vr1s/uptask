const { response, request } = require('express');
const { enviar } = require('../handlers/email');
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

    // crear url de confirmacion
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    // crear objeto usuario
    const usuario = {
      email,
    };

    // enviar email
    await enviar({
      usuario,
      subject: 'Confirmar cuenta UpTask',
      confirmarUrl,
      archivo: 'confirmar-cuenta',
    }).catch((err) => console.log(err));

    // redirigir al usuario
    req.flash('correcto', 'Te enviamos un correo para que confirmes tu cuenta');
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

exports.formReestablecerPassword = (req, res) => {
  res.render('reestablecer', {
    nombrePagina: 'Reestablece tu contraseña',
  });
};

exports.confirmarCuenta = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      email: req.params.correo,
    },
  });

  if (!usuario) {
    req.flas('error', 'No válido');
    res.redirect('/crear-cuenta');
  }

  usuario.activo = true;
  usuario.save();

  req.flash('correcto', 'cuenta activada correctamente');
  res.redirect('/iniciar-sesion');
};
