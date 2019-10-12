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

Looking for assistance or support? Join our support server https://discord.gg/ZuRPrF2 today!
ℹ To find details about a custom command use \`-help [command name]\`.
      `)
      .addField("Economy Module Commands:", `bal, leaderboard, bet, beg, search, work, daily`)
      .addField("Levels Module Commands:", `rank, levels`)
      .addField("Utility Commands:", `module, ping, help, invite, info`)
      .addField("Fun Commands:", `asciify, trivia`)
      .addField("Owner Only Commands:", `error, ev`);

  const extendedHelp = {
    "bal": "Description: This command shows your balance in the curent server.\nModule: Economy\nSyntax: `-bal [id/mention]`\nExample: `-bal 414764511489294347`",
    "leaderboard": "Description: Shows coin leaderboard of current server.\nModule: Economy\nSyntax: `-leaderboard`\nExample: `leaderboard`",
    "bet": "Description: No risk no win. Double or nothing. You can only max bet 200 Coins at a time. \nModule: Economy\nSyntax: `-bet <ammount>`\nExample: `-bet 100`",
    "beg": "Description: Beg bot for some coins.\nModule: Economy\nSyntax: `-beg`\nExample: `-beg`",
    "search": "Description: Search for coins.\nModule: Economy\nSyntax: `-search`\nExample: `-search`",
    "work": "Description: Work to earn coins. Seems legit.\nModule: Economy\nSyntax: `-work`\nExample: `-work`",
    "daily": "Description: Get your daily coins.\nModule: Economy\nSyntax: `-daily`\nExample: `-daily`",
    "rank": "Description: This command shows your level and xp in the curent server.\nModule: Levels\nSyntax: `-rank [id/mention]`\nExample: `-rank 414764511489294347`",
    "levels": "Description: Shows top 10 users with level & xp in current server.\nModule: Levels\nSyntax: `-levels`\nExample: `-levels`",
    "module": "Description: Used to enable/disable economy/levels modules.\nModule: None\nSyntax: `-module <show/enable/disable> <levels/economy>`\nExample: `-module enable economy`/ `-module show`",
    "ping": "Description: Ping bot.\nModule: None\nSyntax: `-ping`\nExample: `-ping`",
    "help": "Description: Get a list of commands in or outside DMs or get help on a specific command.\nModule: None\nSyntax: `-help [command name]`\nExample: `-help ping`",
    "invite": "Description: Invite bot, join support server, upvote bot all links in one place.\nModule: None\nSyntax: `-invite`\nExample: `-invite`",
    "info": "Description: You get smarter if you know more.\nModule: None\nSyntax: `-info`\nExample: `-info`",
    "asciify": "Description: Turns your text into large size letters. Try it out.\nModule: None\nSyntax: `-asciify <text>`\nExample: `-asciify Hello!`",
    "trivia": "Description: Test your intelect with this command.\nModule: None\nSyntax: `-trivia`\nExample: `-trivia`",
    "error": "Description: Turns error code into real errors. This command is owner-only.\nModule: None\nSyntax: `-error <error code>`\nExample: `-error jp1nbx9z`",
    "ev": "Description: Evaluates any JavaScript code. This command is owner-only.\nModule: None\nSyntax: `-ev <code>`\nExample: `-ev message`"
  }

  if(!args[0]) {
    const m = await reply("<a:loading:485456411447263244> Delivering help to DMs.");
    try {
      await message.author.send(helpEmbed);
      m.edit("📥 Delivered to your DMs.");
    } catch(err) {
      m.edit("Couldn't deliver it to DMs. Sending it in current channel.");
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
