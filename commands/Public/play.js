const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, voiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Fai partire una canzone")
        .addStringOption(option => 
            option.setName("query")
                .setDescription("Nome o Link del video")
                .setRequired(true)
            ),
    
    async execute(interaction) {
        const {options, member, guild, channel} = interaction;

        const query = options.getString("query");

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel) {
            embed.setColor("Red").setDescription("⛔ | Devi essere in un canale vocale per usare il bot");
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    
        try {
            client.distube.play(voiceChannel, query, {textChannel: channel, member: member})
            return interaction.reply({content: "Ricevuto."})
        } catch (err) {
            console.log(err);
            embed.setColor("Red").setDescription(`⛔ | Errore`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}
