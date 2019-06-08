const Discord = require ("discord.js");

module.exports = {
    name: 'invite',
	  description: 'Shows you information about bot.',
    cooldown: 3000,
    aliases: ["upvote","support"],
    async execute(client, message, args, reply) {
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`<:jarrow:466297496533073920> Invite Avam: https://discordapp.com/oauth2/authorize?client_id=515899954229936138&permissions=2084036081&scope=bot now.\n* The link above contain permission that allow bot to work. Feel free to uncheck any of them if you want.\n<:jarrow:466297496533073920> Join Discord Server: https://discord.gg/ZuRPrF2\n<:jarrow:466297496533073920> Upvote Avam: https://discordbots.org/bot/515899954229936138`)
      .setColor("BLURPLE")
      .setTimestamp();
    reply(embed);
    },
};