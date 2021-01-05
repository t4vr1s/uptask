const { DataTypes } = require('sequelize');
const Proyectos = require('./Proyectos');
const db = require('../config/db');

const Tareas = db.define('tareas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

// relacion pertenece a:
Tareas.belongsTo(Proyectos);

module.exports = Tareas;
