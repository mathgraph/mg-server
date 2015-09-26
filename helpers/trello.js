var Trello = require('node-trello');
var key = process.env.WEBHOOK_TRELLO_KEY,
	token = process.env.WEBHOOK_TRELLO_TOKEN;

module.exports = new Trello(key, token);