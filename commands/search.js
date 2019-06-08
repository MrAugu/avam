const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../models/money.js");

module.exports = {
    name: 'search',
	description: 'Search far and wide for coins.',
    cooldown: 480000,
    aliases: [],
    module: "economy",
    guildOnly: true,
    cooldownReason: "There are already a few peoples searching for coins.",
    async execute(client, message, args, reply) {
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(err) console.log(err);

            const coinz = Math.floor(Math.random() * 79) + 1;
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: coinz
                });
                if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
                await newMoney.save().catch(e => console.log(e));
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`You searched far and wide and found <:aa:515884030508400641>${coinz}.`)
                    .setColor("BLURPLE")
                    .setTimestamp();
    
                reply(embed);
            }
    
            if(money) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`You searched far and wide and found <:aa:515884030508400641>${coinz}.`)
                    .setColor("BLURPLE")
                    .setTimestamp();
                money.coins = money.coins + coinz;
                await money.save().catch(e => console.log(e));
                reply(embed);
    
            }
        });
    },
};