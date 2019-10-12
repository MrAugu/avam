const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../models/money.js");

module.exports = {
    name: 'beg',
	description: 'Beg bot for coins.',
    cooldown: 60000,
    aliases: [],
    cooldownReason: "I'm not that richt man.",
    module: "economy",
    guildOnly: true,
	async execute(client, message, args, reply) {
        const msg = await reply(`:think: Hmm...`);

        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            let chance = Math.floor(Math.random() * 100) + 1;

            if (chance < 50) {
                msg.edit("Nah, i don't give you any coins.");
            }

            if (chance > 50) {
                let newCoins = Math.floor(Math.random() * 4) + 1;
                money.coins = money.coins + newCoins;
                await money.save().catch(e => console.log(e));
                msg.edit(`Ok sure, have ${newCoins} coins.`);
            }
        });
    },
};
