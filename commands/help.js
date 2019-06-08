const Discord = require("discord.js");

module.exports = {
    name: 'help',
	  description: 'Shows a list of available commands or detailed info about a specific command.',
    cooldown: 3000,
    aliases: ['halp','commands'],
	async execute(client, message, args, reply) {
    if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
    const helpEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('BLURPLE')
      .setDescription(`
My prefix is \`-\`.

<:jarrow:466297496533073920> Looking for assistance or support? Join our support server https://discord.gg/ZuRPrF2 today!
ℹ To find details about a custom command use \`-help [command name]\`.
      `)
      .addField("Economy Module Commands:", `bal, leaderboard, bet, beg, search, work, daily`)
      .addField("Levels Module Commands:", `rank, levels`)
      .addField("Utility Commands:", `module, ping, help, invite, info`)
      .addField("Fun Commands:", `asciify, trivia`)
      .addField("Owner Only Commands:", `error, ev`);

  const extendedHelp = {
    "bal": "<:jarrow:466297496533073920> Description: This command shows your balance in the curent server.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-bal [id/mention]`\n<:jarrow:466297496533073920> Example: `-bal 414764511489294347`", 
    "leaderboard": "<:jarrow:466297496533073920> Description: Shows coin leaderboard of current server.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-leaderboard`\n<:jarrow:466297496533073920> Example: `leaderboard`", 
    "bet": "<:jarrow:466297496533073920> Description: No risk no win. Double or nothing. You can only max bet 200 Coins at a time. \n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-bet <ammount>`\n<:jarrow:466297496533073920> Example: `-bet 100`",
    "beg": "<:jarrow:466297496533073920> Description: Beg bot for some coins.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-beg`\n<:jarrow:466297496533073920> Example: `-beg`",
    "search": "<:jarrow:466297496533073920> Description: Search for coins.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-search`\n<:jarrow:466297496533073920> Example: `-search`",
    "work": "<:jarrow:466297496533073920> Description: Work to earn coins. Seems legit.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-work`\n<:jarrow:466297496533073920> Example: `-work`",
    "daily": "<:jarrow:466297496533073920> Description: Get your daily coins.\n<:jarrow:466297496533073920> Module: Economy\n<:jarrow:466297496533073920> Syntax: `-daily`\n<:jarrow:466297496533073920> Example: `-daily`",
    "rank": "<:jarrow:466297496533073920> Description: This command shows your level and xp in the curent server.\n<:jarrow:466297496533073920> Module: Levels\n<:jarrow:466297496533073920> Syntax: `-rank [id/mention]`\n<:jarrow:466297496533073920> Example: `-rank 414764511489294347`",
    "levels": "<:jarrow:466297496533073920> Description: Shows top 10 users with level & xp in current server.\n<:jarrow:466297496533073920> Module: Levels\n<:jarrow:466297496533073920> Syntax: `-levels`\n<:jarrow:466297496533073920> Example: `-levels`",
    "module": "<:jarrow:466297496533073920> Description: Used to enable/disable economy/levels modules.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-module <show/enable/disable> <levels/economy>`\n<:jarrow:466297496533073920> Example: `-module enable economy`/ `-module show`",
    "ping": "<:jarrow:466297496533073920> Description: Ping bot.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-ping`\n<:jarrow:466297496533073920> Example: `-ping`",
    "help": "<:jarrow:466297496533073920> Description: Get a list of commands in or outside DMs or get help on a specific command.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-help [command name]`\n<:jarrow:466297496533073920> Example: `-help ping`",
    "invite": "<:jarrow:466297496533073920> Description: Invite bot, join support server, upvote bot all links in one place.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-invite`\n<:jarrow:466297496533073920> Example: `-invite`",
    "info": "<:jarrow:466297496533073920> Description: You get smarter if you know more.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-info`\n<:jarrow:466297496533073920> Example: `-info`",
    "asciify": "<:jarrow:466297496533073920> Description: Turns your text into large size letters. Try it out.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-asciify <text>`\n<:jarrow:466297496533073920> Example: `-asciify Hello!`",
    "trivia": "<:jarrow:466297496533073920> Description: Test your intelect with this command.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-trivia`\n<:jarrow:466297496533073920> Example: `-trivia`",
    "error": "<:jarrow:466297496533073920> Description: Turns error code into real errors. This command is owner-only.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-error <error code>`\n<:jarrow:466297496533073920> Example: `-error jp1nbx9z`",
    "ev": "<:jarrow:466297496533073920> Description: Evaluates any JavaScript code. This command is owner-only.\n<:jarrow:466297496533073920> Module: None\n<:jarrow:466297496533073920> Syntax: `-ev <code>`\n<:jarrow:466297496533073920> Example: `-ev message`"
  }

  if(!args[0]) {
    const m = await reply("<a:loading:485456411447263244> Delivering help to DMs.");
    try { 
      await message.author.send(helpEmbed);
      m.edit("📥 Delivered to your DMs."); 
    } catch(err) {
      m.edit("<:uncheck:515840843933024256> Couldn't deliver it to DMs. Sending it in current channel.");
      reply(helpEmbed);
    }
  } else if(extendedHelp[args[0].toLowerCase()]) {
      const hEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('BLURPLE')
        .setDescription(extendedHelp[args[0].toLowerCase()] + "\n\n`<>` - A requiered argument.\n`[]` - An optional argument.")
        .setTimestamp();
      reply(hEmbed);
    }
  },
};