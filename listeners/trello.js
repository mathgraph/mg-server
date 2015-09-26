var crypto = require('crypto');
var secret = process.env.WEBHOOK_TRELLO_SECRET;
var callbackURL = process.env.WEBHOOK_TRELLO_CALLBACKURL;

var renameCard = require('../helpers/trello-rename-card');

function verify(request, body, secret, callbackURL) {
    var base64Digest = function (s) {
        return crypto.createHmac('sha1', secret).update(s).digest('base64');
    };
    var content = body + callbackURL;
    var doubleHash = base64Digest(base64Digest(content));
    var headerHash = base64Digest(request.headers['x-trello-webhook']);
    return doubleHash == headerHash;
}

module.exports = function (req, res, next) {

	if (!verify(req, req.rawBodyBuffer, secret, callbackURL)) {
		res.status(404).send();
		return;
	}

	(req.body.action.type === 'createCard') && renameCard(req.body.action.data.card);

	res.status(200).send();
};