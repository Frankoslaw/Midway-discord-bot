const { SlashCommandBuilder } = require('@discordjs/builders');

const Sequelize = require('sequelize');
const sequelize = require('../configs/db.js')

const VCRole = require('../models/VCRole.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listvcrole')
		.setDescription('List VC channel roles!'),
	async execute(interaction) {
		try {
            const VCRoleList = await VCRole.findAll({
                where: {
                    server_id: interaction.guild.id
                },
                attributes: ['voice_channel_id', 'role_id']
            });

            const VCRoleString = VCRoleList.map(t => `<#${t.voice_channel_id}> : <@&${t.role_id}>`).join(', \n') || 'No VCRoles set.';
        
            return interaction.reply(`List of VCRoles: ${VCRoleString}`);
        } catch (e) {
            console.log(e)
            return interaction.reply('Something went wrong with adding a VCRole.');
        }
	},
    cooldown: 0,
    guildOnly: true,
    ephemeral: false
};