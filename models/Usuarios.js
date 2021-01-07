const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt');

const Usuarios = db.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Agrega un correo electrónico válido',
        },
        notEmpty: {
          msg: 'El email no puede ir vacio',
        },
      },
      unique: {
        args: true,
        msg: 'Usuario ya registrado',
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El password no puede ir vacio',
        },
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: DataTypes.STRING,
    expiracion: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate(usuario) {
        const { password } = usuario;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        usuario.password = bcrypt.hashSync(password, salt);
      },
    },
  }
);

Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
