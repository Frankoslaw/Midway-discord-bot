const Sequelize = require('sequelize');

const sequelize = require('../src/configs/db.js')

require('../src/models/VCRole.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log('Database synced');
}).catch(console.error);