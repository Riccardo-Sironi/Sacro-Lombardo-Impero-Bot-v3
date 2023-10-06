const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, voiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Cambia il volume")
        .addIntegerOption(option => 
            option.setName("percentuale")
                .setDescription("10 = 10%")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
            ),
    
    async execute(interaction) {
        const {options, member, guild, channel} = interaction;

        const volume = options.getInteger("percentuale");

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();
        if(!voiceChannel) {
            embed.setColor("Red").setDescription("⛔ | Devi essere in un canale vocale per usare il bot");
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        try {
            client.distube.setVolume(voiceChannel, volume)
            return interaction.reply({content: `Il volume è stato impostato al ${volume}%`})
        } catch (err) {
            console.log(err);
            embed.setColor("Red").setDescription(`⛔ | Errore`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}