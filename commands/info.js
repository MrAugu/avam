const Discord = require ("discord.js");

module.exports = {
    name: 'info',
	  description: 'Shows you information about bot.',
    cooldown: 3000,
    aliases: [],
	async execute(client, message, args, reply) {
    let owner = client.users.get("414764511489294347");
    let embed = new Discord.RichEmbed()
      .setAuthor(owner.tag, owner.avatarURL)
      .setDescription(`Avam is a fun, economy, leveling up bot that brings economy, levels by chatting minigames and other fun commands in your server. Current version is **${client.version}**.\n\n- **Get in Touch**:\n\`-help\` command will DM you a list of commands.\nFor details on a specific command use \`-help [command name]\`.\nIf you are looking for further assistance, [join support server](https://discord.gg/ZuRPrF2)\n\`-invite\` will give you link to invite bot to your server.\n\n- **Features**:\n• Per-Server Economy Systems\n• Per-Server Level Systems\n• Minigames\n• Fun Commands\n\n- **Tehnologies Used**:\n[Discord.Js](https://discord.js.org/) - Discord API\n[MongoDB](https://mongodb.com/) - Database\n\n<:jarrow:466297496533073920> Bot made by ${owner.tag}.`)
      .setColor("BLURPLE")
      .setTimestamp();
    reply(embed);
    },
};