const Discord = require("discord.js");

module.exports = {
    name: 'eval',
    description: 'Evaluates any javascript code.',
    args: true,
    usage: "<code>",
    cooldown: 3000,
    aliases: ['ev'],
	async execute(client, message, args, reply) {
      if(message.author.id !== "414764511489294347") return reply("<:uncheck:515840843933024256> You are not alloweed to use this.");
      client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        if (typeof evaled !== "string")
          text = require("util").inspect(text, {depth: 0});
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(client.token, "What token?");
    
        return text;
      }
      const code = args.join(" ");
      try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        const MAX_CHARS = 3 + 2 + clean.length + 3;
        let evaluatedEmbed = new Discord.RichEmbed()
          .setTitle("Evaluation Complete")
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("BLURPLE")
          .addField("📥 Input:", `\`\`\`js\n${code}\n\`\`\``);
        if (MAX_CHARS > 700) {
          return message.channel.send("Output exceeded 700 charachters length. Sending it as file...", { files: [{ attachment: Buffer.from(clean), name: "eval.txt" }] });
        } 
        evaluatedEmbed.addField("📤 Output:", `\`\`\`js\n${clean}\n\`\`\``);
        reply(evaluatedEmbed);
      } catch (err) {
        let errEvaluatedEmbed = new Discord.RichEmbed()
          .setTitle("Evaluation Complete")
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("BLURPLE")
          .addField("📥 Input:", `\`\`\`js\n${code}\n\`\`\``);

        errEvaluatedEmbed.addField("📤 Output:", `\`\`\`xl\n${err}\n\`\`\``)
        reply(errEvaluatedEmbed);
      }
    },
};