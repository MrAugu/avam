const Discord = require ("discord.js");

module.exports = {
    name: 'invite',
	  description: 'Shows you information about bot.',
    cooldown: 3000,
    aliases: ["upvote","support"],
    async execute(client, message, args, reply) {
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`Invite Avam: https://discordapp.com/oauth2/authorize?client_id=${client.id}&permissions=2084036081&scope=bot now.\n* The link above contain permission that allow bot to work. Feel free to uncheck any of them if you want.`)
      .setColor("BLURPLE")
      .setTimestamp();
    reply(embed);
    },
};
