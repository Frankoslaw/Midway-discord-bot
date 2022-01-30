module.exports = (sequelize, DataTypes) => {
	return sequelize.define('VCRole', {
		server_id: {
			type: DataTypes.STRING,
			primaryKey: true,
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
	});
};