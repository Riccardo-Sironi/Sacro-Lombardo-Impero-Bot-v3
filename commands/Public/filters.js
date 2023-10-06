const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, voiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("filters")
        .setDescription("Filtri: ")
        .addStringOption(option => 
            option.setName("options")
            .setDescription("Filtri: ")
                .addChoices(
                    {name: "clear", value: "clear"},
                    {name: "3d", value: "3d"},
                    {name: "bass boost", value: "bassboost"},
                    {name: "echo", value: "echo"},
                    {name: "karaoke", value: "karaoke"},
                    {name: "nightcore", value: "nightcore"},
                    {name: "vaporwave", value: "vaporwave"},
                    {name: "flanger", value: "flanger"},
                    {name: "gate", value: "gate"},
                    {name: "haas", value: "haas"},
                    {name: "reverse", value: "reverse"},
                    {name: "surround", value: "surround"},
                    {name: "mcompand", value: "mcompand"},
                    {name: "phaser", value: "phaser"},
                    {name: "tremolo", value: "tremolo"},
                    {name: "earwax", value: "earwax"},
                )
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const {options, member, guild} = interaction;
        const option = options.getString("options"); 

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
            if(option == "clear") {
                queue.filters.clear();
            } else {
            queue.filters.add(option);
            }
            embed.setColor("Aqua").setDescription(`Impostato il filtro: \`${option}\`.`);
            return interaction.reply({embeds: [embed], ephemeral: true});
            
        } catch (err) {
            console.log(err);
            embed.setColor("Red").setDescription(`⛔ | Errore`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}