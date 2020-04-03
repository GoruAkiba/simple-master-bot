const Discord = require('discord.js');
const botClient = require("./structures/botClient");
const client = new botClient();
const {TOKEN, prefix, owner}=require("./bot_setting.json");

const fs = require('fs');
const cmdir = './commands';
client.commands = new Discord.Collection();

// commands init
const commandFiles = fs.readdirSync(cmdir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`${cmdir}/${file}`);


	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	console.log(`Loading: ${file} as ${command.name}`)
	// set if there aliase !== null
	// // with the key as the each of command aliases and the value as the exported module
	command.aliases.map(e=>{
		// console.log(e);
		client.commands.set(e, command);
		console.log(`Loading: ${file} as ${e}`)
	})
}


// event Handler
client.on('message', message => {
	// message.channel.send(message.content);
	
	// if people mention us, tell them about our prefix
	if(message.mentions.users.size){
		console.log("ada")
		if(message.mentions.users.first().id == client.user.id){
			return message.reply(`my prefix is \`\`${prefix}\`\``)
		}
	}

	// if user message by DM
	if(message.guild == null){
		// doing nothing
		return;
	}

	// check message with prefix
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// if no command like this do nothing
	if (!client.commands.has(command)) return;
	var comid = client.commands.get(command);
	
	//  only owner
	 if (comid.admin && message.author.id !== owner )return message.reply("only owner can access this command!");


	try {
		comid.execute(client,message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.once('ready', () => {
	console.log('Ready!');
});

client.login(
	process.env.TOKEN
	);