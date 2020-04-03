// init require
const Discord = require('discord.js');
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// export module
module.exports = {
	name : "help",
	description : "BOT help commands",
	aliases : ["?","h"],
	ussage : "[command]",
	hidden : false,
	admin : false,
	nsfw : false,
	async execute(client,message,args){
		var util = client.util;
		var cm = commandFiles.map((e,i) => {
			const cmd = require(`../commands/${e}`)
			if(!cmd.hidden){
				return `| #${util.tn(util.addZero(i+1,2),1)} | ${util.tn(cmd.name,2)} | ${util.tn(cmd.aliases.join(", "),4)} |`
			}
			return null;
		});

		var batas = "+--------+------------+----------------------+",
		header = `${batas}\n| #${util.tn("No",1)} | ${util.tn("commands",2)} | ${util.tn("aliases",4)} |\n${batas}`;

		const embed = new Discord.MessageEmbed()
		.setColor('#00afee')
		.setAuthor(`${client.user.username} | Help Message`)
		.setDescription(`\`\`\`css\n${header}\n${cm.filter(e => {return e !== null} ).join("\n")}\n${batas}\`\`\``);

		return message.channel.send(embed);
	}
}