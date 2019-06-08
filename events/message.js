const Discord = require("discord.js");
const config = require('../configuration.json');

const store = require("../utils/errors.js");
const prefix = config.prefix;
const pref = prefix.toLowerCase();
const cooldowns = new Discord.Collection();

const mongoose = require("mongoose");
let coinCooldown = new Set();
let xpCooldown = new Set();

const dbUrl = require("../configuration.json").dbURL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Module = require("../models/modules.js");
const Error = require("../models/error.js");
const Levels = require("../models/levels.js");
const Money = require("../models/money.js");

module.exports.run = async (client, message) => {
    const reply = c => message.channel.send(c);
    if (message.author.bot) return;
    
    const prefixHelp = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixHelp)) {
        return reply(`Hey, my prefix is \`${config.prefix}\`.`);
    }

/* Guild Channel */    if(message.channel.type === "text") {
        Module.findOne({
            guildID: message.guild.id
        }, async (err, s) => {
            if(!s) {
                const newServer = new Module({
                    guildID: message.guild.id,
                    levelModule: "off",
                    coinModule: "off"
                });
                await newServer.save().catch(e => console.log(e));
                return;
            }

            /*> Coins Module <*/

            if(s.coinModule === "on") {
                if(!coinCooldown.has(message.author.id)) {
                    let coinstoadd = Math.floor(Math.random() * 4) + 1;
                    Money.findOne({
                        userID: message.author.id, 
                        serverID: message.guild.id
                        }, async (err, money) => {
                            if(err) console.log(err);
                            if(!money) {
                                const newMoney = new Money({
                                    userID: message.author.id,
                                    serverID: message.guild.id,
                                    coins: coinstoadd
                                });
                                await newMoney.save().catch(e => console.log(e));
                            } else if(money) {
                                money.coins = money.coins + coinstoadd;
                                await money.save().catch(e => console.log(e));
                             }
                    });

                    await coinCooldown.add(message.author.id);
                    setTimeout(() => {
                        coinCooldown.delete(message.author.id)
                    }, 30000)
                }
            }

            /*> End of Coins Module <*/
            /*> Levels Module <*/

            if(s.levelModule === "on") {
                if(!xpCooldown.has(message.author.id)) {
                    Levels.findOne({
                        userID: message.author.id, 
                        serverID: message.guild.id
                    }, async (err, user) => {
                        if(!user) {
                            const newLevel = new Levels({
                                userID: message.author.id,
                                serverID: message.guild.id,
                                xp: 1,
                                level: 0
                            });
                            await newLevel.save().catch(e => console.log(e));
                        } else if(user) {
                            let newXP = Math.floor(Math.random() * 19) + 1;
                            user.xp = user.xp + newXP;
                            let curLvl = Math.floor(0.1 * Math.sqrt(user.xp));

                            if(user.level < curLvl) {
                                let rl = [];
                                reply(`${message.author}, Congrats! You just advanced to level ${curLvl}! 🎉`).catch(O_o=>{});
                                user.level = curLvl;
                            } 
                    
                            if(curLvl === 100 || curLvl > 100) {
                                user.xp = 999999;
                                user.level = 100;
                            }

                            await user.save().catch(e => console.log(e));

                        }
                    });

                    await xpCooldown.add(message.author.id);
                    setTimeout(() => {
                        xpCooldown.delete(message.author.id)
                    }, 10000);
                }
            }

            /*> End of Level Module <*/

            if(message.content.toLowerCase().indexOf(pref) !== 0) return;

            const args = message.content.slice(pref.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if(!command) return;

		if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return message.author.send(`<:uncheck:515840843933024256> The channel you are trying to access me on is locked for me. Please grant me proper permissions or use my commands in another channel.\n<:jarrow:466297496533073920> Server: \`${message.guild.name}\`\n<:jarrow:466297496533073920> Channel: \`${message.channel.name}\``);

            if(command.module) {
                if(command.module === "economy") {
                    if(s.coinModule === "off") return reply("<:uncheck:515840843933024256> Economy module is currently disabled for this server. Enable it with `-module enable economy`.");
                } else if(command.module === "levels") {
                    if(s.levelModule === "off") return reply("<:uncheck:515840843933024256> Levels module is currently disabled for this server. Enable it with `-module enable levels`.");
                }
            }
            

            if (command.args && !args.length) {
                const reply = `<:uncheck:515840843933024256> You didn't provide any arguments.`;
                let propper;
        
                if (command.usage) {
                propper = `Usage: \`${pref}${command.name} ${command.usage}\``;
                }

                return message.channel.send(`${reply}\n${propper}`);
            }

           if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = command.cooldown;

            if(message.author.id !== '414764511489294347') {
                if (!timestamps.has(message.author.id)) {
                    timestamps.set(message.author.id, now);
                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                } else {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                    if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if(command.cooldownReason) {
                        let t = `${timeLeft.toFixed(1)} seconds`;
                        return store.cooldown(message, reply, command.cooldown, command.cooldownReason);
                    } 
                        return reply(`<:uncheck:515840843933024256> Slow it down buddy. You have to wait ${timeLeft.toFixed(1)} more seconds before using \`${command.name}\` again.`);
                    }
            
                    timestamps.set(message.author.id, now);
                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                }
            } 
            try {
                await message.channel.startTyping();
	            if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";

	            let logEmbed = new Discord.RichEmbed()
	                .setColor("BLURPLE")
	                .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`🗒 \`${command.name}\` has been used.`);
	            client.channels.get(require("../configuration.json").commandMessageChannel).send(logEmbed);
                await command.execute(client, message, args, reply);
                await message.channel.stopTyping();
            } catch (err) {
                const errorCode = Date.now().toString(36);
                const newErr = new Error({
                    errorID: errorCode,
                    error: err,
                    command: command.name,
                    timestamp: message.createdAt
                });
                await newErr.save().catch(e => console.log(e));
                reply(`<:outage:466296436238188544> Internal error occured!\nError Code: \`${errorCode}\`\nPlease report this error to the developers. You can find them in the support server.\nSupport Sevrer: https://discord.gg/ZuRPrF2`);
            }

        });
