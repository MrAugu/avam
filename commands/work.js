const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Money = require("../models/money.js");

module.exports = {
    name: 'work',
    guildOnly: true,
    description: 'Work and earn coins.',
    cooldown: 420000,
    aliases: [],
    module: "economy",
    cooldownReason: "Nobody is hiring workers for now.",
    async execute(client, message, args, reply) {
        let earnedCoins = Math.floor(Math.random() * 69) + 1;
    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, async (err, money) => {
        if(err) console.log(err);
        if(!money) {
            const newMoney = new Money({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: earnedCoins
            });

            await newMoney.save().catch(e => console.log(e));
        } else if(money) {
            money.coins = money.coins + earnedCoins;
            await money.save().catch(e => console.log(e));
        }
    });

    let randomReplys = [
        `You walked dogs of your neighbors and earned ${earnedCoins} coins.`,
        `You worked as a car washer and earned ${earnedCoins} coins.`,
        `You worked as a pocket stealer and earned ${earnedCoins} coins.`
    ]

    reply(`${randomReplys.random()}`);
    },
};
