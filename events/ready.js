const Discord = require("discord.js");
const config = require("../configuration.json");
const DBL = require('dblapi.js');
const mongoose = require("mongoose");

const dbUrl = require("../configuration.json").dbURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Upvotes = require("../models/upvotes.js")

module.exports.run = async (client) => {
  const DBLToken = require("../configuration.json").dblToken;

  const dbl = new DBL(DBLToken, { webhookPort: 5000, webhookAuth: 'password' }); 

  dbl.webhook.on('ready', hook => { 
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`); 
  }); 

  setInterval(() => { 
    dbl.postStats(client.guilds.size); 
  }, 1800000);

  dbl.on('posted', () => { 
    console.log('Server count posted!'); 
  });

  dbl.on('error', e => { 
    console.log(`Oops! ${e}`); 
  });

  dbl.webhook.on('vote', async (vote) => {
    let u = client.users.get(vote.user);
    let voteEmbed = new Discord.RichEmbed()
      .setDescription(`<@${vote.user}> just upvoted Avam. :heart: Thanks for the support.`)
      .setColor("BLURPLE")
      .setTimestamp();
    if(u && u.avatarURL != null) voteEmbed.setAuthor(u.tag, u.avatarURL);
    const m = await client.channels.get(require("../configuration.json").upvoteMessageChannel).send(voteEmbed);

    Upvotes.findOne({
      userID: vote.user
    }, async (err, s) => {
      if(!s) {
        const newUpvoter = new Upvotes({
          userID: vote.user,
          upvoted: "yes",
          upvotedAt: m.createdAt
        });
        await newUpvoter.save().catch(e => console.log(e));
      }
    });
  });

  let readyEmbed = new Discord.RichEmbed()
    .setTitle("Restarted Succefully!")
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setDescription(`Bot is fully operational. Succefully loaded \`${client.guilds.size}\` guilds, \`${client.channels.size}\` channels and \`${client.users.size}\` users.`)
    .setColor("BLURPLE")
    .setTimestamp();
  client.channels.get(require("../configuration.json").readyMessageChannel).send(readyEmbed);
  
  await client.user.setActivity(`${client.guilds.size} Servers | ${config.prefix}help`, { type: "WATCHING" });
  await client.user.setStatus("online");
  console.log(`Logged in as ${client.user.tag}.`);
}
