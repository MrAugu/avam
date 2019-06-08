const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Levels = require("../models/levels.js");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports = {
    name: 'levels',
	  description: 'Shows XP leaderboard of the server.',
    cooldown: 3000,
    guildOnly: true,
    aliases: [],
    module: "levels",
    async execute(client, message, args, reply) {
      Levels.find({
        serverID: message.guild.id
      }).sort([
        ['xp', 'descending']
      ]).exec((err, res) => {
        if (err) console.log(err);
    
        let lb = [];

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} Leaderboard`, `https://mraugu.ga/avam_assets/banks.png`)
        .setColor("BLURPLE")
        .setTimestamp();
      
        if (res.length === 0) {
          embed.addField("No data found.", "Please type in chat to gain coins!")
        } else if (res.length < 10) {
          //less than 10 results
          for (i = 0; i < res.length; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
              lb.push(`**${i + 1}.** ${member}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            } else {
              lb.push(`**${i + 1}.** ${member.user.tag}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            }
          }
        } else {
          for (i = 0; i < 10; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
              lb.push(`**${i + 1}.** ${member}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            } else {
              lb.push(`**${i + 1}.** ${member.user.tag}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            }  
          }
        }

        if(lb.length > 0) {
          embed.setDescription(`${lb.join("\n\n")}`);
        }
    
        message.channel.send(embed);
      });
    },
};