/* DM Channels*/    } else if (message.channel.type === "dm") {
        const reply = c => message.channel.send(c);
        if (message.author.bot) return;
    
        const prefixHelp = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixHelp)) {
            return reply(`Hey, my prefix is \`${config.prefix}\`.`);
        }

        if (message.content.toLowerCase().indexOf(pref) !== 0) return;

        const args = message.content.slice(pref.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (command.guildOnly && message.channel.type !== 'text') {
            return reply('<:uncheck:515840843933024256> I can\'t execute this command inside of DMs!\n<:jarrow:466297496533073920> Invite It to Your Server: https://discordapp.com/oauth2/authorize?client_id=515899954229936138&permissions=2084036081&scope=bot\n<:jarrow:466297496533073920> Join Support Server: https://discord.gg/ZuRPrF2');
        }

        if (command.args && !args.length) {
            const reply = `<:uncheck:515840843933024256> You didn't provide any arguments.`;
            let propper;
    
            if (command.usage) {
            propper = `Usage: \`${pref}${command.name} ${command.usage}\``;
            }

            return message.channel.send(`${reply}\n${propper}`);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown;

        if(message.author.id !== '414764511489294347') {
            if (!timestamps.has(message.author.id)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            } else {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
                if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return reply(`<:uncheck:515840843933024256> Slow it down buddy. You have to wait ${timeLeft.toFixed(1)} more seconds before using \`${command.name}\` again.`);
                }
        
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        }

        try {
            await message.channel.startTyping();
	            if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";

	            let logEmbed = new Discord.RichEmbed()
	                .setColor("BLURPLE")
	                .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`🗒 \`${command.name}\` has been used.`);
	            client.channels.get(require("../configuration.json").commandMessageChannel).send(logEmbed);
                await command.execute(client, message, args, reply);
                await message.channel.stopTyping();
        } catch (err) {
            const errorCode = Date.now().toString(36);
                const newErr = new Error({
                    errorID: errorCode,
                    error: err,
                    command: command.name,
                    timestamp: message.createdAt
                });
                await newErr.save().catch(e => console.log(e));
                reply(`<:outage:466296436238188544> Internal error occured!\nError Code: \`${errorCode}\`\nPlease report this error to the developers. You can find them in the support server.\nSupport Sevrer: https://discord.gg/ZuRPrF2`);
        }

    }
};
