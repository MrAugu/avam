const Discord = require("discord.js");

module.exports = {
    name: 'uptime',
    description: 'Shows how long bot has been online for.',
    cooldown: 3000,
    aliases: [],
    async execute(client, message, args, reply) {
        let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
    let uptimeEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`I have been online for ${uptime}.`)
        .setColor("BLURPLE")
        .setTimestamp();

    reply(uptimeEmbed);
    },
};
