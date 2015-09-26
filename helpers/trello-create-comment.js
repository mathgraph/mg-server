var trello = require('./trello');
var board = process.env.WEBHOOK_TRELLO_BOARD;

module.exports = function (idShort, comment) {
	trello.get('1/boards/' + board + '/cards', function (err, data) {
		data.forEach(function (card) {
			if (card.idShort === idShort) {
				trello.post('1/cards/' + card.id + '/actions/comments', { text: comment }, function (err, response) {
					err && console.log(err);
				});
			}
		});
	});
};