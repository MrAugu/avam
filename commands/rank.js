const Discord = require("discord.js");
const mongoose = require("mongoose");
const Levels = require("../models/levels.js");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports = {
    name: 'rank',
	description: 'Check for yours or somebody else\'s xp in current server.',
    cooldown: 3000,
    aliases: ['xp'],
    module: "levels",
    guildOnly: true,
    async execute(client, message, args, reply) {
        let target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        if(target.user.bot) return reply(`<:uncheck:515840843933024256> Seems like **${target.user.username}** is a bot.`);
        if(target.user.avatarURL === null) target.user.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
        let embed = new Discord.RichEmbed()
            .setAuthor(target.user.tag, target.user.avatarURL)
            .setColor("GREEN")
            .setTimestamp();
    
    
        Levels.findOne({
            userID: target.user.id,
            serverID: message.guild.id
        }, async (err, user) => {
            if(!user) embed.setDescription("Type more to earn XP and level up.");
            if(user) embed.setDescription(`
    - **Level**: ${user.level.toLocaleString()}/100
    - **Xp**: ${user.xp.toLocaleString()}/999,999
            `)
    
            reply(embed);
        });
    },
};