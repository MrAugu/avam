if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const fs = require('fs');
const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);

const config = require('./configuration.json');
const token = config.token;

const files = fs.readdirSync('./commands');
const events = fs.readdirSync('./events');
if (!files.length) throw Error('No command files found!');
if (!events.length) throw Error('No event files found!');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const log = message => {
  console.log(`[${new Date().toLocaleString()}] > ${message}`);
};

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const init = async () => {
  const evtFiles = await readdir("./events/");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, (...args) => event.run(client, ...args));
  
  });
}

init();

log(`${files.length} commands loaded.`);
log(`${events.length} events loaded.`);

String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

client.wait = require("util").promisify(setTimeout);

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

client.login(token);