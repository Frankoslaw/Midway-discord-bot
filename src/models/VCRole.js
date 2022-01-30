module.exports = (sequelize, DataTypes) => {
	return sequelize.define('VCRole', {
		server_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		voice_channel_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        role_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
		indexes:[
			{
				unique: false,
				fields:['server_id', 'voice_channel_id']
			}
		]
	});
};