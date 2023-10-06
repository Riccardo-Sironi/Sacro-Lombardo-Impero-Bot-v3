const client = require("../../index.js");
const { EmbedBuilder } = require("discord.js");

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setDescription(`🎶 | Riproducendo \`${song.name}\` - \`${song.formattedDuration}\`\nRichista da: ${song.user
                    }\n${status(queue)}`)]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶 | Aggiunta ${song.name} - \`${song.formattedDuration}\` alla coda. Richiesta da ${song.user}`)]
            }
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶 | Aggiunta la playlist \`${playlist.name}\` (${playlist.songs.length
                        } pezzi) alla coda\n${status(queue)}`)]
            }
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`⛔ | Errore: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send({
        embeds: [new EmbedBuilder().setColor("Red")
            .setDescription('⛔ |Il canale vocale è vuoto! Me ne vado...')]
    }))
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription(`⛔ | Nessun risulato trovato per \`${query}\`!`)]
            })
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor("Green")
            .setDescription('🏁 | Finito!')]
    }))