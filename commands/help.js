// init require
const Discord = require('discord.js');
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const owner = process.env.Owner;
const prefix = process.env.Prefix;

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
		const {description, color} = client.setting;
		const own = client.users.resolve(owner);
		var desc = description.replace(/{{owner}}/g,`\`\`${own.tag}\`\``);


		var util = client.util;
		const embed = new Discord.MessageEmbed();

		if(!args[0]){
			var cm = commandFiles.map((e,i) => {
				const cmd = require(`../commands/${e}`)
				if(!cmd.hidden){
					return `| #${util.tn(util.addZero(i+1,2),1)} | ${util.tn(cmd.name,2)} | ${util.tn(cmd.aliases.join(", "),4)} |`
				}
				return null;
			});

			var batas = "+--------+------------+----------------------+",
			header = `\`\`\`\n| #${util.tn("No",1)} | ${util.tn("commands",2)} | ${util.tn("aliases",4)} |\n\`\`\``,
			footer = `ℹ️ *use \`\`${prefix}help [command]\`\` for more info!*\n\n**Link:**\n${util.usefulLnk(client).join("\n")}`;

			embed
			.setColor(color.hack)
			.setAuthor(`${client.user.username} | Help & About`)
			.setDescription(
				`${desc}\n\n**List of command:**\n${header}\`\`\`css\n${cm.filter(e => {return e !== null} ).join("\n")}\`\`\`\n${footer}`
				)
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/8/88/Radar2.gif");

			return message.channel.send(embed);

		}else{
			var comid = client.commands.get(args[0]);
			if(!comid)return message.channel.send(`there is no command like **'${args[0]}'**`)
			var ussage = comid.ussage == null ? "": `**🔸${util.tn("Ussage",3)} :**\n\`\`\` ${prefix+comid.name} ${comid.ussage}\`\`\``;
			embed
			.setColor(color.warning)
			.setTitle(`**${comid.name}**`)
			.setAuthor(`${client.user.username} | Help Command`)
			.setDescription(
				`**🔸${util.tn("Description",3)} :**\n\`\`\`${comid.description}\`\`\`\n`+
				`**🔸${util.tn("Aliase(s)",3)} :**\n\`\`\` ${comid.aliases.join(", ")}\`\`\`\n`+
				`${ussage}`
				)
			.setThumbnail("https://www.pinclipart.com/picdir/big/44-448449_information-symbol-icon-driverlayer-search-engine-information-icon.png")
			.setImage("https://cdn.glitch.com/5f7d51b1-406e-43aa-9be8-293ff08f0543%2Fgiff.gif?v=1579915986916");

			return message.channel.send(embed);
		}
		
	}
}