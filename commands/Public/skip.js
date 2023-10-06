const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, voiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Salta il pezzo in riproduzione"),
    
    async execute(interaction) {
        const {options, member, guild} = interaction;

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel) {
            embed.setColor("Red").setDescription("⛔ | Devi essere in un canale vocale per usare il bot");
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
        if(!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`⛔ | Non puoi usare il bot, sta già venendo usato in: <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        try {
            const queue = await client.distube.getQueue(voiceChannel);
            
            if(!queue) {
                embed.setColor("Red").setDescription(`⛔ | Non c'è niente nella coda`);
                return interaction.reply({embeds: [embed], ephemeral: true});
            } 

            await queue.skip(voiceChannel);
            embed.setColor("Green").setDescription(`Skippato`);
            return interaction.reply({embeds: [embed], ephemeral: true});
            
        } catch (err) {
            console.log(err);
            embed.setColor("Red").setDescription(`⛔ | Errore`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}