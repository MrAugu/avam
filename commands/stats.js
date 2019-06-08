const Discord = require("discord.js");

module.exports = {
    name: 'stats',
    description: 'Get statistics about  bot.',
    cooldown: 3000,
    aliases: ['botinfo','statistics'],
    async execute(client, message, args, reply) {
      if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
      let totalSeconds = (client.uptime / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    
      let users = 0;
      client.guilds.map(g => users += g.memberCount);

      const statsEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`
    <:jarrow:466297496533073920> Guild Count: ${client.guilds.size.toLocaleString()}
    <:jarrow:466297496533073920> Channel Count: ${client.channels.size.toLocaleString()}
    <:jarrow:466297496533073920> User Count: ${users}
    <:jarrow:466297496533073920> <:discordjs:471255289224757248> Discord.js: v11.4.2
    <:jarrow:466297496533073920> <:nodeJS:471255243737530369> Node: v10.8.0
    <:jarrow:466297496533073920> Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
    <:jarrow:466297496533073920> Uptime: ${uptime}
    <:jarrow:466297496533073920> Owner: MrAugu#9016`)
        .setColor("BLURPLE")
        .setTimestamp();
      reply(statsEmbed);
    },
};