const {Client, ActivityType} = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`${client.user.username} is now online`);
        client.user.setActivity('un orfanotrofio bruciare', {type: ActivityType.Watching});

    }
}