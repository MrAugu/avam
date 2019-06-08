const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Error = require("../models/error.js");

module.exports = {
    name: 'error',
	description: 'Evaluated error codes and returns error objects.',
    cooldown: 3000,
    args: true,
    usage: "<error code>",
    aliases: ['err'],
	async execute(client, message, args, reply) {
        if(message.author.id !== "414764511489294347") return reply("<:uncheck:515840843933024256> You are not alloweed to use this.");

        let errID = args[0];
        if(!errID) return reply("<:uncheck:515840843933024256> Please specify an error code.");

        Error.findOne({
            errorID: errID 
        }, async (err, Err) => {
            if(err) console.log(err);
            if(!Err) return reply(`<:uncheck:515840843933024256> Couldn't find any error with id \`${errID}\`.`);

            let errEmbed = new Discord.RichEmbed()
                .setAuthor(`Error Found`, `https://cdn.discordapp.com/emojis/466296436238188544.png?v=1`)
                .setColor("BLURPLE")
                .addField("Error Code:", `\`\`\`\n${Err.errorID}\n\`\`\``)
                .addField("Command Path:", `\`\`\`ftp/public_html/Avam/commands/${Err.command}.js\`\`\``)
                .addField("Error:", `\`\`\`xl\n${Err.error}\n\`\`\``)
                .addField("Time:", `${Err.timestamp}`)
                .setTimestamp();
            reply(errEmbed);
        });
    },
};