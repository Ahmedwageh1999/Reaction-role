const { Discord, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommandOptionType, MembershipScreeningFieldType } = require("discord.js")
const Enmap = require("enmap")
const message = require("./message")
const db1 = new Enmap({
    name: 'ahmed',
    dataDir: './node_modules/enmap'

})
module.exports = {
    name: 'reactionrole',
    description: 'Say anything with the bot 😌',

    options: [
        {
            name: 'embed',
            description: 'Please choose a channel you want to send to it ',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'role',
            description: 'Write your words to send them in a simple message with the bot',
            type: ApplicationCommandOptionType.Role,
            required: true
        },
        {
            name: 'channel',
            description: 'Write your words to send them in a simple message with the bot',
            type: ApplicationCommandOptionType.Channel,
            required: true
        },



    ],



    run: async (client, interaction) => {

        const embed = interaction.options.getString("embed")
        const role = interaction.options.getRole("role")
        const channel = interaction.options.getChannel("channel")



        const emmb = new EmbedBuilder()
            .setDescription(`**${embed}**`)
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
        db1.ensure("Ahmed", {
            Role: []

        })


        db1.push("Ahmed", role, "Role")

        const ga = interaction.guild.channels.cache.get(`${channel}`)




        const uu = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("tet")
                    .setLabel("click here")
                    .setEmoji("👍")
                    .setStyle(ButtonStyle.Danger)
            )
        await interaction.deferReply({ fetchReply: true })
        const message = await interaction.editReply({ embeds: [emmb], components: [uu] })

        const collector = message.createMessageComponentCollector()
        collector.on("collect", async i => {
            if (i.customId === "tet") {

                await i.deferReply({ fetchReply: true, ephemeral: true, components: [] })
                await i.editReply({ content: `<@${interaction.user.id}> Done added` })

                if (db1.has("Ahmed", "Role")) {
                    if (!role) {
                        return;
                    }
                    const member = i.member
                    member.roles.add(role)

                }


                }
         





            


        })










    }
}