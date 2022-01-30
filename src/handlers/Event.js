const fs = require(`fs`);
const ascii = require(`ascii-table`);

const table = new ascii().setHeading(`Event`, `Load Status`);

module.exports = (client) => {
    const eventFiles = fs.readdirSync(__dirname + '/../events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        try {
            const event = require(`../events/${file}`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            table.addRow(file, `✅`);
        } catch(e) {
            console.error(e);
            table.addRow(file, `❌ ->  Error when loading`);
        }
    }

    console.log(table.toString());
}