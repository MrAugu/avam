const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports = {
    name: 'leaderboard',
	  description: 'Shows coin leaderboard for current server.',
    cooldown: 3000,
    aliases: ["lb"],
    guildOnly: true,
    module: "economy",
    async execute(client, message, args, reply) {
      Money.find({
        serverID: message.guild.id
      }).sort([
        ['coins', 'descending']
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
               lb.push(`**${i + 1}.** ${member} • <:aa:515884030508400641>${res[i].coins.toLocaleString()}`);
            } else {
               lb.push(`**${i + 1}.** ${member.user.tag} • <:aa:515884030508400641>${res[i].coins.toLocaleString()}`);
            }
          }
        } else {
          for (i = 0; i < 10; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
               lb.push(`**${i + 1}.** ${member} • <:aa:515884030508400641>${res[i].coins.toLocaleString()}`);
            } else {
               lb.push(`**${i + 1}.** ${member.user.tag} • <:aa:515884030508400641>${res[i].coins.toLocaleString()}`);
            }  
          }
        }

        if(lb.length > 0) {
          embed.setDescription(`${lb.join("\n")}`);
        }
    
        message.channel.send(embed);
      });
    },
};