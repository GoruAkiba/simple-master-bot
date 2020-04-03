// init
const { Client } = require("discord.js");

// Extend class
class botClient extends Client {
	constructor(opt){
		super(opt);

		// define constructor
		this.util = require("../utils/util");
	}
}

module.exports = botClient;