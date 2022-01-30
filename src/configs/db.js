const Sequelize = require('sequelize');

module.exports = sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const VCRole = require('../models/VCRole.js')(sequelize, Sequelize.DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    VCRole.sync()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });