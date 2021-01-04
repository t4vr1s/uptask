const { Sequelize, DataTypes } = require('sequelize');
const shortid = require('shortid');
const slug = require('slug');
const db = require('../config/db');

const Proyectos = db.define(
  'proyectos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(80),
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate(proyecto) {
        const newUrl = slug(proyecto.nombre).toLowerCase();
        // const newUrl = `${slug(nombre).toLowerCase()}-${new Date().getMilliseconds()}`;
        proyecto.url = `${newUrl}-${shortid.generate()}`;
      },
    },
  }
);

module.exports = Proyectos;
