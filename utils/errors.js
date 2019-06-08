const Discord = require("discord.js");

module.exports.cooldown = (message, reply, cooldown, reason) => {
    /* Upvoter's Coodown: ${uCooldown} */
    let totalSeconds = (cooldown / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let time = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    
    let facts = ["If you somehow found a way to extract all of the gold from the bubbling core of our lovely little planet, you would be able to cover all of the land in a layer of gold up to your knees.","McDonalds calls frequent buyers of their food “heavy users.”","The average person spends 6 months of their lifetime waiting on a red light to turn green.","The largest recorded snowflake was in Keogh, MT during year 1887, and was 15 inches wide.","You burn more calories sleeping than you do watching television.","There are more lifeforms living on your skin than there are people on the planet.","Southern sea otters have flaps of skin under their forelegs that act as pockets. When diving, they use these pouches to store rocks and food.","In 1386 a pig in France was executed by public hanging for the murder of a child.","One in every five adults believe that aliens are hiding in our planet disguised as humans.","If you believe that you’re truly one in a million, there are still approximately 7,184 more people out there just like you."];
    let cooldownEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}, slow it down buddy!`, message.author.avatarURL)
        .setDescription(`
${reason} Come back later!

Cooldown: ${time}.s
Fact: ${facts.random()}
`)
        .addField("Meanwhile, you can check our social medias.", `[Discord Server](https://discord.gg/ZuRPrF2)\n[Upvote Avam](https://discordbots.org/bot/515899954229936138)\n[Invite Avam](https://discordapp.com/oauth2/authorize?client_id=515899954229936138&permissions=2084036081&scope=bot)`)
        .setColor("#54a041")
        .setTimestamp();

    reply(cooldownEmbed)
}
