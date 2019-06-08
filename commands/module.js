const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Module = require("../models/modules.js");

module.exports = {
    name: 'module',
	  description: 'Change settings for modules in your server.',
    cooldown: 3000,
    args: true,
    guildOnly: true,
    usage: "<show/disable/enable> <economy/levels>",
    aliases: ['modules'],
    async execute(client, message, args, reply) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return reply("<:uncheck:515840843933024256> You are not alloweed to use this.");
    
        let option = args[0];
        let pModule = args[1];
    
        Module.findOne({
            guildID: message.guild.id
        }, async (err, s) => {
    if(option.toLowerCase() === "show") {
    if(!s) s = "string";
                if(!s) s.levelModule = "off";
                if(!s) s.coinModule = "off";
    
                let showEmbed = new Discord.RichEmbed()
                    .setAuthor(`${message.guild.name} Module Settings`)
                    .setDescription(`
    <:jarrow:466297496533073920> Economy Module: ${s.coinModule.toUpperCase()}
    <:jarrow:466297496533073920> Levels Module: ${s.levelModule.toUpperCase()}
    
    ℹ To change settings use \`-module <show/enable/disable> <economy/levels>\`.
                    `)
                    .setColor("BLURPLE")
                    .setTimestamp();
                return reply(showEmbed);
    } else if(option.toLowerCase() === "enable") {
            if(pModule === "economy") {
                if(!s) {
                    const newServer = new Module({
                        guildID: message.guild.id,
                        levelModule: "off",
                        coinModule: "on"
                    });
                    await newServer.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully enabled economy module.`);
                } else if(s) {
                    s.coinModule = "on";
                    await s.save().catch(e => console.log(e))
                    return reply(`<:check:515850786962669571> Succefully enabled economy module.`);
                }
            } else if(pModule === "levels") {
                if(!s) {
                    const newServer = new Module({
                        guildID: message.guild.id,
                        levelModule: "on",
                        coinModule: "off"
                    });
                    await newServer.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully enabled level module.`);
                } else if(s) {
                    s.levelModule = "on";
                    await s.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully enabled level module.`);
                }
            } else {
                return reply("<:uncheck:515840843933024256> Incorrect module! Correct format: `-module <show/disable/enable> <economy/levels>`")
            }
        } else if(option.toLowerCase() === "disable") {
            if(pModule === "economy") {
                if(!s) {
                    const newServer = new Module({
                        guildID: message.guild.id,
                        levelModule: "off",
                        coinModule: "off"
                    });
                    await newServer.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully disabled economy module.`);
                } else if(s) {
                    s.coinModule = "off";
                    await s.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully disabled economy module.`);
                }
            } else if(pModule === "levels") {
                if(!s) {
                    const newServer = new Module({
                        guildID: message.guild.id,
                        levelModule: "off",
                        coinModule: "off"
                    });
                    await newServer.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully disabled level module.`);
                } else if(s) {
                    s.levelModule = "off";
                    await s.save().catch(e => console.log(e));
                    return reply(`<:check:515850786962669571> Succefully disabled level module.`);
                }
            } else {
                return reply("<:uncheck:515840843933024256> Incorrect module! Correct format: `-module <show/disable/enable> <economy/levels>`")
            }
        } else {
            return reply("<:uncheck:515840843933024256> Incorrect format! Correct format: `-module <show/disable/enable> <economy/levels>`")
        }
        });
    },
};