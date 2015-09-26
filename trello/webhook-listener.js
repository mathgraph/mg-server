var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');

function verifyTrelloWebhookRequest(request, secret, callbackURL) {
    // Double-HMAC to blind any timing channel attacks
    // https://www.isecpartners.com/blog/2011/february/double-hmac-verification.asp
    var base64Digest = function (s) {
        return crypto.createHmac('sha1', secret).update(s).digest('base64');
    };
    var content = request.body + callbackURL;
    var doubleHash = base64Digest(base64Digest(content));
    var headerHash = base64Digest(request.headers['x-trello-webhook']);
    return doubleHash == headerHash;
}

var secret = 'd49fe0aaa39a681ccbcc5f2c9e55c5c40465016189dbe833d0170af005ec8391';

var app = express();

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(function (req, res) {
		console.log(req.body);
		console.log(req.params);
		res.status(200);
	})
	.listen(8888);

console.log('Running on port 8888...');