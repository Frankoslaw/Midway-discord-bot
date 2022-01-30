const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removevcrole')
		.setDescription('Remove VC channel role!')
        .addChannelOption(option => option.
            setName('channel')
            .setDescription('Chanell')
            .setRequired(true)),
	async execute(interaction) {
		await interaction.reply('df!');
	},
    cooldown: 0,
    guildOnly: true,
    ephemeral: false
};