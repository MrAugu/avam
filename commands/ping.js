const Discord = require("discord.js");

module.exports = {
    name: 'ping',
	  description: 'Check latency of bot and discord.',
    cooldown: 3000,
    aliases: ['pong'],
    async execute(client, message, args, reply) {
      if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
      let m = await reply(`Working!`);
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`Pong!\n\n⏲ Took ${m.createdTimestamp - message.createdTimestamp}MS.\n\n💓 Heartbeat is ${Math.round(client.ping)}MS.`)
        .setColor("BLURPLE")
        .setTimestamp();
      m.edit(embed);
    },
};
