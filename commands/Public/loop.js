const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, voiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Riprendi la riproduzione")
        .addStringOption(option => 
            option.setName("options")
            .setDescription("Opzioni: ")
                .addChoices(
                    {name: "Off", value: "off"},
                    {name: "Canzone in loop", value: "song"},
                    {name: "Coda in loop", value: "queue"},
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

            let mode = null;

            switch(option) {
                case "off":
                    mode=0;
                    break;
                case "song":
                    mode=1;
                    break;
                case "queue":
                    mode=2;
                    break;
            }

            mode = await queue.setRepeatMode(mode);

            mode = mode ? (mode === 2? "Repeat queue" : "Repeat song") : "Off";
            embed.setColor("Orange").setDescription(`Impostato la modalità ripetizione in \`${mode}\`.`);
            return interaction.reply({embeds: [embed], ephemeral: true});
            
        } catch (err) {
            console.log(err);
            embed.setColor("Red").setDescription(`⛔ | Errore`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}