const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../models/money.js");

module.exports = {
    name: 'bet',
	description: 'Bet coins. Double or nothing.',
    cooldown: 60000,
    aliases: [],
    args: true,
    guildOnly: true,
    cooldownReason: "I'm not a betting machine, k?",
    module: "economy",
    usage: "<ammount>",
	async execute(client, message, args, reply) {
        let bet = parseInt(args[0]);
        if(!bet || isNaN(bet)) return reply("<:uncheck:515840843933024256> Please specify a valid amount of coins(<:aa:515884030508400641>) to bet.");
        if(bet < 20) return reply("<:uncheck:515840843933024256> You have to bet more than <:aa:515884030508400641>20 at once.");

        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(!money) return reply("<:uncheck:515840843933024256> Seems like you don't any coins(<:aa:515884030508400641>) in this server.");
            if(money.coins < bet) return reply(`<:uncheck:515840843933024256> You can't bet <:aa:515884030508400641>${bet.toLocaleString()}. You only have <:aa:515884030508400641>${money.coins.toLocaleString()} in this server.`);
            if(bet > 200) return reply(`<:uncheck:515840843933024256> You can't bet <:aa:515884030508400641>${bet.toLocaleString()}. You can max bet <:aa:515884030508400641>200 at a time.`);
            const cm = await reply("Spinning Wheel...");

            let chance = Math.floor(Math.random() * 100) + 1;

            if(chance < 50) {
                money.coins = money.coins - bet;
                await money.save().catch(e => console.log(e));
                
                cm.edit(`Damn, you lost <:aa:515884030508400641>${bet}.`);
            }

            if(chance > 50) {
                money.coins = money.coins + bet;
                await money.save().catch(e => console.log(e));
                cm.edit(`Well played, you just won <:aa:515884030508400641>${bet}.`);
            }
        });
    },
};