const Discord = require("discord.js");

module.exports.run = async (client, guild) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(guild.owner.user.tag, guild.owner.user.avatarURL)
        .setDescription(`
<:jarrow:466297496533073920> Guild Name: ${guild.name}
<:jarrow:466297496533073920> Guild Member Count: ${guild.memberCount.toLocaleString()}
<:jarrow:466297496533073920> Guild Owner: ${guild.owner.user.tag}(ID: ${guild.ownerID})
<:jarrow:466297496533073920> Guild Created On: ${guild.createdAt}
<:jarrow:466297496533073920> Guild ID: ${guild.id}

<:jarrow:466297496533073920> Total Guilds: ${client.guilds.size.toLocaleString()}
        `)
        .setColor("RED")
        .setThumbnail(guild.iconURL)
        .setTimestamp();
    await client.user.setActivity(`${client.guilds.size} Servers | -help`, { type: "WATCHING" }); client.channels.get("515964749595541524").send(embed);
}
