const { request } = require('express');
const passport = require('passport');

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
