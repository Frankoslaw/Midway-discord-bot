//https://discord.com/api/oauth2/authorize?client_id=937002489058844682&permissions=536870907383&scope=bot

const { token } = require('./configs/config.js');

const CommandHandler = require('./handlers/Command.js');
const EventHandler = require('./handlers/Event.js');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

CommandHandler(client);
EventHandler(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);