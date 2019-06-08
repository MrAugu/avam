const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports = {
    name: 'trivia',
    description: 'Test your winsdom with the trivia command.',
    cooldown: 3000,
    aliases: [],
    async execute(client, message, args, reply) {
        client.awaitReply = async (msg, question, limit = 30000) => {
            const filter = m => m.author.id === msg.author.id;
            await msg.channel.send(question);
            try {
              const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
              return collected.first().content;
            } catch (e) {
              return false;
            }
          };
        
          client.checkDM = async (message, reply) => {
            if(message.channel.type === "dm") {
              return true;
            } else {
              return false;
            }
          };

        const shuffleArray = async (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;
        
            while (0 !== currentIndex) {
        
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
        
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
          }
        
          return array;
        };
        
        
           await snekfetch.get("https://opentdb.com/api.php?amount=1").then(async(r) => {
                let body = r.body;
                let q = body.results[0];
        
                q.incorrect_answers.push(q.correct_answer);
        
                let answrs = await shuffleArray(q.incorrect_answers);
        
                let ind = 1;
                let qEmbed = new Discord.RichEmbed()
                    .setTitle("Trivia")
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setThumbnail("https://opentdb.com/images/logo.png")
                .setDescription(`
        Category: ${q.category}
        Difficulty: ${q.difficulty}
        
        ${q.question}
        
        ${ind++} - ${answrs.join(`\n${ind++} - `)}
                `)
                .setColor("BLURPLE")
                .setTimestamp();
                let msg = await client.awaitReply(message, qEmbed);
                if(msg === false) {
                    return reply(`Oops, seems like youre late. It was **${q.correct_answer.toLowerCase()}**.`)
                } 
                
                let uReply = q.incorrect_answers[parseInt(msg)  - 1];
        
                if(uReply === q.correct_answer) {
                    return reply(`Yeah you got it, it was **${q.correct_answer}**! :tada:`);
                } else {
                    return reply(`Dang it! You were closer, it was ${q.correct_answer.toLowerCase()}.`);
                }
           });
    },
};