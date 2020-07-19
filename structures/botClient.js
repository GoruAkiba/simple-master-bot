// init
const { Client } = require("discord.js");

// Extend class
class botClient extends Client {
	constructor(opt){
		super(opt);

		// define constructor
		this.util = require("../utils/util");
		this.setting = require("../bot_setting.json");
	}
}

module.exports = botClient;