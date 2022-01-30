const fs = require(`fs`);
const ascii = require(`ascii-table`);

const { token, botId } = require(`../configs/config.js`);

const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const table = new ascii().setHeading(`Command`, `Load Status`);
const rest = new REST({ version: '9' }).setToken(token);
const cooldowns = new Collection();


module.exports = (client) => {
    client.commands = new Collection();
    const commands = [];

    const commandFiles = fs
        .readdirSync(__dirname + `/../commands`)
        .filter((file) => file.endsWith(`.js`));

    for (const file of commandFiles) {
        try {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON())
            table.addRow(file, `✅`);
        } catch(e){
            console.error(e);
            table.addRow(file, `❌ ->  Error when loading`);
        }
    }

    
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(botId),
                { body: commands },
            );
        } catch (error) {
          console.error(error);
        }
    })();

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return  interaction.reply({ content: `Command does not exist`, ephemeral: true })

        if (command.guildOnly && !interaction.inGuild()) {
            return interaction.reply({ content: `I cannot execute this command in private message!`, ephemeral: true })
        }
    
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime =
                timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return await interaction.reply({ content: `Wait another minute: ${timeLeft.toFixed(1)} second (s) before using the command ${command.data.name} again.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    console.log(table.toString());
}