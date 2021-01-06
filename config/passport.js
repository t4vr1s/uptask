const passport = require('passport');
const { Strategy } = require('passport-local');

// referencia al modelo donde se va a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - login con credenciales propios
passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: { email },
        });

        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: 'Password incorrecto',
          });
        }

        return done(null, usuario);
      } catch (error) {
        return done(null, false, {
          message: 'La cuenta no existe',
        });
      }
    }
  )
);

passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
