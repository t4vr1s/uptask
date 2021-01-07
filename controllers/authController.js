const { request, response } = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize');
const { enviar } = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios',
});

// revisar si el usuario esta logeado
exports.usuarioAutenticado = (req = request, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/iniciar-sesion');
};

exports.cerrarSesion = (req = request, res) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'));
};

exports.enviarToken = async (req = request, res) => {
  const { email } = req.body;
  const usuario = await Usuarios.findOne({
    where: {
      email,
    },
  });

  if (!usuario) {
    req.flash('error', 'No existe esa cuenta');
    res.redirect('/reestablecer');
  }

  // creando token
  usuario.token = crypto.randomBytes(20).toString('hex');
  usuario.expiracion = Date.now() + 3600000;

  usuario.save();

  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

  // envia el correo con el token
  await enviar({
    usuario,
    subject: 'Password Reset',
    resetUrl,
    archivo: 'reestablecer-password',
  }).catch((err) => console.log(err));

  req.flash(
    'correcto',
    'te enviamos un correo con los pasos para cambiar la contraseña'
  );
  res.redirect('/iniciar-sesion');
};

exports.validarToken = async (req = request, res = response) => {
  const { token } = req.params;

  const usuario = await Usuarios.findOne({
    where: {
      token,
    },
  });

  if (!usuario) {
    req.flash('error', 'No válido');
    res.redirect('/reestablecer');
  }

  res.render('resetPassword', {
    nombrePagina: 'Reestablecer contraseña',
  });
};

exports.cambiarPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // verifica el token y la fecha de expiracion
  const usuario = await Usuarios.findOne({
    where: {
      token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash('error', 'No válido');
    res.redirect('/reestablecer');
  }

  usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;

  await usuario.save();

  req.flash('correcto', 'La contraseña se ha actualizado');
  res.redirect('/iniciar-sesion');
};
