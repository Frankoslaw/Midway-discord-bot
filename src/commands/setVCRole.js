const { SlashCommandBuilder } = require('@discordjs/builders');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: '../../database.sqlite',
});

const VCRole = require('../models/VCRole.js')(sequelize, Sequelize.DataTypes);
VCRole.sync()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setvcrole')
		.setDescription('Set VC channel role!')
        .addChannelOption(option => option.
            setName('channel')
            .setDescription('Chanell')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Role')
            .setRequired(true)),
	async execute(interaction) {
        try {
            await VCRole.create({
                server_id: interaction.guild.id,
                voice_channel_id: interaction.options.getChannel('channel').id,
                role_id: interaction.options.getRole('role').id
            });
        
            return interaction.reply(`VCRole ${interaction.options.getChannel('channel').toString()}:${interaction.options.getRole('role').toString()} added.`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That VCRole already exists.');
            }
    
            console.log(e)
            return interaction.reply('Something went wrong with adding a tag.');
        }
	},
    cooldown: 0,
    guildOnly: true,
    ephemeral: false
};