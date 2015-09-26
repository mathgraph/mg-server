var trello = require('./trello');

module.exports = function (card) {
	trello.put('1/cards/' + card.id, { name: '[' + card.idShort + '] ' + card.name }, function (err, respose) {
		err && console.log(err);
	});
};