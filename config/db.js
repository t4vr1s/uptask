const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize(
  'rrsbadda_uptask-node',
  'rrsbadda_uptask',
  'Pt3u5hX{~{lS',
  {
    host: '192.141.168.162',
    dialect: 'mysql',
  }
);

module.exports = db;
