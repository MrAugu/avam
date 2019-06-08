const figlet = require("figlet");
const Discord = require ("discord.js");

module.exports = {
    name: 'asciify',
	description: 'Turns text into a at-scale ascii drawing.',
    cooldown: 3000,
    aliases: [`ascii`],
    args: true,
    usage: "<text>",
	async execute(client, message, args, reply) {
        let maxLen = 12;
        if(args.join(' ').length > maxLen) return reply("<:uncheck:515840843933024256> Only 12 characters are admitted!");
        if(!args[0]) return reply("<:uncheck:515840843933024256> Please specify a test to asciify!");
 
        figlet(`${args.join(" ")}`, function(err, data) {
            if (err) {
                console.log("<:uncheck:515840843933024256> Something went wrong...");
                return;
            }
            message.channel.send(`${data}`, {code: 'AsciiArt'});
        });
    },
};