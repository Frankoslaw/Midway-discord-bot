const Sequelize = require('sequelize');
const sequelize = require('../configs/db.js')

const VCRole = require('../models/VCRole.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
		if (oldState.member.user.bot) return;

        if(newState.channelId !== null){
            const VCRoleElement = await VCRole.findOne({
                where: {
                    server_id: newState.guild.id,
                    voice_channel_id: newState.channelId
                },
                attributes: ['role_id']
            });

            if(VCRoleElement){
                const role = newState.guild.roles.cache.find(role => role.id == VCRoleElement.role_id);

                newState.member.roles.add(role)
            }
        }
        
        if(oldState.channelId !== null){
            const VCRoleElement = await VCRole.findOne({
                where: {
                    server_id: oldState.guild.id,
                    voice_channel_id: oldState.channelId
                },
                attributes: ['role_id']
            });

            if(VCRoleElement){
                const role = oldState.guild.roles.cache.find(role => role.id == VCRoleElement.role_id);

                newState.member.roles.remove(role)
            }
        }
	},
};

//927327775847755826