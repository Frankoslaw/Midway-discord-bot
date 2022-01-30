const { SlashCommandBuilder } = require('@discordjs/builders');

const Sequelize = require('sequelize');
const sequelize = require('../configs/db.js')

const VCRole = require('../models/VCRole.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removevcrole')
		.setDescription('Remove VC channel role!')
        .addChannelOption(option => option.
            setName('channel')
            .setDescription('Chanell')
            .setRequired(true)),
	async execute(interaction) {
        const voiceChannelId = interaction.options.getChannel('channel').id;

        const rowCount = await VCRole.destroy({ where: { voice_channel_id: voiceChannelId } });

        if (!rowCount) return interaction.reply('That VCRole did not exist.');

        return interaction.reply('VCRole deleted.');
    },
    cooldown: 0,
    guildOnly: true,
    ephemeral: false
};