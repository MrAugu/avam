const Discord = require("discord.js");

module.exports.run = async (client, guild) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL)
        .setDescription(`
Guild Name: ${guild.name}
Guild Member Count: ${guild.memberCount.toLocaleString()}
Guild Owner: ${guild.owner.user.tag}(ID: ${guild.ownerID})
Guild Created On: ${guild.createdAt}
Guild ID: ${guild.id}

Total Guilds: ${client.guilds.size.toLocaleString()}
        `)
        .setColor("GREEN")
        .setThumbnail(guild.iconURL)
        .setTimestamp();
    await client.user.setActivity(`${client.guilds.size} Servers | -help`, { type: "WATCHING" });
}
