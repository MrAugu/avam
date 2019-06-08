const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../models/money.js");

module.exports = {
    name: 'daily',
	description: 'Get your daily bonus.',
    cooldown: 86400000,
    aliases: [],
    guildOnly: true,
    cooldownReason: "This is called a **daily** bonus.",
    module: "economy",
	async execute(client, message, args, reply) {
        //let dailyCoins = Math.floor(Math.random() * 320) + 80;
        let dailyCoins = 250;

        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(err) console.log(err);
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: dailyCoins
                });

                await newMoney.save().catch(e => console.log(e));
            } else if(money) {
                money.coins = money.coins + dailyCoins;
                await money.save().catch(e => console.log(e));
            }
        });

        reply(`You got a daily bonus of <:aa:515884030508400641>${dailyCoins}!`);
    },
};